/*
  Case study content — reads the `<meta name="project">` tag on the page and
  dynamically imports only that project's MD file. Vite code-splits each MD
  into its own chunk, so visiting Care Naturals downloads only care-naturals.md
  instead of all 7 project MD files.
*/

const MD_LOADERS = {
  'care-naturals': () => import('../content/projects/care-naturals.md?raw'),
  'legacy-square': () => import('../content/projects/legacy-square.md?raw'),
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

    // Hero logo: hide the <img> entirely if no path in MD (prevents broken image)
    if (key === 'hero-logo' && el.tagName === 'IMG' && !value) {
      el.style.display = 'none';
      return;
    }

    if (!value) return;

    if (key === 'next-href') {
      el.setAttribute('href', value);
      return;
    }

    // Hero project logo — set image src, not text content. Hide if no value.
    if (key === 'hero-logo') {
      if (el.tagName === 'IMG') {
        el.src = value;
      }
      return;
    }

    // Color swatches — apply as background, not text.
    // MD stores hex without '#'; prepend it for CSS if missing.
    if (el.classList.contains('cs-ds-swatch-circle')) {
      el.style.backgroundColor = value.startsWith('#') ? value : `#${value}`;
      return;
    }

    // Legacy font-preview key — no-op now (HTML has been updated to use
    // .cs-ds-font-display and .cs-ds-font-sample instead).
    if (el.classList.contains('cs-ds-font-preview')) return;

    el.textContent = value;
  });

  // --- Tools grid: parse multi-line "Name | URL" values and render each
  // as a clickable card with an auto-fetched icon.
  //
  // Icon fetch strategy:
  //   1. Primary: Simple Icons CDN — https://cdn.simpleicons.org/{slug}
  //      (HQ SVG brand icons, free, no API key)
  //   2. Fallback: Google favicon service — for niche tools not on
  //      Simple Icons (pulls the actual favicon of the URL).

  const slugifyForSimpleIcons = (name) => {
    // Manual overrides for names that don't slugify cleanly
    const overrides = {
      'teams': 'microsoftteams',
      'google sheet': 'googlesheets',
      'dribbles': 'dribbble', // common typo
      'realtimecolors': 'realtimecolors', // not on SI — will 404 to favicon
      'phosphoricons': 'phosphoricons',   // not on SI — will 404 to favicon
    };
    const normalized = name.toLowerCase().trim();
    if (overrides[normalized]) return overrides[normalized];
    // Default slug: lowercase, strip spaces and non-alphanumerics
    return normalized.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  };

  const getFaviconUrl = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return '';
    }
  };

  // Tools whose logos are mostly black / very dark — they blend into our
  // dark background. Applying CSS invert makes them light and visible.
  // Match by normalized lowercase name.
  const DARK_LOGOS = new Set([
    'awwwards',
    'mobbin',
  ]);

  // Direct icon URL overrides — used when Simple Icons' slug doesn't
  // resolve reliably, or when we specifically want a different source.
  // Iconify provides colored brand logos at api.iconify.design.
  const DIRECT_ICON_OVERRIDES = {
    'teams': 'https://api.iconify.design/logos/microsoft-teams.svg',
  };

  document.querySelectorAll('[data-cs-tools]').forEach((grid) => {
    const key = grid.getAttribute('data-cs-tools');
    const value = content[key];
    if (!value) {
      grid.closest('.cs-tools')?.style.setProperty('display', 'none');
      return;
    }
    const lines = value.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) {
      grid.closest('.cs-tools')?.style.setProperty('display', 'none');
      return;
    }
    grid.innerHTML = '';
    lines.forEach((line) => {
      const sepMatch = line.match(/^(.+?)\s*[|:]\s*(https?:\/\/\S+)/);
      if (!sepMatch) return;
      const name = sepMatch[1].trim();
      const url = sepMatch[2].trim();

      const a = document.createElement('a');
      a.className = 'cs-tool';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const iconWrap = document.createElement('span');
      iconWrap.className = 'cs-tool-icon';
      if (DARK_LOGOS.has(name.toLowerCase().trim())) {
        iconWrap.classList.add('cs-tool-icon--invert');
      }

      const img = document.createElement('img');
      img.alt = ''; // decorative — the name label next to it provides the text
      img.loading = 'lazy';
      img.width = 40;
      img.height = 40;

      const normalizedName = name.toLowerCase().trim();
      const directOverride = DIRECT_ICON_OVERRIDES[normalizedName];
      const primary = directOverride || `https://cdn.simpleicons.org/${slugifyForSimpleIcons(name)}`;
      const fallback = getFaviconUrl(url);
      img.src = primary;
      // If the primary source fails, swap to the URL's favicon
      img.onerror = () => {
        img.onerror = null; // prevent infinite loop
        if (fallback) {
          img.src = fallback;
        } else {
          // Final fallback — show the first letter as text
          iconWrap.textContent = name.charAt(0).toUpperCase();
        }
      };
      iconWrap.appendChild(img);

      const label = document.createElement('span');
      label.className = 'cs-tool-name';
      label.textContent = name;

      a.append(iconWrap, label);
      grid.appendChild(a);
    });
    if (!grid.children.length) grid.closest('.cs-tools')?.style.setProperty('display', 'none');
  });

  // --- Design System color palette
  // Dynamically render one swatch per `ds-color-N` key found in MD.
  // Empty keys/missing keys = no swatch. N can be any positive integer,
  // so the palette grows/shrinks with the MD file.
  document.querySelectorAll('[data-cs-colors]').forEach((grid) => {
    const colorEntries = Object.entries(content)
      .filter(([k, v]) => /^ds-color-\d+$/.test(k) && v)
      .sort((a, b) => {
        const na = parseInt(a[0].split('-')[2], 10);
        const nb = parseInt(b[0].split('-')[2], 10);
        return na - nb;
      });

    if (!colorEntries.length) {
      grid.closest('.cs-ds-group')?.style.setProperty('display', 'none');
      return;
    }

    grid.innerHTML = '';
    colorEntries.forEach(([, hex]) => {
      const swatch = document.createElement('div');
      swatch.className = 'cs-ds-swatch';

      const circle = document.createElement('div');
      circle.className = 'cs-ds-swatch-circle';
      circle.style.backgroundColor = hex.startsWith('#') ? hex : `#${hex}`;

      const label = document.createElement('p');
      label.className = 'cs-ds-swatch-hex';
      label.textContent = hex;

      swatch.append(circle, label);
      grid.appendChild(swatch);
    });
  });

  // --- Design System font previews
  // For each .cs-ds-font[data-cs-font-target], read the font name from MD,
  // load only the subset of glyphs needed for preview via Google Fonts
  // (&text= param → ~4KB per font), and apply font-family to display + sample.
  const previewText = (() => {
    // Union of all chars used in the display + sample strings, deduped.
    const set = new Set((
      'Ag' +
      'The quick brown fox jumps over the lazy dog. 0123'
    ).split(''));
    return Array.from(set).join('');
  })();

  const loadedFonts = new Set();
  const loadGoogleFontSubset = (fontName) => {
    if (loadedFonts.has(fontName)) return;
    loadedFonts.add(fontName);
    const family = fontName.trim().replace(/\s+/g, '+');
    // Request both 400 and 700 weights so display vs sample can differ
    const href =
      `https://fonts.googleapis.com/css2?family=${family}:wght@400;700` +
      `&text=${encodeURIComponent(previewText)}` +
      `&display=swap`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  document.querySelectorAll('.cs-ds-font[data-cs-font-target]').forEach((card) => {
    const key = card.getAttribute('data-cs-font-target');
    const fontName = content[key];
    if (!fontName) return;

    loadGoogleFontSubset(fontName);
    const stack = `"${fontName}", serif`;
    const display = card.querySelector('.cs-ds-font-display');
    const sample = card.querySelector('.cs-ds-font-sample');
    if (display) display.style.fontFamily = stack;
    if (sample) sample.style.fontFamily = stack;
  });
};
