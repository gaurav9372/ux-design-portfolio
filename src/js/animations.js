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

  document.querySelectorAll('a, button, [role="button"], .nav-cta, .footer .email').forEach(splitTextForHover);
};
