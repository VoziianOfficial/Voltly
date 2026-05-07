"use strict";


window.SITE_CONFIG = {
    companyName: "Voltly",
    companyId: "Voltly Home Services Matching LLC",
    brand: {
        shortName: "Voltly",
        tagline: "",
        logoLabel: "{{companyName}} home"
    },

    phone: "(800) 314-2218",
    phoneHref: "tel:+18003142218",
    phoneLabel: "Call {{companyName}} at {{phone}}",

    email: "hello@voltlymatch.com",

    address: {
        line1: "845 W Madison St",
        city: "Chicago",
        state: "IL",
        zip: "60607",
        country: "USA",
        full: "845 W Madison St, Chicago, IL 60607, USA"
    },

    serviceArea: "USA electrical provider matching platform",
    footerText:
        "{{companyName}} helps homeowners organize electrical project details and compare independent local provider options for common residential electrical request categories.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "{{companyName}} is an independent matching platform and does not perform electrical work directly. Provider availability may vary by ZIP code, service type, and scheduling conditions.",

    navigation: [
        { label: "Home", href: "index.html" },
        { label: "Services", href: "services.html" },
        { label: "About", href: "about.html" },
        { label: "Contact", href: "contact.html" }
    ],

    legalLinks: [
        { label: "Privacy Policy", href: "privacy-policy.html" },
        { label: "Cookie Policy", href: "cookie-policy.html" },
        { label: "Terms of Service", href: "terms-of-service.html" }
    ],

    services: [
        {
            id: "panel-upgrades",
            title: "Panel Upgrades",
            shortTitle: "Panel Upgrades",
            href: "panel-upgrades.html",
            icon: "panel-top",
            image: "assets/images/panel-upgrades.jpg",
            cardText:
                "Compare local provider options for electrical panel expansion, replacement context, service capacity updates, and related project planning.",
            summary:
                "{{companyName}} helps homeowners prepare panel upgrade request details and compare independent local provider options.",
            heroTitle: "Compare local panel upgrade provider options.",
            heroText:
                "Share property details, current panel context, timing, and project notes before reviewing independent local provider options.",
            pageKicker: "Electrical service category",
            pageIntro:
                "Panel upgrade requests often involve electrical capacity, utility coordination, permit requirements, and property-specific conditions.",
            evaluationPoints: [
                "License and insurance verification",
                "Permit and inspection approach",
                "Scope clarity and electrical capacity context",
                "Timeline and utility coordination",
                "Quote structure and warranty details"
            ],
            prepPoints: [
                "Current panel age or known limitations",
                "Requested amperage or capacity concerns",
                "Appliance additions or remodel context",
                "Photos or notes about panel location",
                "Preferred project timing"
            ],
            faq: [
                {
                    question: "When might a homeowner request a panel upgrade category?",
                    answer:
                        "This category may fit when a homeowner is planning capacity changes, addressing an outdated panel, or preparing for additional electrical demand at the property."
                },
                {
                    question: "Does {{companyName}} perform panel upgrades directly?",
                    answer:
                        "No. {{companyName}} does not perform electrical work directly. The platform helps organize request details and compare independent local provider options."
                },
                {
                    question: "What should homeowners compare before choosing a panel upgrade provider?",
                    answer:
                        "Homeowners should review licensing, insurance, permit expectations, quote clarity, service capacity details, timeline, and warranty information."
                },
                {
                    question: "Can provider availability vary by ZIP code?",
                    answer:
                        "Yes. Provider availability may vary by service type, location, and scheduling conditions."
                }
            ]
        },
        {
            id: "wiring-rewiring",
            title: "Wiring & Rewiring",
            shortTitle: "Wiring & Rewiring",
            href: "wiring-rewiring.html",
            icon: "cable",
            image: "assets/images/wiring-rewiring.jpg",
            cardText:
                "Compare provider options for wiring updates, rewiring scope, room additions, renovation-related electrical planning, and older-home electrical concerns.",
            summary:
                "{{companyName}} helps homeowners organize wiring and rewiring request details before comparing local providers.",
            heroTitle: "Compare local wiring and rewiring provider options.",
            heroText:
                "Prepare a cleaner request for electrical wiring updates, renovation work, room additions, or older-home rewiring context.",
            pageKicker: "Electrical service category",
            pageIntro:
                "Wiring requests often depend on home age, renovation plans, access conditions, room scope, and local code requirements.",
            evaluationPoints: [
                "Experience relevant to the requested scope",
                "Permit and code discussion",
                "Project access and wall/finish expectations",
                "Quote detail and exclusions",
                "Timeline and cleanup expectations"
            ],
            prepPoints: [
                "Rooms or areas affected",
                "Known electrical issues or outdated wiring concerns",
                "Renovation or addition context",
                "Property type and approximate age",
                "Preferred timeline"
            ],
            faq: [
                {
                    question: "What projects may fit the wiring and rewiring category?",
                    answer:
                        "This category may be useful for room updates, renovation-related electrical work, older-home rewiring concerns, or broader electrical wiring changes."
                },
                {
                    question: "Does {{companyName}} send its own electricians?",
                    answer:
                        "No. {{companyName}} is not an electrician company. It helps homeowners compare independent local provider options."
                },
                {
                    question: "What should homeowners clarify in a wiring request?",
                    answer:
                        "It helps to note which rooms are affected, whether this is part of a renovation, the property type, and any known wiring concerns."
                },
                {
                    question: "Should homeowners ask about permits and inspections?",
                    answer:
                        "Yes. Permit and inspection needs may vary, so homeowners should confirm those details directly with any provider they consider hiring."
                }
            ]
        },
        {
            id: "ev-charger-installation",
            title: "EV Charger Installation",
            shortTitle: "EV Charger Installation",
            href: "ev-charger-installation.html",
            icon: "battery-charging",
            image: "assets/images/ev-charger.jpg",
            cardText:
                "Compare local provider options for home EV charger installation planning, panel capacity review context, charger location, and electrical readiness.",
            summary:
                "{{companyName}} helps homeowners prepare EV charger installation request details and compare local provider options.",
            heroTitle: "Compare local EV charger installation provider options.",
            heroText:
                "Prepare the request around charger type, location, electrical capacity context, and project timing before comparing independent providers.",
            pageKicker: "Electrical service category",
            pageIntro:
                "EV charger requests often involve panel capacity, parking layout, charger preferences, mounting location, and installation logistics.",
            evaluationPoints: [
                "Panel and capacity review discussion",
                "Equipment compatibility context",
                "Permit expectations",
                "Installation location planning",
                "Quote transparency and scheduling"
            ],
            prepPoints: [
                "Vehicle or charger type if known",
                "Garage, driveway, or parking location",
                "Distance from panel to install point",
                "Photos of the installation area",
                "Desired project timing"
            ],
            faq: [
                {
                    question: "What details help with an EV charger installation request?",
                    answer:
                        "Helpful details include charger type if known, install location, parking setup, distance from the panel, and photos or notes about the area."
                },
                {
                    question: "Does {{companyName}} install EV chargers directly?",
                    answer:
                        "No. {{companyName}} does not perform electrical work directly and does not provide installation services itself."
                },
                {
                    question: "Should homeowners ask about panel capacity?",
                    answer:
                        "Yes. EV charger projects may involve capacity considerations, so homeowners should discuss that directly with any provider they compare."
                },
                {
                    question: "Can permits apply to EV charger projects?",
                    answer:
                        "Yes. Permit requirements may vary by project and location, so homeowners should confirm permit expectations with providers."
                }
            ]
        },
        {
            id: "lighting-installation",
            title: "Lighting Installation",
            shortTitle: "Lighting Installation",
            href: "lighting-installation.html",
            icon: "lightbulb",
            image: "assets/images/lighting-installation.jpg",
            cardText:
                "Compare local provider options for indoor or outdoor lighting installation requests, fixture changes, layout updates, and lighting improvement projects.",
            summary:
                "{{companyName}} helps homeowners organize lighting installation request details and compare independent local providers.",
            heroTitle: "Compare local lighting installation provider options.",
            heroText:
                "Share fixture plans, room context, property needs, and timing before comparing local provider options for lighting projects.",
            pageKicker: "Electrical service category",
            pageIntro:
                "Lighting requests can range from fixture updates to layout improvements, exterior lighting changes, and broader design-related electrical needs.",
            evaluationPoints: [
                "Scope clarity and fixture discussion",
                "Indoor vs. outdoor electrical context",
                "Access needs and installation logistics",
                "Quote detail and exclusions",
                "Timeline and finishing expectations"
            ],
            prepPoints: [
                "Type of lighting requested",
                "Rooms or exterior areas involved",
                "Fixture preferences if known",
                "Whether this is part of a remodel",
                "Desired timing"
            ],
            faq: [
                {
                    question: "What projects fit the lighting installation category?",
                    answer:
                        "This category may fit fixture replacements, new lighting layouts, exterior lighting changes, or broader residential lighting improvement requests."
                },
                {
                    question: "Does {{companyName}} provide direct lighting installation?",
                    answer:
                        "No. {{companyName}} is an independent matching platform and does not perform electrical work directly."
                },
                {
                    question: "What details should homeowners include in a lighting request?",
                    answer:
                        "It helps to include the area involved, fixture type if known, whether the project is indoors or outdoors, and whether the work is part of a remodel."
                },
                {
                    question: "Should lighting providers be compared on more than price?",
                    answer:
                        "Yes. Homeowners should also compare scope clarity, qualifications, insurance, timing, and overall project fit."
                }
            ]
        }
    ],

    forms: {
        contact: {
            title: "Start electrical request",
            intro:
                "Share the category, ZIP code, timing, and project notes so the request is easier to review.",
            submitText: "Submit request",
            successTitle: "Request received.",
            successText:
                "Your information has been prepared successfully. A follow-up step can continue from here.",
            errorText:
                "Please review the highlighted fields and confirm the homeowner verification reminder."
        }
    },

    cookieBanner: {
        storageKey: "voltly_cookie_choice",
        title: "Privacy and policy preferences",
        text:
            "{{companyName}} uses a simple cookie preference choice to remember your selection and improve site functionality.",
        accept: "Accept",
        decline: "Decline",
        links: [
            { label: "Privacy Policy", href: "privacy-policy.html" },
            { label: "Cookie Policy", href: "cookie-policy.html" },
            { label: "Terms of Service", href: "terms-of-service.html" }
        ]
    },

    faq: [
        {
            question: "How does {{companyName}} help compare local electrical providers?",
            answer:
                "{{companyName}} helps homeowners organize project details, select a service category, and compare independent local electrical provider options based on the request context."
        },
        {
            question: "Does {{companyName}} perform electrical work directly?",
            answer:
                "No. {{companyName}} is not a direct contractor or electrician company. It is an independent matching platform."
        },
        {
            question: "What should homeowners check before hiring an electrical provider?",
            answer:
                "Homeowners should verify licensing, insurance, permit expectations, qualifications, scope clarity, scheduling, and warranty details before hiring."
        },
        {
            question: "Are quotes from providers usually free?",
            answer:
                "Quote policies can vary by provider and project type. Homeowners should confirm pricing and estimate terms directly with the provider."
        },
        {
            question: "Does provider availability vary by ZIP code?",
            answer:
                "Yes. Availability may vary by ZIP code, service type, project timing, and provider scheduling."
        }
    ],

    socialProof: {
        eyebrow: "Why homeowners use {{companyName}}",
        title: "A cleaner way to compare electrical provider options",
        items: [
            {
                label: "Focused categories",
                value: "4",
                text: "Simple electrical request paths for common homeowner needs."
            },
            {
                label: "Platform role",
                value: "Independent",
                text: "{{companyName}} helps organize comparison, not perform the work."
            },
            {
                label: "Coverage",
                value: "USA",
                text: "Provider matching context designed for homeowners across the United States."
            }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "{{companyName}} | Compare Local Electrical Provider Options",
            description:
                "{{companyName}} helps homeowners prepare project details and compare independent local electrical provider options for panel upgrades, wiring, EV charger installation, and lighting."
        },
        "services.html": {
            title: "Electrical Service Categories | {{companyName}}",
            description:
                "Explore {{companyName}} service categories for panel upgrades, wiring and rewiring, EV charger installation, and lighting provider matching."
        },
        "about.html": {
            title: "About {{companyName}} | Independent Electrical Matching Platform",
            description:
                "Learn how {{companyName}} helps homeowners organize electrical request details and compare independent local provider options."
        },
        "contact.html": {
            title: "Contact {{companyName}} | Start Electrical Request Matching",
            description:
                "Start an electrical request with {{companyName}} by sharing your service type, ZIP code, project timing, and notes."
        },
        "panel-upgrades.html": {
            title: "Panel Upgrades | Compare Local Provider Options | {{companyName}}",
            description:
                "Prepare a panel upgrade request and compare independent local electrical provider options with {{companyName}}."
        },
        "wiring-rewiring.html": {
            title: "Wiring & Rewiring | Compare Local Provider Options | {{companyName}}",
            description:
                "Organize a wiring or rewiring request and compare independent local electrical provider options with {{companyName}}."
        },
        "ev-charger-installation.html": {
            title: "EV Charger Installation | Compare Local Provider Options | {{companyName}}",
            description:
                "Prepare an EV charger installation request and compare independent local provider options with {{companyName}}."
        },
        "lighting-installation.html": {
            title: "Lighting Installation | Compare Local Provider Options | {{companyName}}",
            description:
                "Prepare a lighting installation request and compare independent local provider options with {{companyName}}."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | {{companyName}}",
            description:
                "Review the {{companyName}} Privacy Policy for information about data handling, contact details, and platform use."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | {{companyName}}",
            description:
                "Review the {{companyName}} Cookie Policy and learn how the site handles cookie preference choices."
        },
        "terms-of-service.html": {
            title: "Terms of Service | {{companyName}}",
            description:
                "Review the {{companyName}} Terms of Service, platform role, user responsibilities, and legal notices."
        }
    }
};
