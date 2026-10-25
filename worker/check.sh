#!/bin/sh
# Проверка, что worker отвечает и разметка Letterboxd не поменялась:
# сайт ищет фильмы по data-item-slug, а рейтинг/страну/постер — в ld+json.
# Запуск: sh worker/check.sh [адрес worker]
W="${1:-https://letterboxd-proxy.margoles.workers.dev}"
fail=0

check() {
    if curl -sf "$W$1" | grep -q "$2"; then echo "ok   $1 has $2"; else echo "FAIL $1 has no $2"; fail=1; fi
}

check /touchfalls/watchlist/ 'data-item-slug'
check /touchfalls/watchlist/ 'paginate-page'
check /film/the-mist/ 'application/ld+json'
check /film/the-mist/ 'og:description'
check /film/the-mist/ 'releasedate'

code=$(curl -s -o /dev/null -w '%{http_code}' "$W/nonexistentuserxyz123/watchlist/")
if [ "$code" = 404 ]; then echo "ok   unknown user -> 404"; else echo "FAIL unknown user -> $code"; fail=1; fi

exit $fail
