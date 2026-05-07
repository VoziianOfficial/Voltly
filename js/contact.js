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
        initBeforeSubmitSwiper();
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
       BEFORE SUBMIT SWIPER (TABLET/MOBILE)
       ========================= */

    function initBeforeSubmitSwiper() {
        const shell = document.querySelector(".contact-before-shell");
        const viewport = shell ? shell.querySelector(".contact-before-list") : null;

        if (!shell || !viewport) return;

        const supportsPointer = "PointerEvent" in window;
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
            currentTranslate: 0,
            isDragging: false,
            startX: 0,
            startTranslate: 0,
            pointerId: null,
            transitionMs: 420
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

        const setTransition = (enabled) => {
            track.style.transition = enabled
                ? `transform ${state.transitionMs}ms cubic-bezier(0.16, 1, 0.3, 1)`
                : "none";
        };

        const setTranslate = (value) => {
            state.currentTranslate = value;
            track.style.transform = `translate3d(${value}px, 0, 0)`;
        };

        const snapToIndex = (index, { animated } = { animated: true }) => {
            state.index = index;
            setTransition(Boolean(animated));
            setTranslate(-state.step * state.index);
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

            // Ensure track is in swiper mode
            shell.classList.add("is-before-swiper");

            const slideEls = Array.from(track.children).filter((node) => node.nodeType === 1);
            const viewportWidth = Math.max(0, viewport.clientWidth);

            state.slideWidth = Math.floor((viewportWidth - state.gap * (state.slidesPerView - 1)) / state.slidesPerView);
            state.step = state.slideWidth + state.gap;

            track.style.display = "flex";
            track.style.gap = `${state.gap}px`;
            track.style.width = "max-content";
            track.style.willChange = "transform";

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
            setTransition(false);
            track.style.transform = "";
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

        const normalizeIndexAfterTransition = () => {
            const slides = Array.from(track.children).filter((node) => node.nodeType === 1);
            const realCount = slides.filter((node) => node.getAttribute("data-before-clone") !== "true").length;
            if (!realCount) return;

            if (state.index >= realCount + state.cloneCount) {
                // Moved into head clones -> jump to first real
                snapToIndex(state.cloneCount, { animated: false });
            } else if (state.index < state.cloneCount) {
                // Moved into tail clones -> jump to last full view (keeps 2-up layout on tablet)
                const lastRealStartIndex = Math.max(
                    state.cloneCount,
                    realCount + state.cloneCount - state.slidesPerView
                );
                snapToIndex(lastRealStartIndex, { animated: false });
            }
        };

        track.addEventListener("transitionend", (event) => {
            if (event.propertyName !== "transform") return;
            if (!state.active) return;
            normalizeIndexAfterTransition();
        });

        const onPointerDown = (event) => {
            if (!state.active) return;
            if (!supportsPointer) return;
            if (event.pointerType === "mouse" && event.button !== 0) return;

            state.isDragging = true;
            state.pointerId = event.pointerId;
            state.startX = event.clientX;
            state.startTranslate = state.currentTranslate;
            setTransition(false);
            track.setPointerCapture(event.pointerId);
        };

        const onPointerMove = (event) => {
            if (!state.active || !state.isDragging) return;
            if (state.pointerId !== event.pointerId) return;

            const delta = event.clientX - state.startX;
            setTranslate(state.startTranslate + delta);
        };

        const onPointerUp = (event) => {
            if (!state.active || !state.isDragging) return;
            if (state.pointerId !== event.pointerId) return;

            state.isDragging = false;
            state.pointerId = null;

            const delta = state.currentTranslate - state.startTranslate;
            const threshold = Math.min(80, state.slideWidth * 0.22);

            if (delta <= -threshold) {
                goNext();
            } else if (delta >= threshold) {
                goPrev();
            } else {
                snapToIndex(state.index, { animated: true });
            }
        };

        if (supportsPointer) {
            track.addEventListener("pointerdown", onPointerDown, { passive: true });
            track.addEventListener("pointermove", onPointerMove, { passive: true });
            track.addEventListener("pointerup", onPointerUp, { passive: true });
            track.addEventListener("pointercancel", onPointerUp, { passive: true });
            track.addEventListener("lostpointercapture", onPointerUp, { passive: true });
        }
        // Touch fallback (older Safari / environments without pointer events).
        if (!supportsPointer) {
            let touchStartX = 0;
            let touchStartY = 0;
            let touchStartTranslate = 0;
            let isTouchDragging = false;

            track.addEventListener(
                "touchstart",
                (event) => {
                    if (!state.active) return;
                    const touch = event.touches && event.touches[0];
                    if (!touch) return;
                    isTouchDragging = true;
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                    touchStartTranslate = state.currentTranslate;
                    setTransition(false);
                },
                { passive: true }
            );

            track.addEventListener(
                "touchmove",
                (event) => {
                    if (!state.active || !isTouchDragging) return;
                    const touch = event.touches && event.touches[0];
                    if (!touch) return;
                    const deltaX = touch.clientX - touchStartX;
                    const deltaY = touch.clientY - touchStartY;
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        event.preventDefault();
                        setTranslate(touchStartTranslate + deltaX);
                    }
                },
                { passive: false }
            );

            track.addEventListener(
                "touchend",
                () => {
                    if (!state.active || !isTouchDragging) return;
                    isTouchDragging = false;
                    const delta = state.currentTranslate - touchStartTranslate;
                    const threshold = Math.min(80, state.slideWidth * 0.22);
                    if (delta <= -threshold) {
                        goNext();
                    } else if (delta >= threshold) {
                        goPrev();
                    } else {
                        snapToIndex(state.index, { animated: true });
                    }
                },
                { passive: true }
            );
        }

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

            // Re-layout for 1/2 slides per view.
            layoutSlides();
        };

        // MediaQueryList change listener compatibility.
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
