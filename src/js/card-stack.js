/*
  Scroll-driven card stacking — the homepage's signature animation.
  Pins the case-list section and slides each .case-card up into a stack as the user scrolls.
  First card is pinned from the start; subsequent cards slide in from below with
  a slight rotation, then shrink and offset as later cards land on top of them.

  Disabled on mobile / tablet (<=1100px) where cards stack naturally via CSS.
*/

export const initCardStack = () => {
  if (window.matchMedia('(max-width: 1100px)').matches) return;

  const section = document.querySelector('.case-list');
  const stack = document.querySelector('.case-stack');
  const cards = Array.from(document.querySelectorAll('.case-card'));
  const footer = document.querySelector('.case-footer');
  if (!section || !stack || cards.length < 2) return;

  const count = cards.length;
  const SCROLL_PER_CARD = window.innerHeight * 0.6;
  const SCALE_STEP = 0.025;
  const PUSH_STEP = 12;
  const TOP_OFFSET = 80;

  // Natural rotation angles per card (alternating, slight randomness)
  const ROTATIONS = cards.map((_, i) => {
    if (i === 0) return 0; // first card is straight
    const direction = i % 2 === 0 ? 1 : -1;
    return direction * (1.2 + (i % 3) * 0.6);
  });

  // Set section height to create scroll room
  section.style.height = `${SCROLL_PER_CARD * (count - 1) + window.innerHeight + 200}px`;

  // First card is always visible and pinned
  cards[0].style.transform = `translateX(-50%) translateY(${TOP_OFFSET}px)`;
  cards[0].style.opacity = '1';
  cards[0].style.zIndex = '1';

  // Set z-index so later cards stack on top
  cards.forEach((card, i) => {
    card.style.zIndex = String(i + 1);
  });

  let ticking = false;

  const update = () => {
    ticking = false;
    const sectionTop = section.getBoundingClientRect().top;
    const scrolled = Math.max(0, -sectionTop);

    cards.forEach((card, i) => {
      const cardTrigger = i * SCROLL_PER_CARD;
      const progress = Math.min(Math.max((scrolled - cardTrigger) / SCROLL_PER_CARD, 0), 1);
      const cardsOnTop = Math.max(0, Math.floor(scrolled / SCROLL_PER_CARD) - i);
      const rot = ROTATIONS[i];

      if (i === 0) {
        // First card: always visible, shrinks as stack grows
        const scale = Math.max(1 - cardsOnTop * SCALE_STEP, 0.85);
        const push = cardsOnTop * PUSH_STEP;
        card.style.transform = `translateX(-50%) translateY(${TOP_OFFSET - push}px) scale(${scale})`;
        card.style.opacity = '1';
        return;
      }

      if (progress <= 0) {
        // Hidden below
        card.style.transform = `translateX(-50%) translateY(100vh) rotate(${rot * 2}deg)`;
        card.style.opacity = '0';
      } else if (progress < 1) {
        // Sliding up — rotation eases from exaggerated to final angle
        const ease = 1 - Math.pow(1 - progress, 3);
        const yOffset = TOP_OFFSET + (1 - ease) * (window.innerHeight - TOP_OFFSET);
        const currentRot = rot * 2 * (1 - ease) + rot * ease;
        card.style.transform = `translateX(-50%) translateY(${yOffset}px) rotate(${currentRot}deg)`;
        card.style.opacity = String(Math.min(progress * 3, 1));
      } else {
        // Landed — keeps its natural tilt, scales down as buried
        const scale = Math.max(1 - cardsOnTop * SCALE_STEP, 0.85);
        const push = cardsOnTop * PUSH_STEP;
        card.style.transform = `translateX(-50%) translateY(${TOP_OFFSET - push}px) scale(${scale}) rotate(${rot}deg)`;
        card.style.opacity = '1';
      }
    });

    // Footer fade-in after last card lands
    if (footer) {
      const footerStart = (count - 1) * SCROLL_PER_CARD;
      const fp = Math.min(Math.max((scrolled - footerStart) / (SCROLL_PER_CARD * 0.4), 0), 1);
      footer.style.opacity = fp.toFixed(3);
      footer.style.transform = `translateY(${(1 - fp) * 20}px)`;
    }
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 1100px)').matches) return;
    section.style.height = `${SCROLL_PER_CARD * (count - 1) + window.innerHeight + 200}px`;
    update();
  });

  update();
};
