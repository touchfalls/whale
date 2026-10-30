# touchfalls

Личный сайт-визитка со ссылками, мониторингом сервера и проектами.

Одна страница-дашборд: каждый раздел — окно в сетке из двух колонок. Красная точка в шапке окна сворачивает его, зелёная раскрывает на весь экран (закрыть — Esc или клик по фону). Старые ссылки вида `#watchlist` прокручивают к нужному окну.

## Что внутри
- **[links]** — контакты и соцсети (Telegram, Letterboxd, Serializd, Email, YouTube, Boosty).
- **[server]** — статус приватного Minecraft-сервера и заявка на вайтлист.
- **[proj]** — моды и проекты с Modrinth со счётчиком загрузок.
- **[se's pack]** — модпак со ссылкой на Modrinth, конвертером `.mrpack → .zip` для ручной установки и лениво загружаемым changelog версий.
- **[page info]** — дата последнего обновления сайта и последний коммит (GitHub API, репозиторий в `CONFIG.githubRepo`).
- **[recently watched]** — последние фильмы из дневника Letterboxd с постером, оценкой и датой (RSS через тот же worker).
- **[shoutbox]** — короткие сообщения посетителей. Бэкенд — Cloudflare Worker `worker/shoutbox.js` (D1 + Turnstile), адрес и ключ капчи в `CONFIG.shoutboxApi` / `CONFIG.turnstileSiteKey`. Деплой: `cd worker && npx wrangler d1 create shoutbox` (id вписать в `shoutbox.toml`), `npx wrangler d1 execute shoutbox --remote --file schema.sql -c shoutbox.toml`, `npx wrangler secret put TURNSTILE_SECRET -c shoutbox.toml`, `npx wrangler secret put ADMIN_TOKEN -c shoutbox.toml`, `npx wrangler deploy -c shoutbox.toml`. Удаление сообщения: `curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" <worker>/<id>`.
- **[watchlist match]** — общие фильмы из watchlist двух пользователей Letterboxd: постер, страна, рейтинг, сюжет и кнопка PICK ANOTHER FILM. Страницы Letterboxd грузятся через Cloudflare Worker из папки `worker/` (адрес в `CONFIG.letterboxdProxy`, деплой: `cd worker && npx wrangler deploy`, проверка разметки Letterboxd: `sh worker/check.sh`).

## Как настроить
Все ссылки, никнеймы и адрес сервера меняются в начале файла `app.js` в блоке `CONFIG`.
