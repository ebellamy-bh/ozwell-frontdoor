#!/usr/bin/env node
/**
 * Converts the marketing images referenced by our own components to WebP, and
 * caps them at the largest size they're actually displayed at.
 *
 * Why this exists: the hero PNG was 3.6 MB and carried `priority`, so it was the
 * LCP element on every visit. The showcase screenshots were 2560×1440 originals
 * rendered into a 300–378px-wide marquee — roughly 45× more pixels than needed.
 *
 * Sources live in `assets/images/` (in the repo, never deployed) and outputs go to
 * `public/images/`. Keeping the originals out of `public/` matters: they were
 * previously served alongside the WebP, so the build shipped 8 MB of files nothing
 * linked to, and anything that did link to one got the unoptimized version.
 *
 * `public/images/wp/` is not touched — it belongs to `migrate-wp-content.mjs`,
 * which rewrites those paths from WordPress and would undo anything done here.
 *
 * Requires ImageMagick (`brew install imagemagick`). Re-runnable: outputs are
 * overwritten, sources are left alone.
 *
 *   node scripts/optimize-images.mjs
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

const SOURCE = 'assets/images'
const OUTPUT = 'public/images'

/**
 * `maxWidth` is the widest the asset is ever rendered, doubled for 2× displays.
 * `quality` is lower for photographic screenshots than for flat-colour logos,
 * where WebP artefacts around type are obvious.
 */
const TARGETS = [
  // Hero / page illustrations
  { file: 'Ozwell-Branding-Whiteboard-2.png', maxWidth: 1400, quality: 82 },
  { file: 'Ozwell-Branding-Whiteboard-4.png', maxWidth: 1200, quality: 82 },
  { file: 'Ozwell-mobile-phones-for-website-608x1080.png', maxWidth: 800, quality: 85 },
  { file: 'bluehive-site-headers-25.png', maxWidth: 1600, quality: 70 },

  // Logos and badges — flat colour, keep quality high
  { file: 'Ozwell-logo.png', maxWidth: 660, quality: 92 },
  { file: 'thumb-Drummond-Certified-pDSI-RISK-2025.png', maxWidth: 600, quality: 90 },
  { file: 'white-app-store-buttons-6-1.png', maxWidth: 480, quality: 90 },
  { file: 'white-app-store-buttons-7-1.png', maxWidth: 480, quality: 90 },

  // Customer logos (homepage cloud)
  ...[1, 2, 3, 4, 6].map((n) => ({ file: `company-logos-${n}.png`, maxWidth: 480, quality: 90 })),
  // Customer logos, white knockout (About page band)
  ...[1, 3, 4, 6, 7].map((n) => ({
    file: `company-display-logos-${n}.png`,
    maxWidth: 560,
    quality: 90,
  })),

  // Product screenshots — rendered ~380px wide in the marquee
  ...[1, 2, 3, 4, 5].map((n) => ({ file: `${n}-scaled.png`, maxWidth: 900, quality: 78 })),

  // Testimonial portraits — rendered at 80px
  { file: 'testimonials/jeffrey-margolis.png', maxWidth: 240, quality: 85 },
  { file: 'testimonials/richard-zekman.png', maxWidth: 240, quality: 85 },
]

function kb(file) {
  return Math.round(statSync(file).size / 1024)
}

let before = 0
let after = 0
const missing = []

for (const { file, maxWidth, quality } of TARGETS) {
  const src = path.join(SOURCE, file)
  if (!existsSync(src)) {
    missing.push(file)
    continue
  }
  const out = path.join(OUTPUT, file.replace(/\.png$/, '.webp'))
  mkdirSync(path.dirname(out), { recursive: true })

  execFileSync('magick', [
    src,
    // `>` only shrinks: a source narrower than maxWidth is left at its own size
    // rather than upscaled into blur.
    '-resize',
    `${maxWidth}x>`,
    '-strip',
    '-quality',
    String(quality),
    // Logos and illustrations have real transparency to preserve.
    '-define',
    'webp:alpha-quality=100',
    out,
  ])

  before += kb(src)
  after += kb(out)
  console.log(`  ${file} → ${path.basename(out)}  ${kb(src)} KB → ${kb(out)} KB`)
}

/**
 * White-wordmark logo for the dark footer. The wordmark is pure #000000 and the
 * octopus outlines are #061244 — about 16% apart in RGB, so an 8% fuzz recolours
 * the type without touching the mascot.
 */
const logo = path.join(SOURCE, 'Ozwell-logo.png')
if (existsSync(logo)) {
  const out = path.join(OUTPUT, 'Ozwell-logo-white.webp')
  execFileSync('magick', [
    logo,
    '-resize',
    '660x>',
    '-alpha',
    'set',
    '-channel',
    'RGB',
    '-fuzz',
    '8%',
    '-fill',
    'white',
    '-opaque',
    'black',
    '+channel',
    '-strip',
    '-quality',
    '92',
    '-define',
    'webp:alpha-quality=100',
    out,
  ])
  after += kb(out)
  console.log(`  Ozwell-logo.png → Ozwell-logo-white.webp  ${kb(out)} KB (recoloured wordmark)`)
}

if (missing.length > 0) {
  console.log(`\nSkipped ${missing.length} missing source(s): ${missing.join(', ')}`)
}
console.log(
  `\n${before} KB of PNG → ${after} KB of WebP (${Math.round((1 - after / before) * 100)}% smaller)`
)
