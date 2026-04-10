# Bugs and Fixes — Critical Site-Wide Audit

> Audit performed by a senior dev / UX reviewer focused on performance, architecture, security, and accessibility.

## Status overview

| # | Bug | Severity | Status |
|---|---|---|---|
| 1 | 96 MB unoptimized PNG images | CRITICAL | ❌ Open |
| 2 | Exposed Google Apps Script URL, no spam protection | CRITICAL | ✅ Fixed |
| 3 | All init functions run on every page | HIGH | ✅ Fixed |
| 4 | lottie-web bundled on every page | HIGH | ✅ Fixed |
| 5 | All 7 project MDs + 6 blog MDs bundled per page | HIGH | ✅ Fixed |
| 6 | Images missing width/height → CLS | HIGH | ✅ Fixed |
| 7 | 2,800-line sections.css with duplicates + dead code | MEDIUM | ✅ Fixed |
| 8 | No canonical, no structured data, no per-page OG | MEDIUM | ❌ Open |
| 9 | Render-blocking fonts, no LCP image preload | MEDIUM | ✅ Fixed |
| 10 | Dead smooth-scroll.js + orphan flags | MEDIUM | ✅ Fixed |

**8 fixed, 2 open.** The remaining 2 are image compression (PNG → WebP) and SEO (canonical/OG/structured data).

---

## 1. 96.4 MB of Unoptimized PNG Images (No WebP, No Compression)

**Status:** ❌ OPEN
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

**Status:** ✅ FIXED
**Severity:** CRITICAL

### Fix applied

**Client-side (`src/js/contact-form.js`, `pages/contact.html`, `src/css/pages/contact.css`):**
- Added a honeypot field (`<input name="website">`) hidden with `position: absolute; left: -9999px` — invisible to humans but bots fill it automatically
- Added a hidden `_ts` timestamp field set to `Date.now()` on page load
- On submit, JS rejects any submission where the honeypot is filled OR less than 2 seconds have elapsed since page load
- Rejections show a fake "Sent!" success state so bots can't tell they were blocked

**Server-side (`src/content/google-apps-script.js` — to be pasted into Apps Script):**
- Honeypot validation (rejects if `website` field has any value)
- Min-time check (rejects submissions < 2 seconds after page load)
- Max-time check (rejects stale forms > 2 hours old)
- **Global rate limit: max 30 submissions per hour** (tracked via ScriptProperties)
- Email regex validation
- Length limits: name ≤ 100, email ≤ 200, subject ≤ 200, message 10–5000 chars
- Auto-cleanup of old rate-limit buckets to prevent ScriptProperties bloat
- All rejections return `{ status: 'success' }` so scrapers can't probe the defenses

The URL is still technically exposed in the built JS (unavoidable for a form that posts directly to Apps Script without a backend proxy), but it's now rate-limited and heavily validated. An attacker would get ~30 submissions through per hour before being hard-blocked, and even those have to pass all the validation checks.

**MANUAL STEP REQUIRED:** You need to paste the updated `src/content/google-apps-script.js` into your Apps Script editor and redeploy (Deploy → Manage deployments → Edit → Version: New version → Deploy).

---

### Original description
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

**Status:** ✅ FIXED
**Severity:** HIGH
**Location:** `src/js/main.js` lines 14–34

### Fix applied
- Added `data-page="X"` attribute to all 18 HTML body tags (home, about, contact, projects, project, blog-index, blog-post)
- Rewrote `main.js` with a `PAGE_LOADERS` map that dynamically imports page-specific modules
- Only shared modules load eagerly: `nav.js`, `split-hover.js`, `card-links.js`
- Each page now only downloads the JS it actually needs
- Vite code-splits every dynamic `import()` into its own async chunk

---

### Original description

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

**Status:** ✅ FIXED
**Severity:** HIGH
**Location:** `src/js/main.js` line 9, `src/js/lottie-icons.js`, `package.json`

