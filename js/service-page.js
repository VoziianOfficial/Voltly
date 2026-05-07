(function () {
    "use strict";

    const api = window.Voltly;
    const config = window.SITE_CONFIG;
    if (!api || !config) return;

    const mount = document.querySelector("[data-service-page]");
    if (!mount) return;

    const service = api.serviceByHref(api.currentPage());
    if (!service) {
        console.warn(`Service content is missing for ${api.currentPage()}`);
        return;
    }

    const comparisonPoints = [
        "Licensing and insurance",
        "Permit and code questions",
        "Quote clarity",
        "Timeline discussion",
        "Warranty terms",
        "Project experience"
    ];

    mount.innerHTML = `
        <section class="service-hero section">
            <div class="container service-hero-grid">
                <div class="service-hero-copy reveal-up">
                    <p class="kicker">${service.pageKicker}</p>
                    <h1>${service.heroTitle}</h1>
                    <p>${service.heroText}</p>
                    <div class="hero-actions">
                        <a class="btn btn-primary" href="contact.html">${config.phoneLabel}</a>
                        <a class="btn btn-ghost" href="services.html">Compare all services</a>
                    </div>
                    <p class="note">Voltly does not perform this work directly.</p>
                </div>
                <div class="service-visual ${service.image} reveal-up" aria-hidden="true">
                    <div class="visual-grid"></div>
                    <svg class="lightning-svg" viewBox="0 0 520 360">
                        <path class="lightning-path" d="M40 228 C130 110 170 286 248 158 S380 116 480 70"/>
                        <path class="lightning-path path-2" d="M62 286 C150 224 210 318 292 226 S410 202 492 142"/>
                    </svg>
                    <div class="signal-stack">
                        ${service.checklist.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
                    </div>
                </div>
            </div>
        </section>

        <section class="section service-overview">
            <div class="container split-layout">
                <div class="section-copy reveal-up">
                    <p class="kicker">Service overview</p>
                    <h2>${service.title}</h2>
                    <p>${service.pageIntro}</p>
                    <p class="fine-print">Independent providers may offer this service depending on location, availability, licensing, and project details. Homeowners should verify all service scope, pricing, permits, warranties, timelines, licensing, and insurance directly.</p>
                </div>
                <div class="diagnostic-card reveal-up">
                    <span class="console-label">Request context</span>
                    <ul class="check-list">
                        ${service.evaluationPoints.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </section>

        <section class="section request-checklist">
            <div class="container">
                <div class="section-heading reveal-up">
                    <p class="kicker">Prepare before contact</p>
                    <h2>Request checklist for ${service.title.toLowerCase()}.</h2>
                </div>
                <div class="check-grid">
                    ${service.checklist.map((item, index) => `
                        <article class="check-tile reveal-up">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            <h3>${item}</h3>
                        </article>
                    `).join("")}
                </div>
            </div>
        </section>

        <section class="section comparison-console">
            <div class="container">
                <div class="section-heading reveal-up">
                    <p class="kicker">Provider comparison</p>
                    <h2>Questions that support provider fit review.</h2>
                    <p>Voltly helps organize the comparison structure. Homeowners should ask providers directly and confirm each detail before making a decision.</p>
                </div>
                <div class="console-grid">
                    ${comparisonPoints.map((point) => `
                        <article class="console-card reveal-up">
                            <div class="mini-bolt" aria-hidden="true"></div>
                            <h3>${point}</h3>
                            <p>Use this topic to compare provider options and prepare direct follow-up questions.</p>
                        </article>
                    `).join("")}
                </div>
            </div>
        </section>

        <section class="section helps-band">
            <div class="container helps-grid">
                <div class="reveal-up">
                    <p class="kicker">How Voltly helps</p>
                    <h2>Clarity before provider conversations.</h2>
                </div>
                <div class="helps-copy reveal-up">
                    <p>Voltly helps homeowners turn early project notes into structured request details, compare independent local electrical provider options, and keep decision control.</p>
                    <p>Voltly does not perform electrical work directly, provide quotes, guarantee provider availability, verify licenses or insurance, set pricing, or provide warranties.</p>
                </div>
            </div>
        </section>

        <section class="section faq-section">
            <div class="container narrow">
                <div class="section-heading reveal-up">
                    <p class="kicker">FAQ</p>
                    <h2>${service.title} questions.</h2>
                </div>
                <div class="faq-list" id="service-faq" data-faq-list="service"></div>
            </div>
        </section>

        <section class="section final-cta">
            <div class="container cta-panel reveal-up">
                <div>
                    <p class="kicker">Structured request</p>
                    <h2>Start your electrical provider matching request.</h2>
                    <p>Prepare your project details and compare independent local electrical provider options with more clarity.</p>
                </div>
                <a class="btn btn-primary" href="contact.html">${config.phoneLabel}</a>
                <p class="disclaimer">${config.disclaimer}</p>
            </div>
        </section>
    `;

    api.renderFAQ();
    api.initReveal();
}());
