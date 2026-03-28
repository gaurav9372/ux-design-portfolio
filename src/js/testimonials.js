import { testimonials as testimonialData } from '../data/homepage.js';

const AUTO_INTERVAL = 4000;

export const initTestimonials = () => {
  const quoteEl = document.getElementById("testimonialQuote");
  const nameEl = document.getElementById("testimonialName");
  const roleEl = document.getElementById("testimonialRole");
  const avatarEl = document.getElementById("testimonialAvatar");
  const dotsEl = document.getElementById("tDots");
  const prevBtn = document.getElementById("tPrev");
  const nextBtn = document.getElementById("tNext");
  const card = document.querySelector(".testimonial-card");

  if (!quoteEl || !nameEl || !roleEl || !avatarEl || !dotsEl || !prevBtn || !nextBtn) return;

  const testimonials = testimonialData;

  let index = 0;
  let autoTimer = null;
  let fadeTimer = null;

  const render = (i, animate = true) => {
    const apply = () => {
      const item = testimonials[i];
      quoteEl.textContent = item.quote;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;
      avatarEl.src = item.avatar;
      dotsEl.querySelectorAll(".t-dot").forEach((dot, j) => {
        dot.classList.toggle("active", j === i);
        dot.setAttribute("aria-current", j === i ? "true" : "false");
      });
    };

    if (!card || !animate) { apply(); return; }
    card.classList.add("is-fading");
    if (fadeTimer) clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      apply();
      card.classList.remove("is-fading");
    }, 260);
  };

  // Create dots
  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "t-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    dot.addEventListener("click", () => { index = i; render(index); startAuto(); });
    dotsEl.appendChild(dot);
  });

  const goPrev = () => { index = (index - 1 + testimonials.length) % testimonials.length; render(index); startAuto(); };
  const goNext = () => { index = (index + 1) % testimonials.length; render(index); startAuto(); };

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  const startAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      index = (index + 1) % testimonials.length;
      render(index);
    }, AUTO_INTERVAL);
  };

  render(index, false);
  startAuto();
};
