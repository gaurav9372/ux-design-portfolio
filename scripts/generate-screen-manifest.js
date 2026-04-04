/*
  Auto-generates the project screen manifest by scanning
  public/images/projectscreens/ subfolders.

  Run: node scripts/generate-screen-manifest.js
  Or automatically via the "dev" and "build" npm scripts.

  Output: src/data/screen-manifest.json
*/

import { readdirSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCREENS_DIR = join(ROOT, 'public', 'images', 'projectscreens');
const OUTPUT = join(ROOT, 'src', 'data', 'screen-manifest.json');
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

const manifest = {};

if (existsSync(SCREENS_DIR)) {
  const projects = readdirSync(SCREENS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  projects.forEach((slug) => {
    const dir = join(SCREENS_DIR, slug);
    const files = readdirSync(dir)
      .filter((f) => EXTENSIONS.some((ext) => f.toLowerCase().endsWith(ext)))
      .sort((a, b) => {
        // home.png always first
        if (a.toLowerCase() === 'home.png') return -1;
        if (b.toLowerCase() === 'home.png') return 1;
        return a.localeCompare(b);
      });

    manifest[slug] = files;
  });
}

// Ensure output directory exists
const outDir = dirname(OUTPUT);
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));

const total = Object.values(manifest).reduce((sum, arr) => sum + arr.length, 0);
console.log(`Screen manifest: ${Object.keys(manifest).length} projects, ${total} images → src/data/screen-manifest.json`);
