/*
  Clickable case cards — makes the entire .case-card area clickable by forwarding
  clicks to the inner a.cta link. Used on homepage and projects listing page.
  Skips clicks that landed directly on an <a> to avoid double-navigation.
*/

export const initCardLinks = () => {
  document.querySelectorAll('.case-card').forEach((card) => {
    const link = card.querySelector('a.cta');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      link.click();
    });
  });
};
