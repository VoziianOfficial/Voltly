"use strict";



(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initLegalHeroMotion();
        initLegalPanelGlow();
        initLegalSidebarMotion();
        initLegalDocumentMotion();
        markLegalPage();
    });

    

    function initLegalHeroMotion() {
        const hero = document.querySelector(".legal-hero");
        if (!hero) return;

        const bolt = hero.querySelector(".legal-hero-bolt-main");
        const currentOne = hero.querySelector(".legal-hero-current-one");
        const currentTwo = hero.querySelector(".legal-hero-current-two");

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

    

    function initLegalPanelGlow() {
        const panels = Array.from(document.querySelectorAll(".legal-sidebar, .legal-document"));

        if (!panels.length) return;

        panels.forEach((panel) => {
            panel.addEventListener(
                "pointermove",
                (event) => {
                    if (window.matchMedia("(max-width: 900px)").matches) return;

                    const rect = panel.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;

                    panel.style.setProperty("--glow-x", `${x}%`);
                    panel.style.setProperty("--glow-y", `${y}%`);
                },
                { passive: true }
            );

            panel.addEventListener("pointerleave", () => {
                panel.style.removeProperty("--glow-x");
                panel.style.removeProperty("--glow-y");
            });
        });
    }

    

    function initLegalSidebarMotion() {
        const sidebar = document.querySelector(".legal-sidebar");
        if (!sidebar) return;

        const bolt = sidebar.querySelector(".legal-sidebar-bolt");
        const links = Array.from(sidebar.querySelectorAll(".legal-sidebar-nav a"));

        sidebar.addEventListener(
            "pointermove",
            (event) => {
                if (window.matchMedia("(max-width: 900px)").matches) return;
                if (!bolt) return;

                const rect = sidebar.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bolt.style.transform = `translate(${x * 12}px, ${y * 10}px) rotate(${x * 5}deg)`;
            },
            { passive: true }
        );

        sidebar.addEventListener("pointerleave", () => {
            if (bolt) {
                bolt.style.transform = "";
            }

            sidebar.classList.remove("is-legal-active");
        });

        links.forEach((link) => {
            link.addEventListener("pointerenter", () => {
                sidebar.classList.add("is-legal-active");
            });

            link.addEventListener("focus", () => {
                sidebar.classList.add("is-legal-active");
            });

            link.addEventListener("blur", () => {
                sidebar.classList.remove("is-legal-active");
            });
        });
    }

    

    function initLegalDocumentMotion() {
        const documentPanel = document.querySelector(".legal-document");
        if (!documentPanel) return;

        const blocks = Array.from(documentPanel.querySelectorAll(".legal-block, .legal-disclaimer"));

        blocks.forEach((block) => {
            block.addEventListener("pointerenter", () => {
                documentPanel.classList.add("is-legal-active");
            });

            block.addEventListener("pointerleave", () => {
                documentPanel.classList.remove("is-legal-active");
            });

            block.addEventListener("focusin", () => {
                documentPanel.classList.add("is-legal-active");
            });

            block.addEventListener("focusout", () => {
                documentPanel.classList.remove("is-legal-active");
            });
        });
    }

    

    function markLegalPage() {
        const legalPage = document.body.dataset.legalPage;
        if (!legalPage) return;

        const map = {
            privacy: "privacy-policy.html",
            cookie: "cookie-policy.html",
            terms: "terms-of-service.html"
        };

        const currentHref = map[legalPage];

        if (!currentHref) return;

        document.querySelectorAll(".legal-sidebar-nav a").forEach((link) => {
            const href = link.getAttribute("href");

            if (href === currentHref) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }
})();