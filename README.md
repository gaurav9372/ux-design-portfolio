# UX Design Portfolio — Shreyansh Gaurav

A multi-page UX design portfolio showcasing 7 projects, case studies, and design philosophy. Built with vanilla HTML/CSS/JS, modular ES modules, and Vite.

## Live Site

Deployed on Netlify.

## Pages

| Page | Description |
|---|---|
| **Homepage** | Hero, about, stats, UX philosophy, gallery, 7 project cards, testimonials |
| **Projects** | Full project showcase (coming soon) |
| **Case Studies** | Individual project deep-dives — Care Naturals, United Rubber (coming soon) |
| **About** | Bio, skills, experience (coming soon) |
| **Contact** | Contact form and email (coming soon) |
| **Blog** | Articles on UX and design (coming soon) |

## Tech Stack

- **HTML / CSS / JavaScript** — Vanilla, no frameworks
- **Vite** — Dev server, ES module bundling, multi-page build
- **Google Fonts** — Heebo, Inter, Outfit
- **Netlify** — Hosting and deployment

## Features

- Multi-page architecture with shared nav/footer
- Modular CSS (5 files) and JS (7 ES modules)
- Sticky navbar that shrinks on scroll and hides/shows based on scroll direction
- Split-character hover animation on links and buttons
- Scroll-triggered stat counter animation using IntersectionObserver
- Parallax depth effects on UX circle elements
- Testimonial carousel with fade transitions, auto-advance, and keyboard navigation
- Infinite logo marquee
- 7 project cards with hover-only "Case Study" CTA
- Responsive layout with 5 breakpoints (1280, 1100, 768, 720, 480px)
- `prefers-reduced-motion` support
- Lazy loading on all below-fold images
- Global `:focus-visible` accessibility indicators
- Content-driven architecture via `src/data/homepage.js`

## Project Structure

```
├── index.html                      # Homepage
├── pages/
│   ├── projects.html               # Projects listing
│   ├── project/
│   │   ├── care-naturals.html      # Case study
│   │   └── united-rubber.html      # Case study
│   ├── about.html                  # About page
│   ├── contact.html                # Contact page
│   ├── blog.html                   # Blog listing
│   └── blog/
│       └── sample-post.html        # Blog post template
├── src/
│   ├── css/
│   │   ├── base.css                # Variables, reset, typography, scrollbar
│   │   ├── layout.css              # Wrap, section utilities
│   │   ├── components.css          # Nav, cards, carousel, logo tiles
│   │   ├── sections.css            # Hero, about, stats, UX, gallery, footer
│   │   └── responsive.css          # 5 breakpoints + reduced motion
│   ├── js/
│   │   ├── main.js                 # Entry point — imports CSS + JS modules
│   │   ├── nav.js                  # Navbar shrink, hide/show, burger menu
│   │   ├── animations.js           # Stat counters, UX parallax, split-hover
│   │   ├── testimonials.js         # Carousel with keyboard support
│   │   ├── marquee.js              # Logo track duplication
│   │   ├── content.js              # Image/text binding from data
│   │   └── utils.js                # Shared helpers
│   └── data/
│       └── homepage.js             # All content data + image paths
├── public/
│   └── images/                     # Static assets served at /images/
├── styles.css                      # Imports all 5 CSS modules
├── vite.config.js                  # Multi-page build config
└── package.json                    # ES module, Vite
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

All homepage text and image URLs are managed in `src/data/homepage.js`. Edit that file and refresh — no need to modify HTML.

## Projects

1. **Care Naturals** — Natural skincare e-commerce UX
2. **United Rubber** — B2B industrial manufacturer positioning
3. **AdsCult** — Digital marketing agency brand & web
4. **FinFlow** — Fintech mobile banking onboarding
5. **MediTrack** — Healthcare SaaS patient dashboard
6. **Flavor Street** — Food delivery app end-to-end UX
7. **EduSpark** — EdTech gamified K-12 learning

## Author

**Shreyansh Gaurav**
UX Designer — Varanasi, India
Gauravguptasggs@gmail.com


