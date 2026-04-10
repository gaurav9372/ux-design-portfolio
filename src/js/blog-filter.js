/*
  Blog index filter — wires up the `.bl-filter` chip buttons and the mobile
  select dropdown to show/hide blog cards by `data-tags` (comma-separated).
  A card matches if any of its tags matches the selected filter.
*/

export const initBlogFilter = () => {
  const filters = document.querySelectorAll('.bl-filter');
  const cards = document.querySelectorAll('.bl-grid [data-tags]');
  const dropdown = document.querySelector('.bl-filter-bar .filter-dropdown');
  if (!filters.length) return;

  const applyFilter = (f) => {
    cards.forEach((card) => {
      const tags = card.dataset.tags.split(',');
      const match = f === 'all' || tags.includes(f);
      card.hidden = !match;
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (dropdown) dropdown.value = btn.dataset.filter;
      applyFilter(btn.dataset.filter);
    });
  });

  if (dropdown) {
    dropdown.addEventListener('change', () => {
      filters.forEach((b) => b.classList.remove('active'));
      const match = [...filters].find((b) => b.dataset.filter === dropdown.value);
      if (match) match.classList.add('active');
      applyFilter(dropdown.value);
    });
  }
};
