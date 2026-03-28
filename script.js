const ASSETS = {
      image7: "https://www.figma.com/api/mcp/asset/6a35ca12-8997-443f-b719-1dabdb4c6a0c",
      unsplash: "https://www.figma.com/api/mcp/asset/3fd4ee82-b967-4cc8-b0d5-1abb2d221cab",
      rect104: "https://www.figma.com/api/mcp/asset/b72f2c96-0bc9-48c1-888b-f715beb419d3",
      rect108: "https://www.figma.com/api/mcp/asset/0e460ad3-7665-487e-a1aa-e677b1fef724",
      rect106: "https://www.figma.com/api/mcp/asset/c25bd521-e880-4892-8db5-6a0e6410495c",
      rect103: "https://www.figma.com/api/mcp/asset/ba09a7c8-1df6-40e2-bafd-8438113e65f9",
      rect107: "https://www.figma.com/api/mcp/asset/37b06e40-5a6a-4074-a38a-d73611dfa1cc",
      rect105: "https://www.figma.com/api/mcp/asset/c174f825-dc59-459b-a0dd-fbc9f2006d21",

      arrow: "https://www.figma.com/api/mcp/asset/c4313837-df2e-4181-8ea9-a51ad4efda83",
      heroOrn: "https://www.figma.com/api/mcp/asset/8b08573e-f325-4d1a-9f2d-763ed3865cb1",

      stat1: "https://www.figma.com/api/mcp/asset/fcd1184b-1a26-4964-8d3f-d195c6010e53",
      stat2: "https://www.figma.com/api/mcp/asset/cc35cbf0-a88b-448b-ae1e-83bf4ebd48b4",
      stat3: "https://www.figma.com/api/mcp/asset/b6f494e2-7421-4c64-9f3a-c7ec9a50ddb1",
      stat4: "https://www.figma.com/api/mcp/asset/8548a8d0-49f4-412b-b727-54d82c1bc2b9",

      logo33: "https://www.figma.com/api/mcp/asset/0fcd6465-ebb6-4501-8dba-b5777e321119",
      logo34: "https://www.figma.com/api/mcp/asset/1838a157-93b3-4bbf-a1f4-b54ee6c4524f",
      logo35: "https://www.figma.com/api/mcp/asset/8354beec-94a0-494f-ba0c-357b11768c83",
      logo36: "https://www.figma.com/api/mcp/asset/accff0a1-1b79-4f04-96af-4e7cbae78047",
      logo37: "https://www.figma.com/api/mcp/asset/bcbf848b-9664-4dee-aa80-ecddd89d6940",
      logo38: "https://www.figma.com/api/mcp/asset/9ec0ab3f-6110-4285-8fa0-3205b52c0b04",
      logo39: "https://www.figma.com/api/mcp/asset/95420577-229c-4e5b-8d8d-2da7117142ef",

      mask40: "https://www.figma.com/api/mcp/asset/e51b971d-bb95-440b-aa36-394ff78a930b",
      mask41: "https://www.figma.com/api/mcp/asset/bd037083-d47f-4c45-a733-2bc3e9bd2bff",
      mask42: "https://www.figma.com/api/mcp/asset/9f375140-ee9e-4f48-87ee-b0a19627d54a",
      mask43: "https://www.figma.com/api/mcp/asset/dabe87f5-d3ce-4754-9a74-d247ffa4b948",
      mask44: "https://www.figma.com/api/mcp/asset/00da6b34-00c6-466d-9488-015985cd7391",
      mask45: "https://www.figma.com/api/mcp/asset/497e3c26-6356-4938-8264-0e72ade84e8c",
      mask46: "https://www.figma.com/api/mcp/asset/22ea0a88-34b0-48cc-bb55-e9cb1160af7c",
      mask47: "https://www.figma.com/api/mcp/asset/5416ec64-c4ab-43d5-b703-cf680f63a003",

      img125: "https://www.figma.com/api/mcp/asset/7467f34b-7b90-4410-8d62-7aa8163020ff",
      img118: "https://www.figma.com/api/mcp/asset/8c3feecd-b583-4fc4-9071-9727e6819b17",
      ellipse19: "https://www.figma.com/api/mcp/asset/9abbe2e9-8404-441e-9b42-b3fceddd8985",
      ellipse20: "https://www.figma.com/api/mcp/asset/284aacc1-d80e-40d0-bed8-73762869a000",
      ellipse21: "https://www.figma.com/api/mcp/asset/9384ae1c-5680-4eb1-b46a-afedfc06e9f5",
      ellipse22: "https://www.figma.com/api/mcp/asset/564797c8-71e2-43b0-a4d0-8dbcacf36edb",
      ellipse23: "https://www.figma.com/api/mcp/asset/b6e4b482-18e7-4417-8f5c-d11ed1ad11ee",
      ellipse24: "https://www.figma.com/api/mcp/asset/e098c26d-cdc6-45fc-b225-dd49e981650d",
      frame949: "https://www.figma.com/api/mcp/asset/22a866ab-4b43-4a97-8209-244b6d61efc8",
      frame937: "https://www.figma.com/api/mcp/asset/2db73180-c3e0-405f-957c-ed04da803a3d",
      infra: "https://www.figma.com/api/mcp/asset/25f05f37-e112-470c-9b1d-eafca20813b2",
      rounded: "https://www.figma.com/api/mcp/asset/ec560469-3138-4721-ba2b-01622a7266d8",
      footerOrn: "https://www.figma.com/api/mcp/asset/277f672f-5ad2-4bf0-9a5d-7f9b81ed00a6"
    };

