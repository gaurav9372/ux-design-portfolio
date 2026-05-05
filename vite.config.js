import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        'project-care-naturals': resolve(__dirname, 'pages/project/care-naturals.html'),
        'project-legacy-square': resolve(__dirname, 'pages/project/legacy-square.html'),
        'project-united-rubber': resolve(__dirname, 'pages/project/united-rubber.html'),
        'project-adscult': resolve(__dirname, 'pages/project/adscult.html'),
        'project-finflow': resolve(__dirname, 'pages/project/finflow.html'),
        'project-meditrack': resolve(__dirname, 'pages/project/meditrack.html'),
        'project-flavor-street': resolve(__dirname, 'pages/project/flavor-street.html'),
        'project-eduspark': resolve(__dirname, 'pages/project/eduspark.html'),
        about: resolve(__dirname, 'pages/about.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        blog: resolve(__dirname, 'pages/blog.html'),
        'blog-12-mistakes': resolve(__dirname, 'pages/blog/12-mistakes-junior-designers-make.html'),
        'blog-developers': resolve(__dirname, 'pages/blog/how-you-work-with-developers.html'),
        'blog-constraints': resolve(__dirname, 'pages/blog/designing-under-constraints.html'),
        'blog-ai-ux': resolve(__dirname, 'pages/blog/ai-ux-real-use-cases.html'),
        'blog-claude-ux': resolve(__dirname, 'pages/blog/using-claude-ai-as-ux-thinking-partner.html'),
        'blog-vibe-coding': resolve(__dirname, 'pages/blog/why-ux-designers-need-vibe-coding.html'),
      },
    },
  },
});
