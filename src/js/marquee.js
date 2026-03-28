export const initMarquee = () => {
  const setup = (selector) => {
    const container = document.querySelector(selector);
    if (!container) return;
    const track = container.querySelector(".logos-track");
    if (!track || track.dataset.duped === "true") return;

    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      track.appendChild(clone);
    });
    track.dataset.duped = "true";
  };

  setup(".logos-top");
  setup(".logos-bottom");
};
