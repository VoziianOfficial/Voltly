"use strict";

/* ==========================================================
   VOLTLY — CONTACT PAGE INTERACTIONS
   File: /js/contact.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initContactHeroMotion();
        initContactSideMotion();
        initContactMapInteraction();
        initBeforeSubmitInteraction();
        initContactCtaMotion();
    });

    /* =========================
       HERO MOTION
       ========================= */

    function initContactHeroMotion() {
        const hero = document.querySelector(".contact-hero");
        if (!hero) return;

        const bolt = hero.querySelector(".contact-hero-bolt-main");
        const currentOne = hero.querySelector(".contact-hero-current-one");
        const currentTwo = hero.querySelector(".contact-hero-current-two");

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
       CONTACT SIDE MOTION
       ========================= */

    function initContactSideMotion() {
        const side = document.querySelector(".contact-side");
        if (!side) return;

        const bolt = side.querySelector(".contact-side-bolt");

        side.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;
                if (!bolt) return;

                const rect = side.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bolt.style.transform = `translate(${x * 14}px, ${y * 10}px) rotate(${x * 5}deg)`;
            },
            { passive: true }
        );

        side.addEventListener("pointerleave", () => {
            if (bolt) {
                bolt.style.transform = "";
            }
        });
    }

    /* =========================
       MAP INTERACTION
       ========================= */

    function initContactMapInteraction() {
        const mapCard = document.querySelector(".contact-map-card");
        const nodes = Array.from(document.querySelectorAll(".map-node"));

        if (!mapCard || !nodes.length) return;

        nodes.forEach((node, index) => {
            node.addEventListener("pointerenter", () => {
                mapCard.classList.add("is-map-active");
                mapCard.dataset.activeNode = String(index + 1);
            });

            node.addEventListener("pointerleave", () => {
                mapCard.classList.remove("is-map-active");
                mapCard.removeAttribute("data-active-node");
            });
        });

        mapCard.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const bolt = mapCard.querySelector(".contact-map-bolt");
                if (!bolt) return;

                const rect = mapCard.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bolt.style.transform = `translate(${x * 16}px, ${y * 12}px) rotate(${x * 5}deg)`;
            },
            { passive: true }
        );

        mapCard.addEventListener("pointerleave", () => {
            const bolt = mapCard.querySelector(".contact-map-bolt");
            if (bolt) {
                bolt.style.transform = "";
            }
        });
    }

    /* =========================
       BEFORE SUBMIT INTERACTION
       ========================= */

    function initBeforeSubmitInteraction() {
        const shell = document.querySelector(".contact-before-shell");
        const items = Array.from(document.querySelectorAll(".contact-before-list article"));

        if (!shell || !items.length) return;

        items.forEach((item, index) => {
            item.addEventListener("pointerenter", () => {
                shell.classList.add("is-before-active");
                shell.dataset.activeBefore = String(index + 1);

                items.forEach((card) => card.classList.remove("is-active-before"));
                item.classList.add("is-active-before");
            });

            item.addEventListener("pointerleave", () => {
                shell.classList.remove("is-before-active");
                shell.removeAttribute("data-active-before");
                item.classList.remove("is-active-before");
            });

            item.addEventListener("focusin", () => {
                shell.classList.add("is-before-active");
                item.classList.add("is-active-before");
            });

            item.addEventListener("focusout", () => {
                shell.classList.remove("is-before-active");
                item.classList.remove("is-active-before");
            });
        });
    }

    /* =========================
       CTA MOTION
       ========================= */

    function initContactCtaMotion() {
        const cta = document.querySelector(".contact-disclaimer .cta-photo");
        if (!cta) return;

        const bolt = cta.querySelector(".contact-cta-bolt");

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