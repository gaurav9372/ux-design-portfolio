// CSS imports (Vite handles these)
import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/sections.css';
import '../css/responsive.css';

// JS modules
import { applyImages, applyTextContent } from './content.js';
import { initNav } from './nav.js';
import { initStatsAnimation, initUxParallax, initSplitHover } from './animations.js';
import { initTestimonials } from './testimonials.js';
import { initMarquee } from './marquee.js';

// Initialize everything
const init = () => {
  try { applyImages(); } catch (e) { console.error("applyImages:", e); }
  try { applyTextContent(); } catch (e) { console.error("applyTextContent:", e); }
  try { initNav(); } catch (e) { console.error("initNav:", e); }
  try { initStatsAnimation(); } catch (e) { console.error("initStatsAnimation:", e); }
  try { initUxParallax(); } catch (e) { console.error("initUxParallax:", e); }
  try { initSplitHover(); } catch (e) { console.error("initSplitHover:", e); }
  try { initTestimonials(); } catch (e) { console.error("initTestimonials:", e); }
  try { initMarquee(); } catch (e) { console.error("initMarquee:", e); }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
