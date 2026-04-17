import homepageMd from '../content/core/homepage.md?raw';

const parseMd = (raw) => {
  const content = {};
  const sections = raw.split(/^## /m).slice(1);
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const key = lines[0].trim();
    const value = lines.slice(1)
      .filter((l) => !/^-{3,}\s*$/.test(l.trim()) && !/^#/.test(l.trim()))
      .join('\n').trim();
    if (key && value) content[key] = value;
  });
  return content;
};

const CONTENT_MAP = {
  'hero-hello-prefix': '.hello span',
  'hero-hello-name': '.hello strong',
  'hero-title-prefix': '.hero-title span:first-child',
  'hero-title-accent': '.hero-title .accent',
  'hero-bg-1': '.hero-bgword p:first-child',
  'hero-bg-2': '.hero-bgword p:last-child',
  'about-heading': '.about-copy h2',
  'about-body': '.about-copy p',
  'ux-heading': '.ux h2',
  'ux-desc': '.ux .desc',
  'projects-heading': '.projects h2',
  'projects-desc': '.projects .desc',
  'gallery-quote': '.gallery .gallery-quote',
  'gallery-author': '.gallery .gallery-author',
  'gallery-small-quote': '.gallery .small-quote',
  'case-footer-left': '.case-footer .left',
  'case-footer-right': '.case-footer .right',
  'testimonials-heading': '.testimonials h2',
  'testimonials-bgline': '.bgline-track span',
  'footer-location-1': '.footer-bg p:first-child',
  'footer-location-2': '.footer-bg p:last-child',
  'footer-contact-title': '.footer .kicker',
  'footer-email': '.footer .email',
  'footer-desc': '.footer .block .desc',
};

export const applyMdContent = () => {
  const content = parseMd(homepageMd);

  Object.entries(CONTENT_MAP).forEach(([key, selector]) => {
    const value = content[key];
    if (!value) return;

    if (key === 'testimonials-bgline') {
      document.querySelectorAll(selector).forEach((el) => {
        el.textContent = value;
      });
      return;
    }

    // Append trailing space to inline prefixes so they don't merge with
    // the next element (e.g. "I am" + "Shreyansh" → "I amShreyansh").
    if (key === 'hero-hello-prefix' || key === 'hero-title-prefix') {
      const el = document.querySelector(selector);
      if (el) el.textContent = value + ' ';
      return;
    }

    if (key === 'gallery-quote') {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = value.replace(/\n/g, '<br>');
      return;
    }

    if (key === 'gallery-author') {
      const el = document.querySelector(selector);
      if (el) el.textContent = `— ${value}`;
      return;
    }

    if (key === 'footer-email') {
      const el = document.querySelector(selector);
      if (el) {
        el.textContent = value;
        el.setAttribute('href', `mailto:${value}`);
      }
      return;
    }

    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  });
};
