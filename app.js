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
    minecraftServerIP: "play.margoles.xyz",

    // Ссылка на Telegram для подачи заявки на вайтлист
    whitelistTelegramUrl: "https://t.me/zqape",

    // Username пользователя на Modrinth для экрана [proj]
    // Сюда впишите ваш логин на Modrinth (например: 'jellysquid3' или 'Iris-Dimension')
    modrinthUsername: "touchfalls",

    // Отдельная страница модпака и источник его версий/changelog
    modrinthPackSlug: "ses-pack",
    modrinthPackUrl: "https://modrinth.com/modpack/ses-pack",
    mrpackConverterUrl: "https://mctoolbox.net/mrpack-to-zip",

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
const VALID_VIEWS = ["home", "links", "server", "proj", "ses-pack"];

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
    if (viewName === "proj" || viewName === "ses-pack") {
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

    const packLinkEl = document.getElementById("pack-modrinth-link");
    if (packLinkEl) packLinkEl.href = CONFIG.modrinthPackUrl;

    const converterLinkEl = document.getElementById("pack-converter-link");
    if (converterLinkEl) converterLinkEl.href = CONFIG.mrpackConverterUrl;

    // 3. Генерация плашек на экране [links]
    renderLinksList();

    // 4. Привязка обработчиков клика для навигации
    setupNavigationListeners();

    // Changelog запрашивается только после явного нажатия на кнопку
    setupPackChangelog();

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

/**
 * ============================================================================
 * 7. ЭКРАН [se's pack]: ЛЕНИВАЯ ЗАГРУЗКА CHANGELOG С MODRINTH
 * ============================================================================
 */
let isPackChangelogLoaded = false;
let isPackChangelogLoading = false;

function setupPackChangelog() {
    const toggle = document.getElementById("pack-changelog-toggle");
    const panel = document.getElementById("pack-changelog-panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
        const shouldOpen = panel.hidden;
        panel.hidden = !shouldOpen;
        toggle.setAttribute("aria-expanded", String(shouldOpen));
        toggle.textContent = shouldOpen ? "[ hide changelog ]" : "[ show changelog ]";

        if (shouldOpen && !isPackChangelogLoaded && !isPackChangelogLoading) {
            fetchPackChangelog();
        }
    });
}

async function fetchPackChangelog() {
    const panel = document.getElementById("pack-changelog-panel");
    if (!panel) return;

    panel.innerHTML = `<div class="state-indicator">[loading changelog...]</div>`;
    isPackChangelogLoading = true;

    try {
        const endpoint = `https://api.modrinth.com/v2/project/${encodeURIComponent(CONFIG.modrinthPackSlug)}/version?include_changelog=true`;
        const response = await fetch(endpoint);

        if (response.status === 404) {
            renderPendingPackMessage(panel);
            return;
        }

        if (!response.ok) {
            throw new Error(`Modrinth API responded with status ${response.status}`);
        }

        const versions = await response.json();
        renderPackVersions(panel, versions);
        isPackChangelogLoaded = true;
    } catch (error) {
        console.error("Modrinth Pack Changelog API error:", error);
        panel.innerHTML = "";

        const errorBox = document.createElement("div");
        errorBox.className = "changelog-empty state-error";
        errorBox.textContent = "[error loading changelog — try again]";
        panel.appendChild(errorBox);
    } finally {
        isPackChangelogLoading = false;
    }
}

function renderPendingPackMessage(panel) {
    panel.innerHTML = "";

    const message = document.createElement("div");
    message.className = "changelog-empty";

    const title = document.createElement("strong");
    title.textContent = "[changelog is not public yet]";

    const description = document.createElement("p");
    description.textContent = "Modrinth will make it available here automatically after the project is approved and its versions are public.";

    message.append(title, description);
    panel.appendChild(message);
}

function renderPackVersions(panel, versions) {
    panel.innerHTML = "";

    if (!Array.isArray(versions) || versions.length === 0) {
        const empty = document.createElement("div");
        empty.className = "changelog-empty";
        empty.textContent = "[no public versions yet]";
        panel.appendChild(empty);
        return;
    }

    const sortedVersions = [...versions].sort((a, b) => {
        return new Date(b.date_published || 0) - new Date(a.date_published || 0);
    });

    sortedVersions.forEach(version => {
        panel.appendChild(createVersionChangelog(version));
    });
}

