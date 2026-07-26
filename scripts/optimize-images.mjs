#!/usr/bin/env node
/**
 * Re-encodes the site's images as WebP. Two passes, because the two kinds of image
 * have different constraints:
 *
 * 1. **Curated marketing assets.** Sources live in `assets/images/` (in the repo,
 *    never deployed) and outputs go to `public/images/`. Each has a hand-set max
 *    width, because we know exactly how large it renders — the product shots are
 *    900×1600 mockups displayed at ~380px. Components reference the `.webp`
 *    directly, so no mapping is needed.
 *
 * 2. **Migrated WordPress content.** These are referenced from the generated HTML
 *    in `src/data/generated/`, which `migrate-wp-content.mjs` owns, so they're
 *    converted in place and the mapping is recorded in `image-map.json` for
 *    `lib/content.ts` to apply when it reads posts and docs. That keeps
 *    `pnpm migrate:wp` re-runnable: the migration writes whatever WordPress holds,
 *    and the map swaps in the optimized file when one exists.
 *
 * Requires ImageMagick (`brew install imagemagick`). Re-runnable: pass 1 overwrites
 * its outputs, pass 2 skips anything already converted.
 *
 *   pnpm optimize:images
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const SOURCE = 'assets/images'
const OUTPUT = 'public/images'
const WP_DIR = 'public/images/wp'
const MAP_PATH = 'src/data/generated/image-map.json'

const kb = (file) => Math.round(statSync(file).size / 1024)

/* ---------------------------------------------------------------------------
   Pass 1 — curated marketing assets
   --------------------------------------------------------------------------- */

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

  // Product screenshots — 900×1600 phone mockups, rendered ~380px wide
  ...[1, 2, 3, 4, 5].map((n) => ({ file: `${n}-scaled.png`, maxWidth: 900, quality: 78 })),

  // Testimonial portraits — rendered at 56px
  { file: 'testimonials/jeffrey-margolis.png', maxWidth: 240, quality: 85 },
  { file: 'testimonials/richard-zekman.png', maxWidth: 240, quality: 85 },
]

console.log('Marketing assets (assets/images → public/images)')

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
    // `>` only shrinks: a source narrower than maxWidth is left alone rather than
    // upscaled into blur.
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
  console.log(`  skipped ${missing.length} missing source(s): ${missing.join(', ')}`)
}
console.log(
  `  ${before} KB → ${after} KB (${before ? Math.round((1 - after / before) * 100) : 0}% smaller)\n`
)

/* ---------------------------------------------------------------------------
   Pass 2 — migrated WordPress content images
   --------------------------------------------------------------------------- */

/** Below this, the extra file in the repo isn't worth the saving. */
const MIN_BYTES = 120 * 1024
/** Nothing renders a content image wider than the article column. */
const MAX_WIDTH = 1600
const WP_QUALITY = 82
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

const widthOf = (file) =>
  Number(execFileSync('magick', ['identify', '-format', '%w', file], { encoding: 'utf8' }))

console.log('WordPress content images (in place, recorded in image-map.json)')

/**
 * The existing map is loaded and merged into, never rebuilt from scratch.
 *
 * Converted sources get pruned from the repo once a `.webp` exists — there's no
 * reason to ship both — which means the map is the *only* record that
 * `foo-1024x536.png` should resolve to `foo-1024x536.webp`. Regenerating it by
 * walking the directory silently drops every one of those entries, and because
 * `lib/content.ts` then passes the original path through unchanged, every article
 * image 404s against a file that no longer exists.
 */
const map = existsSync(MAP_PATH) ? JSON.parse(readFileSync(MAP_PATH, 'utf8')) : {}
const mapEntriesBefore = Object.keys(map).length
let wpConverted = 0
let wpSaved = 0

// Scoped to `wp/` deliberately: walking all of public/images would also map the
// pass-1 outputs above, and those are already referenced as .webp in components.
for (const file of walk(WP_DIR)) {
  const ext = path.extname(file).toLowerCase()
  if (!SOURCE_EXT.has(ext)) continue

  const size = statSync(file).size
  if (size < MIN_BYTES) continue

  const webp = path.join(path.dirname(file), `${path.basename(file, ext)}.webp`)
  const toPublic = (p) => '/' + path.relative('public', p).split(path.sep).join('/')

  if (!existsSync(webp)) {
    const args = [file]
    if (widthOf(file) > MAX_WIDTH) args.push('-resize', `${MAX_WIDTH}x>`)
    args.push('-strip', '-quality', String(WP_QUALITY), '-define', 'webp:method=6', webp)
    execFileSync('magick', args)
    wpConverted += 1
    wpSaved += size - statSync(webp).size
    console.log(`  ${path.basename(file)}: ${kb(file)} KB → ${kb(webp)} KB`)
  }

  map[toPublic(file)] = toPublic(webp)
}

mkdirSync(path.dirname(MAP_PATH), { recursive: true })
// Sorted so re-runs produce a stable diff instead of reordering 85 lines.
const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(MAP_PATH, JSON.stringify(sorted, null, 2) + '\n')

const added = Object.keys(map).length - mapEntriesBefore
console.log(
  `  ${wpConverted} converted, ${Object.keys(map).length} mapped (${added} new), ${(wpSaved / 1024 / 1024).toFixed(1)} MB saved`
)
