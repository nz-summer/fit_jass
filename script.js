const COACH_WHATSAPP = "64273622146";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !menuToggle.parentElement?.contains(event.target)) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const planSelect = document.querySelector('select[name="plan"]');
if (planSelect) {
  const requestedPlan = new URLSearchParams(window.location.search).get("plan");
  if (requestedPlan) {
    const matchingOption = Array.from(planSelect.options).find((option) => option.value === requestedPlan || option.text === requestedPlan);
    if (matchingOption) planSelect.value = matchingOption.value;
  }
}

document.querySelectorAll("[data-plan]").forEach((link) => {
  link.addEventListener("click", () => {
    const plan = link.getAttribute("data-plan");
    if (planSelect && plan) planSelect.value = plan;
  });
});

document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = form.querySelector(".form-feedback");
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;

    const formData = new FormData(form);
    const message = [
      "Hi Fit Jass! I'd love to talk about training.",
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      formData.has("plan") ? `Plan I'm interested in: ${formData.get("plan")}` : `My main goal: ${formData.get("goal")}`,
      formData.has("experience") ? `Training experience: ${formData.get("experience")}` : "",
      formData.get("message") ? `A little more about me: ${formData.get("message")}` : "",
    ].filter(Boolean).join("\n");

    if (feedback) feedback.textContent = "";
    window.location.assign(`https://wa.me/${COACH_WHATSAPP}?text=${encodeURIComponent(message)}`);
  });
});
