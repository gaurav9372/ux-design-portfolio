/*
  Heading Animation — Gravity Drop
  Letters drop from above with realistic bounce physics.
  Triggered by IntersectionObserver when heading enters viewport.
  Applied to all yellow accent-colored section headings site-wide.
*/

const STAGGER_MS = 50;

const wrapChars = (el) => {
  if (el.dataset.headingAnim === 'ready') return [];
  const text = el.textContent;
  el.innerHTML = '';
  const chars = [];
  const words = text.split(/( +)/); // split but keep spaces as separate entries

  words.forEach((segment) => {
    if (/^ +$/.test(segment)) {
      // Spaces between words — keep as text nodes so browser can line-break here
      el.appendChild(document.createTextNode(segment));
      return;
    }
    // Wrap each word in a container that prevents mid-word breaks
    const wordSpan = document.createElement('span');
    wordSpan.className = 'ha-word';
    for (const ch of segment) {
      const outer = document.createElement('span');
      outer.className = 'ha-char';
      const inner = document.createElement('span');
      inner.className = 'ha-char-inner';
      inner.textContent = ch;
      outer.appendChild(inner);
      wordSpan.appendChild(outer);
      chars.push(inner);
    }
    el.appendChild(wordSpan);
  });

  el.dataset.headingAnim = 'ready';
  return chars;
};

const animateHeading = (el) => {
  const chars = el.querySelectorAll('.ha-char-inner');
  chars.forEach((c, i) => {
    c.classList.remove('ha-drop');
    c.style.opacity = '0';
    c.style.transform = 'translateY(-120%)';
  });
  void el.offsetHeight;
  chars.forEach((c, i) => {
    setTimeout(() => c.classList.add('ha-drop'), i * STAGGER_MS);
  });
};

export const initHeadingAnimations = () => {
  // All yellow section headings across the site
  const selectors = [
    '.hero-title',
    '.about-copy h2',
    '.ux h2',
    '.projects h2',
    '.testimonials h2',
    '.home-blogs-title',
    '.cs-section-title',
    '.coming-soon h1',
    '.bl-index-title',
    '.bl-title',
    '.bl-more-title',
    '.ct-title',
    '.ct-faq-title',
    '.pp-h1',
    '.cs-hero h1',
    '.ab-hero-title',
    '.ab-cta-title',
  ];

  const headings = document.querySelectorAll(selectors.join(', '));
  if (!headings.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  headings.forEach((el) => {
    const chars = wrapChars(el);
    if (!chars.length) return;

    // Set initial hidden state
    chars.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(-120%)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay so the hidden state paints before animation starts
            setTimeout(() => animateHeading(el), 100);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
  });
};
