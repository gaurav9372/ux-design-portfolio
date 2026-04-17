/*
  Body Text Animation — Wave Rise (per-line)
  Each line slides up from behind a clipped mask with smooth easing.
  No opacity fade — pure geometric reveal.
  Applied to main body paragraphs across the site.
*/

const STAGGER_MS = 0;

const wrapLines = (el) => {
  if (el.dataset.bodyAnim === 'ready') return;
  const text = el.textContent.trim();
  if (!text) return;

  // Step 1: place each word as a span so we can measure line positions
  el.innerHTML = '';
  const words = text.split(/\s+/).filter(Boolean);
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
  // No text nodes between line-wraps — block elements with text nodes
  // between them create empty inline boxes that add extra line-height.
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
    '.gallery-quote',
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

  // Wait for fonts to load before measuring line positions so font swap
  // doesn't cause words to wrap differently after initial layout.
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  fontsReady.then(() => {
    elements.forEach((el) => {
      wrapLines(el);
      if (el.dataset.bodyAnim !== 'ready') return;

      // Add the animation class so lines are clipped + offset from bottom
      el.classList.add('ba-wave');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => animateElement(el), 80);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    });
  });
};