### Fix applied
- `lottie-icons.js` is now dynamically imported only inside `loadHome()` in `main.js`
- Guarded the import with a DOM check: `if (document.querySelector('[data-lottie]'))`
- Lottie-web (~170 KB) no longer downloads on the 17 pages that don't use it
- On the homepage, Lottie loads as a second-tier async chunk (doesn't block other animations)

---

### Original description

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

**Status:** ✅ FIXED
**Severity:** HIGH
**Location:** `src/js/case-study-content.js` lines 1–17

### Fix applied
- Replaced static `import` statements with a `MD_LOADERS` map of dynamic `import()` functions, one per project slug
- `applyCaseStudyContent()` is now async and reads `<meta name="project">` to pick the right loader
- Vite code-splits each MD file into its own async chunk
- Visiting Care Naturals now downloads only `care-naturals.md` (~10 KB) instead of all 7 project MDs (~70 KB)
- Same pattern applied to `blog-content.js` — each blog post only downloads its own MD file
- `BLOG_LIST` metadata stays static (needed for the "More posts" grid on every blog post)

---

### Original description

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

**Status:** ✅ FIXED
**Severity:** HIGH

### Fix applied
Added `width` and `height` attributes to **all 344 `<img>` tags** across all 18 HTML pages. Dimensions were derived from the CSS values of the containers:

| Image type | Dimensions |
|---|---|
| Nav logo (brand) | 40×40 |
| Hero photo (homepage LCP) | 310×395 |
| About logo | 154×242 |
| Hero ornament (header pattern) | 320×320 |
| UX circle images (c1–c6) | 168×168 |
| UX rings | 168×168 / 200×200 |
| Stat icons | 88×88 |
| Client logo tiles (46×) | 200×136 |
| Case card icons | 48×48 |
| Case card previews | 544×467 |
| Testimonial avatar | 72×72 |
| Testimonial arrow icon | 18×18 |
| Gallery ornament | 480×480 |
| Gallery tiles (homepage) | 400×300 |
| Blog card thumbnails | 800×450 (16:9) |
| Blog post cover | 800×450 (16:9) |
| Blog author avatar | 64×64 |
| Case study hero image | 1120×630 (16:9) |
| Case study persona avatar | 52×52 |
| Case study wireframe placeholder | 560×315 |
| About hero photo | 280×280 |
| About personal photo | 240×240 |
| Social icons (phone/whatsapp/linkedin/instagram/mail + hover variants) | 28×28 |
| Nav CTA arrow | 24×24 |

Final verification: **344 / 344 img tags now have both `width` and `height` attributes**. CLS should drop significantly as browsers can reserve space for every image before it downloads.

Mosaic gallery images (dynamically inserted by `mosaic-gallery.js`) are excluded from this count since they're created at runtime — the JS can add dimensions too if needed, but they're inside an async chunk that only runs on case study pages.

---

### Original description
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

**Status:** ✅ FIXED
**Severity:** MEDIUM
**Location:** `src/css/sections.css` (entire file, ~2,800 lines)

### Fix applied
- Split `sections.css` into 6 colocated page files under `src/css/pages/`:
  - `home.css`, `projects.css`, `case-study.css`, `blog.css`, `about.css`, `contact.css`
- Each page file contains its section styles AND its responsive rules (base + media queries colocated)
- `responsive.css` shrank from 340 lines to 37 lines (only site-wide rules: `--pad`, nav mobile, reduced motion)
- Deleted `sections.css` entirely
- Updated `styles.css` to import the page files
- Duplicate `.pp-empty` rule resolved in the split

---

### Original description

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

**Status:** ❌ OPEN
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

**Status:** ✅ FIXED
**Severity:** MEDIUM

### Fix applied
- Google Fonts stylesheet is now loaded asynchronously on all 18 pages using the `media="print" onload="this.media='all'"` trick
- Added a `<link rel="preload" as="style">` hint so the browser starts fetching the CSS early even though it's non-blocking
- Added `<noscript>` fallback that loads fonts synchronously if JavaScript is disabled
- `<link rel="preconnect">` hints to `fonts.googleapis.com` and `fonts.gstatic.com` retained for faster DNS + TLS handshake
- On the homepage, added preload hints for the LCP hero image (`/images/my-photo.png` with `fetchpriority="high"`) and the hero ornament (`/images/headerpattern.svg`)
- Combined with the earlier deletion of `content.js`, the hero photo is now both hardcoded in HTML AND preloaded, so it starts downloading at the highest priority during HTML parsing

---

### Original description
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

**Status:** ✅ FIXED
**Severity:** MEDIUM
**Location:** `src/js/smooth-scroll.js` (entire file), `src/js/main.js`

### Fix applied
- Deleted `src/js/smooth-scroll.js` entirely
- Removed dead `g1`–`g6` entries from `content.js` (they had been hardcoded in HTML)
- Later, **`content.js` itself was deleted** and all image `src` attributes inlined into HTML, removing the entire runtime image injector
- `initCardStack` in `card-stack.js` (formerly in `animations.js`) no longer references the orphan `window.__smoothScrollActive` flag
- `animations.js` also deleted after its 7 functions were split into focused per-feature files

---

### Original description

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

| # | Issue | Severity | Area | Status |
|---|-------|----------|------|--------|
| 1 | 96 MB of unoptimized PNGs | CRITICAL | Performance | ❌ Open |
| 2 | Exposed Google Script URL, no spam protection | CRITICAL | Security | ✅ Fixed |
| 3 | All init functions run on every page | HIGH | Performance | ✅ Fixed |
| 4 | lottie-web bundled on 17 unused pages | HIGH | Performance / Bundle | ✅ Fixed |
| 5 | All 7 project MDs + 6 blog MDs bundled per page | HIGH | Performance / Bundle | ✅ Fixed |
| 6 | Images missing width/height → CLS | HIGH | Performance / Web Vitals | ✅ Fixed |
| 7 | 2,800-line sections.css with dead code + duplicates | MEDIUM | Maintainability | ✅ Fixed |
| 8 | No canonical, no structured data, no per-page OG | MEDIUM | SEO | ❌ Open |
| 9 | Render-blocking fonts, no LCP image preload | MEDIUM | Performance / Web Vitals | ✅ Fixed |
| 10 | Dead `smooth-scroll.js` file + orphan flags | MEDIUM | Code Quality | ✅ Fixed |

## Priority Order for Remaining Work

1. **#1 images** — convert PNGs to WebP. Single biggest win (~80 MB → ~8 MB page weight).
2. **#8 SEO** — per-page canonical, OG, Twitter card, JSON-LD structured data.

## Work completed so far

- Split `animations.js` (363 lines) into 7 focused files: `stats-counter.js`, `ux-parallax.js`, `split-hover.js`, `card-stack.js`, `card-links.js`, `project-filter.js`, `blog-filter.js`
- Split `sections.css` (2,812 lines) into 6 colocated page files under `src/css/pages/` (home, projects, case-study, blog, about, contact) — each file contains its own responsive rules
- Added `data-page` attribute to 18 HTML body tags; rewrote `main.js` with `PAGE_LOADERS` map and dynamic imports
- Converted `case-study-content.js` and `blog-content.js` to use dynamic MD imports (Vite code-splits each MD into its own chunk)
- Deleted `smooth-scroll.js` (dead code)
- Deleted `content.js` (runtime image injector) — all 20 homepage image sources now hardcoded in HTML, hero photo can load during HTML parse
- Deleted `animations.js` (now replaced by the 7 split files)
- Deleted `sample-post.html` (dead blog post stub)
- Trimmed `responsive.css` from 340 → 37 lines (only site-wide rules remain)

**Rough bundle impact (non-homepage pages):**
- Lottie-web (~170 KB) — no longer loaded
- 6 other blog MDs — no longer loaded on any given blog post
- 6 other project MDs — no longer loaded on any given case study
- Stats animation, marquee, testimonials, card-stack — no longer loaded on non-homepage
- Image injector JS — no longer loaded anywhere
