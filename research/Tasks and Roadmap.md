# UX Design Portfolio — Tasks & Roadmap

## Overview
Restructure the portfolio from a single-page Figma export into a proper multi-page Vite project, and fix all bugs/issues before public deployment.

---

## Pages

1. **Homepage** (`index.html`) — hero, about preview, stats, UX philosophy, gallery, project highlights, testimonials, blog section, footer
2. **Projects** (`pages/projects.html`) — parent page listing all 7 projects with tag filters
3. **Project Case Study** (`pages/project/[slug].html`) — 7 case study pages with MD-driven content
4. **About Me** (`pages/about.html`) — hero, story, values, skills, experience, personal, testimonials, CTA
5. **Contact** (`pages/contact.html`) — contact form (Google Sheets), info sidebar, FAQ
6. **Blog** (`pages/blog.html`) — parent page listing all posts with tag filters
7. **Blog Post** (`pages/blog/[slug].html`) — 6 blog posts with MD-driven content

---

## Current Folder Structure

```
ux-design-portfolio/
├── index.html
├── styles.css                       # Root CSS imports
├── vite.config.js
├── package.json
├── pages/
│   ├── projects.html
│   ├── project/
│   │   ├── care-naturals.html
│   │   ├── united-rubber.html
│   │   ├── adscult.html
│   │   ├── finflow.html
│   │   ├── meditrack.html
│   │   ├── flavor-street.html
│   │   └── eduspark.html
│   ├── about.html
│   ├── contact.html
│   ├── blog.html
│   └── blog/
│       ├── 12-mistakes-junior-designers-make.html
│       ├── how-you-work-with-developers.html
│       ├── designing-under-constraints.html
│       ├── ai-ux-real-use-cases.html
│       ├── using-claude-ai-as-ux-thinking-partner.html
│       └── why-ux-designers-need-vibe-coding.html
├── src/
│   ├── content/
│   │   ├── core/
│   │   │   ├── homepage.md
│   │   │   └── about-content.md
│   │   ├── projects/
│   │   │   ├── care-naturals.md
│   │   │   ├── united-rubber.md
│   │   │   ├── adscult.md
│   │   │   ├── finflow.md
│   │   │   ├── meditrack.md
│   │   │   ├── flavor-street.md
│   │   │   └── eduspark.md
│   │   ├── blogs/
│   │   │   ├── 12-mistakes-junior-designers-make.md
│   │   │   ├── how-you-work-with-developers.md
│   │   │   ├── designing-under-constraints.md
│   │   │   ├── ai-ux-real-use-cases.md
│   │   │   ├── using-claude-ai-as-ux-thinking-partner.md
│   │   │   └── why-ux-designers-need-vibe-coding.md
│   │   └── google-apps-script.js
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── sections.css
│   │   └── responsive.css
│   └── js/
│       ├── main.js
│       ├── nav.js
│       ├── animations.js
│       ├── testimonials.js
│       ├── marquee.js
│       ├── content.js
│       ├── md-content.js
│       ├── case-study-content.js
│       ├── blog-content.js
│       ├── about-content.js
│       ├── contact-form.js
│       └── utils.js
├── public/
│   └── images/
├── research/
│   ├── about.md                     # About page architecture research
│   ├── case-study-wireframe.md
│   ├── white-halves-notes.md
│   ├── My Tasks.md
│   └── Tasks and Roadmap.md         # This file
└── Inspirations/                    # Reference screenshots
```

---

## Completed Phases

### Phase 0: Asset Cleanup — DONE
- [x] Moved all assets to `public/images/` with kebab-case names
- [x] Replaced 105 Figma API URLs with `/images/image-missing.png`
- [x] Fixed asset path case sensitivity
- [x] Simplified case study cards to single placeholder images
- [x] Replaced pill mask elements with `<img>` tags

### Phase 1: Project Config & Scaffolding — DONE
- [x] Updated `package.json` to ES module, added description/author
- [x] Configured Vite for multi-page build (20 page entries)
- [x] Created all pages with consistent nav and footer

### Phase 2: CSS Decomposition — DONE
- [x] Split `styles.css` (1,250 lines) into 5 modular files
- [x] Added CSS font variables, `--accent-hover`
- [x] Replaced hardcoded colors with CSS variables
- [x] CSS prefixes: `cs-` (case study), `pp-` (projects), `bl-` (blog), `ab-` (about), `ct-` (contact)

### Phase 3: JS Modularization — DONE
- [x] Split `script.js` (702 lines) into 11 ES modules
- [x] MD-driven content system: homepage, case studies, blog, about page
- [x] Contact form with Google Sheets integration

### Phase 4: HTML Cleanup & Semantic Fixes — DONE
- [x] Proper title, meta, OG tags on all pages
- [x] `<main>`, `<h1>`, descriptive alt text, lazy loading
- [x] Extracted inline styles, fixed Unicode issues

