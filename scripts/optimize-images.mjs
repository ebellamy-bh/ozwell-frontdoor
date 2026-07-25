/**
 * Re-encodes migrated WordPress images as WebP.
 *
 * The migration downloads whatever WordPress had, which for our blog headers means 2–6.5 MB PNGs of
 * photographic artwork. The blog index shows four of them at once, so a single page view pulled
 * ~13 MB of images.
 *
 * The generated content JSON is not edited: this writes a `.webp` alongside each source and records
 * the mapping in `src/data/generated/image-map.json`, which `src/lib/content.ts` applies when it
 * reads posts and docs. That keeps `pnpm migrate:wp` re-runnable — run this after it, and anything
 * already converted is skipped.
 *
 * Requires ImageMagick (`brew install imagemagick`).
 *
 * Usage: node scripts/optimize-images.mjs
 */
import { execFileSync } from 'child_process'
import { readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname, extname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_DIR = join(ROOT, 'public/images')
const MAP_PATH = join(ROOT, 'src/data/generated/image-map.json')

/** Below this, WebP conversion isn't worth the extra file in the repo. */
const MIN_BYTES = 120 * 1024
/** Nothing on the site displays a content image wider than the 1088px article column. */
const MAX_WIDTH = 1600
const QUALITY = 82

const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function widthOf(file) {
  return Number(execFileSync('magick', ['identify', '-format', '%w', file], { encoding: 'utf8' }))
}

const map = {}
let converted = 0
let savedBytes = 0

for (const file of walk(IMG_DIR)) {
  const ext = extname(file).toLowerCase()
  if (!SOURCE_EXT.has(ext)) continue

  const size = statSync(file).size
  const webp = join(dirname(file), `${basename(file, ext)}.webp`)
  const publicPath = '/' + relative(join(ROOT, 'public'), file).split('\\').join('/')
  const webpPath = '/' + relative(join(ROOT, 'public'), webp).split('\\').join('/')

  if (size < MIN_BYTES) continue

  if (!existsSync(webp)) {
    // `magick <in> ... <out>`; the `convert` subcommand form is deprecated in ImageMagick 7.
    const args = [file]
    if (widthOf(file) > MAX_WIDTH) args.push('-resize', `${MAX_WIDTH}x`)
    args.push('-strip', '-quality', String(QUALITY), '-define', 'webp:method=6', webp)
    execFileSync('magick', args)
    converted += 1
    savedBytes += size - statSync(webp).size
    console.log(
      `  ${basename(file)}: ${(size / 1024) | 0}KB → ${(statSync(webp).size / 1024) | 0}KB`
    )
  }

  map[publicPath] = webpPath
}

mkdirSync(dirname(MAP_PATH), { recursive: true })
writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + '\n')

console.log(
  `\n${converted} converted, ${Object.keys(map).length} mapped, ${(savedBytes / 1024 / 1024).toFixed(1)}MB saved`
)
