# touchfalls

Личный сайт-визитка со ссылками, мониторингом сервера и проектами.

Одна страница: сверху иконки ссылок, ниже карточки в одной узкой колонке, тёмная и светлая темы (кнопка ◐). Старые ссылки вида `#watchlist` прокручивают к нужной карточке.

## Что внутри
- **[links]** — иконки в шапке: контакты и соцсети (Telegram, Letterboxd, Serializd, Email, YouTube, Boosty).
- **[server]** — статус приватного Minecraft-сервера и заявка на вайтлист.
- **[proj]** — моды и проекты с Modrinth со счётчиком загрузок.
- **[se's pack]** — модпак со ссылкой на Modrinth, конвертером `.mrpack → .zip` для ручной установки и лениво загружаемым changelog версий.
- **[page info]** — дата последнего обновления сайта и последний коммит (GitHub API, репозиторий в `CONFIG.githubRepo`).
- **[recently watched]** — последние фильмы из дневника Letterboxd с постером, оценкой и датой (RSS через тот же worker).
- **[shoutbox]** — короткие сообщения посетителей. Бэкенд — Cloudflare Worker `worker/shoutbox.js` (D1 + Turnstile), адрес и ключ капчи в `CONFIG.shoutboxApi` / `CONFIG.turnstileSiteKey`. Деплой: `cd worker && npx wrangler d1 create shoutbox` (id вписать в `shoutbox.toml`), `npx wrangler d1 execute shoutbox --remote --file schema.sql -c shoutbox.toml`, `npx wrangler secret put TURNSTILE_SECRET -c shoutbox.toml`, `npx wrangler secret put ADMIN_TOKEN -c shoutbox.toml`, `npx wrangler deploy -c shoutbox.toml`. Удаление сообщения: `curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" <worker>/<id>`.
- **[srv-info]** — страница `/srv-info` (`srv-info/index.html`): описание сервера seven-eleven, Discord и анкета. Анкета шлёт `POST /apply` в тот же воркер, который отправляет её в Telegram. Для этого нужны секреты `TG_BOT_TOKEN` и `TG_CHAT_ID` (`npx wrangler secret put ... -c shoutbox.toml`).
- **Заявки и онлайн-график** — воркер хранит заявки в D1 (`applications`), в Telegram под каждой кнопки accept/reject (вебхук `/tg`), лимит 3 заявки в сутки с IP и запрет дубля ника. Cron раз в 10 минут пишет онлайн сервера в `mc_samples`, `GET /mc-history` отдаёт последние 24 ч для графика. После обновления выполнить `npx wrangler d1 execute shoutbox --remote --file schema.sql -c shoutbox.toml` и `npx wrangler deploy -c shoutbox.toml`.
- **[watchlist match]** — общие фильмы из watchlist двух пользователей Letterboxd: постер, страна, рейтинг, сюжет и кнопка PICK ANOTHER FILM. Страницы Letterboxd грузятся через Cloudflare Worker из папки `worker/` (адрес в `CONFIG.letterboxdProxy`, деплой: `cd worker && npx wrangler deploy`, проверка разметки Letterboxd: `sh worker/check.sh`).

## Как настроить
Все ссылки, никнеймы и адрес сервера меняются в начале файла `app.js` в блоке `CONFIG`.
