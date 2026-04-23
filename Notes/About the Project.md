# Shreyansh Gaurav — Portfolio Website · Project Brief

> Self-contained briefing for continuing this portfolio in a fresh Claude session.
> Last updated: 2026-04-21

---

## 1. What this is

A personal UX design portfolio website for **Shreyansh Gaurav**, based in Varanasi, India. Built as a static multi-page site with Vite. **Dark editorial tone, sharp corners, gold accent** (`#FFC321`), lots of scroll-triggered motion.

Deployed from the `main` branch on GitHub: `gaurav9372/ux-design-portfolio`.

---

## 2. Tech stack

- **Build:** Vite 5 (Rolldown). `npm run dev` for dev server, `npm run build` for prod.
- **HTML:** plain, no framework. Each page is its own `.html` file.
- **CSS:** authored in `src/css/`, imported via `src/styles.css` aggregator. No preprocessor.
- **JS:** vanilla ES modules in `src/js/`. Entry is `src/js/main.js`, which runs shared modules on every page and dynamically imports page-specific modules based on `<body data-page="...">`.
- **Content:** MD files in `src/content/` loaded via `?raw` imports. Parser is simple — `## key\nvalue` blocks.
- **Fonts:** Outfit (headings) + Inter (body) via Google Fonts. Heebo was removed.
- **No SPA, no routing library** — plain multi-page nav.

---

## 3. File structure

```
/
├── index.html                      (homepage)
├── pages/
│   ├── about.html
│   ├── blog.html                   (blog index)
│   ├── contact.html
│   ├── projects.html               (projects index)
│   ├── blog/
│   │   └── {slug}.html             (6 blog posts)
│   └── project/
│       └── {slug}.html             (7 case studies)
├── Design System.html              (dev-only — documentation)
├── Cursors Moodboard.html          (dev-only — cursor demos)
├── heading-animations-moodboard.html (dev-only)
├── Notes/
│   └── About the Project.md        (this file)
├── public/                         (copied verbatim to dist/)
│   └── images/
│       ├── project-logos/          (case study hero logos)
│       ├── projectscreens/         (case study mosaic images per project)
│       ├── blog thumbs/
│       └── icons/
├── src/
│   ├── css/
│   │   ├── base.css                (tokens, reset, split-hover, custom cursor styles, body-anim)
│   │   ├── components.css          (nav, footer email, buttons, logo marquee)
│   │   ├── responsive.css          (breakpoint globals)
│   │   └── pages/
│   │       ├── home.css
│   │       ├── about.css
│   │       ├── blog.css
│   │       ├── contact.css
│   │       ├── projects.css
│   │       └── case-study.css
│   ├── js/
│   │   ├── main.js                 (entry; dispatches per-page loaders)
│   │   ├── nav.js                  (nav + admin dropdown)
│   │   ├── split-hover.js          (per-letter hover flip)
│   │   ├── card-links.js           (whole-card click forwarding)
│   │   ├── cursor.js               (custom cursor, site-wide)
│   │   ├── heading-anim.js         (Gravity Drop on yellow headings)
│   │   ├── body-anim.js            (Wave Rise per-line for body paragraphs)
│   │   ├── marquee.js              (logo marquee duplication)
│   │   ├── mosaic-gallery.js       (case study Final Screens grid + lightbox)
│   │   ├── case-study-content.js   (MD → DOM for case study pages)
│   │   ├── blog-content.js         (MD → DOM for blog posts, plus BLOG_LIST metadata)
│   │   ├── md-content.js           (homepage MD-driven text)
│   │   ├── about-content.js
│   │   ├── contact-form.js         (spam-guarded Google Sheets form)
│   │   ├── testimonials.js
│   │   ├── card-stack.js
│   │   ├── ux-parallax.js
│   │   ├── stats-counter.js
│   │   ├── project-filter.js
│   │   ├── blog-filter.js
│   │   └── lottie-icons.js
│   └── content/
│       ├── core/homepage.md
│       ├── about.md
│       ├── projects/{slug}.md       (7 case studies)
│       ├── blogs/{slug}.md          (6 blog posts)
│       └── google-apps-script.js    (server-side spam-protection code, pasted into Apps Script editor)
└── styles.css                      (single compiled output, referenced by every HTML)
```

