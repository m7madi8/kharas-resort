(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setYear() {
    const el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initMobileMenu() {
    const toggle = $(".nav-toggle");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;

    const open = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("nav-open");
    };

    const close = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("nav-open");
    };

    const isOpen = () => nav.classList.contains("is-open");

    toggle.addEventListener("click", () => {
      if (isOpen()) close();
      else open();
    });

    // Close when clicking a nav link (mobile)
    nav.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      close();
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!isOpen()) return;
      const t = e.target;
      if (!t) return;
      if (nav.contains(t) || toggle.contains(t)) return;
      close();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!isOpen()) return;
      close();
    });

    // Keep menu closed when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 720px)").matches) close();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initMobileMenu();
  });
})();
