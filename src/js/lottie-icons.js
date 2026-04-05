/*
  Lottie animated icons — plays JSON animations when they scroll into view.
  Usage: Add data-lottie="/path/to/file.json" to any container element.
  The animation plays once when the element enters the viewport, then loops.
*/

import lottie from 'lottie-web';

export const initLottieIcons = () => {
  const containers = document.querySelectorAll('[data-lottie]');
  if (!containers.length) return;

  const animations = [];

  containers.forEach((el) => {
    const path = el.getAttribute('data-lottie');
    if (!path) return;

    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: path,
    });

    animations.push({ el, anim, played: false });
  });

  // Play animations when they scroll into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = animations.find((a) => a.el === entry.target);
        if (!item) return;

        if (entry.isIntersecting && !item.played) {
          item.anim.play();
          item.played = true;
        }
      });
    },
    { threshold: 0.3 }
  );

  animations.forEach(({ el }) => observer.observe(el));
};
