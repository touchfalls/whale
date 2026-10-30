/**
 * Cloudflare Worker: бэкенд окна [shoutbox] (D1 + Turnstile).
 * GET /        -> последние 50 сообщений
 * POST /       -> {nick, text, token} добавить сообщение
 * DELETE /<id> -> удалить (Authorization: Bearer ADMIN_TOKEN)
 * POST /tg       -> вебхук Telegram: нажатие кнопки «delete» в уведомлении (только от TG_CHAT_ID)
 * POST /tg-setup -> регистрирует вебхук в Telegram (Authorization: Bearer ADMIN_TOKEN), вызвать один раз после деплоя
 * Секреты: TURNSTILE_SECRET, ADMIN_TOKEN; TG_BOT_TOKEN и TG_CHAT_ID — по желанию, для уведомлений в Telegram.
 */
const ORIGIN = "https://margoles.xyz";
const MAX_NICK = 20;
const MAX_TEXT = 200;
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

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") return new Response(null, { headers: cors });
        const { pathname } = new URL(request.url);

        if (request.method === "GET" && pathname === "/") {
            const { results } = await env.DB.prepare(
                "SELECT id, nick, text, ts FROM shouts ORDER BY id DESC LIMIT 50"
            ).all();
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
            const id = q?.data?.match(/^del:(\d+)$/)?.[1];
            if (id && String(q.from?.id) === String(env.TG_CHAT_ID)) {
                await env.DB.prepare("DELETE FROM shouts WHERE id = ?").bind(id).run();
                await tg(env, "answerCallbackQuery", { callback_query_id: q.id, text: "deleted" });
                await tg(env, "editMessageText", {
                    chat_id: q.message.chat.id,
                    message_id: q.message.message_id,
                    text: `${q.message.text}\n\n[deleted]`
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
                    text: `shoutbox #${id}\n${nick}: ${text}`,
                    reply_markup: { inline_keyboard: [[{ text: "delete", callback_data: `del:${id}` }]] }
                }).catch(() => {}));
            }
            return reply({ ok: true }, 201);
        }

        return reply({ error: "not allowed" }, 400);
    }
};
