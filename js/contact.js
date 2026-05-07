"use strict";



(function () {
    document.addEventListener("DOMContentLoaded", () => {
        initContactHeroMotion();
        initContactSideMotion();
        initContactMapInteraction();
        initBeforeSubmitInteraction();
        initBeforeSubmitSwiper();
        initContactCtaMotion();
    });

    

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

    

    function initContactMapInteraction() {
        const mapCard = document.querySelector(".contact-map-card");
        const nodes = Array.from(document.querySelectorAll(".map-node"));

        if (!mapCard || !nodes.length) return;

        const address =
            window.Voltly &&
            window.Voltly.config &&
            window.Voltly.config.address &&
            window.Voltly.config.address.full;
        const mapUrl = address
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
            : null;

        if (mapUrl) {
            mapCard.classList.add("is-map-link");
            mapCard.setAttribute("role", "link");
            mapCard.setAttribute("tabindex", "0");

            const existingLabel = mapCard.getAttribute("aria-label") || "Service area map";
            mapCard.setAttribute("aria-label", `${existingLabel}. Open platform address in maps.`);

            mapCard.addEventListener("click", () => {
                window.open(mapUrl, "_blank", "noopener");
            });

            mapCard.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                window.open(mapUrl, "_blank", "noopener");
            });
        }

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

    

    function initBeforeSubmitSwiper() {
        const shell = document.querySelector(".contact-before-shell");
        const viewport = shell ? shell.querySelector(".contact-before-list") : null;

        if (!shell || !viewport) return;

        const mediaTablet = window.matchMedia("(max-width: 1024px)");
        const mediaCoarseTablet = window.matchMedia("(pointer: coarse) and (max-width: 1400px)");
        const mediaMobile = window.matchMedia("(max-width: 640px)");

        const state = {
            active: false,
            slidesPerView: 2,
            gap: 12,
            index: 0,
            cloneCount: 0,
            slideWidth: 0,
            step: 0,
            scrollEndTimer: null
        };

        let track = null;

        const ensureTrack = () => {
            if (track && track.isConnected) return track;
            track = viewport.querySelector(".contact-before-track");
            if (track) return track;

            track = document.createElement("div");
            track.className = "contact-before-track";
            const children = Array.from(viewport.children);
            children.forEach((child) => track.appendChild(child));
            viewport.appendChild(track);
            return track;
        };

        track = ensureTrack();

        const originalSlides = Array.from(track.children).filter((node) => node.nodeType === 1);
        if (!originalSlides.length) return;

        const readSlidesPerView = () => (mediaMobile.matches ? 1 : 2);

        const clampIndex = (index) => {
            if (index < 0) return 0;
            return index;
        };

        const snapToIndex = (index, { animated } = { animated: true }) => {
            index = clampIndex(index);
            state.index = index;
            const left = state.step * state.index;
            viewport.scrollTo({ left, behavior: animated ? "smooth" : "auto" });
        };

        const cleanupClones = () => {
            Array.from(track.querySelectorAll('[data-before-clone="true"]')).forEach((node) => node.remove());
        };

        const buildClones = () => {
            cleanupClones();

            const slides = Array.from(track.children).filter((node) => node.nodeType === 1);
            const realSlides = slides.filter((node) => node.getAttribute("data-before-clone") !== "true");

            state.cloneCount = Math.min(state.slidesPerView, realSlides.length);
            if (state.cloneCount === 0) return;

            const headClones = realSlides.slice(0, state.cloneCount).map((node) => {
                const clone = node.cloneNode(true);
                clone.setAttribute("data-before-clone", "true");
                clone.setAttribute("aria-hidden", "true");
                clone.tabIndex = -1;
                return clone;
            });

            const tailClones = realSlides.slice(-state.cloneCount).map((node) => {
                const clone = node.cloneNode(true);
                clone.setAttribute("data-before-clone", "true");
                clone.setAttribute("aria-hidden", "true");
                clone.tabIndex = -1;
                return clone;
            });

            tailClones.forEach((clone) => track.insertBefore(clone, track.firstChild));
            headClones.forEach((clone) => track.appendChild(clone));
        };

        const layoutSlides = () => {
            state.slidesPerView = readSlidesPerView();
            buildClones();

            
            shell.classList.add("is-before-swiper");

            const slideEls = Array.from(track.children).filter((node) => node.nodeType === 1);
            const viewportWidth = Math.max(0, viewport.clientWidth);

            state.slideWidth = Math.floor((viewportWidth - state.gap * (state.slidesPerView - 1)) / state.slidesPerView);
            state.step = state.slideWidth + state.gap;

            track.style.display = "flex";
            track.style.gap = `${state.gap}px`;
            track.style.width = "max-content";
            track.style.willChange = "";

            slideEls.forEach((slide) => {
                slide.style.flex = `0 0 ${state.slideWidth}px`;
                slide.style.maxWidth = `${state.slideWidth}px`;
            });

            state.index = state.cloneCount;
            snapToIndex(state.index, { animated: false });
        };

        const destroy = () => {
            if (!state.active) return;
            state.active = false;

            shell.classList.remove("is-before-swiper");
            shell.removeAttribute("tabindex");
            track.style.display = "";
            track.style.gap = "";
            track.style.width = "";
            track.style.willChange = "";

            cleanupClones();

            Array.from(track.children).forEach((slide) => {
                slide.style.flex = "";
                slide.style.maxWidth = "";
            });
        };

        const goNext = () => {
            snapToIndex(state.index + 1, { animated: true });
        };

        const goPrev = () => {
            snapToIndex(state.index - 1, { animated: true });
        };

        const normalizeIndexAfterScroll = () => {
            const slides = Array.from(track.children).filter((node) => node.nodeType === 1);
            const realCount = slides.filter((node) => node.getAttribute("data-before-clone") !== "true").length;
            if (!realCount) return;

            
            const rawIndex = state.step ? Math.round(viewport.scrollLeft / state.step) : state.index;
            state.index = rawIndex;

            if (state.index >= realCount + state.cloneCount) {
                
                snapToIndex(state.cloneCount, { animated: false });
            } else if (state.index < state.cloneCount) {
                
                const lastRealStartIndex = Math.max(
                    state.cloneCount,
                    realCount + state.cloneCount - state.slidesPerView
                );
                snapToIndex(lastRealStartIndex, { animated: false });
            }
        };

        viewport.addEventListener(
            "scroll",
            () => {
                if (!state.active) return;
                if (state.scrollEndTimer) window.clearTimeout(state.scrollEndTimer);
                state.scrollEndTimer = window.setTimeout(() => {
                    normalizeIndexAfterScroll();
                }, 90);
            },
            { passive: true }
        );

        const onKeyDown = (event) => {
            if (!state.active) return;
            if (event.key === "ArrowRight") {
                event.preventDefault();
                goNext();
            }
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goPrev();
            }
        };

        shell.addEventListener("keydown", onKeyDown);

        const enableIfNeeded = () => {
            if (!mediaTablet.matches && !mediaCoarseTablet.matches) {
                destroy();
                return;
            }

            state.active = true;
            shell.setAttribute("tabindex", "0");
            layoutSlides();
        };

        enableIfNeeded();

        const onBreakpointChange = () => {
            if (!mediaTablet.matches && !mediaCoarseTablet.matches) {
                destroy();
                return;
            }

            
            layoutSlides();
        };

        
        [mediaTablet, mediaMobile, mediaCoarseTablet].forEach((mq) => {
            if (!mq) return;
            if (typeof mq.addEventListener === "function") {
                mq.addEventListener("change", onBreakpointChange);
            } else if (typeof mq.addListener === "function") {
                mq.addListener(onBreakpointChange);
            }
        });

        window.addEventListener("resize", () => {
            if (!state.active) return;
            layoutSlides();
        });
    }

    

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
