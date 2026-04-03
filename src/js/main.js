// JS modules
import { applyImages } from './content.js';
import { applyMdContent } from './md-content.js';
import { applyCaseStudyContent } from './case-study-content.js';
import { applyBlogContent } from './blog-content.js';
import { applyAboutContent } from './about-content.js';
import { initContactForm } from './contact-form.js';
import { initNav } from './nav.js';
import { initStatsAnimation, initUxParallax, initSplitHover, initCardStack, initProjectFilter, initBlogFilter, initCardLinks } from './animations.js';
import { initTestimonials } from './testimonials.js';
import { initMarquee } from './marquee.js';

// Initialize everything
const init = () => {
  try { applyImages(); } catch (e) { console.error("applyImages:", e); }
  try { applyMdContent(); } catch (e) { console.error("applyMdContent:", e); }
  try { applyCaseStudyContent(); } catch (e) { console.error("applyCaseStudyContent:", e); }
  try { applyBlogContent(); } catch (e) { console.error("applyBlogContent:", e); }
  try { applyAboutContent(); } catch (e) { console.error("applyAboutContent:", e); }
  try { initNav(); } catch (e) { console.error("initNav:", e); }
  try { initStatsAnimation(); } catch (e) { console.error("initStatsAnimation:", e); }
  try { initUxParallax(); } catch (e) { console.error("initUxParallax:", e); }
  try { initSplitHover(); } catch (e) { console.error("initSplitHover:", e); }
  try { initTestimonials(); } catch (e) { console.error("initTestimonials:", e); }
  try { initMarquee(); } catch (e) { console.error("initMarquee:", e); }
  try { initCardStack(); } catch (e) { console.error("initCardStack:", e); }
  try { initCardLinks(); } catch (e) { console.error("initCardLinks:", e); }
  try { initProjectFilter(); } catch (e) { console.error("initProjectFilter:", e); }
  try { initBlogFilter(); } catch (e) { console.error("initBlogFilter:", e); }
  try { initContactForm(); } catch (e) { console.error("initContactForm:", e); }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
