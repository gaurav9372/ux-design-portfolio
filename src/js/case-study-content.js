/*
  Case study content — reads the `<meta name="project">` tag on the page and
  dynamically imports only that project's MD file. Vite code-splits each MD
  into its own chunk, so visiting Care Naturals downloads only care-naturals.md
  instead of all 7 project MD files.
*/

const MD_LOADERS = {
  'care-naturals': () => import('../content/projects/care-naturals.md?raw'),
  'united-rubber': () => import('../content/projects/united-rubber.md?raw'),
  'adscult': () => import('../content/projects/adscult.md?raw'),
  'finflow': () => import('../content/projects/finflow.md?raw'),
  'meditrack': () => import('../content/projects/meditrack.md?raw'),
  'flavor-street': () => import('../content/projects/flavor-street.md?raw'),
  'eduspark': () => import('../content/projects/eduspark.md?raw'),
};

const parseMd = (raw) => {
  const content = {};
  const sections = raw.split(/^## /m).slice(1);
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const key = lines[0].trim();
    const value = lines.slice(1)
      .filter((l) => !/^-{3,}\s*$/.test(l.trim()) && !/^#{1,6}\s/.test(l.trim()))
      .join('\n').trim();
    if (key && value) content[key] = value;
  });
  return content;
};

export const applyCaseStudyContent = async () => {
  const meta = document.querySelector('meta[name="project"]');
  if (!meta) return;

  const project = meta.getAttribute('content');
  const loader = MD_LOADERS[project];
  if (!loader) {
    console.warn(`Case study: no MD loader for "${project}"`);
    return;
  }

  const { default: md } = await loader();
  const content = parseMd(md);

  // Fill all [data-cs] elements
  document.querySelectorAll('[data-cs]').forEach((el) => {
    const key = el.getAttribute('data-cs');
    const value = content[key];
    if (!value) return;

    if (key === 'next-href') {
      el.setAttribute('href', value);
      return;
    }

    // Color swatches — apply as background, not text
    if (el.classList.contains('cs-ds-swatch-circle')) {
      el.style.backgroundColor = value;
      return;
    }

    // Font previews — also set font-family
    if (el.classList.contains('cs-ds-font-preview')) {
      el.textContent = value;
      const fontKey = key.replace('-preview', '');
      const fontName = content[fontKey];
      if (fontName) el.style.fontFamily = `"${fontName}", sans-serif`;
      return;
    }

    el.textContent = value;
  });
};
