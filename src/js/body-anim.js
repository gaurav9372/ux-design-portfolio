/*
  Body Text Animation — Wave Rise (per-line)
  Each line slides up from behind a clipped mask with smooth easing.
  No opacity fade — pure geometric reveal.
  Applied to main body paragraphs across the site.

  IMPORTANT: .ba-line uses white-space: nowrap so each measured line stays
  on one visual row. When the viewport resizes, line measurements become
  stale — we re-run wrapLines on resize (debounced) so the text reflows
  to match the new width.
*/

const STAGGER_MS = 0;
const RESIZE_DEBOUNCE_MS = 150;

// Cache original text per element so we can rebuild from scratch on resize.
const originalTextByEl = new WeakMap();

const wrapLines = (el) => {
  // Measure using a plain text paragraph first — the browser's natural
  // word wrapping gives us the line breaks for the current container width.
  const originalText = originalTextByEl.get(el) || el.textContent.trim();
  if (!originalTextByEl.has(el)) originalTextByEl.set(el, originalText);
  if (!originalText) return;

  // Step 1: place each word as a span so we can read offsetTop positions
  el.innerHTML = '';
  el.classList.remove('ba-wave');
  const words = originalText.split(/\s+/).filter(Boolean);
  const measureSpans = words.map((w, i) => {
    const s = document.createElement('span');
    s.textContent = w + (i < words.length - 1 ? ' ' : '');
    s.style.display = 'inline';
    el.appendChild(s);
    return s;
  });

  // Step 2: group words by their offsetTop into lines
  const lines = [];
  let currentLine = [];
  let currentTop = null;
  measureSpans.forEach((s) => {
    const top = s.offsetTop;
    if (currentTop === null) currentTop = top;
    if (top !== currentTop) {
      lines.push(currentLine);
      currentLine = [];
      currentTop = top;
    }
    currentLine.push(s.textContent);
  });
  if (currentLine.length) lines.push(currentLine);

  // Step 3: rebuild as .ba-line-wrap > .ba-line
  el.innerHTML = '';
  lines.forEach((lineWords) => {
    const wrap = document.createElement('span');
    wrap.className = 'ba-line-wrap';
    const line = document.createElement('span');
    line.className = 'ba-line';
    line.textContent = lineWords.join('').trimEnd();
    wrap.appendChild(line);
    el.appendChild(wrap);
  });

  el.classList.add('ba-wave');
  el.dataset.bodyAnim = 'ready';
};

const animateElement = (el) => {
  const lines = el.querySelectorAll('.ba-line');
  lines.forEach((l, i) => {
    l.style.transitionDelay = `${i * STAGGER_MS}ms`;
  });
  el.classList.add('ba-in-view');
};

export const initBodyAnimations = () => {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    // Homepage
    '.about-copy p',
    '.ux .desc',
    '.projects-inner .desc',
    '.case-footer .left',
    '.hello',
    // Case study pages
    '.cs-hero .tagline',
    '.cs-overview .summary',
    '.cs-overview .contribution',
    '.cs-goals-tasks .intro',
    '.cs-problem .statement',
    '.cs-problem .body',
    '.cs-work-block p',
    '.cs-results .body',
    '.cs-reflections .body',
    // Contact page
    '.ct-subtitle',
    // About page
    '.ab-hero-sub',
    '.ab-story-body p',
    '.ab-personal-body',
    '.ab-value-body',
    // Projects page
    '.pp-tagline',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));
  if (!elements.length) return;

  // Track which elements have already played their reveal so we don't
  // replay on every resize — we only need to re-wrap the line geometry.
  const revealedEls = new WeakSet();

  // Wait for fonts to load before measuring line positions so font swap
  // doesn't cause words to wrap differently after initial layout.
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  fontsReady.then(() => {
    elements.forEach((el) => {
      wrapLines(el);

      // Preserve revealed state if this element has already played its
      // reveal — we'll add ba-in-view back after every re-wrap.
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                animateElement(el);
                revealedEls.add(el);
              }, 80);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    });

    // --- Resize handler: re-wrap lines when viewport width changes ---
    // CSS line breaks depend on container width; we measured them once.
    // After a resize, lines may overflow or break awkwardly, so re-run.
    let resizeTimer;
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      if (w === lastWidth) return; // height-only resize (e.g. mobile URL bar)
      lastWidth = w;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        elements.forEach((el) => {
          const wasRevealed = revealedEls.has(el);
          wrapLines(el);
          // If the element had already played its reveal, keep the lines
          // visible instantly on resize (no re-animation).
          if (wasRevealed) {
            // Skip the transition when restoring visible state
            el.querySelectorAll('.ba-line').forEach((l) => {
              l.style.transition = 'none';
            });
            el.classList.add('ba-in-view');
            // Restore transitions after the paint
            requestAnimationFrame(() => {
              el.querySelectorAll('.ba-line').forEach((l) => {
                l.style.transition = '';
              });
            });
          }
        });
      }, RESIZE_DEBOUNCE_MS);
    });
  });
};
