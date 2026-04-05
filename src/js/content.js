import { $ } from './utils.js';

const PLACEHOLDER = "/images/image-missing.png";

const IMAGE_MAP = {
  brandImg: "/images/navlogo.png",
  brandImgFixed: "/images/navlogo.png",
  aboutLogo: "/images/brandlogo.png",
  arrowImg: "/images/icons/arrow-button.svg",
  heroOrn: "/images/headerpattern.svg",
  heroPhoto: "/images/my-photo.png",


  c1: PLACEHOLDER, c2: PLACEHOLDER, c3: PLACEHOLDER,
  c4: PLACEHOLDER, c5: PLACEHOLDER, c6: PLACEHOLDER,
  uxRings: "/images/ux-dual-rings-center.svg",
  uxRingClient: "/images/ux-smaller-ring.svg",
  uxRingCompany: "/images/ux-smaller-ring.svg",


  caseIconA: PLACEHOLDER, caseIconB: PLACEHOLDER, caseIconC: PLACEHOLDER,

  footerOrn: "/images/headerpattern.svg",
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
