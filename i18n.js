/** Локализация главной страницы: язык берётся из настроек браузера (ru / en / it / fr), по умолчанию en. */
const I18N = {
    en: {
        server: "server", srvDesc: "private minecraft server for friends and friends of their friends", status: "status",
        srvInfo: "server info / apply", wlTg: "apply for whitelist via telegram ↗",
        shoutbox: "shoutbox", send: "send", nick: "nick", message: "message",
        letterbox: "letterbox", lbDesc: "anonymous private message, goes straight to my telegram and is not shown here", lbPh: "say something :3",
        wlTitle: "letterboxd watchlist match", wlUser1: "letterboxd username #1", wlUser2: "letterboxd username #2", wlFind: "find matches",
        recent: "recently watched", loadingDiary: "[loading diary...]", projects: "modrinth projects", loadingProjects: "[loading projects...]",
        converterSub: "for manual installation into the Minecraft folder", open: "open ↗", showCl: "show changelog", hideCl: "hide changelog",
        loadingCl: "[loading changelog...]", pageInfo: "page info", loading: "[loading...]", theme: "theme",
        checking: "[checking...]", offline: "[offline]", online: "[online]", hidden: "player names are hidden by the server", none: "nobody online right now",
        noProjects: '[no projects found for "{u}"]', noDesc: "No description provided.", projErr: "[error loading projects from modrinth]",
        clErr: "[error loading changelog — try again]", clPrivate: "[changelog is not public yet]",
        clPrivateDesc: "Modrinth will make it available here automatically after the project is approved and its versions are public.",
        noVersions: "[no public versions yet]", untitled: "Untitled version", noClText: "No changelog was provided for this version.",
        badUser: "[usernames can contain only letters, digits and _]", loadingWl: "[loading watchlists...{p}{w}]", pages: " {l}/{t} pages",
        rateLimit: " — proxy rate limit, waiting...", userNotFound: '[letterboxd user "{u}" not found]', wlEmpty: '[watchlist of "{u}" is empty or private]',
        noCommon: "[no common films — {a} vs {b} in watchlists]", wlErr: "[error loading watchlists from letterboxd — try again]",
        loadingFilm: '[loading "{n}"...]', unknownCountry: "unknown country", noSynopsis: "No synopsis on Letterboxd.", matchOf: "match {i} of {n}",
        pick: "PICK ANOTHER FILM", diaryEmpty: "[diary is empty]", diaryErr: "[error loading diary from letterboxd]",
        updated: "updated", commit: "commit", source: "source", visitors: "visitors", views: "views", visitorsVal: "{a} today · {b} total",
        count: "nick {a}/{b} · message {c}/{d}", unavailable: "[unavailable]", captcha: "pass the captcha first", failed: "failed", sentOk: "sent ✓"
    },
    ru: {
        server: "сервер", srvDesc: "приватный майнкрафт-сервер для друзей и друзей их друзей", status: "статус",
        srvInfo: "о сервере / заявка", wlTg: "заявка в вайтлист через телеграм ↗",
        shoutbox: "шутбокс", send: "отправить", nick: "ник", message: "сообщение",
        letterbox: "письмо", lbDesc: "анонимное личное сообщение, уходит прямо мне в телеграм и здесь не показывается", lbPh: "напиши что-нибудь :3",
        wlTitle: "совпадения вотчлистов letterboxd", wlUser1: "ник на letterboxd #1", wlUser2: "ник на letterboxd #2", wlFind: "найти совпадения",
        recent: "недавно просмотрено", loadingDiary: "[загрузка дневника...]", projects: "проекты на modrinth", loadingProjects: "[загрузка проектов...]",
        converterSub: "для ручной установки в папку Minecraft", open: "открыть ↗", showCl: "показать changelog", hideCl: "скрыть changelog",
        loadingCl: "[загрузка changelog...]", pageInfo: "о странице", loading: "[загрузка...]", theme: "тема",
        checking: "[проверка...]", offline: "[оффлайн]", online: "[онлайн]", hidden: "сервер скрывает ники игроков", none: "сейчас никого нет онлайн",
        noProjects: '[проекты для "{u}" не найдены]', noDesc: "Описание не указано.", projErr: "[ошибка загрузки проектов с modrinth]",
        clErr: "[ошибка загрузки changelog — попробуй ещё раз]", clPrivate: "[changelog пока не опубликован]",
        clPrivateDesc: "Modrinth покажет его здесь автоматически, когда проект будет одобрен, а версии станут публичными.",
        noVersions: "[публичных версий пока нет]", untitled: "Версия без названия", noClText: "Для этой версии changelog не указан.",
        badUser: "[ник может содержать только буквы, цифры и _]", loadingWl: "[загрузка вотчлистов...{p}{w}]", pages: " {l}/{t} стр.",
        rateLimit: " — лимит прокси, жду...", userNotFound: '[пользователь letterboxd "{u}" не найден]', wlEmpty: '[вотчлист "{u}" пуст или закрыт]',
        noCommon: "[общих фильмов нет — {a} и {b} в вотчлистах]", wlErr: "[ошибка загрузки вотчлистов с letterboxd — попробуй ещё раз]",
        loadingFilm: '[загрузка "{n}"...]', unknownCountry: "страна неизвестна", noSynopsis: "На Letterboxd нет описания.", matchOf: "совпадение {i} из {n}",
        pick: "ДРУГОЙ ФИЛЬМ", diaryEmpty: "[дневник пуст]", diaryErr: "[ошибка загрузки дневника с letterboxd]",
        updated: "обновлено", commit: "коммит", source: "исходники", visitors: "посетители", views: "просмотры", visitorsVal: "{a} сегодня · {b} всего",
        count: "ник {a}/{b} · сообщение {c}/{d}", unavailable: "[недоступно]", captcha: "сначала пройди капчу", failed: "ошибка", sentOk: "отправлено ✓"
    },
    it: {
        server: "server", srvDesc: "server minecraft privato per amici e amici dei loro amici", status: "stato",
        srvInfo: "info server / candidatura", wlTg: "candidati alla whitelist via telegram ↗",
        shoutbox: "shoutbox", send: "invia", nick: "nick", message: "messaggio",
        letterbox: "lettera", lbDesc: "messaggio privato anonimo, arriva direttamente sul mio telegram e non viene mostrato qui", lbPh: "scrivi qualcosa :3",
        wlTitle: "match watchlist letterboxd", wlUser1: "username letterboxd #1", wlUser2: "username letterboxd #2", wlFind: "trova i match",
        recent: "visti di recente", loadingDiary: "[caricamento diario...]", projects: "progetti modrinth", loadingProjects: "[caricamento progetti...]",
        converterSub: "per l'installazione manuale nella cartella di Minecraft", open: "apri ↗", showCl: "mostra changelog", hideCl: "nascondi changelog",
        loadingCl: "[caricamento changelog...]", pageInfo: "info pagina", loading: "[caricamento...]", theme: "tema",
        checking: "[controllo...]", offline: "[offline]", online: "[online]", hidden: "il server nasconde i nomi dei giocatori", none: "nessuno online al momento",
        noProjects: '[nessun progetto trovato per "{u}"]', noDesc: "Nessuna descrizione.", projErr: "[errore nel caricamento dei progetti da modrinth]",
        clErr: "[errore nel caricamento del changelog — riprova]", clPrivate: "[il changelog non è ancora pubblico]",
        clPrivateDesc: "Modrinth lo renderà disponibile qui automaticamente quando il progetto sarà approvato e le versioni pubbliche.",
        noVersions: "[ancora nessuna versione pubblica]", untitled: "Versione senza nome", noClText: "Nessun changelog fornito per questa versione.",
        badUser: "[gli username possono contenere solo lettere, cifre e _]", loadingWl: "[caricamento watchlist...{p}{w}]", pages: " {l}/{t} pagine",
        rateLimit: " — limite del proxy, attendo...", userNotFound: '[utente letterboxd "{u}" non trovato]', wlEmpty: '[la watchlist di "{u}" è vuota o privata]',
        noCommon: "[nessun film in comune — {a} contro {b} nelle watchlist]", wlErr: "[errore nel caricamento delle watchlist da letterboxd — riprova]",
        loadingFilm: '[caricamento "{n}"...]', unknownCountry: "paese sconosciuto", noSynopsis: "Nessuna sinossi su Letterboxd.", matchOf: "match {i} di {n}",
        pick: "SCEGLI UN ALTRO FILM", diaryEmpty: "[il diario è vuoto]", diaryErr: "[errore nel caricamento del diario da letterboxd]",
        updated: "aggiornato", commit: "commit", source: "sorgente", visitors: "visitatori", views: "visualizzazioni", visitorsVal: "{a} oggi · {b} in totale",
        count: "nick {a}/{b} · messaggio {c}/{d}", unavailable: "[non disponibile]", captcha: "prima risolvi il captcha", failed: "errore", sentOk: "inviato ✓"
    },
    fr: {
        server: "serveur", srvDesc: "serveur minecraft privé pour les amis et les amis de leurs amis", status: "statut",
        srvInfo: "infos serveur / candidature", wlTg: "demander la whitelist via telegram ↗",
        shoutbox: "shoutbox", send: "envoyer", nick: "pseudo", message: "message",
        letterbox: "lettre", lbDesc: "message privé anonyme, arrive directement sur mon telegram et n'est pas affiché ici", lbPh: "écris quelque chose :3",
        wlTitle: "match de watchlist letterboxd", wlUser1: "pseudo letterboxd #1", wlUser2: "pseudo letterboxd #2", wlFind: "trouver les matchs",
        recent: "vus récemment", loadingDiary: "[chargement du journal...]", projects: "projets modrinth", loadingProjects: "[chargement des projets...]",
        converterSub: "pour l'installation manuelle dans le dossier Minecraft", open: "ouvrir ↗", showCl: "afficher le changelog", hideCl: "masquer le changelog",
        loadingCl: "[chargement du changelog...]", pageInfo: "infos de la page", loading: "[chargement...]", theme: "thème",
        checking: "[vérification...]", offline: "[hors ligne]", online: "[en ligne]", hidden: "le serveur masque les pseudos des joueurs", none: "personne en ligne pour le moment",
        noProjects: '[aucun projet trouvé pour "{u}"]', noDesc: "Aucune description.", projErr: "[erreur de chargement des projets depuis modrinth]",
        clErr: "[erreur de chargement du changelog — réessaie]", clPrivate: "[le changelog n'est pas encore public]",
        clPrivateDesc: "Modrinth l'affichera ici automatiquement une fois le projet approuvé et ses versions publiques.",
        noVersions: "[aucune version publique pour l'instant]", untitled: "Version sans titre", noClText: "Aucun changelog fourni pour cette version.",
        badUser: "[les pseudos ne peuvent contenir que des lettres, chiffres et _]", loadingWl: "[chargement des watchlists...{p}{w}]", pages: " {l}/{t} pages",
        rateLimit: " — limite du proxy, patience...", userNotFound: '[utilisateur letterboxd "{u}" introuvable]', wlEmpty: '[la watchlist de "{u}" est vide ou privée]',
        noCommon: "[aucun film en commun — {a} contre {b} dans les watchlists]", wlErr: "[erreur de chargement des watchlists depuis letterboxd — réessaie]",
        loadingFilm: '[chargement de "{n}"...]', unknownCountry: "pays inconnu", noSynopsis: "Pas de synopsis sur Letterboxd.", matchOf: "match {i} sur {n}",
        pick: "CHOISIR UN AUTRE FILM", diaryEmpty: "[le journal est vide]", diaryErr: "[erreur de chargement du journal depuis letterboxd]",
        updated: "mis à jour", commit: "commit", source: "source", visitors: "visiteurs", views: "vues", visitorsVal: "{a} aujourd'hui · {b} au total",
        count: "pseudo {a}/{b} · message {c}/{d}", unavailable: "[indisponible]", captcha: "résous d'abord le captcha", failed: "échec", sentOk: "envoyé ✓"
    }
};

const LANG = [...(navigator.languages || [navigator.language])]
    .map(l => String(l).slice(0, 2).toLowerCase()).find(l => I18N[l]) || "en";

/** t("key", {a: 1}) — строка на языке посетителя, {a} заменяется значением. */
const t = (key, vars = {}) => (I18N[LANG][key] ?? I18N.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

document.documentElement.lang = LANG;
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle); });
});
