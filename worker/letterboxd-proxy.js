/**
 * Cloudflare Worker: CORS-прокси для экрана [watchlist match].
 * Пропускает только GET публичных страниц watchlist, RSS дневника и фильмов Letterboxd,
 * чтобы не быть открытым прокси для чего угодно.
 * Запрос: https://<worker>/<ник>/watchlist/page/2/  ->  https://letterboxd.com/<ник>/watchlist/page/2/
 */
const ALLOWED_PATH = /^\/(?:[a-z0-9_]+\/(?:watchlist\/(?:page\/\d+\/)?|rss\/)|film\/[a-z0-9-]+\/)$/i;

export default {
    async fetch(request) {
        const cors = { "Access-Control-Allow-Origin": "*" };
        const { pathname } = new URL(request.url);

        if (request.method !== "GET" || !ALLOWED_PATH.test(pathname)) {
            return new Response("not allowed", { status: 400, headers: cors });
        }

        const response = await fetch(`https://letterboxd.com${pathname}`, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; watchlist-match)" },
            // Кэш на краю Cloudflare: watchlist и дневник меняются часто — 5 минут, страницы фильмов — час
            cf: { cacheTtl: pathname.startsWith("/film/") ? 3600 : 300, cacheEverything: true }
        });

        return new Response(response.body, {
            status: response.status,
            headers: { ...cors, "Content-Type": "text/html; charset=utf-8" }
        });
    }
};
