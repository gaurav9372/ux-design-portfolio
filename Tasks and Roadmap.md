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

## Completed

- [x] Setup GitHub and Git
- [x] Setup Vite

---

## Phase 0: Asset Cleanup [BLOCKING — do first]

**Goal:** Replace all Figma API URLs with local placeholder image, and reorganize assets for Vite.

- [x] Create `public/images/` directory and copy existing local assets into it
- [x] Replace ALL Figma API URLs in `homepageContent.js` with `/images/image-missing.png`
- [x] Replace ALL Figma API URLs in `script.js` with `/images/image-missing.png`
- [x] Fix case sensitivity: update all `assets/Images/` references to new `public/images/` paths
- [x] Update local image references (heroPhoto, arrowImg, uxRings, etc.) to new paths
- [x] Delete old `Assets/` folder
- [x] Replace complex case study right-side elements with single placeholder images
- [x] Replace pill mask elements with `<img>` tags
- [x] Fix logo tile borders and backgrounds
- [x] Fix section side padding to consistent 96px
- [x] Set case study cards to max-width 1088px
- [x] Fix case study cards to 50/50 split

---

## Phase 1: Project Configuration & Scaffolding

**Goal:** Set up Vite for multi-page builds and create the directory structure.

- [ ] Update `package.json`: change `"type": "commonjs"` → `"type": "module"`, add description and author
- [ ] Update `vite.config.js` with multi-page `rollupOptions.input` for all pages
- [ ] Create directories: `src/css/`, `src/js/`, `src/data/`, `pages/`, `pages/project/`, `pages/blog/`
- [ ] Create `pages/projects.html` — project grid/list with thumbnails and filters
- [ ] Create `pages/project/care-naturals.html` — case study page (challenge, process, solution, results)
- [ ] Create `pages/project/united-rubber.html` — case study page
- [ ] Create `pages/about.html` — full bio, skills, experience, tools, timeline
- [ ] Create `pages/contact.html` — contact form, email, social links, location map
- [ ] Create `pages/blog.html` — blog listing page with post cards
- [ ] Create `pages/blog/sample-post.html` — blog post template page
- [ ] All pages share consistent nav and footer HTML

---

## Phase 2: CSS Decomposition [parallel with Phase 3]

**Goal:** Split single CSS file into 5 modular files with expanded variables and responsive coverage.

- [ ] Create `src/css/base.css` — from lines 1–107 of current styles.css
  - Expand `:root` variables: add `--font-body`, `--font-display`, `--font-ui`, spacing scale, `--accent-hover`
  - Replace all hardcoded `#fff`/`#ffffff`/`rgba(255,255,255,...)` with CSS variable references
  - Include box-sizing reset, html/body base, scrollbar, base `a`/`img` rules
  - Include split-hover character animation styles
- [ ] Create `src/css/layout.css` — `.wrap`, `.section`, `.section-tight`, `.section-soft`, `.section-border`
- [ ] Create `src/css/components.css` — navbar, mobile menu, testimonial controls, case cards, logo tiles, gallery tiles, social links, buttons
- [ ] Create `src/css/sections.css` — hero, about, stats, UX circles, gallery, projects, case studies, testimonials, footer
- [ ] Create `src/css/responsive.css` — expand from 2 to 5 breakpoints:
  - `@media (max-width: 1280px)` — large desktop adjustments
  - `@media (max-width: 1100px)` — existing rules
  - `@media (max-width: 768px)` — NEW tablet (2-column stats, stacked case cards)
  - `@media (max-width: 720px)` — existing mobile rules
  - `@media (max-width: 480px)` — NEW small mobile (single column, reduced fonts)
- [ ] Fix gallery: replace fixed `height: 272px` with `aspect-ratio`
- [ ] Remove duplicate CSS selectors
- [ ] Consolidate repeated `margin: 0` into global reset

---

## Phase 3: JavaScript Modularization [parallel with Phase 2]

**Goal:** Convert global JS to ES modules for Vite.

- [ ] Create `src/js/utils.js` — export `$()`, `setText()`, `setTextList()`, `smoothTo()`, `parseStatText()`
- [ ] Create `src/data/homepage.js` — export `homepageContent` (replaces `window.HOMEPAGE_CONTENT`)
  - Update ALL image URLs to local `public/images/` paths
  - Fix duplicate stats (remove rows 3 and 6, add unique stats or reduce to 4)
  - Fix duplicate case study (card 3 needs unique content)
  - Replace Lorem ipsum with `"[TODO: Write real copy]"` markers
  - Remove U+FEFF from "DeSigner"
  - Replace "mummy kasam I didnt pay them" with professional tagline
- [ ] Create `src/js/content.js` — export `applyImages()`, `applyTextContent()`
  - Update `defaultImages` map to local paths
  - All DOM text-binding logic from current script.js lines 270–426
- [ ] Create `src/js/nav.js` — export `initNav()`
  - Navbar shrink-on-scroll, burger menu, CTA click, smooth scroll
  - Consolidate two separate scroll event listeners into one shared handler