---

## 4. Design system (shipped)

See `/Design System.html` for the live doc. Summary:

### Colors
- `--surface-base` `#121715` (page bg), `--surface-raised` `#1c2320` (sections/cards), `--surface-overlay` `#252B28` (modals/nav)
- `--text-primary` `#FFFFFF`, `--text-secondary` 72% white, `--text-tertiary` 48% white
- `--accent` `#FFC321` (gold — brand), `--accent-hover` `#FFD658`
- `--border-subtle` 8% white, `--border-default` 14% white
- `--state-error` `#FF6B6B`, `--state-success` `#34D399`
- Legacy aliases (`--bg`, `--ink`, `--muted`, `--stroke`) kept for backward compat

### Typography (2 families)
- **Outfit** — all headings
- **Inter** — all body + UI text
- 9-step modular scale (1.25×): Display 72 → H1 56 → H2 44 → H3 32 → H4 22 → Body L 18 → Body 16 → Small 14 → Eyebrow 12

### Radius — **sharp only**
- `--radius-none` `0` for EVERYTHING (buttons, inputs, cards, chips, modals)
- `--radius-full` `999px` reserved for genuinely round shapes only (avatars, color swatches, UX circles, dot indicators, spinner)
- Badges and filter chips were converted from pill to sharp

### Buttons — text-only
- Every CTA is uppercase text + trailing arrow `→`
- Hover = per-letter split-hover flip (white → accent yellow), 20ms stagger per char, 250ms duration
- Only exception: filter chips (togglable group UX needs a persistent active state) — rectangular outlined

### Motion tokens
- **Durations:** `--duration-instant` 100ms, `--duration-fast` 200ms, `--duration-base` 350ms, `--duration-slow` 600ms, `--duration-longform` 1800ms
- **Easings:** `--ease-out` `cubic-bezier(.22,1,.36,1)` (default), `--ease-smooth` `cubic-bezier(.19,1,.22,1)` (long-form body), `--ease-spring` `cubic-bezier(.34,1.56,.64,1)` (playful), `--ease-linear` (marquees)

### Named motion patterns
1. **Gravity Drop** (per-letter heading) — applied to every yellow heading site-wide
2. **Wave Rise** (per-line body) — applied to main body paragraphs, uses line-mask reveal
3. **Split-hover** (per-letter CTA hover) — the signature interaction
4. **Card Hover** — lift 4px + thumbnail zoom 1.04× + title color → accent
5. **Marquee** — logo strip, linear 28s loop

### Breakpoints
- Mobile `< 640px`
- Tablet `640–1024px`
- Desktop `> 1024px`

---

## 5. Custom features

### Custom cursor (site-wide, desktop only)
- File: `src/js/cursor.js`
- **Dual Orbit (Square variant):** yellow square outline follows mouse; yellow dot spring-lags behind
- On hover over `<a>`/`<button>`: square smoothly morphs to circle (500ms enter, 1000ms exit, ease-in-out); dot grows 6→18px white with bouncy spring curve
- On hover over text fields: outer expands to 120px circle and fades out; dot morphs to 2×22 white vertical caret
- Also triggers text-caret state when drag-selecting body text (mousedown on non-interactive content + left-button drag)
- **Optimized:** GPU transform-only positioning, idle-parking rAF, cached `closest()` lookups, passive listeners, idempotent init + teardown
- Skipped on touch, reduced-motion, viewports <900px, and pages with `<body data-no-cursor>` (Cursors Moodboard)

