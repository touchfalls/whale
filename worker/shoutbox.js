/**
 * Cloudflare Worker: бэкенд окна [shoutbox] (D1 + Turnstile).
 * GET /        -> последние 50 сообщений
 * POST /       -> {nick, text, token} добавить сообщение
 * DELETE /<id> -> удалить (Authorization: Bearer ADMIN_TOKEN)
 * POST /letterbox -> {text, token} приватное сообщение владельцу в Telegram (не хранится)
 * POST /apply   -> {nick, age, contact, source, ideas, tg, token} анкета seven-eleven: хранится в D1 и уходит в Telegram с кнопками accept/reject
 * GET /mc-history -> онлайн сервера за 24 ч [{ts, online, players}] (пишет cron каждые 10 минут)
 * POST /hit      -> учесть визит (хеш IP, раз в сутки на посетителя) и вернуть статистику {today, unique, views}
 * POST /tg       -> вебхук Telegram: нажатие кнопки «delete» в уведомлении (только от TG_CHAT_ID)
 * POST /tg-setup -> регистрирует вебхук в Telegram (Authorization: Bearer ADMIN_TOKEN), вызвать один раз после деплоя
 * Секреты: TURNSTILE_SECRET, ADMIN_TOKEN; TG_BOT_TOKEN и TG_CHAT_ID — по желанию, для уведомлений в Telegram.
 */
const ORIGIN = "https://curlz.xyz";
const MAX_NICK = 20;
const MAX_TEXT = 200;
const MAX_LETTER = 500;
const COOLDOWN_S = 10;

const cors = {
    "Access-Control-Allow-Origin": ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
const reply = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

const tg = (env, method, body) => fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
});

async function captchaOk(request, env, token) {
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET,
            response: String(token || ""),
            remoteip: request.headers.get("CF-Connecting-IP") || ""
        })
    });
    return (await check.json()).success;
}

const MC_HOST = "play.curlz.xyz";
const APPLY_PER_DAY = 3;
const escHtml = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const STATUS_MARK = { ok: "\n\n✅ accepted", no: "\n\n❌ rejected" };

// HTML-режим нужен ради <code> (копирование ника по тапу), поэтому экранируем всё, что ввёл посетитель
const appText = (a, mark = "") =>
    `📝 seven-eleven application #${a.id}\n\n🎮 nick: <code>${a.nick}</code>\n🎂 age: ${a.age}\n💬 contact: ${escHtml(a.contact)}\n` +
    `🔎 from: ${escHtml(a.source)}\n💡 ideas: ${escHtml(a.ideas)}\n${a.tg ? "✅" : "❌"} telegram group: ${a.tg ? "yes" : "no"}${mark}`;

