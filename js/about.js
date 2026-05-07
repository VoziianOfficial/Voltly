"use strict";

/* ==========================================================
   VOLTLY — ABOUT PAGE INTERACTIONS
   File: /js/about.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initAboutFaqContent();
        initAboutHeroMotion();
        initAboutRoleInteraction();
        initAboutPhotoBoltMotion();
        initAboutPrinciplesInteraction();
        initAboutCtaMotion();
    });

    /* =========================
       PAGE FAQ CONTENT
       ========================= */

    function initAboutFaqContent() {
        window.PAGE_FAQ = [
            {
                question: "Is Voltly an electrical contractor?",
                answer:
                    "No. Voltly is not an electrical contractor and does not perform electrical work directly. Voltly is an independent matching platform that helps homeowners compare local provider options."
            },
            {
                question: "Does Voltly employ electricians?",
                answer:
                    "No. Voltly does not employ electricians or send a Voltly electrical team. Providers are independent companies."
            },
            {
                question: "What does Voltly help homeowners do?",
                answer:
                    "Voltly helps homeowners organize electrical project details by service category, ZIP code, timing, and notes before comparing independent local provider options."
            },
            {
                question: "What should homeowners verify before hiring a provider?",
                answer:
                    "Homeowners should verify licensing, insurance, permits, qualifications, scope, quote terms, timeline, and warranty details before hiring any provider."
            },
            {
                question: "Does Voltly guarantee provider work?",
                answer:
                    "No. Voltly does not warrant or guarantee any work performed by independent providers."
            }
        ];

        if (window.Voltly && typeof window.Voltly.renderFaq === "function") {
            window.Voltly.renderFaq();
        }

        if (window.Voltly && typeof window.Voltly.injectFaqSchema === "function") {
            window.Voltly.injectFaqSchema();
        }
    }

    /* =========================
       HERO MOTION
       ========================= */

    function initAboutHeroMotion() {
        const hero = document.querySelector(".about-hero");
        if (!hero) return;

        const bolt = hero.querySelector(".about-hero-bolt-main");
        const currentOne = hero.querySelector(".about-hero-current-one");
        const currentTwo = hero.querySelector(".about-hero-current-two");

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
       ROLE INTERACTION
       ========================= */

    function initAboutRoleInteraction() {
        const shell = document.querySelector(".about-role-shell");
        const columns = Array.from(document.querySelectorAll(".about-role-column"));

        if (!shell || !columns.length) return;

        columns.forEach((column, index) => {
            column.addEventListener("pointerenter", () => {
                shell.classList.add("is-role-active");
                shell.dataset.activeRole = String(index + 1);

                columns.forEach((item) => item.classList.remove("is-active-role"));
                column.classList.add("is-active-role");
            });

            column.addEventListener("pointerleave", () => {
                shell.classList.remove("is-role-active");
                shell.removeAttribute("data-active-role");
                column.classList.remove("is-active-role");
            });

            column.addEventListener("focusin", () => {
                shell.classList.add("is-role-active");
                column.classList.add("is-active-role");
            });

            column.addEventListener("focusout", () => {
                shell.classList.remove("is-role-active");
                column.classList.remove("is-active-role");
            });
        });
    }

    /* =========================
       PHOTO BOLT MOTION
       ========================= */

    function initAboutPhotoBoltMotion() {
        const photoBlocks = Array.from(document.querySelectorAll(".about-story-media, .about-verify-photo"));

        if (!photoBlocks.length) return;

        photoBlocks.forEach((block) => {
            const bolt = block.querySelector(".about-story-bolt, .about-verify-photo-bolt");

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
       PRINCIPLES INTERACTION
       ========================= */

    function initAboutPrinciplesInteraction() {
        const shell = document.querySelector(".about-principles-shell");
        const cards = Array.from(document.querySelectorAll(".about-principles-grid article"));

        if (!shell || !cards.length) return;

        cards.forEach((card, index) => {
            card.addEventListener("pointerenter", () => {
                shell.classList.add("is-principles-active");
                shell.dataset.activePrinciple = String(index + 1);
            });

            card.addEventListener("pointerleave", () => {
                shell.classList.remove("is-principles-active");
                shell.removeAttribute("data-active-principle");
            });
        });
    }

    /* =========================
       CTA MOTION
       ========================= */

    function initAboutCtaMotion() {
        const cta = document.querySelector(".about-cta .cta-photo");
        if (!cta) return;

        const bolt = cta.querySelector(".about-cta-bolt");

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