### Lightbox (case study Final Screens)
- File: `src/js/mosaic-gallery.js`
- Click any mosaic image → opens at 80% viewport width, blurred backdrop
- Arrow buttons match testimonial `.t-nav` style (56×56 square, 2px `#323936` border, accent on hover, active shrinks border + scale)
- Keyboard: ← → for nav, Esc to close; body scroll locked while open; 1/N counter at bottom

### Admin dropdown (homepage navbar, dev-only)
- Styled like other nav links (no box, just text + small chevron)
- Contains links to: `Design System.html`, `heading-animations-moodboard.html`, `Cursors Moodboard.html`
- **To disable before going live:** add `disabled` attribute to `.admin-btn` or delete the whole `.admin-dropdown` block from `index.html`

### Contact form (spam-protected)
- File: `src/js/contact-form.js` + `src/content/google-apps-script.js` (server-side)
- Client guards: honeypot, min-submit-time (2s), stale-form (2hr reload), 150-char field cap, digits-in-name reject, required fields, disabled-when-invalid submit
- Server guards: rate limit (30/hr per IP), max text length, honeypot confirm, min-time confirm, email regex
- Writes to a Google Sheet via Apps Script. Sheet has Date Received (date-only) + Time (timestamp) columns written as real Date values so grouping works.

### Filter bars (blog + projects)
- Sticky at top of viewport with smooth top-offset transition based on whether the nav is visible (body class `nav-visible`)
- Chips are sharp rectangles, transparent with accent-yellow active state (no fill)

### Nav behavior
- Top nav scrolls with page
- Fixed nav appears on scroll up, hides on scroll down (`.nav-hidden`)
- Sticky filter bars offset themselves based on this state

---

## 6. Content model

### Homepage (`src/content/core/homepage.md`)
Simple `## key\nvalue` format. Keys: `hero-hello-prefix`, `hero-hello-name`, `hero-title-prefix`, `hero-title-accent`, `hero-bg-1/2`, `about-heading`, `about-body`, `ux-heading`, `ux-desc`, `projects-heading`, `projects-desc`, `gallery-quote`, `gallery-author`, `gallery-small-quote`, `case-footer-left/right`, `testimonials-heading`, `testimonials-bgline`, `footer-location-1/2`, `footer-contact-title`, `footer-email`, `footer-desc`.

### Blog posts (`src/content/blogs/*.md`)
Keys: `hero-eyebrow`, `title`, `excerpt`, `tags`, `date`, `read-time`, `author`, `body`. Body supports simple markdown: `**bold**`, `*italic*`, `[link](url)`, numbered headings `1. Title` → `<h3>`, short lines → `<h3>`. `BLOG_LIST` in `blog-content.js` has the static metadata (title, date, excerpt, thumb path, tags) used for the "More posts" grid and filter page.

### Case studies (`src/content/projects/*.md`)
MD schema covers everything visible on the case study pages. **Current structure:**

**Hero:** `hero-eyebrow`, `hero-logo` (image path), `hero-title`, `hero-tagline`

**Meta strip (5 cards; Duration hidden via CSS):** `meta-method`, `meta-role`, `meta-category`, `meta-platform`, `meta-duration`

**Tools (multi-line "Name | URL"):** `tools-main`, `tools-supporting`. Icons auto-fetched from Simple Icons CDN with Google favicon fallback.

**Overview:** `overview-summary`, `overview-contribution`

**Requirements (renamed from Goals and Tasks):** `requirements-intro`, `requirement-1`, `requirement-2`, `requirement-3`

**Problems (2-col grid, up to 10):** `problem-1` through `problem-10`

**Challenges (2-col grid, up to 6):** `challenge-1` through `challenge-6`

**The Work (4 blocks):** `work-process`, `work-research`, `work-ideation`, `work-solutions`

**Design System:** `ds-color-{1-5}` (+ `-name`, `-hex`), `ds-font-{1-2}` (+ `-name`, `-preview`)

**Next Project card:** `next-label`, `next-title`, `next-href`

