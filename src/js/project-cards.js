/*
  Project card taglines — for pages that render .case-card blocks
  (home page, projects listing). Each card carries data-project="<slug>"
  and contains one <p data-project-tagline></p>. We load the matching
  MD file, pull the hero-tagline, and drop it into the slot.

  MDs are imported with ?raw and each file is code-split by Vite, so we
  only download the MDs for slugs actually present on the page.
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

// Pull the value block under a given '## <key>' heading.
const extractMdValue = (raw, key) => {
  const re = new RegExp(`^## ${key}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|\\n---|$)`, 'm');
  const m = raw.match(re);
  if (!m) return '';
  return m[1]
    .split('\n')
    .filter((l) => !/^-{3,}\s*$/.test(l.trim()) && !/^#{1,6}\s/.test(l.trim()))
    .join('\n')
    .trim();
};

export const applyProjectCardContent = async () => {
  const cards = Array.from(document.querySelectorAll('[data-project]'));
  if (!cards.length) return;

  // Dedupe: each slug's MD only needs to load once even if two cards share it.
  const slugs = Array.from(new Set(cards.map((c) => c.getAttribute('data-project'))));

  const data = {};
  await Promise.all(slugs.map(async (slug) => {
    const loader = MD_LOADERS[slug];
    if (!loader) {
      console.warn(`project-cards: no MD loader for "${slug}"`);
      return;
    }
    try {
      const { default: md } = await loader();
      data[slug] = {
        tagline: extractMdValue(md, 'hero-tagline'),
        type: extractMdValue(md, 'meta-type'),
        category: extractMdValue(md, 'meta-category'),
      };
    } catch (e) {
      console.warn(`project-cards: failed to load MD for "${slug}":`, e);
    }
  }));

  cards.forEach((card) => {
    const slug = card.getAttribute('data-project');
    const entry = data[slug];
    if (!entry) return;

    const taglineSlot = card.querySelector('[data-project-tagline]');
    if (taglineSlot && entry.tagline) taglineSlot.textContent = entry.tagline;

    // Named tag slots — [data-project-tag="type"] gets meta-type,
    // [data-project-tag="category"] gets meta-category. If the MD value
    // is missing for a named slot, hide the badge so empty pills don't show.
    card.querySelectorAll('[data-project-tag]').forEach((slot) => {
      const key = slot.getAttribute('data-project-tag');
      const val = entry[key];
      if (val) {
        slot.textContent = val;
      } else if (key) {
        slot.style.display = 'none';
      }
    });
  });
};
