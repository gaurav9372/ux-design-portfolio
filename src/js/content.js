import { $, setText, setTextList } from './utils.js';
import { homepageContent, defaultImages } from '../data/homepage.js';

const CONTENT = homepageContent;
const contentImages = CONTENT.images && typeof CONTENT.images === "object" ? CONTENT.images : {};
const images = { ...defaultImages, ...contentImages };

export const applyImages = () => {
  Object.entries(images).forEach(([id, url]) => {
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

export const applyTextContent = () => {
  const nav = CONTENT.nav || {};
  setTextList(document.querySelectorAll(".nav-links a"), nav.links);
  setTextList(document.querySelectorAll(".mobile-panel a"), nav.mobileLinks);
  setText(document.querySelector("#worksCta span"), nav.cta);

  const hero = CONTENT.hero || {};
  setTextList(document.querySelectorAll(".hero-bgword p"), hero.bgWords);
  setText(document.querySelector(".hello span"), hero.helloPrefix);
  setText(document.querySelector(".hello strong"), hero.helloName);
  const heroTitleParts = document.querySelectorAll(".hero-title span");
  if (heroTitleParts[0]) setText(heroTitleParts[0], hero.titlePrefix);
  if (heroTitleParts[1]) setText(heroTitleParts[1], hero.titleAccent);

  const about = CONTENT.about || {};
  setText(document.querySelector(".about-copy h2"), about.heading);
  setText(document.querySelector(".about-copy p"), about.body);

  const ux = CONTENT.ux || {};
  setText(document.querySelector(".ux-bg"), ux.bgText);
  setText(document.querySelector(".ux h2"), ux.heading);
  setText(document.querySelector(".ux .desc"), ux.desc);
  if (ux.tags) {
    setText(document.querySelector('.circle.tag[aria-label="Client"] .label'), ux.tags.client && ux.tags.client.label);
    setText(document.querySelector('.circle.tag[aria-label="Client"] .sub'), ux.tags.client && ux.tags.client.sub);
    setText(document.querySelector('.circle.users .label'), ux.tags.users && ux.tags.users.label);
    setText(document.querySelector('.circle.users .sub'), ux.tags.users && ux.tags.users.sub);
    setText(document.querySelector('.circle.tag[aria-label="Company"] .label'), ux.tags.company && ux.tags.company.label);
    setText(document.querySelector('.circle.tag[aria-label="Company"] .sub'), ux.tags.company && ux.tags.company.sub);
  }

  const projects = CONTENT.projects || {};
  setText(document.querySelector(".projects h2"), projects.heading);
  setText(document.querySelector(".projects .desc"), projects.desc);

  if (Array.isArray(CONTENT.caseStudies)) {
    const cards = document.querySelectorAll(".case-card");
    CONTENT.caseStudies.forEach((item, i) => {
      const card = cards[i];
      if (!card || !item) return;
      setText(card.querySelector(".title"), item.title);
      setText(card.querySelector(".sub"), item.subtitle);
      setText(card.querySelector(".bottom p"), item.bottom);
      const ctaSpan = card.querySelector(".cta span");
      if (ctaSpan && item.cta) setText(ctaSpan, item.cta);
    });
  }

  const caseFooter = CONTENT.caseFooter || {};
  setText(document.querySelector(".case-footer .left"), caseFooter.left);
  setText(document.querySelector(".case-footer .right"), caseFooter.right);

  const testimonialsContent = CONTENT.testimonials || {};
  setText(document.querySelector(".testimonials h2"), testimonialsContent.heading);
  if (testimonialsContent.bgline) {
    document.querySelectorAll(".bgline-track span").forEach((span) => {
      setText(span, testimonialsContent.bgline);
    });
  }

  const gallery = CONTENT.gallery || {};
  const galleryQuoteEl = document.querySelector(".gallery .gallery-quote");
  const galleryAuthorEl = document.querySelector(".gallery .gallery-author");
  if (galleryQuoteEl || galleryAuthorEl) {
    const quoteText = gallery.quote ?? gallery.heading;
    setText(galleryQuoteEl, quoteText);
    if (gallery.authorText !== undefined) {
      setText(galleryAuthorEl, gallery.authorText);
    } else if (gallery.author !== undefined) {
      setText(galleryAuthorEl, gallery.author ? `- ${gallery.author}` : "");
    }
  } else {
    setText(document.querySelector(".gallery h2"), gallery.heading);
  }
  setText(document.querySelector(".gallery .small-quote"), gallery.smallQuote);

  const footer = CONTENT.footer || {};
  setTextList(document.querySelectorAll(".footer-bg p"), footer.location);
  setText(document.querySelector(".footer .kicker"), footer.contactTitle);
  const footerEmail = document.querySelector(".footer .email");
  setText(footerEmail, footer.email);
  if (footerEmail && footer.email) {
    footerEmail.setAttribute("href", `mailto:${footer.email}`);
  }
  setText(document.querySelector(".footer .block .desc"), footer.desc);
  setTextList(document.querySelectorAll(".footer-nav a"), footer.navLinks);
};
