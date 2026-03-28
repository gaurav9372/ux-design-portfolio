import { $, smoothTo } from './utils.js';

export const initNav = () => {
  const burger = $("burger");
  const panel = $("mobilePanel");
  const navEl = document.querySelector(".nav");
  const worksCta = $("worksCta");

  if (!burger || !panel) return;

  const openMenu = () => {
    burger.setAttribute("aria-expanded", "true");
    panel.classList.add("open");
  };
  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    panel.classList.remove("open");
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      closeMenu();
      smoothTo(href);
      history.replaceState(null, "", href);
    });
  });

  // CTA jump
  if (worksCta) {
    worksCta.addEventListener("click", () => smoothTo("#projects"));
  }

  // Navbar shrink + hide/show on scroll
  if (!navEl) return;

  const NAV_SHOW_THRESHOLD = 20;
  const NAV_HIDE_THRESHOLD = 160;
  const NAV_SCROLL_START = 20;
  const NAV_SCROLL_END = 120;
  const MIN_DELTA = 6;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const delta = y - lastY;
    const progress = Math.min(Math.max((y - NAV_SCROLL_START) / (NAV_SCROLL_END - NAV_SCROLL_START), 0), 1);
    navEl.style.setProperty("--nav-progress", progress.toFixed(3));

    if (y <= NAV_SHOW_THRESHOLD) {
      navEl.classList.remove("nav-hidden");
    } else if (y > NAV_HIDE_THRESHOLD) {
      if (delta > MIN_DELTA) {
        navEl.classList.add("nav-hidden");
      } else if (delta < -MIN_DELTA) {
        navEl.classList.remove("nav-hidden");
      }
    }
    lastY = y;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
};
