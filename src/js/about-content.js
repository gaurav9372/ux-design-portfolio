import aboutMd from '../content/core/about-content.md?raw';

const parseMd = (raw) => {
  const content = {};
  const sections = raw.split(/^## /m).slice(1);
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const key = lines[0].trim();
    const value = lines
      .slice(1)
      .filter((l) => !/^-{3,}\s*$/.test(l.trim()) && !/^#/.test(l.trim()))
      .join('\n')
      .trim();
    if (key && value) content[key] = value;
  });
  return content;
};

export const applyAboutContent = () => {
  const hero = document.querySelector('.ab-hero');
  if (!hero) return;

  const content = parseMd(aboutMd);

  document.querySelectorAll('[data-about]').forEach((el) => {
    const key = el.getAttribute('data-about');
    const value = content[key];
    if (!value) return;

    // Skill keys render as tag pills
    if (key.startsWith('skill-')) {
      const skills = value.split(',').map((s) => s.trim());
      el.innerHTML = skills
        .map((s) => `<span class="ab-skill-tag">${s}</span>`)
        .join('');
      return;
    }

    el.textContent = value;
  });
};
