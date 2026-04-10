/*
  Projects page filter — wires up the `.pp-filter` chip buttons and the mobile
  select dropdown to show/hide projects by `data-category`.
*/

export const initProjectFilter = () => {
  const filters = document.querySelectorAll('.pp-filter');
  const cards = document.querySelectorAll('[data-category]');
  const empty = document.querySelector('.pp-empty');
  const dropdown = document.querySelector('.pp-filter-bar .filter-dropdown');
  if (!filters.length) return;

  const applyFilter = (f) => {
    let visible = 0;
    cards.forEach((card) => {
      const match = f === 'all' || card.dataset.category === f;
      card.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible > 0;
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
