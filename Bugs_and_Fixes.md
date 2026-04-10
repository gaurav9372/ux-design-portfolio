# Bugs and Fixes — Critical Site-Wide Audit

> Audit performed by a senior dev / UX reviewer focused on performance, architecture, security, and accessibility. These are real site-wide issues, not nitpicks. Documentation only — no code changes made.

---

## 1. 96.4 MB of Unoptimized PNG Images (No WebP, No Compression)

**Severity:** CRITICAL
**Location:** `public/images/` — especially `public/images/projectscreens/`, `public/images/blog thumbs/`, `public/images/client logos/`

### Description
The `public/images/` directory contains **~115 image files totaling roughly 96 MB**. Every image is an uncompressed PNG or JPEG. There are zero WebP or AVIF alternatives. The worst offenders are in case study screens:

- `projectscreens/carenaturals/home.png` — ~6.1 MB
- `projectscreens/meditrack/solar.png` — ~4.8 MB
- `projectscreens/flavorstreet/nobi.png` — ~4.7 MB
- `projectscreens/unitedrubber/home.png` — ~4.6 MB
- 40+ more PNGs above 500 KB

Every time a user visits a case study, the mosaic gallery loads every screen in that folder (17 screens for united-rubber alone = ~45 MB download). On a 4G connection, that's 20–40 seconds per case study page. On mobile data, visitors will bounce before the page finishes loading.

The marquee on the homepage alone has 46 client logos, all uncompressed PNGs with transparent backgrounds. That's 8–12 MB just to render a logo strip.

### Fix
1. Convert all PNG screenshots to WebP (80–90% size reduction typical for screenshots). Keep a JPG fallback only if supporting very old browsers.
2. Use responsive `srcset` with a 1x desktop and a smaller mobile variant (e.g. `home.png` → `home-1200.webp` + `home-600.webp`).
3. Add a Vite plugin like `vite-plugin-imagemin` or pre-process images with `sharp` in `scripts/generate-screen-manifest.js`.
4. Client logos: SVG is the correct format — many of them are simple wordmarks. Re-export the 46 logos as SVG where possible.
5. Lazy-load all case study screens except the first one in each project (use `loading="lazy"` and `decoding="async"`).

---

## 2. Google Apps Script URL Publicly Exposed with No Rate Limiting

**Severity:** CRITICAL
**Location:** `src/js/contact-form.js` line 15

### Description
```js
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbys1fv9eWpNQb7fbL9qrZSoSV2uYeZcCl-p48sPic9h_S2D0Z14ReeZMWKEFTZNUy3E/exec';
```

This URL ships in the client bundle for every visitor. The Apps Script endpoint has no rate limiting, no CSRF protection, no CAPTCHA, and no origin check. Anyone can inspect the built JS, copy the URL, and write a 10-line script to flood your Google Sheet with thousands of spam submissions. This will happen the moment the site is indexed or shared publicly.

The Apps Script is also set to `Anyone` access, which means the endpoint itself has zero protection. A motivated attacker can fill your sheet until it hits the Google Sheets row limit (10 million cells) and the form silently breaks.

