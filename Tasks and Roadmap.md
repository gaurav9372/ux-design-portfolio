# UX Design Portfolio — Tasks & Roadmap

## Overview
Restructure the portfolio from a single-page Figma export into a proper multi-page Vite project, and fix all bugs/issues before public deployment.

---

## Current Issues Summary

| Category | Count | Severity |
|----------|-------|----------|
| Figma API URLs (will break publicly) | 42 unique | CRITICAL |
| Asset path case sensitivity (`assets/` vs `Assets/`) | 1 | CRITICAL |
| Empty alt text on images | 50+ | HIGH |
| Lorem ipsum placeholder text | 6+ sections | HIGH |
| Page title is "Test-P (Figma → HTML)" | 1 | HIGH |
| Missing meta/OG tags | 7+ | MEDIUM |
| No `<main>` element or `<h1>` heading | 1 | MEDIUM |
| Inline styles in HTML | 35+ | MEDIUM |
| Hardcoded colors (should be CSS vars) | 15+ | MEDIUM |
| Duplicate stats data (rows 2=3, 5=6) | 2 | MEDIUM |
| Duplicate case study (cards 1=3) | 1 | MEDIUM |
| Only 2 responsive breakpoints | 1 | MEDIUM |
| Social links are empty dots | 1 | MEDIUM |
| Hidden Unicode char in "DeSigner" (U+FEFF) | 1 | LOW |
| "mummy kasam I didnt pay them" in testimonials | 1 | LOW |
| Magic numbers in animation JS | 10+ | LOW |
| Multiple scroll event listeners | 2 | LOW |

---

## Pages

1. **Homepage** (`index.html`) — hero, about preview, stats, UX philosophy, gallery, project highlights, testimonials, footer
2. **Projects** (`pages/projects.html`) — parent page listing all projects with thumbnails/filters
3. **Project Case Study** (`pages/project/[slug].html`) — child pages for each UI/UX case study (challenge, process, solution, results)
4. **About Me** (`pages/about.html`) — full bio, skills, experience, tools, timeline
5. **Contact** (`pages/contact.html`) — contact form, email, social links, location
6. **Blog** (`pages/blog.html`) — parent page listing all blog posts
7. **Blog Post** (`pages/blog/[slug].html`) — child pages for individual blog articles

---

## Target Folder Structure

```
ux-design-portfolio/
├── index.html                    # Homepage
├── pages/
│   ├── projects.html             # Projects listing (parent)
│   ├── project/
│   │   ├── care-naturals.html    # Case study child page
│   │   └── united-rubber.html    # Case study child page
│   ├── about.html                # About me page
│   ├── contact.html              # Contact page
│   ├── blog.html                 # Blog listing (parent)
│   └── blog/
│       └── sample-post.html      # Blog post child page
├── src/
│   ├── css/
│   │   ├── base.css              # Reset, CSS variables, typography, scrollbar
│   │   ├── layout.css            # .wrap, section padding, grid utilities
│   │   ├── components.css        # Navbar, cards, carousel, buttons, logo tiles
│   │   ├── sections.css          # Hero, about, stats, UX, gallery, projects, testimonials, footer
│   │   └── responsive.css        # All media queries (5 breakpoints)
│   ├── js/
│   │   ├── main.js               # Entry point — imports CSS + JS, calls init functions
│   │   ├── nav.js                # Navbar shrink, hide/show, burger menu, smooth scroll
│   │   ├── animations.js         # Split-hover, UX parallax, stat counters
│   │   ├── testimonials.js       # Carousel logic, auto-advance, keyboard nav
│   │   ├── marquee.js            # Logo marquee duplication
│   │   ├── content.js            # Image binding, text binding from data
│   │   └── utils.js              # $(), setText(), setTextList(), smoothTo(), parseStatText()
│   └── data/
│       └── homepage.js           # All text content + local image paths (replaces homepageContent.js)
├── public/
│   └── images/
│       ├── my-photo.png
│       ├── avatars/              # Face photos (testimonials, UX circles)
│       ├── case-studies/         # Case study screenshots, ellipses, frames
│       ├── gallery/              # Gallery grid images
│       ├── icons/                # Arrow, stat icons
│       ├── logos/                # Project brand logos
│       └── ux/                   # UX rings, circle decorations
├── vite.config.js                # Multi-page build config
├── package.json                  # type: "module"
├── .gitignore
├── README.md
├── white-halves-notes.md
└── Tasks and Roadmap.md          # This file
```

---

## Completed Phases

### Phase 0: Asset Cleanup — DONE
- [x] Moved all assets to `public/images/` with kebab-case names
- [x] Replaced 105 Figma API URLs with `/images/image-missing.png`
- [x] Fixed asset path case sensitivity
- [x] Simplified case study cards to single placeholder images
- [x] Replaced pill mask elements with `<img>` tags
- [x] Fixed logo tile borders, section padding (96px), case card 50/50 split (max 1088px)

