/*
  Smooth scroll — lerp-based custom smooth scrolling.
  Gives a buttery, ease-out feel to all page scrolling.
  Disabled on mobile (<=768px), touch devices, and prefers-reduced-motion.
*/

export const initSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if ('ontouchstart' in window) return;

  const body = document.body;

  // Pull fixed-position elements (nav, mobile panel) out of the flow
  // so they don't get affected by the wrapper's translateY
  const navFixed = document.getElementById('navFixed');
  const mobilePanel = document.getElementById('mobilePanel');
  if (navFixed) body.appendChild(navFixed);
  if (mobilePanel) body.appendChild(mobilePanel);

  // Create wrapper for all remaining body content
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.width = '100%';
  wrapper.style.willChange = 'transform';

  while (body.firstChild && body.firstChild !== navFixed && body.firstChild !== mobilePanel) {
    wrapper.appendChild(body.firstChild);
  }
  body.insertBefore(wrapper, body.firstChild);

  let current = 0;
  let target = 0;
  const ease = 0.08;

  const setBodyHeight = () => {
    body.style.height = wrapper.scrollHeight + 'px';
  };

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const update = () => {
    target = window.scrollY;
    current = lerp(current, target, ease);
    if (Math.abs(current - target) < 0.5) current = target;
    wrapper.style.transform = `translateY(${-current}px)`;
    // Expose current position so other animations (card stacking) can use it
    window.__smoothY = current;
    requestAnimationFrame(update);
  };

  window.__smoothScrollActive = true;

  setBodyHeight();
  requestAnimationFrame(update);

  window.addEventListener('resize', setBodyHeight);
  window.addEventListener('load', setBodyHeight);
  setTimeout(setBodyHeight, 1000);
  setTimeout(setBodyHeight, 3000);
};
