"use strict";



(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initHeroElectricalMotion();
        initPowerPanelPulse();
        initServiceCardCurrent();
        initLiveWireHover();
        initHighVoltMotion();
    });

    

    function initHeroElectricalMotion() {
        const hero = document.querySelector(".home-hero");
        if (!hero) return;

        const mainBolt = hero.querySelector(".hero-bolt-main");
        const smallBolt = hero.querySelector(".hero-bolt-small");
        const arcOne = hero.querySelector(".hero-arc-one");
        const arcTwo = hero.querySelector(".hero-arc-two");

        const elements = [mainBolt, smallBolt, arcOne, arcTwo].filter(Boolean);
        if (!elements.length) return;

        hero.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const rect = hero.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (mainBolt) {
                    mainBolt.style.transform = `translate(${x * 18}px, ${y * 14}px) rotate(${9 + x * 4}deg)`;
                }

                if (smallBolt) {
                    smallBolt.style.transform = `translate(${x * -12}px, ${y * -10}px) rotate(${-14 + x * 5}deg)`;
                }

                if (arcOne) {
                    arcOne.style.transform = `translate(${x * 16}px, ${y * 8}px) rotate(${-7 + x * 2}deg)`;
                }

                if (arcTwo) {
                    arcTwo.style.transform = `translate(${x * -12}px, ${y * -6}px) rotate(${5 - x * 2}deg)`;
                }
            },
            { passive: true }
        );

        hero.addEventListener("pointerleave", () => {
            if (mainBolt) mainBolt.style.transform = "rotate(9deg)";
            if (smallBolt) smallBolt.style.transform = "rotate(-14deg)";
            if (arcOne) arcOne.style.transform = "rotate(-7deg)";
            if (arcTwo) arcTwo.style.transform = "rotate(5deg)";
        });
    }

    

    function initPowerPanelPulse() {
        const panel = document.querySelector(".home-power-panel");
        if (!panel) return;

        const nodes = Array.from(panel.querySelectorAll(".power-flow span"));
        if (!nodes.length) return;

        let activeIndex = 0;

        window.setInterval(() => {
            nodes.forEach((node) => node.classList.remove("is-active-current"));

            if (nodes[activeIndex]) {
                nodes[activeIndex].classList.add("is-active-current");
            }

            activeIndex = (activeIndex + 1) % nodes.length;
        }, 1100);
    }

    

    function initServiceCardCurrent() {
        const cards = Array.from(document.querySelectorAll(".home-service-grid .service-card"));

        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener("pointerenter", () => {
                card.classList.add("is-current-active");
            });

            card.addEventListener("pointerleave", () => {
                card.classList.remove("is-current-active");
            });

            card.addEventListener("focus", () => {
                card.classList.add("is-current-active");
            });

            card.addEventListener("blur", () => {
                card.classList.remove("is-current-active");
            });
        });
    }

    

    function initLiveWireHover() {
        const section = document.querySelector(".home-live-wire");
        const items = Array.from(document.querySelectorAll(".live-wire-checks article"));

        if (!section || !items.length) return;

        items.forEach((item, index) => {
            item.addEventListener("pointerenter", () => {
                section.dataset.activeWire = String(index + 1);
            });

            item.addEventListener("pointerleave", () => {
                section.removeAttribute("data-active-wire");
            });
        });
    }

    

    function initHighVoltMotion() {
        const card = document.querySelector(".highvolt-card");
        if (!card) return;

        const bolt = card.querySelector(".highvolt-bolt");
        const arc = card.querySelector(".highvolt-arc");

        card.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;

                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (bolt) {
                    bolt.style.transform = `translate(${x * 18}px, ${y * 12}px) rotate(${x * 4}deg)`;
                }

                if (arc) {
                    arc.style.transform = `translateY(${y * 10}px) rotate(${-2 + x * 2}deg)`;
                }
            },
            { passive: true }
        );

        card.addEventListener("pointerleave", () => {
            if (bolt) bolt.style.transform = "";
            if (arc) arc.style.transform = "rotate(-2deg)";
        });
    }
})();