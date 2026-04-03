import { parseStatText } from './utils.js';

const STAT_DURATION = 1400;

/* --- Stat counter animation --- */
const statData = [];

const initStatData = () => {
  const nums = document.querySelectorAll(".stat .num");

  nums.forEach((el) => {
    const parsed = parseStatText(el.textContent);
    if (!parsed) return;
    statData.push({ el, ...parsed });
    el.textContent = `0${parsed.suffix}`;
  });
};

const animateStat = (item) => {
  const start = performance.now();
  const formatValue = (value) => {
    let output = item.decimals ? value.toFixed(item.decimals) : Math.round(value).toString();
    if (!item.decimals && item.hasComma) {
      output = Number(output).toLocaleString("en-US");
    }
    return `${output}${item.suffix}`;
  };

  const tick = (now) => {
    const t = Math.min((now - start) / STAT_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = item.number * eased;
    item.el.textContent = formatValue(value);
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

export const initStatsAnimation = () => {
  initStatData();
  if (!statData.length) return;

  const statsSection = document.getElementById("stats");
  if (!statsSection) return;

  let animated = false;
  const run = () => {
    if (animated) return;
    animated = true;
    statData.forEach(animateStat);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(statsSection);
  } else {
    run();
  }
};

/* --- UX parallax scroll effect --- */
export const initUxParallax = () => {
  const items = Array.from(document.querySelectorAll(".ux-fx"));
  if (!items.length) return;

  const data = items.map((el) => {
    const fxFrom = parseFloat(getComputedStyle(el).getPropertyValue("--fx-from")) || 0;
    const delayRaw = getComputedStyle(el).getPropertyValue("--fx-delay") || "0ms";
    const delayMs = parseFloat(delayRaw) || 0;
    return { el, fxFrom, offset: delayMs * 0.25 };
  });

  let range = window.innerHeight * 0.6;
  let ticking = false;

  const update = () => {
    ticking = false;
    const viewportCenter = window.innerHeight / 2;
    data.forEach((item) => {
      const rect = item.el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter) + item.offset;
      const raw = 1 - Math.min(distance / range, 1);
      const speed = parseFloat(getComputedStyle(item.el).getPropertyValue("--fx-speed")) || 1;
      const smooth = raw * raw * (3 - 2 * raw);
      const progress = Math.pow(smooth, speed);
      const depth = parseFloat(getComputedStyle(item.el).getPropertyValue("--fx-depth")) || 1;

      const x = item.fxFrom * depth * (1 - progress);
      const y = 18 * depth * (1 - progress);
      const scale = 0.92 + 0.08 * progress;
      const blur = 2 * depth * (1 - progress);
      const baseOpacity = parseFloat(getComputedStyle(item.el).getPropertyValue("--base-opacity")) || 1;
      const opacity = Math.max(0, Math.min(progress * baseOpacity, baseOpacity));

      item.el.style.opacity = opacity.toFixed(3);
      item.el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      item.el.style.filter = `blur(${blur}px)`;
    });
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("resize", () => {
    range = window.innerHeight * 0.6;
    update();
  });

  update();
};

/* --- Split-hover text animation --- */
export const initSplitHover = () => {
  const splitTextForHover = (el) => {
    if (!el || el.dataset.split === "true") return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue && node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    if (!nodes.length) return;

    let charIndex = 0;
    nodes.forEach((node) => {
      const text = node.nodeValue;
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === " ") {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const span = document.createElement("span");
        span.className = "split-char";
        const inner = document.createElement("span");
        inner.className = "split-char-inner";
        inner.textContent = ch;
        const clone = document.createElement("span");
        clone.className = "split-char-clone";
        clone.textContent = ch;
        span.style.setProperty("--split-delay", `${Math.min(charIndex * 20, 400)}ms`);
        span.appendChild(inner);
        span.appendChild(clone);
        frag.appendChild(span);
        charIndex += 1;
      }
      node.parentNode.replaceChild(frag, node);
    });

    el.dataset.split = "true";
    el.classList.add("split-hover");
  };

  document.querySelectorAll('a:not(.bl-card), button, [role="button"], .nav-cta, .footer .email, .bl-card-read').forEach(splitTextForHover);
};

/* --- Scroll-driven card stacking --- */
export const initCardStack = () => {
  if (window.matchMedia("(max-width: 1100px)").matches) return;

  const section = document.querySelector(".case-list");
  const stack = document.querySelector(".case-stack");
  const cards = Array.from(document.querySelectorAll(".case-card"));
  const footer = document.querySelector(".case-footer");
  if (!section || !stack || cards.length < 2) return;

  const count = cards.length;
  const SCROLL_PER_CARD = window.innerHeight * 0.6;
  const SCALE_STEP = 0.025;
  const PUSH_STEP = 12;
  const TOP_OFFSET = 80;

  // Natural rotation angles per card (alternating, slight randomness)
  const ROTATIONS = cards.map((_, i) => {
    if (i === 0) return 0; // first card is straight
    const direction = i % 2 === 0 ? 1 : -1;
    return direction * (1.2 + (i % 3) * 0.6);
  });

  // Set section height to create scroll room
  section.style.height = `${SCROLL_PER_CARD * (count - 1) + window.innerHeight + 200}px`;

  // First card is always visible and pinned
  cards[0].style.transform = `translateX(-50%) translateY(${TOP_OFFSET}px)`;
  cards[0].style.opacity = "1";
  cards[0].style.zIndex = "1";

  // Set z-index so later cards stack on top
  cards.forEach((card, i) => {
    card.style.zIndex = String(i + 1);
  });

  let ticking = false;

  const update = () => {
    ticking = false;
    const sectionTop = section.getBoundingClientRect().top;
    // Only count scroll after section top hits viewport top
    const scrolled = Math.max(0, -sectionTop);

    cards.forEach((card, i) => {
      // Each card (including first) has a scroll trigger point
      const cardTrigger = i * SCROLL_PER_CARD;
      const progress = Math.min(Math.max((scrolled - cardTrigger) / SCROLL_PER_CARD, 0), 1);

      // Count how many cards have fully landed on top of this one
      const cardsOnTop = Math.max(0, Math.floor(scrolled / SCROLL_PER_CARD) - i);

      const rot = ROTATIONS[i];

      if (i === 0) {
        // First card: always visible, shrinks as stack grows
        const scale = Math.max(1 - cardsOnTop * SCALE_STEP, 0.85);
        const push = cardsOnTop * PUSH_STEP;
        card.style.transform = `translateX(-50%) translateY(${TOP_OFFSET - push}px) scale(${scale})`;
        card.style.opacity = "1";
        return;
      }

      if (progress <= 0) {
        // Hidden below
        card.style.transform = `translateX(-50%) translateY(100vh) rotate(${rot * 2}deg)`;
        card.style.opacity = "0";
      } else if (progress < 1) {
        // Sliding up — rotation eases from exaggerated to final angle
        const ease = 1 - Math.pow(1 - progress, 3);
        const yOffset = TOP_OFFSET + (1 - ease) * (window.innerHeight - TOP_OFFSET);
        const currentRot = rot * 2 * (1 - ease) + rot * ease;
        card.style.transform = `translateX(-50%) translateY(${yOffset}px) rotate(${currentRot}deg)`;
        card.style.opacity = String(Math.min(progress * 3, 1));
      } else {
        // Landed — keeps its natural tilt, scales down as buried
        const scale = Math.max(1 - cardsOnTop * SCALE_STEP, 0.85);
        const push = cardsOnTop * PUSH_STEP;
        card.style.transform = `translateX(-50%) translateY(${TOP_OFFSET - push}px) scale(${scale}) rotate(${rot}deg)`;
        card.style.opacity = "1";
      }
    });

    // Footer
    if (footer) {
      const footerStart = (count - 1) * SCROLL_PER_CARD;
      const fp = Math.min(Math.max((scrolled - footerStart) / (SCROLL_PER_CARD * 0.4), 0), 1);
      footer.style.opacity = fp.toFixed(3);
      footer.style.transform = `translateY(${(1 - fp) * 20}px)`;
    }
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 1100px)").matches) return;
    section.style.height = `${SCROLL_PER_CARD * (count - 1) + window.innerHeight + 200}px`;
    update();
  });

  update();
};

/* --- Projects page filter --- */
export const initProjectFilter = () => {
  const filters = document.querySelectorAll(".pp-filter");
  const cards = document.querySelectorAll("[data-category]");
  const empty = document.querySelector(".pp-empty");
  if (!filters.length) return;

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.filter;
      let visible = 0;

      cards.forEach((card) => {
        const match = f === "all" || card.dataset.category === f;
        card.hidden = !match;
        if (match) visible++;
      });

      if (empty) empty.hidden = visible > 0;
    });
  });
};

/* --- Blog page filter --- */
export const initBlogFilter = () => {
  const filters = document.querySelectorAll(".bl-filter");
  const cards = document.querySelectorAll(".bl-grid [data-tags]");
  if (!filters.length) return;

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const tags = card.dataset.tags.split(",");
        const match = f === "all" || tags.includes(f);
        card.hidden = !match;
      });
    });
  });
};
