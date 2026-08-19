/**
 * ============================================================================
 * 1. КОНФИГУРАЦИЯ ПОЛЬЗОВАТЕЛЯ (USER CONFIG)
 * ============================================================================
 * Все переменные сайта вынесены сюда.
 * Вы можете настраивать сайт без необходимости править логику ниже.
 */
const CONFIG = {
    // Текст/ник на главной странице
    homeTitle: "touchfalls",

    // IP адрес Minecraft-сервера для экрана [server]
    // Сюда впишите ваш реальный адрес сервера (например: 'mc.hypixel.net' или 'play.myserver.ru')
    minecraftServerIP: "mc.hypixel.net",

    // Ссылка на Telegram для подачи заявки на вайтлист
    whitelistTelegramUrl: "https://t.me/zqape",

    // Username пользователя на Modrinth для экрана [proj]
    // Сюда впишите ваш логин на Modrinth (например: 'jellysquid3' или 'Iris-Dimension')
    modrinthUsername: "touchfalls",

    // Список ссылок для экрана [links]
    // КАК ДОБАВЛЯТЬ ИКОНКИ ПО ПУТИ К ФАЙЛУ:
    // Вы можете указать:
    // 1) Относительный путь к файлу: icon: "./icons/telegram.svg" или icon: "./my_photo.png"
    // 2) Встроенный SVG-код: icon: `<svg ...>...</svg>`
    // 3) Эмодзи или текст: icon: "🔐"
    socials: [
        {
            name: "Telegram",
            sub: "telegram.org",
            url: "https://t.me/zqape",
            brandColor: "#24A1DE", // Фирменный лазурный цвет Telegram
            icon: `<svg viewBox="0 0 24 24"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>`
        },
        {
            name: "Letterboxd",
            sub: "letterboxd.com",
            url: "https://letterboxd.com/touchfalls",
            brandColor: "#00E054", // Фирменный зеленый
            brandGradient: "linear-gradient(90deg, #FF8000 0%, #00E054 50%, #40BCF4 100%)", // 3-цветный градиент Letterboxd
            icon: `<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="4.2" fill="#FF8000"/><circle cx="12" cy="12" r="4.2" fill="#00E054"/><circle cx="18.5" cy="12" r="4.2" fill="#40BCF4"/></svg>`
        },
        {
            name: "Serializd",
            sub: "serializd.com",
            url: "https://www.serializd.com/user/touchfalls",
            brandColor: "#00D2FF", // Фирменный электрический циан/синий Serializd
            icon: `<svg viewBox="0 0 24 24"><path d="M21 6h-7.586l2.293-2.293a1 1 0 0 0-1.414-1.414L11.586 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 13H3V7h18v12z"/><rect x="5" y="9" width="10" height="8" rx="1"/></svg>`
        },
        {
            name: "Direct Messages / Email",
            sub: "mail / contact",
            url: "mailto:touchfalls@gmail.com",
            brandColor: "#EA4335", // Фирменный красный цвет Gmail
            icon: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
        },
        {
            name: "YT Channel",
            sub: "youtube.com",
            url: "https://www.youtube.com/@loaicee",
            brandColor: "#FF0000", // Фирменный красный YouTube
            icon: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        },
        {
            name: "Boosty",
            sub: "boosty.to",
            url: "https://boosty.to/touchfalls",
            brandColor: "#F15F2C", // Фирменный оранжевый Boosty
            icon: `<svg viewBox="0 0 24 24"><path d="M4 13.8L12.9 2 10.6 10.2h8.4L9.1 22l2.3-8.2H4z"/></svg>`
        }
    ]
};

/**
 * ============================================================================
 * 2. SPA-РОУТИНГ (HASH-ROUTING & BUTTON EVENTS)
 * ============================================================================
 */

// Список доступных экранов
const VALID_VIEWS = ["home", "links", "server", "proj"];

// Переключение экранов
function navigateTo(targetView) {
    if (!VALID_VIEWS.includes(targetView)) {
        targetView = "home";
    }

    // Обновляем хэш в URL
    if (window.location.hash !== `#${targetView}`) {
        window.location.hash = targetView;
    }

    renderView(targetView);
}

