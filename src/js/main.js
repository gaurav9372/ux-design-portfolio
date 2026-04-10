/*
  Entry point — runs on every page.

  Shared modules (images, nav, link hover, card click handlers) load eagerly.
  Page-specific modules load via dynamic import() based on the body's data-page
  attribute, so each page only downloads the JS it actually needs.
*/

import { applyImages } from './content.js';
import { initNav } from './nav.js';
import { initSplitHover } from './split-hover.js';
import { initCardLinks } from './card-links.js';

const safe = (label, fn) => {
  try { fn(); } catch (e) { console.error(label + ':', e); }
};

const loadHome = async () => {
  const [
    { applyMdContent },
    { initStatsAnimation },
    { initUxParallax },
    { initCardStack },
    { initTestimonials },
    { initMarquee },
    { initLottieIcons },
  ] = await Promise.all([
    import('./md-content.js'),
    import('./stats-counter.js'),
    import('./ux-parallax.js'),
    import('./card-stack.js'),
    import('./testimonials.js'),
    import('./marquee.js'),
    import('./lottie-icons.js'),
  ]);
  safe('applyMdContent', applyMdContent);
  safe('initStatsAnimation', initStatsAnimation);
  safe('initUxParallax', initUxParallax);
  safe('initTestimonials', initTestimonials);
  safe('initMarquee', initMarquee);
  safe('initCardStack', initCardStack);
  safe('initLottieIcons', initLottieIcons);
};

const loadProjects = async () => {
  const { initProjectFilter } = await import('./project-filter.js');
  safe('initProjectFilter', initProjectFilter);
};

const loadCaseStudy = async () => {
  const [{ applyCaseStudyContent }, { initMosaicGallery }] = await Promise.all([
    import('./case-study-content.js'),
    import('./mosaic-gallery.js'),
  ]);
  safe('applyCaseStudyContent', applyCaseStudyContent);
  safe('initMosaicGallery', initMosaicGallery);
};

const loadBlogIndex = async () => {
  const { initBlogFilter } = await import('./blog-filter.js');
  safe('initBlogFilter', initBlogFilter);
};

const loadBlogPost = async () => {
  const { applyBlogContent } = await import('./blog-content.js');
  safe('applyBlogContent', applyBlogContent);
};

const loadAbout = async () => {
  const { applyAboutContent } = await import('./about-content.js');
  safe('applyAboutContent', applyAboutContent);
};

const loadContact = async () => {
  const { initContactForm } = await import('./contact-form.js');
  safe('initContactForm', initContactForm);
};

const PAGE_LOADERS = {
  home: loadHome,
  projects: loadProjects,
  project: loadCaseStudy,
  'blog-index': loadBlogIndex,
  'blog-post': loadBlogPost,
  about: loadAbout,
  contact: loadContact,
};

const init = async () => {
  // --- Shared (every page) ---
  safe('applyImages', applyImages);
  safe('initNav', initNav);
  safe('initSplitHover', initSplitHover);
  safe('initCardLinks', initCardLinks);

  // --- Page-specific (dynamic imports) ---
  const page = document.body.dataset.page || '';
  const loader = PAGE_LOADERS[page];
  if (loader) {
    try { await loader(); } catch (e) { console.error(`${page} loader:`, e); }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
