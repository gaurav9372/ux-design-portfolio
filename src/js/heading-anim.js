/*
  Heading Animation — Gravity Drop
  Letters drop from above with realistic bounce physics.
  Triggered by IntersectionObserver when heading enters viewport.
  Applied to all yellow accent-colored section headings site-wide.
*/

const STAGGER_MS = 50;

const wrapChars = (el) => {
  if (el.dataset.headingAnim === 'ready') return [];
  const chars = [];

  // Snapshot children BEFORE wiping innerHTML so we can walk structure.
  const originalNodes = Array.from(el.childNodes);
  el.innerHTML = '';

  // Wrap a plain text segment's words/chars into ha-word > ha-char > ha-char-inner
  // spans, appending everything onto `container`.
  const wrapTextInto = (text, container) => {
    text.split(/( +)/).forEach((segment) => {
      if (!segment) return;
      if (/^ +$/.test(segment)) {
        // Preserve spaces as text nodes so browser can break between words.
        container.appendChild(document.createTextNode(segment));
        return;
      }
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
      container.appendChild(wordSpan);
    });
  };

  // Walk each child of the original heading. Text nodes get char-wrapped;
  // <br> is preserved as-is (line breaks in markup must stay); other elements
  // (e.g. <span class="accent">) are cloned shallow and their children are
  // processed recursively so inline styling/classes still apply to wrapped chars.
  const processNode = (node, container) => {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextInto(node.textContent, container);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === 'BR') {
      container.appendChild(document.createElement('br'));
      return;
    }
    // Clone the element without children, copy attributes, then recurse.
    const clone = document.createElement(node.tagName);
    for (const attr of node.attributes) clone.setAttribute(attr.name, attr.value);
    Array.from(node.childNodes).forEach((child) => processNode(child, clone));
    container.appendChild(clone);
  };

  originalNodes.forEach((n) => processNode(n, el));
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
