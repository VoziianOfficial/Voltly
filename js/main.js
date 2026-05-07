"use strict";

/* ==========================================================
   VOLTLY — SHARED REDESIGN LOGIC
   File: /js/main.js

   Handles:
   - config injection
   - page meta
   - lightning logo header/footer
   - navigation + services dropdown
   - mobile menu with inert focus safety
   - service cards
   - FAQ accordion + schema
   - cookie banner
   - form validation
   - reveal animations
   ========================================================== */

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
        return;
    }

    const selectors = {
        companyName: "[data-company-name]",
        companyId: "[data-company-id]",
        phoneLink: "[data-phone-link]",
        phoneText: "[data-phone-text]",
        emailLink: "[data-email-link]",
        emailText: "[data-email-text]",
        addressText: "[data-address-text]",
        footerText: "[data-footer-text]",
        serviceArea: "[data-service-area]",
        disclaimer: "[data-disclaimer]",
        legalNotice: "[data-legal-notice]",
        serviceCards: "[data-service-cards]",
        faqList: "[data-faq-list]",
        faqSchema: "[data-faq-schema]",
        siteHeader: "[data-site-header]",
        siteFooter: "[data-site-footer]",
        policyBanner: "[data-policy-banner]"
    };

    const state = {
        mobileMenuOpen: false,
        lastFocusedElement: null,
        focusableElements: []
    };

    const iconFallbacks = {
        "panel-top": "gauge",
        "plug-zap": "plug-zap",
        "battery-charging": "battery-charging",
        "lightbulb": "lightbulb",
        "cable": "cable",
        "circuit-board": "circuit-board",
        "clipboard-check": "clipboard-check",
        "shield-check": "shield-check",
        "map-pin": "map-pin",
        "phone": "phone",
        "arrow-up-right": "arrow-up-right"
    };

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        renderHeader();
        renderFooter();
        injectConfigValues();
        renderServiceCards();
        renderFaq();
        injectFaqSchema();
        initStickyHeader();
        initDesktopDropdowns();
        initMobileMenu();
        initCookieBanner();
        initFormValidation();
        initRevealAnimations();
        setActiveNavigation();
        initElectricalPointerGlow();
        refreshIcons();
    });

    /* =========================
       BASIC HELPERS
       ========================= */

    function qs(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function qsa(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function escapeHtml(value) {
        return String(value || "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function resolveConfigText(value) {
        return String(value || "")
            .replaceAll("{{companyName}}", config.companyName || "")
            .replaceAll("{{companyId}}", config.companyId || "")
            .replaceAll("{{phone}}", config.phone || "")
            .replaceAll("{{email}}", config.email || "")
            .replaceAll("{{serviceArea}}", config.serviceArea || "")
            .replaceAll(
                "{{addressFull}}",
                config.address && config.address.full ? config.address.full : ""
            );
    }

    function getCurrentFilename() {
        const pathname = window.location.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
        return filename || "index.html";
    }

    function getLucideName(iconName) {
        return iconFallbacks[iconName] || iconName || "zap";
    }

    function createIcon(iconName, className = "") {
        const safeIcon = getLucideName(iconName);
        const classAttr = className ? ` class="${escapeHtml(className)}"` : "";
        return `<i data-lucide="${escapeHtml(safeIcon)}"${classAttr} aria-hidden="true"></i>`;
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function getCurrentServiceId() {
        return document.body.dataset.serviceId || "";
    }

    function getServiceById(serviceId) {
        return config.services.find((service) => service.id === serviceId) || null;
    }

    function getCurrentServiceFromBody() {
        const serviceId = getCurrentServiceId();
        return serviceId ? getServiceById(serviceId) : null;
    }

    function setInert(element, shouldBeInert) {
        if (!element) return;

        if (shouldBeInert) {
            element.setAttribute("inert", "");
        } else {
            element.removeAttribute("inert");
        }
    }

    function getFocusableElements(scope) {
        if (!scope) return [];

        const focusableSelectors = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "textarea:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");

        return qsa(focusableSelectors, scope).filter((element) => {
            const style = window.getComputedStyle(element);
            return style.display !== "none" && style.visibility !== "hidden";
        });
    }

    /* =========================
       PAGE META
       ========================= */

    function applyPageMeta() {
        const filename = getCurrentFilename();
        const meta = config.pageMeta && config.pageMeta[filename];

        if (!meta) {
            console.warn(`Missing pageMeta for ${filename}`);
            return;
        }

        if (meta.title) {
            document.title = resolveConfigText(meta.title);
        }

        if (meta.description) {
            let descriptionTag = qs('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement("meta");
                descriptionTag.setAttribute("name", "description");
                document.head.appendChild(descriptionTag);
            }

            descriptionTag.setAttribute("content", resolveConfigText(meta.description));
        }
    }

    /* =========================
       LOGO
       ========================= */

    function renderLogo(extraClass = "") {
        const className = extraClass ? ` site-logo ${extraClass}` : "site-logo";
        const label = config.brand && config.brand.logoLabel ? resolveConfigText(config.brand.logoLabel) : "";

        return `
            <a class="${className}" href="index.html" aria-label="${escapeHtml(label || config.companyName)}">
                <span class="logo-mark" aria-hidden="true"></span>
                <span class="logo-copy">
                    <span class="logo-text">${escapeHtml(config.companyName)}</span>
                </span>
            </a>
        `;
    }

    /* =========================
       CONFIG VALUE INJECTION
       ========================= */

    function injectConfigValues() {
        qsa(selectors.companyName).forEach((element) => {
            element.textContent = config.companyName;
        });

        qsa(selectors.companyId).forEach((element) => {
            element.textContent = config.companyId;
        });

        qsa(selectors.phoneLink).forEach((element) => {
            element.setAttribute("href", config.phoneHref);
            element.setAttribute(
                "aria-label",
                resolveConfigText(config.phoneLabel || `Call {{companyName}} at {{phone}}`)
            );
        });

        qsa(selectors.phoneText).forEach((element) => {
            element.textContent = config.phone;
        });

        qsa(selectors.emailLink).forEach((element) => {
            element.setAttribute("href", `mailto:${config.email}`);
        });

        qsa(selectors.emailText).forEach((element) => {
            element.textContent = config.email;
        });

        qsa(selectors.addressText).forEach((element) => {
            element.textContent = config.address.full;
        });

        qsa(selectors.footerText).forEach((element) => {
            element.textContent = resolveConfigText(config.footerText);
        });

        qsa(selectors.serviceArea).forEach((element) => {
            element.textContent = config.serviceArea;
        });

        qsa(selectors.disclaimer).forEach((element) => {
            element.textContent = resolveConfigText(config.disclaimer);
        });

        qsa(selectors.legalNotice).forEach((element) => {
            element.textContent = resolveConfigText(config.legalNotice);
        });
    }

    /* =========================
       HEADER
       ========================= */

    function renderHeader() {
        const headerMount = qs(selectors.siteHeader);
        if (!headerMount) return;

        const navHtml = config.navigation.map((item) => {
            if (item.label.toLowerCase() === "services") {
                return `
                    <li class="nav-item has-dropdown">
                        <a class="nav-link nav-dropdown-toggle" href="${escapeHtml(item.href)}" aria-expanded="false" aria-haspopup="true" aria-controls="servicesDropdown">
                            <span>${escapeHtml(item.label)}</span>
                            ${createIcon("chevron-down")}
                        </a>

                        <div class="services-dropdown" id="servicesDropdown" role="menu" aria-label="Electrical service categories">
                            ${config.services.map(renderDropdownService).join("")}
                        </div>
                    </li>
                `;
            }

            return `
                <li class="nav-item">
                    <a class="nav-link" href="${escapeHtml(item.href)}">
                        ${escapeHtml(item.label)}
                    </a>
                </li>
            `;
        }).join("");

        const mobileNavHtml = config.navigation.map((item) => {
            return `
                <li>
                    <a class="mobile-nav-link" href="${escapeHtml(item.href)}">
                        <span>${escapeHtml(item.label)}</span>
                        ${createIcon("arrow-up-right")}
                    </a>
                </li>
            `;
        }).join("");

        const mobileServicesHtml = config.services.map((service) => {
            return `
                <li>
                    <a class="mobile-service-link" href="${escapeHtml(service.href)}">
                        <span class="mobile-service-bolt" aria-hidden="true"></span>
                        <span>${escapeHtml(service.shortTitle || service.title)}</span>
                        ${createIcon("arrow-up-right")}
                    </a>
                </li>
            `;
        }).join("");

        headerMount.innerHTML = `
            <header class="site-header" data-header>
                <div class="container-wide site-header-inner">
                    ${renderLogo()}

                    <nav class="site-nav" aria-label="Primary navigation">
                        <ul class="nav-list">
                            ${navHtml}
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <a class="btn btn-primary header-phone" href="${escapeHtml(config.phoneHref)}" aria-label="${escapeHtml(resolveConfigText(config.phoneLabel))}">
                            ${createIcon("phone")}
                            <span class="phone-text">${escapeHtml(config.phone)}</span>
                        </a>

                        <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" data-menu-open>
                            ${createIcon("menu")}
                        </button>
                    </div>
                </div>
            </header>

            <div class="mobile-menu-backdrop" data-mobile-backdrop></div>

            <aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" data-mobile-menu inert>
                <div class="mobile-menu-header">
                    ${renderLogo("mobile-menu-logo")}

                    <button class="mobile-menu-close" type="button" aria-label="Close menu" data-menu-close>
                        ${createIcon("x")}
                    </button>
                </div>

                <div class="mobile-menu-body">
                    <div class="mobile-menu-group">
                        <p class="mobile-menu-label">Navigation</p>
                        <ul class="mobile-nav-list">
                            ${mobileNavHtml}
                        </ul>
                    </div>

                    <div class="mobile-menu-group">
                        <p class="mobile-menu-label">Electrical categories</p>
                        <ul class="mobile-service-list">
                            ${mobileServicesHtml}
                        </ul>
                    </div>

                    <div class="mobile-contact-card">
                        <a href="${escapeHtml(config.phoneHref)}">
                            ${createIcon("phone")}
                            <span>${escapeHtml(config.phone)}</span>
                        </a>

                        <a href="mailto:${escapeHtml(config.email)}">
                            ${createIcon("mail")}
                            <span>${escapeHtml(config.email)}</span>
                        </a>

                        <span>
                            ${createIcon("map-pin")}
                            <span>${escapeHtml(config.serviceArea)}</span>
                        </span>
                    </div>

                    <p class="mobile-disclaimer-note">
                        ${escapeHtml(resolveConfigText(config.legalNotice))}
                    </p>
                </div>
            </aside>
        `;
    }

    function renderDropdownService(service) {
        return `
            <a class="dropdown-service-link" href="${escapeHtml(service.href)}" role="menuitem">
                <span class="dropdown-bolt" aria-hidden="true"></span>
                <span>
                    <strong>${escapeHtml(service.title)}</strong>
                    <span>${escapeHtml(resolveConfigText(service.summary || service.cardText || "Compare local provider options."))}</span>
                </span>
                ${createIcon("arrow-up-right", "arrow")}
            </a>
        `;
    }

    function initDesktopDropdowns() {
        const dropdownItems = qsa(".has-dropdown");

        dropdownItems.forEach((item) => {
            const toggle = qs(".nav-dropdown-toggle", item);
            const dropdown = qs(".services-dropdown", item);

            if (!toggle || !dropdown) return;

            let closeTimer = null;
            const closeDelayMs = 300;

            const setExpanded = (expanded) => {
                toggle.setAttribute("aria-expanded", String(expanded));
                item.classList.toggle("is-open", expanded);
            };

            const cancelClose = () => {
                if (closeTimer) {
                    window.clearTimeout(closeTimer);
                    closeTimer = null;
                }
            };

            const openNow = () => {
                cancelClose();
                setExpanded(true);
            };

            const closeSoon = () => {
                cancelClose();
                closeTimer = window.setTimeout(() => {
                    setExpanded(false);
                }, closeDelayMs);
            };

            // Mouse behavior (desktop): keep open while moving between trigger and dropdown.
            item.addEventListener("mouseenter", openNow);
            item.addEventListener("mouseleave", closeSoon);
            dropdown.addEventListener("mouseenter", openNow);
            dropdown.addEventListener("mouseleave", closeSoon);

            // Keyboard: open on focus within, close when focus leaves the whole dropdown container.
            item.addEventListener("focusin", openNow);
            item.addEventListener("focusout", () => {
                window.setTimeout(() => {
                    if (item.contains(document.activeElement)) return;
                    cancelClose();
                    setExpanded(false);
                }, 0);
            });

            item.addEventListener("keydown", (event) => {
                if (event.key !== "Escape") return;
                cancelClose();
                setExpanded(false);
                toggle.focus();
            });

            // Ensure a consistent starting state.
            setExpanded(false);
        });
    }

    /* =========================
       FOOTER
       ========================= */

    function renderFooter() {
        const footerMount = qs(selectors.siteFooter);
        if (!footerMount) return;

        const navLinks = config.navigation
            .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
            .join("");

        const serviceLinks = config.services
            .map((service) => `<a href="${escapeHtml(service.href)}">${escapeHtml(service.title)}</a>`)
            .join("");

        const legalLinks = config.legalLinks
            .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
            .join("");

        footerMount.innerHTML = `
            <footer class="site-footer">
                <div class="footer-current" aria-hidden="true"></div>

                <div class="container-wide footer-inner">
                    <div class="footer-top">
                        <div class="footer-brand">
                            ${renderLogo("footer-logo")}

                            <p data-footer-text>${escapeHtml(resolveConfigText(config.footerText))}</p>

                            <div class="disclaimer-strip">
                                <strong>Independent matching platform</strong>
                                <span data-legal-notice>${escapeHtml(resolveConfigText(config.legalNotice))}</span>
                            </div>
                        </div>

                        <div class="footer-group">
                            <p class="footer-title">Navigation</p>
                            <div class="footer-links">
                                ${navLinks}
                            </div>
                        </div>

                        <div class="footer-group">
                            <p class="footer-title">Services</p>
                            <div class="footer-links">
                                ${serviceLinks}
                            </div>
                        </div>

                        <div class="footer-group">
                            <p class="footer-title">Contact</p>
                            <div class="footer-links">
                                <a class="footer-contact-item" href="${escapeHtml(config.phoneHref)}">
                                    ${createIcon("phone")}
                                    <span>${escapeHtml(config.phone)}</span>
                                </a>

                                <a class="footer-contact-item" href="mailto:${escapeHtml(config.email)}">
                                    ${createIcon("mail")}
                                    <span>${escapeHtml(config.email)}</span>
                                </a>

                                <span class="footer-contact-item">
                                    ${createIcon("map-pin")}
                                    <span>${escapeHtml(config.address.full)}</span>
                                </span>

                                <span class="footer-contact-item">
                                    ${createIcon("badge-check")}
                                    <span>${escapeHtml(config.companyId)}</span>
                                </span>

                                <span class="footer-contact-item">
                                    ${createIcon("map")}
                                    <span>${escapeHtml(config.serviceArea)}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="footer-legal">
                        <div class="footer-links footer-legal-links">
                            ${legalLinks}
                        </div>

                        <p data-disclaimer>${escapeHtml(resolveConfigText(config.disclaimer))}</p>
                    </div>

                    <div class="footer-bottom">
                        <span>© <span data-current-year></span> ${escapeHtml(config.companyName)}. All rights reserved.</span>
                        <span>${escapeHtml(config.companyId)}</span>
                    </div>
                </div>
            </footer>
        `;

        qsa("[data-current-year]").forEach((element) => {
            element.textContent = new Date().getFullYear();
        });
    }

    /* =========================
       SERVICE CARDS
       ========================= */

    function renderServiceCards() {
        const mounts = qsa(selectors.serviceCards);

        mounts.forEach((mount) => {
            const limit = Number(mount.dataset.limit || config.services.length);
            const services = config.services.slice(0, limit);

            mount.innerHTML = services.map(renderServiceCard).join("");
        });
    }

    function renderServiceCard(service) {
        return `
            <a class="service-card reveal-up" href="${escapeHtml(service.href)}" aria-label="Compare ${escapeHtml(service.title)} provider options">
                <span class="service-card-image" aria-hidden="true">
                    <img src="${escapeHtml(service.image)}" alt="" loading="lazy">
                </span>

                <span class="service-card-electric-cut" aria-hidden="true"></span>

                <span class="service-card-content">
                    <span class="service-card-icon">
                        ${createIcon(service.icon)}
                    </span>

                    <span class="service-card-copy">
                        <span class="service-card-index">${escapeHtml(getServiceIndex(service.id))}</span>
                        <h3>${escapeHtml(service.title)}</h3>
                        <p>${escapeHtml(resolveConfigText(service.cardText))}</p>

                        <span class="btn-link service-card-link">
                            Compare options
                            ${createIcon("arrow-up-right")}
                        </span>
                    </span>
                </span>
            </a>
        `;
    }

    function getServiceIndex(serviceId) {
        const index = config.services.findIndex((service) => service.id === serviceId);
        return String(index + 1).padStart(2, "0");
    }

    /* =========================
       FAQ
       ========================= */

    function renderFaq() {
        const faqMounts = qsa(selectors.faqList);

        faqMounts.forEach((mount) => {
            const items = resolveFaqItems(mount);

            mount.innerHTML = items.map((item, index) => renderFaqItem(item, index)).join("");
        });

        initFaqAccordions();
    }

    function resolveFaqItems(mount) {
        const source = mount.dataset.faqSource;
        const serviceId = mount.dataset.serviceId;

        if (source === "service") {
            const service = serviceId ? getServiceById(serviceId) : getCurrentServiceFromBody();
            return service && Array.isArray(service.faq) ? service.faq : config.faq;
        }

        if (source === "page" && Array.isArray(window.PAGE_FAQ)) {
            return window.PAGE_FAQ;
        }

        return config.faq;
    }

    function renderFaqItem(item, index) {
        const pageName = getCurrentFilename().replace(".html", "");
        const itemId = `faq-panel-${pageName}-${index + 1}`;

        return `
            <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="${escapeHtml(itemId)}">
                    <span>${escapeHtml(resolveConfigText(item.question))}</span>
                    <span class="faq-question-icon" aria-hidden="true">
                        ${createIcon("zap")}
                    </span>
                </button>

                <div class="faq-answer" id="${escapeHtml(itemId)}">
                    <div class="faq-answer-inner">
                        <p>${escapeHtml(resolveConfigText(item.answer))}</p>
                    </div>
                </div>
            </article>
        `;
    }

    function initFaqAccordions() {
        qsa(".faq-item").forEach((item) => {
            const button = qs(".faq-question", item);

            if (!button) return;

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                item.classList.toggle("is-open", !isOpen);
                button.setAttribute("aria-expanded", String(!isOpen));
            });
        });
    }

    function injectFaqSchema() {
        const schemaMounts = qsa(selectors.faqSchema);

        schemaMounts.forEach((mount) => {
            const items = resolveFaqItems(mount);

            const schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: items.map((item) => ({
                    "@type": "Question",
                    name: resolveConfigText(item.question),
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: resolveConfigText(item.answer)
                    }
                }))
            };

            mount.setAttribute("type", "application/ld+json");
            mount.textContent = JSON.stringify(schema);
        });
    }

    /* =========================
       MOBILE MENU
       ========================= */

    function initMobileMenu() {
        const menu = qs("[data-mobile-menu]");
        const backdrop = qs("[data-mobile-backdrop]");
        const openButton = qs("[data-menu-open]");
        const closeButton = qs("[data-menu-close]");

        if (!menu || !backdrop || !openButton || !closeButton) return;

        openButton.addEventListener("click", openMobileMenu);
        closeButton.addEventListener("click", closeMobileMenu);
        backdrop.addEventListener("click", closeMobileMenu);

        qsa("a", menu).forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (!state.mobileMenuOpen) return;

            if (event.key === "Escape") {
                closeMobileMenu();
            }

            if (event.key === "Tab") {
                trapFocus(event);
            }
        });

        function openMobileMenu() {
            state.mobileMenuOpen = true;
            state.lastFocusedElement = document.activeElement;

            document.body.classList.add("menu-open");
            menu.classList.add("is-open");
            backdrop.classList.add("is-open");

            setInert(menu, false);
            openButton.setAttribute("aria-expanded", "true");

            state.focusableElements = getFocusableElements(menu);

            window.setTimeout(() => {
                const firstFocusable = state.focusableElements[0] || closeButton;
                firstFocusable.focus();
            }, 80);
        }

        function closeMobileMenu() {
            state.mobileMenuOpen = false;

            document.body.classList.remove("menu-open");
            menu.classList.remove("is-open");
            backdrop.classList.remove("is-open");

            openButton.setAttribute("aria-expanded", "false");

            window.setTimeout(() => {
                setInert(menu, true);
            }, 260);

            if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
                state.lastFocusedElement.focus();
            }
        }

        function trapFocus(event) {
            const focusable = state.focusableElements;

            if (!focusable.length) {
                event.preventDefault();
                closeButton.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }

            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    /* =========================
       STICKY HEADER
       ========================= */

    function initStickyHeader() {
        const header = qs("[data-header]");
        if (!header) return;

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 10);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    /* =========================
       COOKIE BANNER
       ========================= */

    function initCookieBanner() {
        const bannerMount = qs(selectors.policyBanner);
        if (!bannerMount || !config.cookieBanner) return;

        const storageKey = config.cookieBanner.storageKey;
        const savedChoice = window.localStorage.getItem(storageKey);

        if (savedChoice) return;

        bannerMount.classList.add("policy-banner");

        bannerMount.innerHTML = `
            <div class="policy-banner-copy">
                <strong class="policy-banner-title">${escapeHtml(resolveConfigText(config.cookieBanner.title))}</strong>
                <p class="policy-banner-text">${escapeHtml(resolveConfigText(config.cookieBanner.text))}</p>

                <div class="policy-banner-links">
                    ${config.cookieBanner.links.map((link) => {
            return `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
        }).join("")}
                </div>
            </div>

            <div class="policy-banner-actions">
                <button class="btn btn-ghost" type="button" data-cookie-decline>
                    ${escapeHtml(resolveConfigText(config.cookieBanner.decline))}
                </button>

                <button class="btn btn-primary" type="button" data-cookie-accept>
                    ${escapeHtml(resolveConfigText(config.cookieBanner.accept))}
                </button>
            </div>
        `;

        window.setTimeout(() => {
            bannerMount.classList.add("is-visible");
        }, 320);

        const acceptButton = qs("[data-cookie-accept]", bannerMount);
        const declineButton = qs("[data-cookie-decline]", bannerMount);

        if (acceptButton) {
            acceptButton.addEventListener("click", () => saveCookieChoice("accepted"));
        }

        if (declineButton) {
            declineButton.addEventListener("click", () => saveCookieChoice("declined"));
        }

        function saveCookieChoice(choice) {
            window.localStorage.setItem(storageKey, choice);
            bannerMount.classList.remove("is-visible");

            window.setTimeout(() => {
                bannerMount.remove();
            }, 260);
        }
    }

    /* =========================
       FORM VALIDATION
       ========================= */

    function initFormValidation() {
        const forms = qsa("[data-voltly-form]");

        forms.forEach((form) => {
            const status = qs("[data-form-status]", form);

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const isValid = validateForm(form);

                if (!status) return;

                if (!isValid) {
                    status.className = "form-status is-error";
                    status.textContent = resolveConfigText(config.forms.contact.errorText);
                    return;
                }

                form.reset();

                qsa(".form-field, .checkbox-field", form).forEach((field) => {
                    field.classList.remove("has-error");
                });

                qsa("[data-error]", form).forEach((error) => {
                    error.textContent = "";
                });

                status.className = "form-status is-success";
                status.textContent = resolveConfigText(
                    `${config.forms.contact.successTitle} ${config.forms.contact.successText}`
                );
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = qsa("[data-required]", form);

        requiredFields.forEach((field) => {
            const fieldWrapper = field.closest(".form-field") || field.closest(".checkbox-field");
            const errorElement = fieldWrapper ? qs("[data-error]", fieldWrapper) : null;
            let fieldValid = true;

            if (field.type === "checkbox") {
                fieldValid = field.checked;
            } else {
                fieldValid = field.value.trim().length > 0;
            }

            if (field.type === "email" && field.value.trim()) {
                fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            }

            if (field.name === "zip" && field.value.trim()) {
                fieldValid = /^\d{5}(-\d{4})?$/.test(field.value.trim());
            }

            if (!fieldValid) {
                isValid = false;

                if (fieldWrapper) {
                    fieldWrapper.classList.add("has-error");
                }

                if (errorElement) {
                    errorElement.textContent = getErrorMessage(field);
                }
            } else {
                if (fieldWrapper) {
                    fieldWrapper.classList.remove("has-error");
                }

                if (errorElement) {
                    errorElement.textContent = "";
                }
            }
        });

        return isValid;
    }

    function getErrorMessage(field) {
        if (field.type === "checkbox") {
            return "Please confirm this reminder before submitting.";
        }

        if (field.type === "email") {
            return "Please enter a valid email address.";
        }

        if (field.name === "zip") {
            return "Please enter a valid ZIP code.";
        }

        return "This field is required.";
    }

    function initRevealAnimations() {
        const elements = qsa(".reveal-up");

        if (!elements.length) return;

        document.body.classList.add("reveal-ready");

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => {
                element.classList.add("is-visible");
                element.style.transitionDelay = "0ms";
            });
            return;
        }

        let scrollTimer = null;

        window.addEventListener(
            "scroll",
            () => {
                document.body.classList.add("is-fast-scroll");

                window.clearTimeout(scrollTimer);

                scrollTimer = window.setTimeout(() => {
                    document.body.classList.remove("is-fast-scroll");
                }, 140);
            },
            { passive: true }
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    entry.target.style.transitionDelay = "0ms";
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.01,
                rootMargin: "180px 0px 180px 0px"
            }
        );

        elements.forEach((element) => {
            element.style.transitionDelay = "0ms";

            const rect = element.getBoundingClientRect();

            if (rect.top < window.innerHeight + 180) {
                element.classList.add("is-visible");
                return;
            }

            observer.observe(element);
        });
    }

    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    function setActiveNavigation() {
        const filename = getCurrentFilename();

        const links = qsa(
            ".nav-link, .mobile-nav-link, .mobile-service-link, .dropdown-service-link, .footer-links a"
        );

        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            const normalizedHref = href.substring(href.lastIndexOf("/") + 1);
            const isActive = normalizedHref === filename;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /* =========================
       ELECTRIC POINTER GLOW
       ========================= */

    function initElectricalPointerGlow() {
        const glowTargets = qsa(".service-card, .surface-panel, .cta-photo, .form-shell");

        glowTargets.forEach((target) => {
            target.addEventListener(
                "pointermove",
                (event) => {
                    if (window.matchMedia("(max-width: 900px)").matches) return;

                    const rect = target.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;

                    target.style.setProperty("--glow-x", `${x}%`);
                    target.style.setProperty("--glow-y", `${y}%`);
                },
                { passive: true }
            );

            target.addEventListener("pointerleave", () => {
                target.style.removeProperty("--glow-x");
                target.style.removeProperty("--glow-y");
            });
        });
    }

    /* =========================
       PUBLIC HELPERS
       ========================= */

    window.Voltly = {
        config,
        qs,
        qsa,
        escapeHtml,
        resolveConfigText,
        getCurrentFilename,
        getServiceById,
        getCurrentServiceFromBody,
        renderServiceCard,
        renderFaq,
        injectFaqSchema,
        injectConfigValues,
        initFormValidation,
        initRevealAnimations,
        refreshIcons
    };
})();
