/**
 * Converts the site's code-referenced photos/illustrations to WebP.
 *
 * The gallery has its own pipeline (optimize-gallery.mjs). This one handles the
 * hero backgrounds, section photos, fish + merch illustrations, and logos that
 * are referenced directly from components/routes — the images that show up on
 * first paint and were still being served as full-size JP/PNG.
 *
 * Each job writes a .webp next to the original (same folder), resized to the
 * largest size it is ever displayed at. Originals are left on disk untouched;
 * only the code references switch to .webp. Re-runs skip finished work.
 *
 *   node scripts/optimize-images.mjs
 */
import { stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'

// [file (relative to public/), maxWidth, quality]
// Photographic JPEGs are already reasonably compressed, so they use a lower
// quality (behind dark overlays this is invisible) to actually beat the JPEG.
// The PNG illustrations/logo carry flat colour + alpha and shrink dramatically.
const JOBS = [
  // Hero / page-banner photography (full-bleed, sit behind dark gradients)
  ['nature-river.jpg', 1920, 68],
  ['nature-forest.jpg', 1920, 68],
  ['nature-mountain.jpg', 1920, 68],
  ['nature-valley.jpg', 1920, 68],
  // Section photos
  ['20240831_124653-1488x1536.jpg', 1200, 74],
  ['22ft boat 2.jpg', 1100, 74],
  ['crabpots.jpg', 1100, 74],
  ['crabcatch.jpg', 1100, 74],
  ['crabtrip.jpg', 1100, 74],
  ['sturgeon.jpg', 1100, 74],
  ['18ft boat.png', 1100, 82],
  // Fish illustrations (PNG w/ alpha)
  ['fallchinook.png', 900, 84],
  ['summerchinook.png', 900, 84],
  ['wintersteelhead.png', 900, 84],
  ['americanshad.png', 900, 84],
  // Merch (PNG w/ alpha)
  ['merch/sweatshirt.png', 800, 84],
  ['merch/long-sleeve.png', 800, 84],
  ['merch/youth-apparel.png', 800, 84],
  ['merch/sticker.png', 800, 84],
  // Logo — displayed at most ~200px; a small WebP beats the full PNG.
  ['Catching-Chrome-logo_color-1536x1533.png', 288, 88],
  // NOTE: the two partner logos (3KB / 10KB PNG) are already tiny — WebP
  // re-encoding makes them larger, so they stay PNG.
]

const run = async () => {
  let before = 0
  let after = 0
  let done = 0
  let skipped = 0
  let missing = 0

  for (const [file, width, quality] of JOBS) {
    const src = path.join(PUBLIC, file)
    if (!existsSync(src)) {
      console.warn(`  ! missing: ${file}`)
      missing++
      continue
    }
    const out = path.join(PUBLIC, file.replace(/\.(jpe?g|png)$/i, '.webp'))
    const srcSize = (await stat(src)).size
    before += srcSize

    if (existsSync(out)) {
      after += (await stat(out)).size
      skipped++
      continue
    }

    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out)

    const outSize = (await stat(out)).size
    after += outSize
    done++
    const pct = Math.round((1 - outSize / srcSize) * 100)
    console.log(
      `  ${file} → ${path.basename(out)}  ${kb(srcSize)}→${kb(outSize)} (-${pct}%)`,
    )
  }

  console.log('')
  console.log(`converted: ${done}   skipped: ${skipped}   missing: ${missing}`)
  console.log(`originals: ${kb(before)}`)
  console.log(`webp:      ${kb(after)}  (-${Math.round((1 - after / before) * 100)}%)`)
}

const kb = (n) => `${Math.round(n / 1024)}KB`

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