### Fix
1. Add honeypot field to the form (hidden input that real users won't fill — reject if filled).
2. Add a client-side minimum-time check (reject submissions faster than 2 seconds — bots submit instantly).
3. In the Apps Script itself, add:
   - Origin check (only accept POSTs where the referer matches your domain)
   - Simple rate limit via ScriptProperties (max N submissions per IP per hour)
4. Consider moving to Formspree or Web3Forms free tier — both have built-in spam protection.
5. Longer-term: run submissions through a serverless function (Vercel/Netlify) that validates, rate-limits, then forwards to the sheet.

---

## 3. Every JS Init Function Runs on Every Page

**Severity:** HIGH
**Location:** `src/js/main.js` lines 14–34

### Description
`main.js` calls 18 init functions wrapped in try/catch on every single page load:

```js
try { applyCaseStudyContent(); } catch (e) { ... }  // only /pages/project/*
try { applyBlogContent(); } catch (e) { ... }       // only /pages/blog/*
try { applyAboutContent(); } catch (e) { ... }      // only /pages/about
try { initStatsAnimation(); } catch (e) { ... }     // only homepage
try { initUxParallax(); } catch (e) { ... }         // only homepage
try { initTestimonials(); } catch (e) { ... }       // only homepage
try { initMarquee(); } catch (e) { ... }            // only homepage
try { initCardStack(); } catch (e) { ... }          // only homepage
try { initProjectFilter(); } catch (e) { ... }      // only /pages/projects
try { initBlogFilter(); } catch (e) { ... }         // only /pages/blog
try { initContactForm(); } catch (e) { ... }        // only /pages/contact
try { initMosaicGallery(); } catch (e) { ... }      // only case study pages
try { initLottieIcons(); } catch (e) { ... }        // only homepage
```

Most of these bail out early via `querySelector` guards, so they don't crash — but they still:
- Execute function bodies
- Walk the DOM searching for selectors that won't exist
- Import modules that are bundled but unused
- Attach event listeners that trigger on scroll/resize even when nothing needs them

On a blog post page, `initCardStack` runs and reads `window.innerHeight`, queries `.case-list`, `.case-stack`, `.case-card`, `.case-footer`. On the contact page, `initMarquee` queries logos that don't exist. This is wasted CPU on every navigation.

### Fix
Use page markers on `<body>` (e.g. `<body class="page-home">`) and gate init calls:

```js
const page = document.body.dataset.page;
if (page === 'home') {
  initStatsAnimation();
  initUxParallax();
  initTestimonials();
  initMarquee();
  initCardStack();
  initLottieIcons();
}
if (page === 'project') initMosaicGallery();
if (page === 'contact') initContactForm();
// etc.
```

Even better — use dynamic `import()` so the code isn't even in the bundle for pages that don't need it.

---

## 4. Lottie-web Bundled on Every Page (170 KB Unused on 17 of 19 Pages)

**Severity:** HIGH
**Location:** `src/js/main.js` line 9, `src/js/lottie-icons.js`, `package.json`

### Description
`lottie-web` is ~170 KB minified and is imported statically at the top of `lottie-icons.js`:

```js
import lottie from 'lottie-web';
```

Because `lottie-icons.js` is imported by `main.js` on every page, **every single HTML entry includes the full lottie-web library in its bundle chunk** — even the contact page, the about page, every blog post, and every case study.

Only the homepage has `[data-lottie]` elements (6 stat icons + the gallery happy-friends icon). That's **2 pages out of 19** that actually use Lottie. The other 17 pages each ship an unused 170 KB dependency.

### Fix
Dynamic import it only on pages that need it:

```js
// in main.js
if (document.querySelector('[data-lottie]')) {
  import('./lottie-icons.js').then(({ initLottieIcons }) => initLottieIcons());
}
```

This moves lottie-web into its own chunk that's only fetched on the homepage and case study pages with animated icons.

---

## 5. All 7 Project MD Files Bundled Into Every Case Study Page

**Severity:** HIGH
**Location:** `src/js/case-study-content.js` lines 1–17

### Description
```js
import careNaturalsMd from '../content/projects/care-naturals.md?raw';
import unitedRubberMd from '../content/projects/united-rubber.md?raw';
import adscultMd from '../content/projects/adscult.md?raw';
import finflowMd from '../content/projects/finflow.md?raw';
import meditrackMd from '../content/projects/meditrack.md?raw';
import flavorStreetMd from '../content/projects/flavor-street.md?raw';
import edusparkMd from '../content/projects/eduspark.md?raw';
```

Every case study page bundles all 7 project MDs (~70 KB combined raw text). When a user visits Care Naturals, they also download the content for United Rubber, AdsCult, FinFlow, MediTrack, Flavor Street, and EduSpark. The runtime code only uses one.

The same pattern exists in `src/js/blog-content.js` — all 6 blog MDs (several hundred KB of text) are bundled on every blog page.

### Fix
```js
const MD_LOADERS = {
  'care-naturals': () => import('../content/projects/care-naturals.md?raw'),
  'united-rubber': () => import('../content/projects/united-rubber.md?raw'),
  // ...
};

export const applyCaseStudyContent = async () => {
  const meta = document.querySelector('meta[name="project"]');
  if (!meta) return;
  const project = meta.getAttribute('content');
  const loader = MD_LOADERS[project];
  if (!loader) return;
  const { default: md } = await loader();
  // apply content
};
```

Vite will code-split each MD into its own chunk. A visitor to Care Naturals only downloads Care Naturals content.

---

## 6. HTML Images Missing `width` and `height` — Cumulative Layout Shift

**Severity:** HIGH
**Location:** Every HTML file with dynamically-sourced images — `index.html` lines 29, 40, 52, 82, 96, 103, and every img with an `id` but no `src`

### Description
Images loaded via `content.js` (`applyImages()`) have no `src` in the HTML and no `width`/`height` attributes. The hero photo, brand logos, about logo, UX circle images, gallery tiles — none of them reserve space.

The browser can't compute layout until each image downloads and reports its intrinsic size. Every image load causes a layout shift as the page reflows around it. This destroys the Core Web Vitals CLS score.

Example:
```html
<img id="heroPhoto" alt="Shreyansh Gaurav, UX Designer" fetchpriority="high" />
```

No `src`, no `width`, no `height`. Below-the-fold content shifts every time an image finishes loading.

### Fix
Either:
1. Add `width` and `height` attributes to every `<img>` tag with the intrinsic pixel dimensions:
   ```html
   <img id="heroPhoto" alt="..." fetchpriority="high" width="640" height="800" />
   ```
2. OR give every img a CSS `aspect-ratio` so space is reserved before the image loads:
   ```css
   .hero-img img { aspect-ratio: 4/5; width: 100%; }
   ```

For images injected by `applyImages()`, set `src` directly in the HTML instead of relying on JS — move the IMAGE_MAP into HTML `src` attributes at build time.

---

## 7. `sections.css` Is 2,800+ Lines and Has Duplicate `.pp-empty` Rule

**Severity:** MEDIUM
**Location:** `src/css/sections.css` (entire file, ~2,800 lines)

### Description
`sections.css` has grown into an unmaintainable monolith:
- ~2,800 lines in a single file
- Styles for every section across every page (homepage, projects listing, case study, blog index, blog post, about, contact) all in one file
- Duplicate rules exist — `.pp-empty` is defined twice with identical styles (once around the projects listing section, once around the case study section)
- Dead code: styles for the old `.cs-screens-row` / `.cs-screen-thumb` pattern still exist even though every case study page now uses `.cs-mosaic` instead
- Old `.gallery-grid` / `.grid-row` / `.grid-tile` rules for the deprecated 4×2 gallery layout coexist with the new 3×2 layout rules

A senior dev opening this file for the first time has to scroll through 2,800 lines to figure out what's live and what's dead.

### Fix
1. Split `sections.css` into per-section files:
   ```
   src/css/sections/
     hero.css
     about.css
     stats.css
     ux.css
     projects.css
     gallery.css
     testimonials.css
     blog.css
     case-study.css
     mosaic.css
     contact.css
   ```
2. Delete dead rules (`.cs-screens-row`, `.cs-screen-thumb`, `.cs-screens-full`, old gallery rules).
3. Deduplicate `.pp-empty`.
4. Use `@import` in `sections.css` to keep the public API the same.

---

## 8. No Canonical URLs, No Structured Data, No OG Tags on Sub-pages

**Severity:** MEDIUM
**Location:** All HTML files in `pages/` and `pages/blog/` and `pages/project/`

### Description
SEO is broken for the entire site except the homepage:
- No `<link rel="canonical">` anywhere
- No JSON-LD structured data (no `Article`, `BlogPosting`, `CreativeWork`, `Person`)
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) only exist on `index.html`
- Every blog post shares the same default `<meta description>` — no per-post description
- Case study pages have a default description that doesn't mention the specific project
- `public/` has no `sitemap.xml` or `robots.txt`
- Twitter card tags missing everywhere