function createVersionChangelog(version) {
    const article = document.createElement("article");
    article.className = "changelog-version";

    const header = document.createElement("div");
    header.className = "changelog-version-header";

    const headingGroup = document.createElement("div");
    headingGroup.className = "changelog-heading-group";

    const heading = document.createElement("h3");
    heading.className = "changelog-version-title";
    heading.textContent = version.name || version.version_number || "Untitled version";

    const number = document.createElement("span");
    number.className = "changelog-version-number";
    number.textContent = version.version_number || "";

    const badge = document.createElement("span");
    const versionType = version.version_type || "release";
    badge.className = `version-type version-type-${versionType}`;
    badge.textContent = versionType;

    headingGroup.append(heading);
    if (version.version_number && version.version_number !== version.name) {
        headingGroup.append(number);
    }
    header.append(headingGroup, badge);

    const meta = document.createElement("div");
    meta.className = "changelog-meta";

    if (version.date_published) {
        const date = document.createElement("span");
        date.textContent = formatModrinthDate(version.date_published);
        meta.appendChild(date);
    }

    const compatibility = [...(version.game_versions || []), ...(version.loaders || [])];
    compatibility.forEach(item => {
        const tag = document.createElement("span");
        tag.className = "changelog-tag";
        tag.textContent = item;
        meta.appendChild(tag);
    });

    const body = document.createElement("div");
    body.className = "changelog-body";
    body.appendChild(renderSafeMarkdown(version.changelog));

    article.append(header, meta, body);
    return article;
}

function formatModrinthDate(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(date);
}

/**
 * Небольшой безопасный Markdown-рендерер для текста changelog.
 * Поддерживает заголовки, списки, цитаты, блоки кода, ссылки и выделение,
 * при этом никогда не вставляет HTML из ответа API напрямую.
 */
function renderSafeMarkdown(markdown) {
    const fragment = document.createDocumentFragment();
    const lines = String(markdown || "").replace(/\r\n?/g, "\n").split("\n");
    let paragraphLines = [];
    let currentList = null;
    let codeBlock = null;

    const flushParagraph = () => {
        if (paragraphLines.length === 0) return;
        const paragraph = document.createElement("p");
        appendInlineMarkdown(paragraph, paragraphLines.join(" "));
        fragment.appendChild(paragraph);
        paragraphLines = [];
    };

    const closeList = () => {
        currentList = null;
    };

    lines.forEach(line => {
        const fenceMatch = line.match(/^```\s*([\w+-]*)\s*$/);
        if (fenceMatch) {
            flushParagraph();
            closeList();

            if (codeBlock) {
                fragment.appendChild(codeBlock);
                codeBlock = null;
            } else {
                const pre = document.createElement("pre");
                codeBlock = pre;
                if (fenceMatch[1]) pre.dataset.language = fenceMatch[1];
            }
            return;
        }

        if (codeBlock) {
            codeBlock.textContent += `${codeBlock.textContent ? "\n" : ""}${line}`;
            return;
        }

        if (!line.trim()) {
            flushParagraph();
            closeList();
            return;
        }

        const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
        if (headingMatch) {
            flushParagraph();
            closeList();
            const headingLevel = Math.min(headingMatch[1].length + 2, 6);
            const heading = document.createElement(`h${headingLevel}`);
            appendInlineMarkdown(heading, headingMatch[2]);
            fragment.appendChild(heading);
            return;
        }

        if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
            flushParagraph();
            closeList();
            fragment.appendChild(document.createElement("hr"));
            return;
        }

        const listMatch = line.match(/^\s*(?:([-+*])|(\d+)\.)\s+(.+)$/);
        if (listMatch) {
            flushParagraph();
            const listType = listMatch[2] ? "ol" : "ul";

            if (!currentList || currentList.tagName.toLowerCase() !== listType) {
                currentList = document.createElement(listType);
                fragment.appendChild(currentList);
            }

            const item = document.createElement("li");
            appendInlineMarkdown(item, listMatch[3]);
            currentList.appendChild(item);
            return;
        }

        const quoteMatch = line.match(/^>\s?(.*)$/);
        if (quoteMatch) {
            flushParagraph();
            closeList();
            const quote = document.createElement("blockquote");
            appendInlineMarkdown(quote, quoteMatch[1]);
            fragment.appendChild(quote);
            return;
        }

        closeList();
        paragraphLines.push(line.trim());
    });

    flushParagraph();
    if (codeBlock) fragment.appendChild(codeBlock);

    if (!fragment.hasChildNodes()) {
        const empty = document.createElement("p");
        empty.className = "changelog-no-notes";
        empty.textContent = "No changelog was provided for this version.";
        fragment.appendChild(empty);
    }

    return fragment;
}

function appendInlineMarkdown(parent, text) {
    const tokenPattern = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_)/g;
    let lastIndex = 0;
    let match;

    while ((match = tokenPattern.exec(text)) !== null) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        let element;

        if (match[2] && match[3]) {
            element = document.createElement("a");
            element.href = match[3];
            element.target = "_blank";
            element.rel = "noopener noreferrer";
            element.textContent = match[2];
        } else if (match[4]) {
            element = document.createElement("code");
            element.textContent = match[4];
        } else if (match[5] || match[6]) {
            element = document.createElement("strong");
            element.textContent = match[5] || match[6];
        } else {
            element = document.createElement("em");
            element.textContent = match[7] || match[8];
        }

        parent.appendChild(element);
        lastIndex = tokenPattern.lastIndex;
    }

    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
}
