import { $, smoothTo } from './utils.js';

export const initNav = () => {
  const navTop = $("navTop");
  const navFixed = $("navFixed");
  const burger = $("burger");
  const burgerTop = $("burgerTop");
  const panel = $("mobilePanel");

  const openMenu = () => {
    if (burger) burger.setAttribute("aria-expanded", "true");
    if (burgerTop) burgerTop.setAttribute("aria-expanded", "true");
    if (panel) panel.classList.add("open");
    // Always show fixed nav so the burger is accessible to close menu
    if (navFixed) navFixed.classList.remove("nav-hidden");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    if (burger) burger.setAttribute("aria-expanded", "false");
    if (burgerTop) burgerTop.setAttribute("aria-expanded", "false");
    if (panel) panel.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (burger) burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });
  if (burgerTop) burgerTop.addEventListener("click", () => {
    const isOpen = burgerTop.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when panel links are clicked
  if (panel) {
    panel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });
  }

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

  // Fixed navbar: show when top navbar scrolls out, hide on scroll up near top
  if (!navFixed || !navTop) return;

  const MIN_DELTA = 15;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const delta = y - lastY;
    const topNavBottom = navTop.offsetTop + navTop.offsetHeight;

    if (y <= topNavBottom) {
      // Top navbar still visible — hide fixed navbar
      navFixed.classList.add("nav-hidden");
      lastY = y;
    } else if (Math.abs(delta) > MIN_DELTA) {
      if (delta < 0) {
        // Scrolling up — show fixed navbar
        navFixed.classList.remove("nav-hidden");
      } else {
        // Scrolling down — hide fixed navbar
        navFixed.classList.add("nav-hidden");
      }
      lastY = y;
    }
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();

  // Page transitions — fade out on internal link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || link.target === "_blank") return;
    if (link.hostname && link.hostname !== window.location.hostname) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { window.location.href = href; }, 250);
  });
};
