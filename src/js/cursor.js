/*
  Custom cursor — Dual Orbit (Square variant), optimized edition.

  Performance optimizations applied:
    1. Position via transform: translate3d() — GPU-accelerated, no layout.
       Outer has a wrapper (.cursor-outer) for position + an inner
       frame (.cursor-outer-frame) for rotation so spin and position
       transforms don't conflict.
    2. requestAnimationFrame loop parks itself when the dot has settled
       within 0.1px of the target — zero CPU when mouse is idle.
    3. closest() calls are cached per target — avoids re-walking the DOM
       on every mousemove as long as e.target hasn't changed.
    4. Mousemove listener only records coordinates; all DOM writes and
       state checks happen in the rAF tick — throttles to 60fps max.
    5. Idempotency guard + teardown. initCursor() is a no-op if already
       initialized, and the page can opt out via <body data-no-cursor>.

  Skipped entirely on:
    - Touch devices
    - prefers-reduced-motion
    - Viewports < 900px
    - Pages with <body data-no-cursor> (the Cursors Moodboard page uses
      its own isolated cursors per demo zone).
*/

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-hover]';
const TEXT_FIELD_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]),' +
  'textarea, [contenteditable]';
const SELECTABLE_EXCLUDE = 'img, picture, svg, video, canvas';

// Lerp factor — higher = tighter follow, lower = more lag
const FOLLOW_EASE = 0.18;
// Settled threshold in px below which rAF parks itself
const IDLE_EPSILON = 0.1;

let initialized = false;

export const initCursor = () => {
  if (initialized) return;

  // Skip on touch devices — custom cursors don't make sense without a mouse
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  // Respect user's reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Skip on viewports < 900px (often touch devices anyway)
  if (window.matchMedia('(max-width: 900px)').matches) return;

  // Pages can opt out via <body data-no-cursor>
  if (document.body.hasAttribute('data-no-cursor')) return;

  initialized = true;
  document.documentElement.classList.add('has-custom-cursor');

  // --- DOM ---
  const outer = document.createElement('div');
  outer.className = 'cursor-outer';
  const outerFrame = document.createElement('div');
  outerFrame.className = 'cursor-outer-frame';
  outer.appendChild(outerFrame);

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  document.body.append(outer, dot);

  // --- State ---
  let mx = 0, my = 0;       // mouse position (latest)
  let dx = 0, dy = 0;       // dot position (spring-lagged)
  let lastMoveTarget = null;   // for closest() cache
  let cachedInteractive = false;
  let cachedTextField = false;
  let hovering = false;
  let typing = false;
  let revealed = false;
  let dragStartedOnText = false;
  let spinAnim = null;
  let rafId = null;

  // --- Closest() cache ---
  const evaluateTarget = (target) => {
    if (target === lastMoveTarget) return;
    lastMoveTarget = target;
    if (!target || !target.closest) {
      cachedInteractive = false;
      cachedTextField = false;
      return;
    }
    cachedInteractive = !!target.closest(INTERACTIVE_SELECTOR);
    cachedTextField = !!target.closest(TEXT_FIELD_SELECTOR);
  };

  // --- State setters ---
  const setHover = (next) => {
    if (next === hovering) return;
    hovering = next;
    outer.classList.toggle('is-hover', next);
    dot.classList.toggle('is-hover', next);

    // One-shot spin synced to shape morph. Enter: CW 180°/500ms.
    // Exit: CCW 180°/1000ms. Runs on the frame (child) so it doesn't
    // collide with the parent's translate3d() position.
    if (spinAnim) spinAnim.cancel();
    const endAngle = next ? 180 : -180;
    const duration = next ? 500 : 1000;
    spinAnim = outerFrame.animate([
      { transform: 'translate(-50%, -50%) rotate(0deg)' },
      { transform: `translate(-50%, -50%) rotate(${endAngle}deg)` }
    ], {
      duration,
      easing: 'cubic-bezier(.65, 0, .35, 1)',
      fill: 'none'
    });
  };

  const setTyping = (next) => {
    if (next === typing) return;
    typing = next;
    outer.classList.toggle('is-text', next);
    dot.classList.toggle('is-text', next);
    if (next && spinAnim) spinAnim.cancel();
  };

  // --- Render (runs at rAF frequency, caps at display refresh rate) ---
  const tick = () => {
    // Re-evaluate target (uses cache if unchanged)
    // lastMoveTarget was updated on latest mousemove
    const isSelecting = dragStartedOnText && mouseButtonPressed;
    const overText = cachedTextField || isSelecting;
    setTyping(overText);
    setHover(!overText && cachedInteractive);

    // Spring-lag dot
    dx += (mx - dx) * FOLLOW_EASE;
    dy += (my - dy) * FOLLOW_EASE;

    // GPU-accelerated position — transform only, no layout.
    // Outer: position via translate3d; centering handled by child frame.
    outer.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    // Dot: position + centering composed in one transform string.
    dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;

    // Park rAF when dot has settled within IDLE_EPSILON and mouse is idle.
    if (Math.abs(mx - dx) < IDLE_EPSILON && Math.abs(my - dy) < IDLE_EPSILON) {
      dx = mx; dy = my;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(tick);
  };

  const wakeTick = () => {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  };

  // --- Event handlers ---
  let mouseButtonPressed = false;

  // Mousemove only stores state — DOM writes happen in the rAF tick.
  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    evaluateTarget(e.target);
    if (!revealed) {
      revealed = true;
      outer.classList.add('is-visible');
      dot.classList.add('is-visible');
    }
    wakeTick();
  };
  document.addEventListener('mousemove', onMove, { passive: true });

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    mouseButtonPressed = true;
    // Determine if drag started on selectable text
    const t = e.target;
    if (!t || !t.closest) { dragStartedOnText = false; return; }
    if (t.closest(INTERACTIVE_SELECTOR)) { dragStartedOnText = false; return; }
    if (t.closest(TEXT_FIELD_SELECTOR)) { dragStartedOnText = false; return; }
    if (t.closest(SELECTABLE_EXCLUDE)) { dragStartedOnText = false; return; }
    dragStartedOnText = true;
    wakeTick();
  };
  const onMouseUp = () => {
    mouseButtonPressed = false;
    dragStartedOnText = false;
    wakeTick();
  };
  document.addEventListener('mousedown', onMouseDown, { passive: true });
  document.addEventListener('mouseup', onMouseUp, { passive: true });

  // Hide when mouse leaves / show on re-enter
  const onLeave = () => {
    outer.classList.remove('is-visible');
    dot.classList.remove('is-visible');
    setHover(false);
    setTyping(false);
    revealed = false;
  };
  const onEnter = () => {
    outer.classList.add('is-visible');
    dot.classList.add('is-visible');
    revealed = true;
    wakeTick();
  };
  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('mouseenter', onEnter);

  // Pause on window blur — resume on next mousemove
  const onBlur = () => { revealed = false };
  window.addEventListener('blur', onBlur);

  // Start the tick once so first mouse move brings it to life.
  wakeTick();

  // --- Teardown (for future SPA nav / HMR) ---
  return () => {
    if (!initialized) return;
    initialized = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mouseleave', onLeave);
    document.removeEventListener('mouseenter', onEnter);
    window.removeEventListener('blur', onBlur);
    if (rafId) cancelAnimationFrame(rafId);
    if (spinAnim) spinAnim.cancel();
    outer.remove();
    dot.remove();
    document.documentElement.classList.remove('has-custom-cursor');
  };
};