function renderView(viewName) {
    const mainCard = document.getElementById("main-card");
    const allViews = document.querySelectorAll(".view");

    // Удаляем активный класс со всех секций
    allViews.forEach(view => view.classList.remove("active"));

    // Активируем нужный экран
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Расширяем карточку для экрана проектов для удобного отображения
    if (viewName === "proj") {
        mainCard.classList.add("wide-card");
    } else {
        mainCard.classList.remove("wide-card");
    }

    // Запуск специфической логики при открытии экранов
    if (viewName === "server") {
        fetchMinecraftStatus();
    } else if (viewName === "proj") {
        fetchModrinthProjects();
    }
}

// Обработчик изменения хэша (кнопки браузера «вперед/назад» или переход по ссылке)
function handleHashChange() {
    const hash = window.location.hash.replace("#", "") || "home";
    renderView(hash);
}

/**
 * ============================================================================
 * 3. ИНИЦИАЛИЗАЦИЯ И РЕНДЕРИНГ ЭЛЕМЕНТОВ
 * ============================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Установка заголовка на главной
    const titleEl = document.getElementById("home-title");
    if (titleEl) titleEl.textContent = CONFIG.homeTitle;

    // 2. Установка хоста сервера и ссылки на вайтлист
    const hostEl = document.getElementById("mc-host-display");
    if (hostEl) hostEl.textContent = CONFIG.minecraftServerIP;

    const whitelistEl = document.getElementById("whitelist-tg-link");
    if (whitelistEl) whitelistEl.href = CONFIG.whitelistTelegramUrl;

    // 3. Генерация плашек на экране [links]
    renderLinksList();

    // 4. Привязка обработчиков клика для навигации
    setupNavigationListeners();

    // 5. Обработка начального маршрута
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
});

// Навешивание событий на кнопки [links], [server], [proj] и [ ← back ]
function setupNavigationListeners() {
    document.querySelectorAll("[data-target]").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const target = button.getAttribute("data-target");
            navigateTo(target);
        });
    });
}

/**
 * Функция-помощник: распознает тип иконки (SVG, путь к файлу картинки или эмодзи)
 */
function resolveIconHtml(icon) {
    if (!icon) return "";
    const str = icon.trim();

    // 1. Если это инлайн SVG или HTML-тег
    if (str.startsWith("<svg") || str.startsWith("<img") || str.startsWith("<span")) {
        return str;
    }

    // 2. Если это путь к файлу (например, "./icons/telegram.svg" или "images/yt.png")
    if (str.includes("/") || str.endsWith(".svg") || str.endsWith(".png") || str.endsWith(".jpg") || str.endsWith(".webp") || str.endsWith(".ico")) {
        return `<img src="${str}" alt="icon" class="link-custom-icon-img" loading="lazy" />`;
    }

    // 3. Если это эмодзи или текст
    return `<span class="link-custom-icon-text">${str}</span>`;
}

/**
 * ============================================================================
 * 4. ЭКРАН [links]: ГЕНЕРАЦИЯ СПИСКА ССЫЛОК
 * ============================================================================
 */
function renderLinksList() {
    const container = document.getElementById("links-container");
    if (!container) return;

    container.innerHTML = "";

    CONFIG.socials.forEach(social => {
        const linkCard = document.createElement("a");
        linkCard.href = social.url;
        linkCard.className = "link-card";
        linkCard.target = "_blank";
        linkCard.rel = "noopener noreferrer";

        // Задаем CSS-переменную для фирменного цвета ховера
        linkCard.style.setProperty("--brand-color", social.brandColor);

        // Если задан градиент (как у Letterboxd)
        if (social.brandGradient) {
            linkCard.classList.add("has-gradient");
            linkCard.style.setProperty("--brand-gradient", social.brandGradient);
        }

        const iconHtml = resolveIconHtml(social.icon || social.iconSvg);

        linkCard.innerHTML = `
            <div class="link-main">
                <div class="link-icon-wrap">${iconHtml}</div>
                <span class="link-title">${social.name}</span>
            </div>
            <span class="link-sub">${social.sub}</span>
        `;

        container.appendChild(linkCard);
    });
}

/**
 * ============================================================================
 * 5. ЭКРАН [server]: ПРОВЕРКА СТАТУСА MINECRAFT СЕРВЕРА (ЧЕРЕЗ MC-STATUS API)
 * ============================================================================
 */
let isCheckingServer = false;