- [ ] Create `src/js/animations.js` — export `initSplitHover()`, `initUxParallax()`, `initStatsAnimation()`
  - Extract magic numbers: `STAT_DURATION = 1400`, `NAV_HIDE_THRESHOLD = 160`, etc.
  - Add try/catch error handling
- [ ] Create `src/js/testimonials.js` — export `initTestimonials()`
  - Add `clearInterval` cleanup
  - Add keyboard arrow key support
- [ ] Create `src/js/marquee.js` — export `initMarquee()`
- [ ] Create `src/js/main.js` — entry point
  - Import all 5 CSS files
  - Import all JS modules
  - Call all `init*()` functions inside `DOMContentLoaded`, each in try/catch

---

## Phase 4: HTML Cleanup & Semantic Fixes [depends on Phases 2 & 3]

**Goal:** Fix all HTML issues — SEO, accessibility, semantics, inline styles.

### `<head>` overhaul:
- [ ] Title: `"Shreyansh Gaurav | UX Designer"` (replace "Test-P (Figma → HTML)")
- [ ] Add `<meta name="description" content="...">`
- [ ] Add Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Add `<meta name="theme-color" content="#121715">`
- [ ] Add favicon

### Semantic structure:
- [ ] Wrap all sections in a `<main>` element
- [ ] Convert hero title "I Design Solutions." to `<h1>`
- [ ] Replace CTA div with `role="button"` with actual `<button>` element

### Image alt text (50+ fixes):
- [ ] Brand logo: `alt="Shreyansh Gaurav logo"`
- [ ] Hero photo: `alt="Shreyansh Gaurav, UX Designer"`
- [ ] Stat icons: descriptive alt per icon
- [ ] Decorative images: keep `alt=""` and add `aria-hidden="true"`
- [ ] Testimonial avatars: `alt="[Name] photo"`
- [ ] Gallery/case study images: descriptive alt text

### Inline style cleanup (35+ occurrences):
- [ ] Create CSS classes: `.ux-inner`, `.gallery-inner`, `.projects-inner`, `.logos-container`, `.footer-contact`
- [ ] Create modifiers: `.hero-name`, `.logo-tile--borderless`, `.circle--company`, `.label--small`
- [ ] Keep case card `.abs` positioning inline (unique per-element Figma coordinates)

### Script tags:
- [ ] Replace two `<script>` tags with single `<script type="module" src="/src/js/main.js"></script>`
- [ ] Remove old `homepageContent.js` and `script.js` from root

### Social links:
- [ ] Replace empty `div.dot` placeholders with `<a>` elements containing SVG icons (LinkedIn, Behance, Dribbble, Twitter/X, Instagram)

### Asset paths:
- [ ] All `src="assets/Images/..."` → `src="/images/..."` (fixes case sensitivity bug)

---

## Phase 5: Content & Data Fixes [depends on Phases 0 & 3]

- [ ] Replace all Lorem ipsum text with real copy (or clear `[TODO]` markers)
- [ ] Remove duplicate stats — add 2 unique stats or reduce grid to 4
- [ ] Fix case study card 3 — needs unique title, subtitle, description
- [ ] Finalize all image paths to `public/images/` local values
- [ ] Verify testimonial data has real quotes (not test strings)

---

## Phase 6: Responsive Design & Polish [depends on all prior]

- [ ] Implement tablet breakpoint (768px): 2-column stats grid, stacked gallery, case cards responsive
- [ ] Implement small mobile breakpoint (480px): single column, reduced font sizes
- [ ] Gallery: `aspect-ratio` instead of fixed heights, `object-fit: cover`
- [ ] Add `loading="lazy"` on all below-fold images
- [ ] Add `fetchpriority="high"` on hero photo
- [ ] Add `prefers-reduced-motion` media query to disable parallax/animations
- [ ] Add keyboard navigation for testimonial carousel (arrow keys)
- [ ] Add visible `:focus-visible` indicators on all interactive elements

---

## Phase 7: Testing & Verification

- [ ] `npm run dev` — no console errors
- [ ] Test responsive at: 1440px, 1280px, 1100px, 768px, 720px, 480px
- [ ] Verify all anchor links scroll correctly
- [ ] Test mobile hamburger menu open/close
- [ ] Test testimonial carousel (click, auto-advance, keyboard)
- [ ] Test logo marquee animation
- [ ] `npm run build` — clean output, no warnings
- [ ] Verify sub-pages load (case-study.html, blog.html)
- [ ] All images load from local paths (no Figma URLs)
- [ ] Run Lighthouse — target 90+ on all categories

---

## Execution Order

```
Phase 0 (Asset Rescue)
    ↓
Phase 1 (Config & Scaffolding)
    ↓
Phase 2 (CSS) ──┬── Phase 3 (JS)    ← parallel
    ↓            ↓
Phase 4 (HTML Cleanup)
    ↓
Phase 5 (Content Fixes)
    ↓
Phase 6 (Responsive & Polish)
    ↓
Phase 7 (Testing)
```
