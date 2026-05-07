(function () {
    "use strict";

    const config = window.SITE_CONFIG;
    if (!config) return;

    const title = document.querySelector("[data-legal-title]");
    const current = window.location.pathname.split("/").pop() || "index.html";
    const labels = {
        "privacy-policy.html": "Privacy Policy",
        "cookie-policy.html": "Cookie Policy",
        "terms-of-service.html": "Terms of Service"
    };

    if (title && labels[current]) {
        title.textContent = labels[current];
    }
}());