**Sections hidden via CSS but still in DOM:** `.cs-results`, `.cs-reflections`, `.cs-goals`, `.cs-result-highlight`, `.cs-research`, `.cs-personas`, `.cs-wireframes`. Old MD keys like `metric-{1-3}-value`, `results-metric-*`, `problem-pain-{1-3}` are no longer rendered but may still exist in older project MDs.

---

## 7. Per-project state (case studies)

| Slug | Screens folder | Logo | MD status |
|------|----------------|------|-----------|
| care-naturals | `carenaturals/` (7 screens) | ✅ `/images/project-logos/care-naturals.png` | ✅ Fully migrated to new schema with real content |
| united-rubber | _pending_ | — | old-schema placeholder content |
| adscult | _pending_ | — | old-schema placeholder content |
| finflow | _pending_ | — | old-schema placeholder content |
| meditrack | _pending_ | — | old-schema placeholder content |
| flavor-street | _pending_ | — | old-schema placeholder content |
| eduspark | _pending_ | — | old-schema placeholder content |

Note: all 7 HTML templates are identical in structure (updated together via Python scripts). Only the MD content differs. The other 6 projects will show old placeholder content until the user provides data.

### Workflow for next project (e.g. United Rubber)
1. User drops final screens into `public/images/projectscreens/{slug}/`
2. User provides project logo → save as `public/images/project-logos/{slug}.png`
3. Claude does reverse-analysis from screens and drafts new MD to `{slug}-draft.md`
4. User reviews draft, gives green light
5. Claude migrates the draft content into `{slug}.md`

---

## 8. User's style preferences (learned from past sessions)

- **First-person conversational voice** — "I led...", "I ran..." not "The designer did..."
- **Realistic placeholder metrics** OK (e.g. "+35% conversion") — user will replace with real data later
- **Draft to `-draft.md` first**, don't overwrite production MD directly
- **Match existing MD schema** — don't invent new keys without asking
- **Sharp corners everywhere** — only circles/pills for genuinely round shapes
- **Per-letter hover animation** is the site's signature — always describe it as per-letter, never per-word
- **Over-explain rationale** in briefs/commits — user likes understanding *why*
- **Test builds** after structural changes (`npm run build`)
- **Separate concerns:** page-specific CSS in `src/css/pages/`, shared in `components.css` or `base.css`

---

## 9. Known open items

### Pre-launch cleanup
- [ ] Disable the Admin dropdown in `index.html` (or remove entirely)
- [ ] Remove dev-only pages from public indexing: `Design System.html`, `Cursors Moodboard.html`, `heading-animations-moodboard.html`
- [ ] Replace placeholder metrics in Care Naturals with real numbers (or decide whether to ship with placeholders)
- [ ] Add proper SEO tags, Open Graph images, structured data
- [ ] Add 404 page
- [ ] Review and test all form submissions with real Apps Script URL

### Content
- [ ] 6 remaining case studies need real content (reverse-analyzed from screens)
- [ ] 5 remaining case studies need project logos
- [ ] All 7 case studies' hero thumbnails currently use `/images/image-missing.png` (except Care Naturals which uses `/images/project1.png`)
- [ ] Blog posts all have dummy bodies — may need real article content

### Features considered but not built
- [ ] Eleventy / Astro migration for proper component reuse (nav and footer currently duplicated across every HTML file)
- [ ] Real icons in Tool cards beyond Simple Icons + favicon fallback (could add custom SVG overrides if needed)
- [ ] Re-enable Results & Reflections sections with real data
- [ ] Re-enable Personas + Wireframes sections for projects that have them

---

## 10. Quick-start checklist for a new session

1. **Read this file first.**
2. `git status` + `git log --oneline -5` to see recent work
3. Check the browser against `npm run dev` to see the current state
4. If unsure about a section's MD keys, grep `data-cs="` in `pages/project/{any}.html`
5. If unsure about a color token, check `src/css/base.css` `:root` block
6. Ask the user for voice/tone confirmation before writing case study copy
7. Always save new case study content to `{slug}-draft.md` first, never overwrite production MD directly
8. Test `npm run build` after any structural change