// Bind images and text content
const $ = (id) => document.getElementById(id);
const CONTENT = window.HOMEPAGE_CONTENT || {};
const contentImages = CONTENT.images && typeof CONTENT.images === "object" ? CONTENT.images : {};

const defaultImages = {
  brandImg: ASSETS.image7,
  aboutLogo: ASSETS.image7,
  arrowImg: ASSETS.arrow,
  heroOrn: ASSETS.heroOrn,
  heroPhoto: ASSETS.unsplash,

  statIcon1: ASSETS.stat1,
  statIcon2: ASSETS.stat2,
  statIcon3: ASSETS.stat2,
  statIcon4: ASSETS.stat3,
  statIcon5: ASSETS.stat4,
  statIcon6: ASSETS.stat4,

  c1: ASSETS.rect104,
  c2: ASSETS.rect108,
  c3: ASSETS.rect106,
  c4: ASSETS.rect103,
  c5: ASSETS.rect107,
  c6: ASSETS.rect105,
  uxRings: "assets/Images/uxDualRingsCenter.svg",
  uxRingClient: "assets/Images/uxSmallerRing.svg",
  uxRingCompany: "assets/Images/uxSmallerRing.svg",

  logo1: ASSETS.logo33,
  logo2: ASSETS.logo34,
  logo3: ASSETS.logo35,
  logo4: ASSETS.logo36,
  logo5: ASSETS.logo37,
  logo6: ASSETS.logo38,
  logo7: ASSETS.logo39,

  pill1: ASSETS.mask40,
  pill2: ASSETS.mask41,
  pill3: ASSETS.mask42,
  pill4: ASSETS.mask43,
  pill5: ASSETS.mask44,
  pill6: ASSETS.mask45,
  pill7: ASSETS.mask46,
  pill8: ASSETS.mask47,

  caseIconA: ASSETS.img125,
  caseIconB: ASSETS.img118,
  caseIconC: ASSETS.img125,
  caseArrow: ASSETS.frame949,

  e19: ASSETS.ellipse19,
  e20: ASSETS.ellipse20,
  e21: ASSETS.ellipse21,
  e22: ASSETS.ellipse22,
  e23: ASSETS.ellipse23,
  e24: ASSETS.ellipse24,
  frame937: ASSETS.frame937,

  infraShot: ASSETS.infra,
  roundedShot: ASSETS.rounded,
  imgColA: ASSETS.img125,

  limeA: ASSETS.rect103,
  limeB: ASSETS.rect106,
  limeC: ASSETS.rect108,

  footerOrn: ASSETS.footerOrn,
  g1: ASSETS.rect104,
  g2: ASSETS.rect103,
  g3: ASSETS.rect103,
  g4: ASSETS.rect106,
  g5: ASSETS.rect103,
  g6: ASSETS.rect103,
  g7: ASSETS.rect104,
  g8: ASSETS.rect106
};

