"use strict";

/* ==========================================================
   VOLTLY — SERVICE PAGE LOGIC
   File: /js/service-page.js

   This file powers:
   - panel-upgrades.html
   - wiring-rewiring.html
   - ev-charger-installation.html
   - lighting-installation.html
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const service = getCurrentService();

        if (!service) {
            console.warn("No service data found for this page. Check body[data-service-id] and SITE_CONFIG.services.");
            return;
        }

        renderServicePage(service);
        initServiceHeroMotion();
        initServiceMediaMotion();
        initEvaluationInteraction();
        initPreparationInteraction();
        initFlowInteraction();
        initServiceCtaMotion();

        if (window.Voltly && typeof window.Voltly.renderFaq === "function") {
            window.Voltly.renderFaq();
        }

        if (window.Voltly && typeof window.Voltly.injectFaqSchema === "function") {
            window.Voltly.injectFaqSchema();
        }

        if (window.Voltly && typeof window.Voltly.refreshIcons === "function") {
            window.Voltly.refreshIcons();
        }
    });

    /* =========================
       HELPERS
       ========================= */

    function getCurrentService() {
        if (!window.Voltly || !window.Voltly.config) {
            console.warn("Voltly helpers are missing. Make sure main.js loads before service-page.js.");
            return null;
        }

        const serviceId = document.body.dataset.serviceId;

        if (!serviceId) {
            console.warn("Missing body[data-service-id] on service page.");
            return null;
        }

        return window.Voltly.getServiceById(serviceId);
    }

    function escapeHtml(value) {
        if (window.Voltly && typeof window.Voltly.escapeHtml === "function") {
            return window.Voltly.escapeHtml(value);
        }

        return String(value || "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setImage(selector, src, alt) {
        document.querySelectorAll(selector).forEach((image) => {
            image.setAttribute("src", src || "");
            image.setAttribute("alt", alt || "");
        });
    }

    function getDetailImage(service) {
        const imageMap = {
            "panel-upgrades": "assets/images/electrical-panel-detail.jpg",
            "wiring-rewiring": "assets/images/wiring-detail.jpg",
            "ev-charger-installation": "assets/images/ev-charger-detail.jpg",
            "lighting-installation": "assets/images/lighting-detail.jpg"
        };

        return service.detailImage || imageMap[service.id] || service.image;
    }

    function getContextPoints(service) {
        const fallback = {
            "panel-upgrades": [
                "Homeowners planning added capacity, new major appliances, remodels, or EV charging readiness.",
                "Requests where provider review may involve panel condition, amperage, breakers, and local code context.",
                "Projects where utility coordination, permits, or inspection expectations should be discussed before hiring.",
                "Situations where homeowners want clearer quote structure before choosing a provider."
            ],
            "wiring-rewiring": [
                "Homes with room updates, renovation work, outlet changes, or wiring layout concerns.",
                "Requests where access through walls, ceilings, attic, crawlspace, or basement may affect scope.",
                "Older-home wiring conversations where provider qualifications and code discussion matter.",
                "Projects where homeowners need clearer expectations around disruption, timing, and finishing details."
            ],
            "ev-charger-installation": [
                "Homeowners preparing for Level 2 EV charging or dedicated charger installation.",
                "Requests where panel capacity, charger location, and route distance may affect provider review.",
                "Garage, driveway, or exterior charger planning where installation conditions may vary.",
                "Projects where homeowners should compare permit expectations, equipment compatibility, and quote clarity."
            ],
            "lighting-installation": [
                "Fixture installation, recessed lighting, exterior lighting, or lighting layout update requests.",
                "Projects where ceiling height, wiring access, fixture type, or switch location may affect scope.",
                "Indoor and outdoor lighting requests where product compatibility and installation conditions matter.",
                "Situations where homeowners want to compare provider options before choosing who to hire."
            ]
        };

        return service.contextPoints || fallback[service.id] || [];
    }

    function getPreparationVisualItems(service) {
        const fallback = {
            "panel-upgrades": [
                { label: "Panel context", value: "Current panel size, age, or known limitation" },
                { label: "Project reason", value: "Capacity upgrade, remodel, EV charger, or appliance addition" },
                { label: "Access", value: "Panel location, photos, and utility area notes" },
                { label: "Timing", value: "Preferred schedule and flexibility" }
            ],
            "wiring-rewiring": [
                { label: "Area", value: "Rooms, outlets, circuits, or renovation zones involved" },
                { label: "Condition", value: "Known wiring concerns or outdated electrical context" },
                { label: "Access", value: "Open walls, finished walls, attic, crawlspace, or basement notes" },
                { label: "Timing", value: "Renovation schedule or preferred provider follow-up window" }
            ],
            "ev-charger-installation": [
                { label: "Charger", value: "Vehicle or charger type if known" },
                { label: "Location", value: "Garage, driveway, exterior wall, or parking setup" },
                { label: "Distance", value: "Approximate distance from panel to charging location" },
                { label: "Timing", value: "Preferred installation window and access notes" }
            ],
            "lighting-installation": [
                { label: "Fixture", value: "Fixture type, quantity, and style preferences" },
                { label: "Location", value: "Room, exterior area, ceiling height, or layout notes" },
                { label: "Controls", value: "Switch, dimmer, or lighting control needs" },
                { label: "Timing", value: "Preferred schedule and remodel context if relevant" }
            ]
        };

        return service.prepVisualItems || fallback[service.id] || [];
    }

    /* =========================
       RENDER SERVICE PAGE
       ========================= */

    function renderServicePage(service) {
        setText("[data-service-title]", service.title);
        setText("[data-service-short-title]", service.shortTitle || service.title);
        setText("[data-service-kicker]", service.pageKicker || "Electrical service category");
        setText("[data-service-hero-title]", service.heroTitle || service.title);
        setText("[data-service-hero-text]", service.heroText || service.summary);
        setText("[data-service-summary]", service.summary);
        setText("[data-service-intro]", service.pageIntro || service.summary);

        setImage(
            "[data-service-hero-image]",
            service.image,
            `${service.title} provider matching background`
        );

        setImage(
            "[data-service-detail-image]",
            getDetailImage(service),
            `${service.title} electrical planning detail`
        );

        renderContextPoints(service);
        renderEvaluationPoints(service);
        renderPreparationPoints(service);
        renderPreparationVisual(service);
        renderMatchingFlow(service);
        updateServiceLinks(service);
    }

    function renderContextPoints(service) {
        const mounts = document.querySelectorAll("[data-service-context-points]");
        const points = getContextPoints(service);

        mounts.forEach((mount) => {
            mount.innerHTML = points
                .map((point) => `<li>${escapeHtml(point)}</li>`)
                .join("");
        });
    }

    function renderEvaluationPoints(service) {
        const mounts = document.querySelectorAll("[data-service-evaluation-points]");
        const points = (service.evaluationPoints || []).slice(0, 4);

        mounts.forEach((mount) => {
            mount.innerHTML = points
                .map((point) => {
                    return `
                        <article tabindex="0">
                            <strong>${escapeHtml(point)}</strong>
                            <p>Compare how each independent provider explains this point before choosing who to contact or hire.</p>
                        </article>
                    `;
                })
                .join("");
        });
    }

    function renderPreparationPoints(service) {
        const mounts = document.querySelectorAll("[data-service-prep-points]");
        const points = service.prepPoints || [];

        mounts.forEach((mount) => {
            mount.innerHTML = points
                .map((point, index) => {
                    return `
                        <article tabindex="0">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            <div>
                                <strong>${escapeHtml(point)}</strong>
                                <p>This detail can help providers better understand the request before discussing scope or quote terms.</p>
                            </div>
                        </article>
                    `;
                })
                .join("");
        });
    }

    function renderPreparationVisual(service) {
        const mounts = document.querySelectorAll("[data-service-prep-visual]");
        const items = getPreparationVisualItems(service);

        mounts.forEach((mount) => {
            mount.innerHTML = items
                .map((item) => {
                    return `
                        <article tabindex="0">
                            <span>${escapeHtml(item.label)}</span>
                            <strong>${escapeHtml(item.value)}</strong>
                        </article>
                    `;
                })
                .join("");
        });
    }

    function renderMatchingFlow(service) {
        const mounts = document.querySelectorAll("[data-service-flow]");
        const shortTitle = service.shortTitle || service.title;

        const flow = [
            {
                title: "Choose category",
                text: `${shortTitle} is selected as the request path.`
            },
            {
                title: "Add project notes",
                text: "Homeowner shares ZIP code, timing, photos, access notes, or project context."
            },
            {
                title: "Compare options",
                text: "Independent local provider options can be reviewed by fit, scope, and availability."
            },
            {
                title: "Verify before hiring",
                text: "Homeowner confirms license, insurance, permits, quote terms, and qualifications."
            }
        ];

        mounts.forEach((mount) => {
            mount.innerHTML = flow
                .map((item, index) => {
                    return `
                        <article tabindex="0">
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            <strong>${escapeHtml(item.title)}</strong>
                            <p>${escapeHtml(item.text)}</p>
                        </article>
                    `;
                })
                .join("");
        });
    }

    function updateServiceLinks(service) {
        document.querySelectorAll("[data-service-contact-link]").forEach((link) => {
            link.setAttribute("href", `contact.html?service=${encodeURIComponent(service.id)}`);
        });
    }

    /* =========================
       HERO MOTION
       ========================= */

    function initServiceHeroMotion() {
        const hero = document.querySelector(".service-hero");
        if (!hero) return;

        const bolt = hero.querySelector(".service-hero-bolt-main");
        const currentOne = hero.querySelector(".service-hero-current-one");
        const currentTwo = hero.querySelector(".service-hero-current-two");

        hero.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const rect = hero.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (bolt) {
                    bolt.style.transform = `translate(${x * 18}px, ${y * 12}px) rotate(${8 + x * 5}deg)`;
                }

                if (currentOne) {
                    currentOne.style.transform = `translate(${x * 14}px, ${y * 8}px) rotate(${-6 + x * 2}deg)`;
                }

                if (currentTwo) {
                    currentTwo.style.transform = `translate(${x * -12}px, ${y * -6}px) rotate(${5 - x * 2}deg)`;
                }
            },
            { passive: true }
        );

        hero.addEventListener("pointerleave", () => {
            if (bolt) bolt.style.transform = "rotate(8deg)";
            if (currentOne) currentOne.style.transform = "rotate(-6deg)";
            if (currentTwo) currentTwo.style.transform = "rotate(5deg)";
        });
    }

    /* =========================
       MEDIA / BOLT MOTION
       ========================= */

    function initServiceMediaMotion() {
        const mediaBlocks = Array.from(document.querySelectorAll(".service-context-media"));

        mediaBlocks.forEach((block) => {
            const bolt = block.querySelector(".service-context-bolt");

            block.addEventListener(
                "pointermove",
                (event) => {
                    if (window.matchMedia("(max-width: 900px)").matches) return;
                    if (!bolt) return;

                    const rect = block.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                    const y = (event.clientY - rect.top) / rect.height - 0.5;

                    bolt.style.transform = `translate(${x * 16}px, ${y * 12}px) rotate(${x * 5}deg)`;
                },
                { passive: true }
            );

            block.addEventListener("pointerleave", () => {
                if (bolt) {
                    bolt.style.transform = "";
                }
            });
        });
    }

    /* =========================
       EVALUATION INTERACTION
       ========================= */

    function initEvaluationInteraction() {
        const shell = document.querySelector(".service-evaluation-shell");
        const items = Array.from(document.querySelectorAll(".service-evaluation-list article"));

        if (!shell || !items.length) return;

        items.forEach((item, index) => {
            item.addEventListener("pointerenter", () => {
                shell.classList.add("is-evaluation-active");
                shell.dataset.activeEvaluation = String(index + 1);

                items.forEach((card) => card.classList.remove("is-active-evaluation"));
                item.classList.add("is-active-evaluation");
            });

            item.addEventListener("pointerleave", () => {
                shell.classList.remove("is-evaluation-active");
                shell.removeAttribute("data-active-evaluation");
                item.classList.remove("is-active-evaluation");
            });

            item.addEventListener("focusin", () => {
                shell.classList.add("is-evaluation-active");
                item.classList.add("is-active-evaluation");
            });

            item.addEventListener("focusout", () => {
                shell.classList.remove("is-evaluation-active");
                item.classList.remove("is-active-evaluation");
            });
        });
    }

    /* =========================
       PREPARATION INTERACTION
       ========================= */

    function initPreparationInteraction() {
        const visual = document.querySelector(".service-prep-visual");
        const items = Array.from(document.querySelectorAll(".service-prep-visual-grid article"));

        if (!visual || !items.length) return;

        items.forEach((item, index) => {
            item.addEventListener("pointerenter", () => {
                visual.classList.add("is-prep-active");
                visual.dataset.activePrep = String(index + 1);

                items.forEach((card) => card.classList.remove("is-active-prep"));
                item.classList.add("is-active-prep");
            });

            item.addEventListener("pointerleave", () => {
                visual.classList.remove("is-prep-active");
                visual.removeAttribute("data-active-prep");
                item.classList.remove("is-active-prep");
            });

            item.addEventListener("focusin", () => {
                visual.classList.add("is-prep-active");
                item.classList.add("is-active-prep");
            });

            item.addEventListener("focusout", () => {
                visual.classList.remove("is-prep-active");
                item.classList.remove("is-active-prep");
            });
        });

        const bolt = visual.querySelector(".service-prep-visual-bolt");

        visual.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;
                if (!bolt) return;

                const rect = visual.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bolt.style.transform = `translate(${x * 16}px, ${y * 12}px) rotate(${x * 5}deg)`;
            },
            { passive: true }
        );

        visual.addEventListener("pointerleave", () => {
            if (bolt) {
                bolt.style.transform = "";
            }
        });
    }

    /* =========================
       FLOW INTERACTION
       ========================= */

    function initFlowInteraction() {
        const shell = document.querySelector(".service-flow-shell");
        const items = Array.from(document.querySelectorAll(".service-flow-steps article"));

        if (!shell || !items.length) return;

        items.forEach((item, index) => {
            item.addEventListener("pointerenter", () => {
                shell.classList.add("is-flow-active");
                shell.dataset.activeFlow = String(index + 1);

                items.forEach((card) => card.classList.remove("is-active-flow"));
                item.classList.add("is-active-flow");
            });

            item.addEventListener("pointerleave", () => {
                shell.classList.remove("is-flow-active");
                shell.removeAttribute("data-active-flow");
                item.classList.remove("is-active-flow");
            });

            item.addEventListener("focusin", () => {
                shell.classList.add("is-flow-active");
                item.classList.add("is-active-flow");
            });

            item.addEventListener("focusout", () => {
                shell.classList.remove("is-flow-active");
                item.classList.remove("is-active-flow");
            });
        });
    }

    /* =========================
       CTA MOTION
       ========================= */

    function initServiceCtaMotion() {
        const cta = document.querySelector(".service-cta .cta-photo");
        if (!cta) return;

        const bolt = cta.querySelector(".service-cta-bolt");

        cta.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;
                if (!bolt) return;

                const rect = cta.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bolt.style.transform = `translate(${x * 18}px, ${y * 12}px) rotate(${x * 5}deg)`;
            },
            { passive: true }
        );

        cta.addEventListener("pointerleave", () => {
            if (bolt) {
                bolt.style.transform = "";
            }
        });
    }
})();