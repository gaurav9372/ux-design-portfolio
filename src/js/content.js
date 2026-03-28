import { $ } from './utils.js';

const PLACEHOLDER = "/images/image-missing.png";

const IMAGE_MAP = {
  brandImg: PLACEHOLDER,
  aboutLogo: PLACEHOLDER,
  arrowImg: "/images/icons/arrow-button.svg",
  heroOrn: PLACEHOLDER,
  heroPhoto: "/images/my-photo.png",

  statIcon1: PLACEHOLDER, statIcon2: PLACEHOLDER, statIcon3: PLACEHOLDER,
  statIcon4: PLACEHOLDER, statIcon5: PLACEHOLDER, statIcon6: PLACEHOLDER,

  c1: PLACEHOLDER, c2: PLACEHOLDER, c3: PLACEHOLDER,
  c4: PLACEHOLDER, c5: PLACEHOLDER, c6: PLACEHOLDER,
  uxRings: "/images/ux-dual-rings-center.svg",
  uxRingClient: "/images/ux-smaller-ring.svg",
  uxRingCompany: "/images/ux-smaller-ring.svg",

  logo1: PLACEHOLDER, logo2: PLACEHOLDER, logo3: PLACEHOLDER,
  logo4: PLACEHOLDER, logo5: PLACEHOLDER, logo6: PLACEHOLDER, logo7: PLACEHOLDER,

  pill1: PLACEHOLDER, pill2: PLACEHOLDER, pill3: PLACEHOLDER, pill4: PLACEHOLDER,
  pill5: PLACEHOLDER, pill6: PLACEHOLDER, pill7: PLACEHOLDER, pill8: PLACEHOLDER,

  caseIconA: PLACEHOLDER, caseIconB: PLACEHOLDER, caseIconC: PLACEHOLDER,
  caseArrow: PLACEHOLDER,

  footerOrn: PLACEHOLDER,
  g1: PLACEHOLDER, g2: PLACEHOLDER, g3: PLACEHOLDER, g4: PLACEHOLDER,
  g5: PLACEHOLDER, g6: PLACEHOLDER, g7: PLACEHOLDER, g8: PLACEHOLDER
};

export const applyImages = () => {
  Object.entries(IMAGE_MAP).forEach(([id, url]) => {
    if (!url) return;
    const el = $(id);
    if (!el) return;
    if (el.tagName === "IMG") {
      el.src = url;
    } else {
      el.style.webkitMaskImage = `url('${url}')`;
      el.style.maskImage = `url('${url}')`;
      el.style.background = "#ffffff";
    }
  });
};
