#!/bin/sh
# Проверка, что worker отвечает и разметка Letterboxd не поменялась:
# сайт ищет фильмы по data-item-slug, а рейтинг/страну/постер — в ld+json.
# Запуск: sh worker/check.sh [адрес worker] [адрес shoutbox]
W="${1:-https://letterboxd-proxy.margoles.workers.dev}"
fail=0

check() {
    if curl -sf "$W$1" | grep -q "$2"; then echo "ok   $1 has $2"; else echo "FAIL $1 has no $2"; fail=1; fi
}

check /touchfalls/watchlist/ 'data-item-slug'
check /touchfalls/watchlist/ 'paginate-page'
check /touchfalls/rss/ 'letterboxd:filmTitle'
check /film/the-mist/ 'application/ld+json'
check /film/the-mist/ 'og:description'
check /film/the-mist/ 'releasedate'

code=$(curl -s -o /dev/null -w '%{http_code}' "$W/nonexistentuserxyz123/watchlist/")
if [ "$code" = 404 ]; then echo "ok   unknown user -> 404"; else echo "FAIL unknown user -> $code"; fail=1; fi

# Shoutbox (если передан адрес): GET отдаёт массив, POST без капчи отклоняется
if [ -n "$2" ]; then
    if curl -sf "$2/" | grep -q '^\['; then echo "ok   shoutbox GET -> array"; else echo "FAIL shoutbox GET"; fail=1; fi
    code=$(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'Content-Type: application/json' -d '{"nick":"a","text":"b","token":"x"}' "$2/")
    if [ "$code" -ge 400 ] 2>/dev/null; then echo "ok   shoutbox POST without captcha -> $code"; else echo "FAIL shoutbox POST -> $code"; fail=1; fi
fi

exit $fail
