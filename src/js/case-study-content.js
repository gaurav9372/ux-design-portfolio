import careNaturalsMd from '../content/care-naturals.md?raw';
import unitedRubberMd from '../content/united-rubber.md?raw';
import adscultMd from '../content/adscult.md?raw';
import finflowMd from '../content/finflow.md?raw';
import meditrackMd from '../content/meditrack.md?raw';
import flavorStreetMd from '../content/flavor-street.md?raw';
import edusparkMd from '../content/eduspark.md?raw';

const MD_MAP = {
  'care-naturals': careNaturalsMd,
  'united-rubber': unitedRubberMd,
  'adscult': adscultMd,
  'finflow': finflowMd,
  'meditrack': meditrackMd,
  'flavor-street': flavorStreetMd,
  'eduspark': edusparkMd,
};

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

export const applyCaseStudyContent = () => {
  const meta = document.querySelector('meta[name="project"]');
  if (!meta) return;

  const project = meta.getAttribute('content');
  const md = MD_MAP[project];
  if (!md) return;

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

    el.textContent = value;
  });
};
