# White Halves Version — Animation Approach & Differences from Plain

## Core Difference
The White Halves version wraps the UX section and Gallery into a single scroll-sequenced container (`ux-gallery`), creating a cinematic scroll experience where sections reveal in phases.

## Gallery Layout

### Plain
- Simple white-background section with a **4x2 image grid**
- Static layout, no scroll pinning
- Small quote text below the grid
- Has a decorative ornament (`gallery-orn`) positioned bottom-left

### White Halves
- **Split-screen layout**: left half = quote, right half = 3-column scrollable image grid
- Both halves are **inside a sticky container** (`gallery-pin`) that pins to viewport
- Left and right halves **reveal independently** via scroll-driven transforms

## Scroll Sequence (White Halves)

The `ux-gallery` section is tall (`100vh + gallery-scroll-distance`) to create scroll room. As the user scrolls:

1. **Phase 1 (8%–36% scroll)**: Left half slides up into view (`--left-reveal: 0 → 1`)
   - `transform: translateY(calc((1 - var(--left-reveal)) * 40px))`

2. **Phase 2 (44%–70% scroll)**: Right half slides up from below (`--right-reveal: 0 → 1`)
   - `transform: translateY(calc((1 - var(--right-reveal)) * 110vh))`

3. **Phase 3 (76%–97% scroll)**: Gallery images scroll vertically within the right half
   - `--gallery-scroll-y` drives `translateY` on `.gallery-scroll`
   - Distance = `galleryScroll.scrollHeight - galleryRight.clientHeight`

## CSS Custom Properties Used
```css
.ux-gallery {
  --left-reveal: 0;      /* 0–1, drives left panel entrance */
  --right-reveal: 0;     /* 0–1, drives right panel entrance */
  --gallery-scroll: 160vh; /* extra height for scroll room */
  --gallery-scroll-y: 0px; /* vertical scroll offset for image grid */
}
```

## Key CSS Classes (White Halves only)
- `.ux-gallery` — outer wrapper, sets total scroll height
- `.ux-pin` — sticky container (`position: sticky; top: 0; height: 100vh`)
- `.gallery-overlay` — applied to gallery section (replaces static gallery)
- `.gallery-pin` — flex container splitting left/right halves
- `.gallery-left` — white background, holds the quote, 50% width
- `.gallery-right` — white background, holds scrolling image columns, 50% width
- `.gallery-scroll` — inner container that moves via `translateY`
- `.gallery-cols` / `.gallery-col` — 3-column masonry-like layout (vs 4x2 grid in Plain)

## JS Function: `updateUxGallery()`
```
- Reads bounding rect of .ux-gallery
- Calculates overall scroll progress (0–1) based on how far section has scrolled
- Maps progress to 3 phases with start/end thresholds
- Sets CSS custom properties on .ux-gallery element
- Bypasses on mobile (max-width: 1100px) — sets all reveals to 1
- Uses requestAnimationFrame for smooth updates
```

## Gallery Image Layout Difference
- **Plain**: 2 rows x 4 columns (g1–g8), flat grid
- **White Halves**: 3 columns, variable items per column:
  - Col 1: g1, g4, g7
  - Col 2: g2, g5, g8
  - Col 3: g3, g6

## What's Identical Between Both Versions
- Navbar (sticky, shrink, hide/show on scroll direction)
- Hero section
- About section
- Stats section (animated counters)
- UX circles with parallax scroll effects (`setupUxScrollFx`)
- Projects / logo marquee
- Case study cards
- Testimonials carousel
- Footer
- Split-character hover animation on links
- Content system (`homepageContent.js`)
