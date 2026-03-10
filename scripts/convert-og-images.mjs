/**
 * Convert all SVG images used as OG images to PNG (1200x630) for social media.
 * Social platforms (Facebook, Twitter, LinkedIn) require raster images.
 * Run: node scripts/convert-og-images.mjs
 */
import sharp from 'sharp';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const publicDir = new URL('../public/images/', import.meta.url).pathname;
const BG = { r: 46, g: 43, b: 89, alpha: 1 }; // Deep indigo background

async function convertDir(dir, label) {
  if (!existsSync(dir)) return 0;
  const svgFiles = readdirSync(dir).filter(f => f.endsWith('.svg'));
  let count = 0;
  for (const file of svgFiles) {
    const svgBuffer = readFileSync(join(dir, file));
    const pngPath = join(dir, file.replace('.svg', '.png'));
    await sharp(svgBuffer, { density: 150 })
      .resize(1200, 630, { fit: 'cover', background: BG })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(pngPath);
    console.log(`  ✓ ${label}/${file} → .png`);
    count++;
  }
  return count;
}

let total = 0;

// Core OG images
const ogFiles = readdirSync(publicDir).filter(f => f.startsWith('og-') && f.endsWith('.svg'));
for (const file of ogFiles) {
  const svgBuffer = readFileSync(join(publicDir, file));
  await sharp(svgBuffer, { density: 150 })
    .resize(1200, 630, { fit: 'cover', background: BG })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(publicDir, file.replace('.svg', '.png')));
  console.log(`  ✓ ${file} → .png`);
  total++;
}

// Service illustrations (used as OG for service pages)
total += await convertDir(join(publicDir, 'services'), 'services');

// Blog category images (used as OG fallback for blog posts)
total += await convertDir(join(publicDir, 'blog'), 'blog');

console.log(`\nConverted ${total} SVG → PNG for social media.`);
