/*
  UX parallax — drives the `.ux-fx` circle depth / opacity / blur effects on the homepage
  UX section based on scroll position. Reads CSS custom properties for per-element speed,
  depth, delay, and base opacity.
*/

export const initUxParallax = () => {
  const items = Array.from(document.querySelectorAll('.ux-fx'));
  if (!items.length) return;

  const data = items.map((el) => {
    const fxFrom = parseFloat(getComputedStyle(el).getPropertyValue('--fx-from')) || 0;
    const delayRaw = getComputedStyle(el).getPropertyValue('--fx-delay') || '0ms';
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
      const speed = parseFloat(getComputedStyle(item.el).getPropertyValue('--fx-speed')) || 1;
      const smooth = raw * raw * (3 - 2 * raw);
      const progress = Math.pow(smooth, speed);
      const depth = parseFloat(getComputedStyle(item.el).getPropertyValue('--fx-depth')) || 1;

      const x = item.fxFrom * depth * (1 - progress);
      const y = 18 * depth * (1 - progress);
      const scale = 0.92 + 0.08 * progress;
      const blur = 2 * depth * (1 - progress);
      const baseOpacity = parseFloat(getComputedStyle(item.el).getPropertyValue('--base-opacity')) || 1;
      const opacity = Math.max(0, Math.min(progress * baseOpacity, baseOpacity));

      item.el.style.opacity = opacity.toFixed(3);
      item.el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      item.el.style.filter = `blur(${blur}px)`;
    });
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', () => {
    range = window.innerHeight * 0.6;
    update();
  });

  update();
};
