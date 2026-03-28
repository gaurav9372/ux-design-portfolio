# UX Design Portfolio — Shreyansh Gaurav

A personal UX design portfolio showcasing projects, case studies, and design philosophy. Built as a single-page static site with scroll-driven animations and interactive elements.

## Sections

- **Hero** — Introduction with name, tagline ("I Design Solutions"), and profile photo
- **About** — Background and passion for UX design
- **Stats** — Animated number counters (projects, experience, etc.)
- **UX Philosophy** — Interactive circle layout showing Client / Users / Company dynamics with parallax scroll effects
- **Gallery** — Image grid with inspirational quote
- **Projects** — Logo marquee showcasing project brands
- **Case Studies** — Cards for Care Naturals, United Rubber, and more
- **Testimonials** — Auto-rotating carousel with navigation dots
- **Footer** — Contact email, location (Varanasi, India), and social links

## Tech Stack

- **HTML / CSS / JavaScript** — Vanilla, no frameworks
- **Vite** — Dev server and build tool
- **Google Fonts** — Heebo, Inter, Outfit

## Features

- Sticky navbar that shrinks on scroll and hides/shows based on scroll direction
- Split-character hover animation on links and buttons
- Scroll-triggered stat counter animation using IntersectionObserver
- Parallax depth effects on UX circle elements
- Testimonial carousel with fade transitions and auto-advance
- Infinite logo marquee
- Responsive layout with mobile hamburger menu
- Content-driven architecture via `homepageContent.js` — update text and images without touching HTML

## Project Structure

```
├── index.html              # Main HTML entry point
├── styles.css              # All styles and responsive breakpoints
├── script.js               # Interactions, animations, and content binding
├── homepageContent.js      # CMS-like content config (text + image URLs)
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── Assets/
│   └── Images/
│       ├── myPhoto.png
│       ├── uxDualRingsCenter.svg
│       ├── uxSmallerRing.svg
│       ├── icons/
│       │   └── Arrow_button.svg
│       └── Projects Thumbnails/
│           └── Frame 134929.png
└── white-halves-notes.md   # Notes on alternate gallery animation approach
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Updates

All text and image URLs are managed in `homepageContent.js`. Edit that file and refresh to see changes — no need to modify HTML.

## Author

**Shreyansh Gaurav**
UX Designer — Varanasi, India
Gauravguptasggs@gmail.com