### Phase 1: Project Config & Scaffolding — DONE
- [x] Updated `package.json` to ES module, added description/author
- [x] Configured Vite for multi-page build (8 page entries)
- [x] Created all skeleton pages: projects, about, contact, blog, 2 case studies, blog post template
- [x] All pages share consistent nav and footer

### Phase 2: CSS Decomposition — DONE
- [x] Split `styles.css` (1,250 lines) into 5 modular files:
  - `src/css/base.css` — variables, reset, typography, scrollbar, split-hover animation
  - `src/css/layout.css` — wrap, section padding utilities
  - `src/css/components.css` — navbar, mobile menu, case cards, logo tiles, testimonial controls
  - `src/css/sections.css` — hero, about, stats, UX, projects, gallery, testimonials, footer
  - `src/css/responsive.css` — 5 breakpoints (1280, 1100, 768, 720, 480px)
- [x] Added CSS font variables (`--font-body`, `--font-display`, `--font-ui`), `--accent-hover`
- [x] Replaced hardcoded colors with CSS variables

### Phase 3: JS Modularization — DONE
- [x] Split `script.js` (702 lines) into 7 ES modules:
  - `src/js/utils.js` — `$`, `setText`, `setTextList`, `smoothTo`, `parseStatText`, `clamp`
  - `src/data/homepage.js` — all content data + image paths
  - `src/js/content.js` — `applyImages()`, `applyTextContent()`
  - `src/js/nav.js` — navbar shrink/hide, burger menu, smooth scroll
  - `src/js/animations.js` — stat counters, UX parallax, split-hover text
  - `src/js/testimonials.js` — carousel with keyboard arrow support
  - `src/js/marquee.js` — logo track duplication
  - `src/js/main.js` — entry point with CSS imports and try/catch init
- [x] Deleted old root `script.js` and `homepageContent.js`

### Phase 4: HTML Cleanup & Semantic Fixes — DONE
- [x] Title: `"Shreyansh Gaurav | UX Designer"`
- [x] Added meta description, theme-color, Open Graph tags
- [x] Wrapped sections in `<main>`, converted hero title to `<h1>`
- [x] Replaced CTA `div[role=button]` with `<button>`
- [x] Fixed 50+ empty alt attributes with descriptive text
- [x] Extracted 7 inline styles to CSS classes (`.hero-name`, `.ux-inner`, `.gallery-inner`, `.projects-inner`, `.logos-container`, `.footer-contact`, `.circle--company`)
- [x] Replaced social dot `<div>`s with `<a>` elements
- [x] Fixed "DeSigner" Unicode char (U+FEFF)

### Phase 5: Content & Data Fixes — DONE
- [x] Replaced all Lorem ipsum with `[TODO]` markers (15 total)
- [x] Fixed duplicate stats: rows 3 & 6 now unique
- [x] Fixed duplicate case study: card 3 has `[TODO]` for new project
- [x] Fixed case study subtitles to be unique per project
- [x] Replaced "mummy kasam I didnt pay them" → "Real people, real feedback"
- [x] Replaced test testimonial quote with real copy

### Phase 6: Responsive & Polish — DONE
- [x] 5 responsive breakpoints active (1280, 1100, 768, 720, 480px)
- [x] Gallery: `aspect-ratio: 4/3` instead of fixed height
- [x] `loading="lazy"` on all below-fold images (~30)
- [x] `fetchpriority="high"` on hero photo
- [x] `prefers-reduced-motion` media query disables all animations
- [x] Global `:focus-visible` outline indicator
- [x] Keyboard arrow navigation for testimonial carousel
- [x] Fixed `100vw` scrollbar overflow → `100%`

### Phase 7: Testing — DONE
- [x] All 8 pages return 200
- [x] All 7 assets load correctly
- [x] `npm run build` clean: 24 modules, 0 errors, 377ms
- [x] Bundle: CSS 23.7KB, JS 14.6KB (gzipped ~5KB each)
- [x] Zero Figma URLs, zero old asset paths, zero Lorem ipsum remaining

---

## Remaining Work (for you)

Replace the 15 `[TODO]` markers with your real content:

### In `src/data/homepage.js`:
- [ ] About section body copy
- [ ] UX section description
- [ ] Projects section description
- [ ] Case study card 3 — title, subtitle, description
- [ ] Case study footer copy
- [ ] Gallery small quote
- [ ] Footer description

### In `index.html`:
- [ ] About section paragraph
- [ ] UX section description
- [ ] Gallery small quote
- [ ] Projects description
- [ ] Case study footer copy
- [ ] Footer description

### In sub-pages:
- [ ] About page — background, skills, experience content
- [ ] Case study pages — challenge, process, solution, results
- [ ] Blog post — real article content
- [ ] Add real social media URLs to footer links

### Images to replace:
- [ ] Replace `image-missing.png` placeholders with real project images
- [ ] Add real brand logo
- [ ] Add real stat icons
- [ ] Add real testimonial avatars
- [ ] Add real gallery images
- [ ] Add real project logos
- [ ] Add favicon
