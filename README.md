# touchfalls

Личный сайт-визитка со ссылками, мониторингом сервера и проектами.

## Что внутри
- **[links]** — контакты и соцсети (Telegram, Letterboxd, Serializd, Email, YouTube, Boosty).
- **[server]** — статус приватного Minecraft-сервера и заявка на вайтлист.
- **[proj]** — моды и проекты с Modrinth со счётчиком загрузок.
- **[se's pack]** — страница модпака со ссылкой на Modrinth, конвертером `.mrpack → .zip` для ручной установки и лениво загружаемым changelog версий.
- **[watchlist match]** — общие фильмы из watchlist двух пользователей Letterboxd: постер, страна, рейтинг, сюжет и кнопка PICK ANOTHER FILM. Страницы Letterboxd грузятся через Cloudflare Worker из папки `worker/` (адрес в `CONFIG.letterboxdProxy`, деплой: `cd worker && npx wrangler deploy`).

## Как настроить
Все ссылки, никнеймы и адрес сервера меняются в начале файла `app.js` в блоке `CONFIG`.