When these pages get shared on LinkedIn, Twitter, or WhatsApp, the preview will show a generic card (or nothing at all). Google will rank every page lower without structured data.

### Fix
1. Add per-page canonical, description, OG, and Twitter card tags. For blog posts, pull them from the MD front-matter.
2. Add JSON-LD:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "12 Mistakes Junior Designers Make",
     "author": { "@type": "Person", "name": "Shreyansh Gaurav" },
     "datePublished": "2025-03-01",
     "image": "https://...blog thumbs/mistakesjuniordesigner.png"
   }
   </script>
   ```
3. Generate `sitemap.xml` at build time from the vite.config.js entry list.
4. Add `public/robots.txt` with `Sitemap:` directive.

---

## 9. Render-Blocking Google Fonts, No Preload on Hero Image

**Severity:** MEDIUM
**Location:** `index.html` lines 17–19 (and every other page's head)

### Description
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@800&family=Inter:wght@400;500;600&family=Outfit:wght@500;800&display=swap" rel="stylesheet">
```

Issues:
1. The Google Fonts stylesheet is render-blocking. Even with `display=swap`, the HTML parser waits for the CSS to arrive before painting styled text.
2. Three font families × multiple weights = ~6 font file downloads per page.
3. The hero image (`/images/my-photo.png`) is the LCP element but has **no `<link rel="preload">`** — the browser discovers it only after parsing the HTML and then applying `applyImages()` JS.
4. `navlogo.png` and `headerpattern.svg` are also critical above-the-fold assets with no preload.