export default {
    // Cron: раз в 10 минут записываем онлайн сервера для графика на главной
    async scheduled(event, env, ctx) {
        const now = Math.floor(Date.now() / 1000);
        let online = 0, players = 0;
        try {
            const res = await fetch(`https://api.mcstatus.io/v2/status/java/${MC_HOST}`);
            const d = await res.json();
            online = d.online ? 1 : 0;
            players = d.players?.online ?? 0;
        } catch { /* сервер или API недоступны — пишем как offline */ }
        await env.DB.batch([
            env.DB.prepare("INSERT INTO mc_samples (ts, online, players) VALUES (?, ?, ?)").bind(now, online, players),
            env.DB.prepare("DELETE FROM mc_samples WHERE ts < ?").bind(now - 7 * 86400)
        ]);
    },

    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") return new Response(null, { headers: cors });
        const { pathname } = new URL(request.url);

        if (request.method === "GET" && pathname === "/") {
            const { results } = await env.DB.prepare(
                "SELECT id, nick, text, ts FROM shouts ORDER BY id DESC LIMIT 50"
            ).all();
            return reply(results);
        }

        if (request.method === "GET" && pathname === "/mc-history") {
            const { results } = await env.DB.prepare(
                "SELECT ts, online, players FROM mc_samples WHERE ts > ? ORDER BY ts"
            ).bind(Math.floor(Date.now() / 1000) - 86400).all();
            return reply(results);
        }

        if (request.method === "POST" && pathname === "/tg-setup") {
            if (!env.ADMIN_TOKEN || request.headers.get("Authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
                return reply({ error: "unauthorized" }, 401);
            }
            const res = await tg(env, "setWebhook", {
                url: `${new URL(request.url).origin}/tg`,
                secret_token: await sha256(env.ADMIN_TOKEN),
                allowed_updates: ["callback_query"]
            });
            return reply(await res.json());
        }

        if (request.method === "POST" && pathname === "/tg") {
            // Секрет вебхука выводится из ADMIN_TOKEN, поэтому чужой запрос сюда не пройдёт
            if (!env.ADMIN_TOKEN || request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== await sha256(env.ADMIN_TOKEN)) {
                return reply({ error: "unauthorized" }, 401);
            }
            const q = (await request.json().catch(() => ({}))).callback_query;
            const ap = q?.data?.match(/^ap:(ok|no):(\d+)$/);
            if (ap && String(q.from?.id) === String(env.TG_CHAT_ID)) {
                const [, verdict, appId] = ap;
                await env.DB.prepare("UPDATE applications SET status = ? WHERE id = ?")
                    .bind(verdict === "ok" ? "accepted" : "rejected", appId).run();
                const row = await env.DB.prepare("SELECT * FROM applications WHERE id = ?").bind(appId).first();
                await tg(env, "answerCallbackQuery", { callback_query_id: q.id, text: verdict === "ok" ? "✅ accepted" : "❌ rejected" });
                if (row) {
                    await tg(env, "editMessageText", {
                        chat_id: q.message.chat.id,
                        message_id: q.message.message_id,
                        parse_mode: "HTML",
                        text: appText(row, STATUS_MARK[verdict])
                    });
                }
                return reply({ ok: true });
            }
            const id = q?.data?.match(/^del:(\d+)$/)?.[1];
            if (id && String(q.from?.id) === String(env.TG_CHAT_ID)) {
                await env.DB.prepare("DELETE FROM shouts WHERE id = ?").bind(id).run();
                await tg(env, "answerCallbackQuery", { callback_query_id: q.id, text: "🗑 deleted" });
                await tg(env, "editMessageText", {
                    chat_id: q.message.chat.id,
                    message_id: q.message.message_id,
                    text: `${q.message.text}\n\n🗑 deleted`
                });
            }
            return reply({ ok: true });
        }

        if (request.method === "DELETE") {
            const id = pathname.match(/^\/(\d+)$/)?.[1];
            if (!env.ADMIN_TOKEN || request.headers.get("Authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
                return reply({ error: "unauthorized" }, 401);
            }
            if (!id) return reply({ error: "bad id" }, 400);
            await env.DB.prepare("DELETE FROM shouts WHERE id = ?").bind(id).run();
            return reply({ ok: true });
        }

        if (request.method === "POST" && pathname === "/hit") {
            const ip = request.headers.get("CF-Connecting-IP") || "";
            const day = new Date().toISOString().slice(0, 10);
            await env.DB.prepare(
                "INSERT INTO visits (day, ip_hash, hits) VALUES (?, ?, 1) ON CONFLICT (day, ip_hash) DO UPDATE SET hits = hits + 1"
            ).bind(day, await sha256(ip + env.ADMIN_TOKEN)).run();
            const stats = await env.DB.prepare(
                "SELECT COUNT(DISTINCT ip_hash) AS unique_total, SUM(hits) AS views, " +
                "COUNT(DISTINCT CASE WHEN day = ? THEN ip_hash END) AS today FROM visits"
            ).bind(day).first();
            return reply({ today: stats.today, unique: stats.unique_total, views: stats.views });
        }

        if (request.method === "POST" && pathname === "/apply") {
            if (!env.TURNSTILE_SECRET || !env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return reply({ error: "not configured" }, 500);
            let data;
            try { data = await request.json(); } catch { return reply({ error: "bad json" }, 400); }
            const str = k => (typeof data[k] === "string" ? data[k].trim() : "");
            const { nick, source, ideas, contact } = { nick: str("nick"), source: str("source"), ideas: str("ideas"), contact: str("contact") };
            const age = Number(data.age);
            if (!/^[A-Za-z0-9_]{3,16}$/.test(nick) || !Number.isInteger(age) || age < 6 || age > 99
                || !contact || contact.length > 100 || !source || source.length > 300 || !ideas || ideas.length > MAX_LETTER
                || !["yes", "no"].includes(data.tg)) return reply({ error: "bad form" }, 400);
            if (!(await captchaOk(request, env, data.token))) return reply({ error: "captcha failed" }, 403);

            const ipHash = await sha256((request.headers.get("CF-Connecting-IP") || "") + env.TURNSTILE_SECRET);
            const now = Math.floor(Date.now() / 1000);
            const dupe = await env.DB.prepare(
                "SELECT 1 FROM applications WHERE nick_lc = ? AND status != 'rejected' LIMIT 1"
            ).bind(nick.toLowerCase()).first();
            if (dupe) return reply({ error: "duplicate" }, 409);
            const { n } = await env.DB.prepare(
                "SELECT COUNT(*) AS n FROM applications WHERE ip_hash = ? AND ts > ?"
            ).bind(ipHash, now - 86400).first();
            if (n >= APPLY_PER_DAY) return reply({ error: "too many" }, 429);

            const tgFlag = data.tg === "yes" ? 1 : 0;
            const { meta } = await env.DB.prepare(
                "INSERT INTO applications (nick, nick_lc, age, contact, source, ideas, tg, ip_hash, ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            ).bind(nick, nick.toLowerCase(), age, contact, source, ideas, tgFlag, ipHash, now).run();
            const id = meta.last_row_id;

            const sent = await tg(env, "sendMessage", {
                chat_id: env.TG_CHAT_ID,
                parse_mode: "HTML",
                text: appText({ id, nick, age, contact, source, ideas, tg: tgFlag }),
                reply_markup: { inline_keyboard: [[
                    { text: "✅ accept", callback_data: `ap:ok:${id}` },
                    { text: "❌ reject", callback_data: `ap:no:${id}` }
                ]] }
            });
            if (!sent.ok) {
                // Заявку в базе без уведомления не оставляем: иначе ник заблокируется дублем, а админ о ней не узнает
                await env.DB.prepare("DELETE FROM applications WHERE id = ?").bind(id).run();
                return reply({ error: "delivery failed" }, 502);
            }
            return reply({ ok: true }, 201);
        }

        if (request.method === "POST" && pathname === "/letterbox") {
            if (!env.TURNSTILE_SECRET || !env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return reply({ error: "not configured" }, 500);
            let data;
            try { data = await request.json(); } catch { return reply({ error: "bad json" }, 400); }
            const text = typeof data.text === "string" ? data.text.trim() : "";
            if (!text || text.length > MAX_LETTER) return reply({ error: "bad text" }, 400);

            if (!(await captchaOk(request, env, data.token))) return reply({ error: "captcha failed" }, 403);

            // Ждём ответа Telegram: письмо нигде не хранится, потерять его молча нельзя
            const sent = await tg(env, "sendMessage", { chat_id: env.TG_CHAT_ID, text: `💌 letterbox\n\n${text}` });
            return sent.ok ? reply({ ok: true }, 201) : reply({ error: "delivery failed" }, 502);
        }

        if (request.method === "POST" && pathname === "/") {
            // Без секрета капчи пропускать нельзя — иначе эндпоинт открыт для спама
            if (!env.TURNSTILE_SECRET) return reply({ error: "not configured" }, 500);

            let data;
            try { data = await request.json(); } catch { return reply({ error: "bad json" }, 400); }
            const nick = typeof data.nick === "string" ? data.nick.trim() : "";
            const text = typeof data.text === "string" ? data.text.trim() : "";
            if (!nick || nick.length > MAX_NICK || !text || text.length > MAX_TEXT) {
                return reply({ error: "bad nick or text" }, 400);
            }

            const ip = request.headers.get("CF-Connecting-IP") || "";
            const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: String(data.token || ""), remoteip: ip })
            });
            if (!(await check.json()).success) return reply({ error: "captcha failed" }, 403);

            const ipHash = await sha256(ip + env.TURNSTILE_SECRET);
            const now = Math.floor(Date.now() / 1000);
            const recent = await env.DB.prepare(
                "SELECT 1 FROM shouts WHERE ip_hash = ? AND ts > ? LIMIT 1"
            ).bind(ipHash, now - COOLDOWN_S).first();
            if (recent) return reply({ error: "too fast" }, 429);

            const { meta } = await env.DB.prepare(
                "INSERT INTO shouts (nick, text, ts, ip_hash) VALUES (?, ?, ?, ?)"
            ).bind(nick, text, now, ipHash).run();
            const id = meta.last_row_id;

            // Уведомление владельцу; без parse_mode, чтобы чужой текст не мог ничего разметить. Сбой Telegram не ломает публикацию
            if (env.TG_BOT_TOKEN && env.TG_CHAT_ID) {
                ctx.waitUntil(tg(env, "sendMessage", {
                    chat_id: env.TG_CHAT_ID,
                    text: `📬 shoutbox #${id}\n\n👤 ${nick}\n💬 ${text}`,
                    reply_markup: { inline_keyboard: [[{ text: "delete", callback_data: `del:${id}` }]] }
                }).catch(() => {}));
            }
            return reply({ ok: true }, 201);
        }

        return reply({ error: "not allowed" }, 400);
    }
};
