/*
  Custom cursor — Dual Orbit (Square variant)

  - Outer: 36×36 yellow square, morphs to circle on interactive hover
  - Dot: 6px yellow, spring-lags behind cursor, grows to 18px white on hover
  - Spin: outer rotates 180° CW on hover enter, 180° CCW on hover exit

  Skipped on:
    - Touch devices (ontouchstart)
    - Users who prefer reduced motion

  Strictly only <a>, <button>, and [data-cursor-hover] trigger the hover
  state — plain text remains in base cursor mode.
*/

export const initCursor = () => {
  // Skip on touch devices — custom cursors don't make sense without a mouse
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  // Respect user's reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Skip on viewports under 900px — tablet-ish screens often have touch
  if (window.matchMedia('(max-width: 900px)').matches) return;

  document.documentElement.classList.add('has-custom-cursor');

  const outer = document.createElement('div');
  outer.className = 'cursor-outer';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.append(outer, dot);

  let mx = 0, my = 0;      // actual mouse position
  let dx = 0, dy = 0;      // dot position (spring-lag)
  let hovering = false;    // over <a>/<button>
  let typing = false;      // over input/textarea/contenteditable
  let spinAnim;
  let revealed = false;

  const isInteractive = (el) =>
    !!(el && el.closest && el.closest('a, button, [data-cursor-hover]'));

  const isTextField = (el) =>
    !!(el && el.closest && el.closest(
      'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]),' +
      'textarea, [contenteditable]'
    ));

  // An element is "selectable text" if the user could drag over it to select
  // text: not a link/button/input, not an image/video/svg.
  const isSelectable = (el) => {
    if (!el || !el.closest) return false;
    if (isInteractive(el)) return false;
    if (isTextField(el)) return false;
    if (el.closest('img, picture, svg, video, canvas')) return false;
    return true;
  };

  // Track whether a left-button drag was started on selectable text
  let dragStartedOnText = false;
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // only left button
    dragStartedOnText = isSelectable(e.target);
  });
  document.addEventListener('mouseup', () => {
    dragStartedOnText = false;
  });

  const setHover = (next) => {
    if (next === hovering) return;
    hovering = next;
    outer.classList.toggle('is-hover', next);
    dot.classList.toggle('is-hover', next);

    // One-shot spin synced to shape morph.
    // Enter: clockwise 180° over 500ms
    // Exit:  counter-clockwise 180° over 1000ms
    if (spinAnim) spinAnim.cancel();
    const endAngle = next ? 180 : -180;
    const duration = next ? 500 : 1000;
    spinAnim = outer.animate([
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
    // If we just entered a text field, cancel any in-progress spin so the
    // outer square fades out cleanly instead of mid-rotation.
    if (next && spinAnim) spinAnim.cancel();
  };

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    outer.style.left = mx + 'px';
    outer.style.top = my + 'px';
    if (!revealed) {
      revealed = true;
      outer.classList.add('is-visible');
      dot.classList.add('is-visible');
    }
    // Text-caret state: over an input, OR actively drag-selecting body text
    const isSelectingText = dragStartedOnText && e.buttons === 1;
    const overText = isTextField(e.target) || isSelectingText;
    setTyping(overText);
    // Text-field state takes priority — disable hover behavior inside inputs
    setHover(!overText && isInteractive(e.target));
  };
  document.addEventListener('mousemove', onMove);

  // Hide when mouse leaves the window
  const onLeave = () => {
    outer.classList.remove('is-visible');
    dot.classList.remove('is-visible');
    setHover(false);
    setTyping(false);
    revealed = false;
  };
  document.addEventListener('mouseleave', onLeave);
  const onEnter = () => {
    outer.classList.add('is-visible');
    dot.classList.add('is-visible');
    revealed = true;
  };
  document.addEventListener('mouseenter', onEnter);

  // Hide while the user is interacting with page controls via keyboard
  // (e.g. tabbing) — only show again on next mousemove.
  const onBlur = () => { revealed = false };
  window.addEventListener('blur', onBlur);

  // Spring-lag dot follows with easing
  const tick = () => {
    dx += (mx - dx) * 0.18;
    dy += (my - dy) * 0.18;
    dot.style.left = dx + 'px';
    dot.style.top = dy + 'px';
    requestAnimationFrame(tick);
  };
  tick();
};
