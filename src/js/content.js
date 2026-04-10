import { $ } from './utils.js';

const PLACEHOLDER = "/images/image-missing.png";

const IMAGE_MAP = {
  // Navbar logos
  brandImg: "/images/navlogo.png",
  brandImgFixed: "/images/navlogo.png",

  // About section
  aboutLogo: "/images/brandlogo.png",

  // Nav CTA arrow
  arrowImg: "/images/icons/arrow-button.svg",

  // Hero
  heroOrn: "/images/headerpattern.svg",
  heroPhoto: "/images/my-photo.png",

  // UX section circles (client/company sides)
  c1: "/images/clientThird.png",
  c2: "/images/clientSecond.png",
  c3: "/images/clientFirst.png",
  c4: "/images/companyFirst.png",
  c5: "/images/companySecond.png",
  c6: "/images/companyThird.png",
  uxRings: "/images/ux-dual-rings-center.svg",
  uxRingClient: "/images/ux-smaller-ring.svg",
  uxRingCompany: "/images/ux-smaller-ring.svg",

  // Case card icons (homepage projects list) — placeholders until real icons arrive
  caseIconA: PLACEHOLDER,
  caseIconB: PLACEHOLDER,
  caseIconC: PLACEHOLDER,

  // Gallery ornament (reuses header pattern)
  footerOrn: "/images/headerpattern.svg",
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
