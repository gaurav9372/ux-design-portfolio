/*
  Split-hover — wraps each character of every link / button in a span so the
  CSS hover animation can slide letters up and reveal the accent-colored clone.
  Runs on every page (applies to links, buttons, nav CTAs, and .bl-card-read).
  Excludes .bl-card (blog cards handle their own hover).
*/

export const initSplitHover = () => {
  const splitTextForHover = (el) => {
    if (!el || el.dataset.split === 'true') return;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeValue && node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    if (!nodes.length) return;

    let charIndex = 0;
    nodes.forEach((node) => {
      const text = node.nodeValue;
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === ' ') {
          frag.appendChild(document.createTextNode(' '));
          continue;
        }
        const span = document.createElement('span');
        span.className = 'split-char';
        const inner = document.createElement('span');
        inner.className = 'split-char-inner';
        inner.textContent = ch;
        const clone = document.createElement('span');
        clone.className = 'split-char-clone';
        clone.textContent = ch;
        span.style.setProperty('--split-delay', `${Math.min(charIndex * 20, 400)}ms`);
        span.appendChild(inner);
        span.appendChild(clone);
        frag.appendChild(span);
        charIndex += 1;
      }
      node.parentNode.replaceChild(frag, node);
    });

    el.dataset.split = 'true';
    el.classList.add('split-hover');
  };

  document
    .querySelectorAll('a:not(.bl-card), button, [role="button"], .nav-cta, .footer .email, .bl-card-read')
    .forEach(splitTextForHover);
};
