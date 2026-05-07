"use strict";

/* ==========================================================
   VOLTLY — SERVICES PAGE INTERACTIONS
   File: /js/services.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initServicesHeroMotion();
        initPowerRouteInteraction();
        initServicesMapInteraction();
        initServicesPhotoCurrent();
    });

    /* =========================
       HERO MOTION
       ========================= */

    function initServicesHeroMotion() {
        const hero = document.querySelector(".services-hero");
        if (!hero) return;

        const mainBolt = hero.querySelector(".services-hero-bolt-main");
        const smallBolt = hero.querySelector(".services-hero-bolt-small");
        const arcOne = hero.querySelector(".services-hero-arc-one");
        const arcTwo = hero.querySelector(".services-hero-arc-two");

        hero.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const rect = hero.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (mainBolt) {
                    mainBolt.style.transform = `translate(${x * 18}px, ${y * 12}px) rotate(${8 + x * 5}deg)`;
                }

                if (smallBolt) {
                    smallBolt.style.transform = `translate(${x * -12}px, ${y * -8}px) rotate(${-16 + x * 4}deg)`;
                }

                if (arcOne) {
                    arcOne.style.transform = `translate(${x * 14}px, ${y * 8}px) rotate(${-6 + x * 2}deg)`;
                }

                if (arcTwo) {
                    arcTwo.style.transform = `translate(${x * -12}px, ${y * -6}px) rotate(${5 - x * 2}deg)`;
                }
            },
            { passive: true }
        );

        hero.addEventListener("pointerleave", () => {
            if (mainBolt) mainBolt.style.transform = "rotate(8deg)";
            if (smallBolt) smallBolt.style.transform = "rotate(-16deg)";
            if (arcOne) arcOne.style.transform = "rotate(-6deg)";
            if (arcTwo) arcTwo.style.transform = "rotate(5deg)";
        });
    }

    /* =========================
       POWER ROUTE INTERACTION
       ========================= */

    function initPowerRouteInteraction() {
        const shell = document.querySelector(".power-route-shell");
        const steps = Array.from(document.querySelectorAll(".power-route-steps article"));

        if (!shell || !steps.length) return;

        steps.forEach((step, index) => {
            step.addEventListener("pointerenter", () => {
                shell.classList.add("is-route-active");
                shell.dataset.activeStep = String(index + 1);

                steps.forEach((item) => item.classList.remove("is-active-step"));
                step.classList.add("is-active-step");
            });

            step.addEventListener("pointerleave", () => {
                shell.classList.remove("is-route-active");
                shell.removeAttribute("data-active-step");
                step.classList.remove("is-active-step");
            });

            step.addEventListener("focusin", () => {
                shell.classList.add("is-route-active");
                step.classList.add("is-active-step");
            });

            step.addEventListener("focusout", () => {
                shell.classList.remove("is-route-active");
                step.classList.remove("is-active-step");
            });
        });
    }

    /* =========================
       SERVICE MAP INTERACTION
       ========================= */

    function initServicesMapInteraction() {
        const panel = document.querySelector(".services-map-panel");
        const rows = Array.from(document.querySelectorAll(".services-map-lines article"));

        if (!panel || !rows.length) return;

        rows.forEach((row, index) => {
            row.addEventListener("pointerenter", () => {
                panel.classList.add("is-map-active");
                panel.dataset.activeRoute = String(index + 1);
            });

            row.addEventListener("pointerleave", () => {
                panel.classList.remove("is-map-active");
                panel.removeAttribute("data-active-route");
            });
        });
    }

    /* =========================
       PHOTO CURRENT MOTION
       ========================= */

    function initServicesPhotoCurrent() {
        const photo = document.querySelector(".services-check-photo");
        if (!photo) return;

        const bolt = photo.querySelector(".services-check-photo-bolt");

        photo.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const rect = photo.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (bolt) {
                    bolt.style.transform = `translate(${x * 16}px, ${y * 12}px) rotate(${x * 5}deg)`;
                }
            },
            { passive: true }
        );

        photo.addEventListener("pointerleave", () => {
            if (bolt) {
                bolt.style.transform = "";
            }
        });
    }
})();