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
        'project-united-rubber': resolve(__dirname, 'pages/project/united-rubber.html'),
        about: resolve(__dirname, 'pages/about.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        blog: resolve(__dirname, 'pages/blog.html'),
        'blog-sample-post': resolve(__dirname, 'pages/blog/sample-post.html'),
      },
    },
  },
});