const images = { ...defaultImages, ...contentImages };

const applyImages = () => {
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

const setText = (el, value) => {
  if (!el || value === undefined || value === null) return;
  el.textContent = String(value);
};

const setTextList = (elements, values) => {
  if (!elements || !values || !values.length) return;
  elements.forEach((el, i) => {
    if (values[i] !== undefined && values[i] !== null) {
      setText(el, values[i]);
    }
  });
};

const parseStatText = (text) => {
  if (!text) return null;
  const match = text.match(/-?\d[\d,]*\.?\d*/);
  if (!match) return null;
  const raw = match[0];
  const number = parseFloat(raw.replace(/,/g, ""));
  if (Number.isNaN(number)) return null;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const suffix = text.replace(raw, "");
  return {
    number,
    decimals,
    suffix,
    hasComma: raw.includes(",")
  };
};

const statData = [];
const initStats = () => {
  const nums = document.querySelectorAll(".stat .num");
  const labels = document.querySelectorAll(".stat .lbl");
  if (Array.isArray(CONTENT.stats)) {
    CONTENT.stats.forEach((item, i) => {
      if (!item) return;
      setText(nums[i], item.number);
      setText(labels[i], item.label);
    });
  }

  nums.forEach((el) => {
    const parsed = parseStatText(el.textContent);
    if (!parsed) return;
    statData.push({ el, ...parsed });
    el.textContent = `0${parsed.suffix}`;
  });
};

const animateStat = (item) => {
  const duration = 1400;
  const start = performance.now();
  const startVal = 0;
  const endVal = item.number;

  const formatValue = (value) => {
    let output = item.decimals ? value.toFixed(item.decimals) : Math.round(value).toString();
    if (!item.decimals && item.hasComma) {
      output = Number(output).toLocaleString("en-US");
    }
    return `${output}${item.suffix}`;
  };

  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = startVal + (endVal - startVal) * eased;
    item.el.textContent = formatValue(value);
    if (t < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const setupStatsAnimation = () => {
  if (!statData.length) return;
  const statsSection = document.getElementById("stats");
  if (!statsSection) return;
  let animated = false;
  const run = () => {
    if (animated) return;
    animated = true;
    statData.forEach(animateStat);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(statsSection);
  } else {
    run();
  }
};

applyImages();

const setupLogoMarquee = (selector) => {
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

setupLogoMarquee(".logos-top");
setupLogoMarquee(".logos-bottom");

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

initStats();
setupStatsAnimation();

const setupUxScrollFx = () => {
  const items = Array.from(document.querySelectorAll(".ux-fx"));
  if (!items.length) return;

  const data = items.map((el) => {
    const fxFrom = parseFloat(getComputedStyle(el).getPropertyValue("--fx-from")) || 0;
    const delayRaw = getComputedStyle(el).getPropertyValue("--fx-delay") || "0ms";
    const delayMs = parseFloat(delayRaw) || 0;
    return {
      el,
      fxFrom,
      offset: delayMs * 0.25
    };
  });

  let range = window.innerHeight * 0.6;
  let ticking = false;

  const update = () => {
    ticking = false;
    const viewportCenter = window.innerHeight / 2;
    data.forEach((item) => {
      const rect = item.el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter) + item.offset;
      const raw = 1 - Math.min(distance / range, 1);
      const speed = parseFloat(getComputedStyle(item.el).getPropertyValue("--fx-speed")) || 1;
      const smooth = raw * raw * (3 - 2 * raw);
      const progress = Math.pow(smooth, speed);
      const depth = parseFloat(getComputedStyle(item.el).getPropertyValue("--fx-depth")) || 1;

      const x = item.fxFrom * depth * (1 - progress);
      const y = 18 * depth * (1 - progress);
      const scale = 0.92 + 0.08 * progress;
      const blur = 2 * depth * (1 - progress);

      const baseOpacity = parseFloat(getComputedStyle(item.el).getPropertyValue("--base-opacity")) || 1;
      const opacity = Math.max(0, Math.min(progress * baseOpacity, baseOpacity));
      item.el.style.opacity = opacity.toFixed(3);
      item.el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      item.el.style.filter = `blur(${blur}px)`;
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const onResize = () => {
    range = window.innerHeight * 0.6;
    onScroll();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  update();
};

setupUxScrollFx();

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

const getTestimonialsContent = () => {
  const raw = (window.HOMEPAGE_CONTENT && window.HOMEPAGE_CONTENT.testimonials)
    ? window.HOMEPAGE_CONTENT.testimonials
    : (CONTENT.testimonials || {});
  return Array.isArray(raw) ? { items: raw } : raw;
};

const testimonialsContent = getTestimonialsContent();
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

const defaultTestimonials = [
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    name: "Rahul Raj",
    role: "Developer",
    avatar: ASSETS.rect107
  },
  {
    quote: "The flow felt effortless and the layout reads clean on every screen.",
    name: "Aditi Sharma",
    role: "Product Designer",
    avatar: ASSETS.rect104
  },
  {
    quote: "Clear structure, fast decisions, and a sharp visual story.",
    name: "Neel Verma",
    role: "Founder",
    avatar: ASSETS.rect103
  },
  {
    quote: "The UX choices improved comprehension without adding noise.",
    name: "Priya Singh",
    role: "UX Lead",
    avatar: ASSETS.rect106
  },
  {
    quote: "Every screen feels intentional. The hierarchy is spot on.",
    name: "Karan Mehta",
    role: "PM",
    avatar: ASSETS.rect108
  },
  {
    quote: "The experience is calm, structured, and easy to navigate.",
    name: "Rhea Patel",
    role: "Researcher",
    avatar: ASSETS.rect105
  },
  {
    quote: "Strong visual rhythm with just the right amount of contrast.",
    name: "Arjun Nair",
    role: "Engineer",
    avatar: ASSETS.rect104
  }
];

const testimonials = Array.isArray(testimonialsContent.items) && testimonialsContent.items.length
  ? testimonialsContent.items
  : defaultTestimonials;

const testimonialQuote = document.getElementById("testimonialQuote");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");
const testimonialAvatar = document.getElementById("testimonialAvatar");
const testimonialDots = document.getElementById("tDots");
const testimonialPrev = document.getElementById("tPrev");
const testimonialNext = document.getElementById("tNext");
const testimonialCard = document.querySelector(".testimonial-card");

if (
  testimonialQuote &&
  testimonialName &&
  testimonialRole &&
  testimonialAvatar &&
  testimonialDots &&
  testimonialPrev &&
  testimonialNext
) {
  let testimonialIndex = 0;
  let autoTimer = null;
  let fadeTimer = null;

  const renderTestimonial = (index, animate = true) => {
    const applyContent = () => {
      const item = testimonials[index];
      testimonialQuote.textContent = item.quote;
      testimonialName.textContent = item.name;
      testimonialRole.textContent = item.role;
      testimonialAvatar.src = item.avatar;

      const dots = testimonialDots.querySelectorAll(".t-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    };

    if (!testimonialCard || !animate) {
      applyContent();
      return;
    }

    testimonialCard.classList.add("is-fading");
    if (fadeTimer) {
      window.clearTimeout(fadeTimer);
    }
    fadeTimer = window.setTimeout(() => {
      applyContent();
      testimonialCard.classList.remove("is-fading");
    }, 260);
  };

  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "t-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    dot.addEventListener("click", () => {
      testimonialIndex = i;
      renderTestimonial(testimonialIndex);
      startAuto();
    });
    testimonialDots.appendChild(dot);
  });

  const goPrev = () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(testimonialIndex);
    startAuto();
  };
  const goNext = () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial(testimonialIndex);
    startAuto();
  };

  testimonialPrev.addEventListener("click", goPrev);
  testimonialNext.addEventListener("click", goNext);

  const startAuto = () => {
    if (autoTimer) {
      window.clearInterval(autoTimer);
    }
    autoTimer = window.setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      renderTestimonial(testimonialIndex);
    }, 4000);
  };

  renderTestimonial(testimonialIndex, false);
  startAuto();
}
// Interactions: smooth scroll + mobile menu
    function smoothTo(hash){
      const el = document.querySelector(hash);
      if (!el) return;
      el.scrollIntoView({behavior:"smooth", block:"start"});
    }

    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener("click",(e)=>{
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        e.preventDefault();
        closeMenu();
        smoothTo(href);
        history.replaceState(null,"",href);
      });
    });

    const burger = $("burger");
    const panel = $("mobilePanel");

    function openMenu(){
      burger.setAttribute("aria-expanded","true");
      panel.classList.add("open");
    }
    function closeMenu(){
      burger.setAttribute("aria-expanded","false");
      panel.classList.remove("open");
    }

    burger.addEventListener("click",()=>{
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    // CTA jump
    $("worksCta").addEventListener("click",()=>smoothTo("#projects"));

    // Split hover animation for clickable text
    const splitTextForHover = (el) => {
      if (!el || el.dataset.split === "true") return;
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodes = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      if (!nodes.length) return;

      let charIndex = 0;
      nodes.forEach((node) => {
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        for (const ch of text) {
          if (ch === " ") {
            frag.appendChild(document.createTextNode(" "));
            continue;
          }
          const span = document.createElement("span");
          span.className = "split-char";

          const inner = document.createElement("span");
          inner.className = "split-char-inner";
          inner.textContent = ch;

          const clone = document.createElement("span");
          clone.className = "split-char-clone";
          clone.textContent = ch;

          const delay = Math.min(charIndex * 20, 400);
          span.style.setProperty("--split-delay", `${delay}ms`);

          span.appendChild(inner);
          span.appendChild(clone);
          frag.appendChild(span);
          charIndex += 1;
        }
        node.parentNode.replaceChild(frag, node);
      });

      el.dataset.split = "true";
      el.classList.add("split-hover");
    };

    document.querySelectorAll("a, button, [role=\"button\"], .nav-cta, .footer .email").forEach((el) => {
      splitTextForHover(el);
    });

    // Navbar shrink on scroll (scroll-progress based)
    const navEl = document.querySelector(".nav");
    let navTicking = false;
    let lastNavY = window.scrollY;
    const updateNav = () => {
      navTicking = false;
      if (!navEl) return;
      const y = window.scrollY;
      const delta = y - lastNavY;
      const start = 20;
      const end = 120;
      const progress = Math.min(Math.max((y - start) / (end - start), 0), 1);
      navEl.style.setProperty("--nav-progress", progress.toFixed(3));
      const hideAfter = 160;
      const showAt = 20;
      const minDelta = 6;
      if (y <= showAt) {
        navEl.classList.remove("nav-hidden");
      } else if (y > hideAfter) {
        if (delta > minDelta) {
          navEl.classList.add("nav-hidden");
        } else if (delta < -minDelta) {
          navEl.classList.remove("nav-hidden");
        }
      }
      lastNavY = y;
    };
    const onNavScroll = () => {
      if (navTicking) return;
      navTicking = true;
      requestAnimationFrame(updateNav);
    };
    window.addEventListener("scroll", onNavScroll, { passive: true });
    updateNav();
