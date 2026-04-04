/*
  Smooth scroll — lerp-based custom smooth scrolling.
  Gives a buttery, ease-out feel to all page scrolling.
  Disabled on mobile (<=768px) and prefers-reduced-motion.
*/

export const initSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if ('ontouchstart' in window) return; // skip on touch devices

  const body = document.body;
  const html = document.documentElement;

  // Create a wrapper that holds all page content
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.width = '100%';
  wrapper.style.willChange = 'transform';

  // Move all body children into the wrapper
  while (body.firstChild) {
    wrapper.appendChild(body.firstChild);
  }
  body.appendChild(wrapper);

  let current = 0;  // current smooth scroll position
  let target = 0;   // actual scroll target
  const ease = 0.08; // lower = smoother/slower, higher = snappier

  const setBodyHeight = () => {
    body.style.height = wrapper.scrollHeight + 'px';
  };

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const update = () => {
    target = window.scrollY;
    current = lerp(current, target, ease);

    // Stop jittering when close enough
    if (Math.abs(current - target) < 0.5) current = target;

    wrapper.style.transform = `translateY(${-current}px)`;
    requestAnimationFrame(update);
  };

  // Set initial body height and start the loop
  setBodyHeight();
  requestAnimationFrame(update);

  // Recalculate body height on resize and after images load
  window.addEventListener('resize', setBodyHeight);
  window.addEventListener('load', setBodyHeight);

  // Recalc periodically for dynamic content (mosaic gallery, MD injection)
  setTimeout(setBodyHeight, 1000);
  setTimeout(setBodyHeight, 3000);
};
