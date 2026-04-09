import { $ } from './utils.js';

const PLACEHOLDER = "/images/image-missing.png";

const IMAGE_MAP = {
  brandImg: "/images/navlogo.png",
  brandImgFixed: "/images/navlogo.png",
  aboutLogo: "/images/brandlogo.png",
  arrowImg: "/images/icons/arrow-button.svg",
  heroOrn: "/images/headerpattern.svg",
  heroPhoto: "/images/my-photo.png",


  c1: "/images/clientThird.png",
  c2: "/images/clientSecond.png",
  c3: "/images/clientFirst.png",
  c4: "/images/companyFirst.png",
  c5: "/images/companySecond.png",
  c6: "/images/companyThird.png",
  uxRings: "/images/ux-dual-rings-center.svg",
  uxRingClient: "/images/ux-smaller-ring.svg",
  uxRingCompany: "/images/ux-smaller-ring.svg",


  caseIconA: PLACEHOLDER, caseIconB: PLACEHOLDER, caseIconC: PLACEHOLDER,

  footerOrn: "/images/headerpattern.svg",
  g1: "/images/galleryOne.png",
  g2: "/images/galleryTwo.png",
  g3: "/images/galleryThree.png",
  g4: "/images/galleryFour.png",
  g5: "/images/galleryFive.png",
  g6: "/images/gallerySix.png"
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