async function fetchMinecraftStatus() {
    if (isCheckingServer) return;

    const statusBadge = document.getElementById("mc-status");
    if (!statusBadge) return;

    statusBadge.textContent = "[checking...]";
    statusBadge.className = "status-badge status-checking";
    isCheckingServer = true;

    try {
        const serverIp = (CONFIG.minecraftServerIP || "").trim();
        if (!serverIp) {
            statusBadge.textContent = "[offline]";
            statusBadge.className = "status-badge status-offline";
            isCheckingServer = false;
            return;
        }

        // 1. Проверка через mcstatus.io (Java Edition)
        let response = await fetch(`https://api.mcstatus.io/v2/status/java/${encodeURIComponent(serverIp)}`);
        let data = null;

        if (response.ok) {
            data = await response.json();
        }

        // 2. Если Java оффлайн, пробуем Bedrock Edition на mcstatus.io
        if (!data || !data.online) {
            try {
                const bedrockRes = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${encodeURIComponent(serverIp)}`);
                if (bedrockRes.ok) {
                    const bedrockData = await bedrockRes.json();
                    if (bedrockData && bedrockData.online) {
                        data = bedrockData;
                    }
                }
            } catch (_) {
                // Игнорируем ошибку bedrock запроса
            }
        }

        // 3. Отображение актуального статуса
        if (data && data.online) {
            const onlineCount = data.players?.online ?? 0;
            const maxCount = data.players?.max ?? 0;

            if (maxCount > 0) {
                statusBadge.textContent = `[online] (${onlineCount}/${maxCount})`;
            } else {
                statusBadge.textContent = `[online]`;
            }
            statusBadge.className = "status-badge status-online";
        } else {
            statusBadge.textContent = "[offline]";
            statusBadge.className = "status-badge status-offline";
        }
    } catch (error) {
        console.error("mcstatus.io API error:", error);
        statusBadge.textContent = "[offline]";
        statusBadge.className = "status-badge status-offline";
    } finally {
        isCheckingServer = false;
    }
}

/**
 * ============================================================================
 * 6. ЭКРАН [proj]: ПОДГРУЗКА ПРОЕКТОВ MODRINTH (API)
 * ============================================================================
 */
let isModrinthProjectsLoaded = false;

async function fetchModrinthProjects() {
    if (isModrinthProjectsLoaded) return;

    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = `<div class="state-indicator" id="projects-loading">[loading projects...]</div>`;

    try {
        // Запрос к Modrinth API v2
        const response = await fetch(`https://api.modrinth.com/v2/user/${encodeURIComponent(CONFIG.modrinthUsername)}/projects`);

        if (!response.ok) {
            throw new Error(`Modrinth API responded with status ${response.status}`);
        }

        const projects = await response.json();
        container.innerHTML = "";

        if (!projects || projects.length === 0) {
            container.innerHTML = `<div class="state-indicator">[no projects found for "${CONFIG.modrinthUsername}"]</div>`;
            return;
        }

        projects.forEach(project => {
            const projectCard = document.createElement("a");
            projectCard.href = `https://modrinth.com/project/${encodeURIComponent(project.slug || project.id)}`;
            projectCard.className = "project-item";
            projectCard.target = "_blank";
            projectCard.rel = "noopener noreferrer";

            // Иконка проекта или fallback с первой буквой
            const iconContent = project.icon_url
                ? `<img src="${project.icon_url}" alt="${project.title} icon" loading="lazy" />`
                : `<span class="project-fallback-icon">${(project.title || "P").charAt(0).toUpperCase()}</span>`;

            // Форматирование количества скачиваний
            const downloadsFormatted = formatDownloadsCount(project.downloads || 0);

            projectCard.innerHTML = `
                <div class="project-icon">
                    ${iconContent}
                </div>
                <div class="project-body">
                    <div class="project-head">
                        <span class="project-name">${project.title || project.slug}</span>
                        <span class="project-downloads">
                            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                            ${downloadsFormatted}
                        </span>
                    </div>
                    <p class="project-summary">${project.description || "No description provided."}</p>
                </div>
            `;

            container.appendChild(projectCard);
        });

        isModrinthProjectsLoaded = true;
    } catch (error) {
        console.error("Modrinth Projects API error:", error);
        container.innerHTML = `<div class="state-indicator state-error">[error loading projects from modrinth]</div>`;
    }
}

/**
 * Утилита форматирования больших чисел скачиваний (например, 14500 -> 14.5k)
 */
function formatDownloadsCount(count) {
    if (typeof count !== "number") return count;
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count.toLocaleString();
}
