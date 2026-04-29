/*
  Lottie animated icons — plays JSON animations when they scroll into view.
  Usage: Add data-lottie="/path/to/file.json" to any container element.
  The animation plays once it enters the viewport, then loops.

  Performance note: lottie-web's loadAnimation() does a synchronous JSON
  parse and SVG-graph build when the JSON arrives. Each icon JSON is
  30–50KB; parsing all of them up-front when init runs blocks the main
  thread for 2–4 seconds and causes the page to freeze on first scroll.
  We fix that by deferring loadAnimation() until the icon scrolls into
  view, AND scheduling it inside requestIdleCallback so the parse runs
  during idle time instead of stealing scroll frames.
*/

import lottie from 'lottie-web';

// Schedule a callback to run during browser idle time. Falls back to a
// 0ms timeout in browsers without requestIdleCallback (Safari < 16.4).
const runWhenIdle = (cb) => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(cb, { timeout: 1000 });
  } else {
    setTimeout(cb, 0);
  }
};

export const initLottieIcons = () => {
  const containers = document.querySelectorAll('[data-lottie]');
  if (!containers.length) return;

  // Track which containers we have already kicked off a load for, so a
  // re-fired intersection (rare but possible) doesn't double-load.
  const started = new WeakSet();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (started.has(el)) return;
        started.add(el);
        observer.unobserve(el);

        const path = el.getAttribute('data-lottie');
        if (!path) return;

        // Defer the actual load+parse to idle time. By the time the
        // browser runs this callback, scroll handlers have flushed and
        // the parse will not steal frames from active scrolling.
        runWhenIdle(() => {
          const anim = lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path,
          });
          // DOMLoaded fires once the JSON has been fetched, parsed, and
          // the SVG built. Only then is it safe (and meaningful) to play.
          anim.addEventListener('DOMLoaded', () => anim.play());
        });
      });
    },
    { threshold: 0.3 }
  );

  containers.forEach((el) => observer.observe(el));
};
