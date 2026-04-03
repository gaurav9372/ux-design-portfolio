import mistakesMd from '../content/blogs/12-mistakes-junior-designers-make.md?raw';
import developersMd from '../content/blogs/how-you-work-with-developers.md?raw';
import constraintsMd from '../content/blogs/designing-under-constraints.md?raw';
import aiUxMd from '../content/blogs/ai-ux-real-use-cases.md?raw';
import claudeMd from '../content/blogs/using-claude-ai-as-ux-thinking-partner.md?raw';
import vibeCodingMd from '../content/blogs/why-ux-designers-need-vibe-coding.md?raw';

const MD_MAP = {
  '12-mistakes-junior-designers-make': mistakesMd,
  'how-you-work-with-developers': developersMd,
  'designing-under-constraints': constraintsMd,
  'ai-ux-real-use-cases': aiUxMd,
  'using-claude-ai-as-ux-thinking-partner': claudeMd,
  'why-ux-designers-need-vibe-coding': vibeCodingMd,
};

/* ---- shared blog metadata for the index page ---- */
export const BLOG_LIST = [
  {
    slug: '12-mistakes-junior-designers-make',
    title: '12 Mistakes Junior Designers Make (And How to Actually Fix Them)',
    date: 'March 2025',
    excerpt:
      'I made most of these mistakes myself when I started out. Here is what I learned the hard way so you do not have to.',
    tags: ['Design', 'Productivity'],
    readTime: '8 min read',
  },
  {
    slug: 'how-you-work-with-developers',
    title: 'How You Work With Developers (Real Friction)',
    date: 'March 2025',
    excerpt:
      'Nobody talks about the awkward part of designer and developer handoffs. Here is what actually causes friction and how to deal with it.',
    tags: ['Process', 'Collaboration'],
    readTime: '7 min read',
  },
  {
    slug: 'designing-under-constraints',
    title: 'Designing Under Constraints',
    date: 'February 2025',
    excerpt:
      'Constraints are not the enemy of good design. They are the reason good design exists in the first place.',
    tags: ['Design', 'Process'],
    readTime: '6 min read',
  },
  {
    slug: 'ai-ux-real-use-cases',
    title: 'AI + UX: Real Use Cases (Not Hype)',
    date: 'April 2025',
    excerpt:
      'Everyone is talking about AI in design but most of it is noise. Here are the places where AI actually helps UX designers do better work.',
    tags: ['Design', 'AI', 'Productivity'],
    readTime: '7 min read',
  },
  {
    slug: 'using-claude-ai-as-ux-thinking-partner',
    title: 'Using Claude AI as a UX Thinking Partner, Not a Tool',
    date: 'April 2025',
    excerpt:
      'Most designers use AI to generate stuff. I use it to think better. Here is how Claude changed my design process without replacing any part of it.',
    tags: ['AI', 'Design', 'Process'],
    readTime: '8 min read',
  },
  {
    slug: 'why-ux-designers-need-vibe-coding',
    title: 'Why UX Designers Need to Learn Vibe Coding (And How It Is Not Optional Anymore)',
    date: 'April 2025',
    excerpt:
      'Vibe coding is not about becoming a developer. It is about closing the gap between what you design and what actually gets built.',
    tags: ['Design', 'AI', 'Productivity'],
    readTime: '9 min read',
  },
];

/* ---- parser ---- */
const parseBlogMd = (raw) => {
  const content = {};
  const sections = raw.split(/^## /m).slice(1);
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const key = lines[0].trim();
    const value = lines
      .slice(1)
      .filter((l) => !/^-{3,}\s*$/.test(l.trim()) && !/^#/.test(l.trim()))
      .join('\n')
      .trim();
    if (key && value) content[key] = value;
  });
  return content;
};

/* ---- convert plain-text body to HTML ---- */
const bodyToHtml = (text) => {
  const blocks = text.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      // Numbered headings like "1. Designing for yourself..."
      const numberMatch = trimmed.match(/^(\d{1,2})\.\s+(.+)/);
      if (numberMatch) {
        return `<h3 class="bl-subheading"><span class="bl-num">${numberMatch[1]}.</span> ${numberMatch[2]}</h3>`;
      }

      // Standalone short lines (no period at end, under 60 chars) as section headings
      if (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.endsWith('?') && !trimmed.endsWith('!')) {
        return `<h3 class="bl-subheading">${trimmed}</h3>`;
      }

      // Regular paragraph — handle inline bold / italic / links
      let html = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

      return `<p>${html}</p>`;
    })
    .join('\n');
};

/* ---- render a blog card HTML string ---- */
const renderCard = (post) => {
  const tagsHtml = post.tags.map((t) => `<span class="bl-card-tag">${t}</span>`).join('');
  return `
  <a href="/pages/blog/${post.slug}.html" class="bl-card" data-tags="${post.tags.map((t) => t.toLowerCase()).join(',')}">
    <div class="bl-card-img">
      <img src="/images/image-missing.png" alt="${post.title}" loading="lazy" />
    </div>
    <div class="bl-card-body">
      <h3 class="bl-card-title">${post.title}</h3>
      <p class="bl-card-excerpt">${post.excerpt}</p>
      <div class="bl-card-tags">${tagsHtml}</div>
      <div class="bl-card-bottom">
        <span class="bl-card-date">${post.date}</span>
        <span class="bl-card-read">Read</span>
      </div>
    </div>
  </a>
`;
};

/* ---- fill "more posts" grid on blog post pages ---- */
const fillMorePosts = (currentSlug) => {
  const grid = document.getElementById('blogMoreGrid');
  if (!grid) return;

  const others = BLOG_LIST.filter((p) => p.slug !== currentSlug);

  if (!others.length) {
    // Only one blog exists — show the current post itself so the section isn't empty
    const self = BLOG_LIST.find((p) => p.slug === currentSlug);
    if (self) grid.innerHTML = renderCard(self);
    return;
  }

  // Shuffle and pick up to 3
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
  grid.innerHTML = shuffled.map(renderCard).join('');
};

/* ---- apply to DOM ---- */
export const applyBlogContent = () => {
  const meta = document.querySelector('meta[name="blog-post"]');
  if (!meta) return;

  const slug = meta.getAttribute('content');
  const md = MD_MAP[slug];
  if (!md) return;

  const content = parseBlogMd(md);

  document.querySelectorAll('[data-blog]').forEach((el) => {
    const key = el.getAttribute('data-blog');
    const value = content[key];
    if (!value) return;

    if (key === 'body') {
      el.innerHTML = bodyToHtml(value);
      return;
    }

    if (key === 'tags') {
      const tags = value.split(',').map((t) => t.trim());
      el.innerHTML = tags.map((t) => `<span class="bl-card-tag">${t}</span>`).join('');
      return;
    }

    el.textContent = value;
  });

  fillMorePosts(slug);
};
