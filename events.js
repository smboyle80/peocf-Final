"use strict";

// ---- Registration Modal ----
const modal = document.getElementById("regModal");
const modalClose = document.getElementById("modalClose");
const modalEventName = document.getElementById("modalEventName");
const regEventField = document.getElementById("regEventField");

// Open modal when any Register button is clicked
document.querySelectorAll(".register-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        const eventName = btn.getAttribute("data-event");
        modalEventName.textContent = eventName;
        regEventField.value = eventName;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.getElementById("regName").focus();
    });
});

// Close modal on X button
modalClose.addEventListener("click", closeModal);

// Close modal on overlay click
modal.addEventListener("click", function(e) {
    if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}
