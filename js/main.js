(function () {
    "use strict";

    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
        return;
    }

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const currentPage = () => {
        const file = window.location.pathname.split("/").pop();
        return file || "index.html";
    };

    const iconMarkup = (name) => {
        const icons = {
            panel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M9 7h6M9 11h2m4 0h0M9 15h6"/><path d="m13 7-2 5h3l-3 5"/></svg>',
            wiring: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8c3-4 7 4 10 0s6 0 6 0"/><path d="M4 16c3-4 7 4 10 0s6 0 6 0"/><path d="M8 5v14M16 5v14"/></svg>',
            charger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2Z"/><path d="M9 7h4M9 11h6"/><path d="M17 8h1a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3"/><path d="m12 13-2 3h3l-2 4"/></svg>',
            lighting: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-.9.7-1.2 1.5-1.2 2H9.2c0-.5-.3-1.3-1.2-2Z"/><path d="m13 4-2 5h3l-3 5"/></svg>'
        };
        return icons[name] || icons.panel;
    };

    const serviceByHref = (href) => config.services.find((service) => service.href === href);

    function applyPageMeta() {
        const page = currentPage();
        const meta = config.pageMeta && config.pageMeta[page];

        if (!meta) {
            console.warn(`Page meta is missing for ${page}`);
            return;
        }

        document.title = meta.title;

        let description = $('meta[name="description"]');
        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }
        description.setAttribute("content", meta.description);
    }

    function injectConfigValues() {
        const bindings = [
            ["[data-company-name]", config.companyName],
            ["[data-company-id]", config.companyId],
            ["[data-phone-text]", config.phone],
            ["[data-email-text]", config.email],
            ["[data-address-text]", config.address],
            ["[data-footer-text]", config.footerText],
            ["[data-service-area]", config.serviceArea],
            ["[data-disclaimer]", config.disclaimer],
            ["[data-legal-notice]", config.legalNotice]
        ];

        bindings.forEach(([selector, value]) => {
            $$(selector).forEach((node) => {
                node.textContent = value;
            });
        });

        $$("[data-phone-link]").forEach((node) => {
            node.setAttribute("href", `tel:${config.phoneHref}`);
            node.textContent = node.dataset.phoneLink === "label" ? config.phoneLabel : config.phone;
        });

        $$("[data-email-link]").forEach((node) => {
            node.setAttribute("href", `mailto:${config.email}`);
            node.textContent = config.email;
        });
    }

    function logoMarkup() {
        return `
            <a class="brand-mark" href="index.html" aria-label="${config.companyName} home">
                <span class="brand-symbol" aria-hidden="true"><span></span></span>
                <span class="brand-copy">
                    <strong>${config.companyName}</strong>
                    <small>Electrical provider matching</small>
                </span>
            </a>
        `;
    }

    function renderHeader() {
        const mount = $("[data-site-header]");
        if (!mount) return;

        const page = currentPage();
        const navLinks = config.navigation.map((item) => {
            const isActive = item.href === page || (item.href === "services.html" && serviceByHref(page));
            return `<a class="nav-link ${isActive ? "is-active" : ""}" href="${item.href}" ${isActive ? 'aria-current="page"' : ""}>${item.label}</a>`;
        }).join("");

        const serviceLinks = config.services.map((service) => (
            `<a href="${service.href}"><span class="menu-icon">${iconMarkup(service.icon)}</span><span>${service.title}</span></a>`
        )).join("");

        mount.innerHTML = `
            <header class="site-header">
                <div class="container header-inner">
                    ${logoMarkup()}
                    <nav class="site-nav" aria-label="Primary navigation">
                        ${navLinks}
                        <div class="service-dropdown">
                            <button class="nav-link dropdown-toggle" type="button" aria-expanded="false">
                                Service categories
                                <span aria-hidden="true">+</span>
                            </button>
                            <div class="dropdown-panel" role="menu">
                                ${serviceLinks}
                            </div>
                        </div>
                    </nav>
                    <div class="header-actions">
                        <a class="btn btn-small btn-primary" href="contact.html">${config.phoneLabel}</a>
                        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
                            <span></span><span></span>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    function renderFooter() {
        const mount = $("[data-site-footer]");
        if (!mount) return;

        const navLinks = config.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");
        const serviceLinks = config.services.map((service) => `<a href="${service.href}">${service.title}</a>`).join("");
        const legalLinks = config.legalLinks.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="electric-line footer-line" aria-hidden="true"><span></span></div>
                <div class="container footer-grid">
                    <div class="footer-brand">
                        ${logoMarkup()}
                        <p>${config.footerText}</p>
                        <p class="footer-notice">${config.legalNotice}</p>
                    </div>
                    <div class="footer-column">
                        <h2>Platform</h2>
                        ${navLinks}
                    </div>
                    <div class="footer-column">
                        <h2>Categories</h2>
                        ${serviceLinks}
                    </div>
                    <div class="footer-column">
                        <h2>Contact</h2>
                        <span>${config.companyName}</span>
                        <span>${config.companyId}</span>
                        <span>${config.address}</span>
                        <a href="tel:${config.phoneHref}">${config.phone}</a>
                        <a href="mailto:${config.email}">${config.email}</a>
                        <span>${config.serviceArea}</span>
                    </div>
                    <div class="footer-column">
                        <h2>Legal</h2>
                        ${legalLinks}
                    </div>
                </div>
                <div class="container footer-bottom">
                    <p>${config.disclaimer}</p>
                </div>
            </footer>
        `;
    }

    function renderMobileMenu() {
        if ($("#mobile-menu")) return;

        const menu = document.createElement("div");
        menu.className = "mobile-menu";
        menu.id = "mobile-menu";
        menu.setAttribute("inert", "");
        menu.innerHTML = `
            <div class="mobile-menu-shell" role="dialog" aria-modal="true" aria-label="Site menu">
                <div class="mobile-menu-top">
                    ${logoMarkup()}
                    <button class="menu-close" type="button" aria-label="Close menu">Close</button>
                </div>
                <nav class="mobile-menu-links" aria-label="Mobile navigation">
                    ${config.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
                </nav>
                <div class="mobile-service-links">
                    <span>Service categories</span>
                    ${config.services.map((service) => `<a href="${service.href}">${service.title}</a>`).join("")}
                </div>
                <div class="mobile-contact">
                    <a class="btn btn-primary" href="contact.html">${config.phoneLabel}</a>
                    <a href="tel:${config.phoneHref}">${config.phone}</a>
                    <a href="mailto:${config.email}">${config.email}</a>
                    <p>${config.disclaimer}</p>
                </div>
            </div>
        `;
        document.body.appendChild(menu);

        const toggle = $(".menu-toggle");
        const close = $(".menu-close", menu);
        let previousFocus = null;

        const openMenu = () => {
            previousFocus = document.activeElement;
            menu.classList.add("is-open");
            menu.removeAttribute("inert");
            document.body.classList.add("menu-open");
            toggle && toggle.setAttribute("aria-expanded", "true");
            close.focus();
        };

        const closeMenu = () => {
            menu.classList.remove("is-open");
            menu.setAttribute("inert", "");
            document.body.classList.remove("menu-open");
            toggle && toggle.setAttribute("aria-expanded", "false");
            if (previousFocus && typeof previousFocus.focus === "function") {
                previousFocus.focus();
            }
        };

        toggle && toggle.addEventListener("click", openMenu);
        close.addEventListener("click", closeMenu);
        menu.addEventListener("click", (event) => {
            if (event.target === menu || event.target.closest("a")) closeMenu();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
        });
    }

    function renderPolicyBanner() {
        const bannerConfig = config.cookieBanner;
        if (!bannerConfig || localStorage.getItem(bannerConfig.storageKey)) return;

        const banner = document.createElement("section");
        banner.className = "policy-banner";
        banner.setAttribute("aria-label", "Privacy choices");
        banner.innerHTML = `
            <div>
                <h2>${bannerConfig.title}</h2>
                <p>${bannerConfig.text}</p>
                <nav aria-label="Policy links">
                    ${config.legalLinks.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
                </nav>
            </div>
            <div class="policy-actions">
                <button class="btn btn-ghost" type="button" data-cookie-choice="declined">${bannerConfig.declineLabel}</button>
                <button class="btn btn-primary" type="button" data-cookie-choice="accepted">${bannerConfig.acceptLabel}</button>
            </div>
        `;
        document.body.appendChild(banner);

        $$("[data-cookie-choice]", banner).forEach((button) => {
            button.addEventListener("click", () => {
                localStorage.setItem(bannerConfig.storageKey, button.dataset.cookieChoice);
                banner.remove();
            });
        });
    }

    function renderServiceCards() {
        $$("[data-service-cards]").forEach((mount) => {
            const variant = mount.dataset.serviceCards || "default";
            mount.innerHTML = config.services.map((service) => `
                <article class="service-card reveal-up ${variant === "modules" ? "service-card-module" : ""}">
                    <div class="card-electric-line" aria-hidden="true"></div>
                    <div class="service-icon">${iconMarkup(service.icon)}</div>
                    <h3>${service.title}</h3>
                    <p>${variant === "summary" ? service.summary : service.cardText}</p>
                    ${variant === "details" ? `<ul>${service.checklist.slice(0, 4).map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
                    <a class="text-link" href="${service.href}">Explore service category</a>
                </article>
            `).join("");
        });
    }

    function renderFAQ() {
        $$("[data-faq-list]").forEach((mount) => {
            const pageService = serviceByHref(currentPage());
            const items = mount.dataset.faqList === "service" && pageService ? pageService.faq : config.faq;
            mount.innerHTML = items.map((item, index) => `
                <article class="faq-item reveal-up">
                    <h3>
                        <button type="button" aria-expanded="false" aria-controls="faq-panel-${mount.id || "global"}-${index}">
                            <span>${item.question}</span>
                            <span class="faq-icon" aria-hidden="true"></span>
                        </button>
                    </h3>
                    <div class="faq-panel" id="faq-panel-${mount.id || "global"}-${index}">
                        <p>${item.answer}</p>
                    </div>
                </article>
            `).join("");

            $$("button", mount).forEach((button) => {
                button.addEventListener("click", () => {
                    const expanded = button.getAttribute("aria-expanded") === "true";
                    button.setAttribute("aria-expanded", String(!expanded));
                    button.closest(".faq-item").classList.toggle("is-open", !expanded);
                });
            });
        });
    }

    function initReveal() {
        const nodes = $$(".reveal-up");
        if (!nodes.length) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            nodes.forEach((node) => node.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        nodes.forEach((node) => observer.observe(node));
    }

    function initElectricEffects() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.documentElement.classList.add("reduced-motion");
        }
    }

    function initDropdown() {
        const dropdown = $(".service-dropdown");
        if (!dropdown) return;

        const button = $(".dropdown-toggle", dropdown);
        dropdown.addEventListener("mouseenter", () => button.setAttribute("aria-expanded", "true"));
        dropdown.addEventListener("mouseleave", () => button.setAttribute("aria-expanded", "false"));
        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            dropdown.classList.toggle("is-open", !expanded);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        applyPageMeta();
        renderHeader();
        renderFooter();
        renderMobileMenu();
        injectConfigValues();
        renderPolicyBanner();
        renderServiceCards();
        renderFAQ();
        initDropdown();
        initReveal();
        initElectricEffects();
    });

    window.Voltly = {
        config,
        currentPage,
        iconMarkup,
        serviceByHref,
        renderFAQ,
        initReveal
    };
}());
