/*
  Stats counter — animates numbers from 0 to their target value when the stats section
  scrolls into view. Used on the homepage.
*/

import { parseStatText } from './utils.js';

const STAT_DURATION = 1400;

const animateStat = (item) => {
  const start = performance.now();
  const formatValue = (value) => {
    let output = item.decimals ? value.toFixed(item.decimals) : Math.round(value).toString();
    if (!item.decimals && item.hasComma) {
      output = Number(output).toLocaleString('en-US');
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
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const statData = [];
  document.querySelectorAll('.stat .num').forEach((el) => {
    const parsed = parseStatText(el.textContent);
    if (!parsed) return;
    statData.push({ el, ...parsed });
    el.textContent = `0${parsed.suffix}`;
  });
  if (!statData.length) return;

  let animated = false;
  const run = () => {
    if (animated) return;
    animated = true;
    statData.forEach(animateStat);
  };

  if ('IntersectionObserver' in window) {
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
