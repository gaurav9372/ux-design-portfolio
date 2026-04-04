/*
  Mosaic Gallery — auto-distributes project screen images into a balanced 4-column grid.

  Usage: Add <div class="cs-mosaic" data-project="slug"></div> to any case study page.
  Images are auto-detected from public/images/projectscreens/[slug]/.

  To add screens: just drop images into the folder and run "npm run dev" or "npm run build".
  Name one image "home.png" — it always appears first in column 1.
*/

import SCREEN_MANIFEST from '../data/screen-manifest.json';

const COLS = 4;

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ src, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = src;
  });

const buildMosaic = (container, images) => {
  const columns = Array.from({ length: COLS }, () => ({ height: 0, els: [] }));

  // Pin home.png to column 0 first
  const homeIdx = images.findIndex(({ src }) => src.toLowerCase().endsWith('/home.png'));
  let rest = images;
  if (homeIdx !== -1) {
    const home = images[homeIdx];
    const ratio = home.h / home.w;
    columns[0].height += ratio;
    columns[0].els.push(home.src);
    rest = images.filter((_, i) => i !== homeIdx);
  }

  // Sort tallest-first for better balance (LPT scheduling algorithm)
  rest = [...rest].sort((a, b) => (b.h / b.w) - (a.h / a.w));

  // Distribute each image to the currently shortest column
  rest.forEach(({ src, w, h }) => {
    let shortest = 0;
    for (let i = 1; i < COLS; i++) {
      if (columns[i].height < columns[shortest].height) shortest = i;
    }
    const ratio = h / w;
    columns[shortest].height += ratio;
    columns[shortest].els.push(src);
  });

  // Render
  container.innerHTML = '';
  columns.forEach((col) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'cs-mosaic-col';
    col.els.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Project screen';
      img.loading = 'lazy';
      img.className = 'cs-mosaic-img';
      colDiv.appendChild(img);
    });
    container.appendChild(colDiv);
  });
};

export const initMosaicGallery = () => {
  const container = document.querySelector('.cs-mosaic');
  if (!container) return;

  const project = container.dataset.project;
  if (!project) return;

  const files = SCREEN_MANIFEST[project];
  if (!files || !files.length) {
    // Show 4 empty placeholder columns
    container.innerHTML = '';
    for (let i = 0; i < COLS; i++) {
      const col = document.createElement('div');
      col.className = 'cs-mosaic-col';
      const placeholder = document.createElement('div');
      placeholder.className = 'cs-mosaic-empty';
      placeholder.innerHTML = '<img src="/images/image-missing.png" alt="Screens coming soon" />';
      col.appendChild(placeholder);
      container.appendChild(col);
    }
    return;
  }

  const basePath = `/images/projectscreens/${project}/`;
  const srcs = files.map((f) => basePath + f);

  Promise.all(srcs.map(loadImage)).then((results) => {
    const valid = results.filter(Boolean);
    if (!valid.length) return;
    buildMosaic(container, valid);
    initMosaicParallax(container);
  });
};

/* --- Subtle parallax: each column scrolls at a slightly different speed --- */
const PARALLAX_SPEEDS = [-0.03, 0.02, -0.025, 0.015]; // alternating directions, very subtle

const initMosaicParallax = (container) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const cols = container.querySelectorAll('.cs-mosaic-col');
  if (cols.length < 2) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = container.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Only apply when mosaic is in/near viewport
    if (rect.bottom < -200 || rect.top > viewH + 200) return;

    // Progress: 0 when section enters bottom, 1 when it exits top
    const center = rect.top + rect.height / 2;
    const progress = (viewH / 2 - center) / (viewH / 2 + rect.height / 2);

    cols.forEach((col, i) => {
      const speed = PARALLAX_SPEEDS[i % PARALLAX_SPEEDS.length];
      const y = progress * speed * rect.height;
      col.style.transform = `translateY(${y}px)`;
    });
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
};