On a cold load, LCP happens well after the browser could have started fetching the hero image.

### Fix
1. Self-host the fonts using `@font-face` with `font-display: swap` and `local()` fallback. Load them as `rel="preload" as="font" crossorigin`.
2. Drop font weights you don't use (audit which weights of Heebo / Inter / Outfit are actually rendered).
3. Add preload hints:
   ```html
   <link rel="preload" as="image" href="/images/my-photo.png" fetchpriority="high" />
   <link rel="preload" as="image" href="/images/headerpattern.svg" />
   ```
4. Load the Google Fonts stylesheet asynchronously:
   ```html
   <link rel="stylesheet" href="..." media="print" onload="this.media='all'" />
   ```

---

## 10. Dead Code: `smooth-scroll.js` Exists but Is Never Imported

**Severity:** MEDIUM
**Location:** `src/js/smooth-scroll.js` (entire file), `src/js/main.js`

### Description
`src/js/smooth-scroll.js` exists as a full ~60-line module with its own parallax/lerp logic, but `main.js` no longer imports it (we removed smooth scroll because it conflicted with the card stacking animation). The file is orphaned.

Additionally, the global `window.__smoothScrollActive` flag that `animations.js`' card-stacking code still checks (historical from the smooth scroll integration) is never set, so the conditional branches in `initCardStack` that depended on it are dead logic paths that confuse the reader.

This is not huge in terms of bundle size, but it's a code-quality smell — dead files rot, and a new developer opening the project will waste time trying to understand a module that does nothing.

### Fix
1. Delete `src/js/smooth-scroll.js` entirely.
2. Grep for `__smoothScrollActive` and `window.__smoothY` in `animations.js` and remove any conditional branches that reference them.
3. Also remove the unused `scripts/generate-screen-manifest.js` imports from `package.json` scripts if the manifest is no longer being regenerated (verify first).
4. While you're at it: audit `src/js/content.js` for IMAGE_MAP entries that no longer have matching DOM IDs (several `g1`–`g6` and `caseIconA`–`caseIconC` entries may be dead now that images are hardcoded in HTML).

---

## Summary Table

| # | Issue | Severity | Area |
|---|-------|----------|------|
| 1 | 96 MB of unoptimized PNGs | CRITICAL | Performance |
| 2 | Exposed Google Script URL, no spam protection | CRITICAL | Security |
| 3 | All init functions run on every page | HIGH | Performance |
| 4 | lottie-web bundled on 17 unused pages | HIGH | Performance / Bundle |
| 5 | All 7 project MDs + 6 blog MDs bundled per page | HIGH | Performance / Bundle |
| 6 | Images missing width/height → CLS | HIGH | Performance / Web Vitals |
| 7 | 2,800-line sections.css with dead code + duplicates | MEDIUM | Maintainability |
| 8 | No canonical, no structured data, no per-page OG | MEDIUM | SEO |
| 9 | Render-blocking fonts, no LCP image preload | MEDIUM | Performance / Web Vitals |
| 10 | Dead `smooth-scroll.js` file + orphan flags | MEDIUM | Code Quality |

## Priority Order to Fix

1. **#1 images** — will cut page weight by ~80 MB, single biggest win
2. **#2 contact form security** — protect against inevitable spam
3. **#3 + #4 + #5 JS splitting** — can be done together, reduces JS bundle by ~60%
4. **#6 image dimensions** — Core Web Vitals fix, also prevents broken layouts while lazy-loading
5. **#9 font loading + preload** — LCP improvement
6. **#8 SEO** — required before going public
7. **#7 CSS split** — maintainability, worth doing before adding more features
8. **#10 dead code cleanup** — small but should be done whenever touching the JS modules