### Phase 5: Content & Data Fixes — DONE
- [x] Replaced all Lorem ipsum and placeholder text
- [x] Fixed duplicate stats, case studies, testimonials
- [x] All 7 project MD files with realistic content
- [x] All 6 blog posts with full articles

### Phase 6: Responsive & Polish — DONE
- [x] 5 responsive breakpoints (1280, 1100, 768, 720, 480px)
- [x] `loading="lazy"`, `fetchpriority="high"`, `prefers-reduced-motion`
- [x] Keyboard navigation, focus indicators
- [x] Split-hover character animation on links and buttons

### Phase 7: Pages Built — DONE
- [x] Homepage with hero, about, stats, UX, gallery, projects (stacking cards), testimonials, blog section, footer
- [x] Projects parent page with tag filter chips, normal card layout, process section, CTA
- [x] 7 case study pages (11 sections each): hero, meta strip, overview, problem, goals, research, personas, wireframes, screens, results, reflections, next project
- [x] Blog index with tag filters + 6 blog posts with MD-driven body, author card, more posts section
- [x] About page: hero, story, values (4 cards), skills (3 groups with pills), experience timeline, personal, testimonials, CTA
- [x] Contact page: form (Google Sheets), info sidebar, FAQ section

### Phase 8: Bug Fixes & Cleanup — DONE
- [x] Fixed `--font-heading` → `--font-display` (7 locations in sections.css)
- [x] Fixed fixed navbar logo not updating (added brandImgFixed to IMAGE_MAP)
- [x] Added console warnings for silent MD content failures
- [x] Fixed `.case-card[hidden]` and `.bl-card[hidden]` display override for filters
- [x] Fixed `text-transform: uppercase` inheritance on blog cards (base.css `a` rule)
- [x] Excluded `.bl-card` from split-hover animation
- [x] Fixed blog filter to match `data-tags` (comma-separated multi-tag)
- [x] Organized content files: core/, projects/, blogs/

---

## Original Bugs Status (from My Tasks.md)

### Core Setup & Architecture
- [x] Setup GitHub and Git
- [x] Setup Vite
- [x] Improve the project architecture
- [x] Multiple refactored JS and CSS files (7 JS modules, 5 CSS files)
- [x] Multipage website, each page has its own HTML (20 page entries in vite.config.js)

### Critical Fixes
- [x] Replace Figma asset URLs with locally hosted images (105 URLs replaced)
- [x] Replace all lorem ipsum with real content
- [x] Fix the page title and add proper meta tags
- [x] Add real alt text to all images (50+ fixed)
- [x] Add lazy loading (`loading="lazy"`) to below-fold images (~30 images)
- [x] Clean up the testimonials marquee text ("mummy kasam" → "Real people, real feedback")
- [x] Add split-hover and card stacking animations
- [ ] Wire up social links in the footer (need real URLs)
- [x] MD-driven content system for projects, blogs, about page

### Homepage Content (`src/content/core/homepage.md`)
- [x] About section body copy
- [x] UX section description
- [x] Projects section description
- [x] All 7 case study cards with titles, subtitles, descriptions
- [x] Case study footer copy
- [x] Gallery small quote
- [x] Footer description

### Sub-pages
- [x] About page — hero, story, values, skills, experience, personal, testimonials, CTA
- [x] Case study pages — 7 full case studies with 11 sections each (MD-driven)
- [x] Blog posts — 6 full articles with tags, more posts, author cards
- [ ] Add real social media URLs to footer links

### Images to Replace (user to do)
- [ ] Replace `image-missing.png` placeholders with real project images
- [ ] Add real brand logo
- [ ] Add real stat icons
- [ ] Add real testimonial avatars
- [ ] Add real gallery images
- [ ] Add real project logos
- [ ] Add favicon

### New Implementations
- [x] Projects Parent Page (with tag filters, normal card layout)
- [x] 7 Case Study Pages (MD-driven, 11 sections each)
- [x] Contact Page (form → Google Sheets, info sidebar, FAQ)
- [x] About Me Page (8 sections, MD-driven)
- [x] Blog Page (index with tag filters + 6 posts)

---

## Remaining Work

### Content (user to update)
- [ ] Replace `image-missing.png` placeholders with real project images
- [ ] Add real brand logo
- [ ] Add real stat icons, gallery images, testimonial avatars, project logos
- [ ] Add favicon
- [ ] Update homepage text content in `src/content/core/homepage.md`
- [ ] Update about page content in `src/content/core/about-content.md`
- [ ] Update project case study content in `src/content/projects/*.md`
- [ ] Add real social media URLs to footer links across all pages

### Deployment
- [ ] Add custom domain
- [x] Deploy to Vercel/Netlify
- [x] Test Google Sheets form on production URL
- [ ] Run Lighthouse audit, target 90+
- [ ] Test all pages on mobile devices

### Nice to have
- [ ] Add page transition animations
- [ ] Add dark/light mode toggle
- [ ] Add reading progress bar on blog posts
- [ ] Add blog search functionality
- [ ] Add RSS feed for blog
- [ ] SEO: add sitemap.xml and robots.txt
