(function () {
    "use strict";

    const config = window.SITE_CONFIG;
    if (!config) return;

    const form = document.querySelector("[data-request-form]");
    if (!form) return;

    const status = form.querySelector("[data-form-status]");
    const serviceSelect = form.querySelector("#service-type");

    if (serviceSelect && serviceSelect.options.length <= 1) {
        config.forms.serviceOptions.forEach((option) => {
            const item = document.createElement("option");
            item.value = option;
            item.textContent = option;
            serviceSelect.appendChild(item);
        });
    }

    const setFieldState = (field, valid, message) => {
        const group = field.closest(".field-group");
        if (!group) return;

        group.classList.toggle("has-error", !valid);
        group.classList.toggle("is-valid", valid && Boolean(field.value.trim()));

        const error = group.querySelector(".field-error");
        if (error) error.textContent = valid ? "" : message;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.elements.name;
        const phone = form.elements.phone;
        const email = form.elements.email;
        const zip = form.elements.zip;
        const service = form.elements.service;

        let valid = true;

        if (!name.value.trim()) {
            valid = false;
            setFieldState(name, false, "Name is required.");
        } else {
            setFieldState(name, true, "");
        }

        if (!phone.value.trim() && !email.value.trim()) {
            valid = false;
            setFieldState(phone, false, "Phone or email is required.");
            setFieldState(email, false, "Phone or email is required.");
        } else {
            setFieldState(phone, true, "");
            setFieldState(email, true, "");
        }

        if (!zip.value.trim()) {
            valid = false;
            setFieldState(zip, false, "ZIP code is required.");
        } else {
            setFieldState(zip, true, "");
        }

        if (!service.value.trim()) {
            valid = false;
            setFieldState(service, false, "Choose a service type.");
        } else {
            setFieldState(service, true, "");
        }

        if (!valid) {
            if (status) {
                status.textContent = "Please complete the highlighted request details.";
                status.className = "form-status is-error";
            }
            return;
        }

        if (status) {
            status.textContent = config.forms.successMessage;
            status.className = "form-status is-success";
            status.setAttribute("tabindex", "-1");
            status.focus({ preventScroll: false });
        }
        form.reset();
        form.querySelectorAll(".field-group").forEach((group) => group.classList.remove("has-error", "is-valid"));
    });

    form.addEventListener("input", (event) => {
        const field = event.target;
        if (!field.matches("input, textarea, select")) return;
        if (field.value.trim()) setFieldState(field, true, "");
    });
}());
