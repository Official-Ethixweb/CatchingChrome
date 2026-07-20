/**
 * Generates web-sized derivatives for the gallery photos.
 *
 * The originals are straight camera/phone files — 3000x4000 and 2-3 MB each,
 * ~63 MB for the set. The gallery renders them into tiles roughly 330 px wide,
 * so the browser was downloading about 30x more pixels than it could ever
 * paint. That is what made the page slow; nothing about the layout was at
 * fault.
 *
 * Two derivatives per photo, both WebP:
 *   thumb (720 px wide)  — the mosaic tiles, at 2x for retina
 *   full  (1600 px wide) — the lightbox
 *
 * Originals are left untouched on disk; only the derivatives are referenced by
 * the site. Re-runs skip work that is already done, so this is cheap to repeat.
 *
 *   node scripts/optimize-gallery.mjs
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/Gallery'
const OUT = 'public/Gallery/opt'

const VARIANTS = [
  { suffix: 'thumb', width: 720, quality: 72 },
  { suffix: 'full', width: 1600, quality: 80 },
]

const IMAGE_RE = /\.(jpe?g|png|webp)$/i

const run = async () => {
  await mkdir(OUT, { recursive: true })

  const files = (await readdir(SRC)).filter((f) => IMAGE_RE.test(f))
  const manifest = {}
  let before = 0
  let after = 0
  let skipped = 0

  for (const file of files) {
    const src = path.join(SRC, file)
    const base = file.replace(IMAGE_RE, '')
    before += (await stat(src)).size

    const entry = {}
    for (const v of VARIANTS) {
      const outName = `${base}-${v.suffix}.webp`
      const outPath = path.join(OUT, outName)
      entry[v.suffix] = `/Gallery/opt/${outName}`

      if (existsSync(outPath)) {
        after += (await stat(outPath)).size
        skipped++
        continue
      }

      await sharp(src)
        // `withoutEnlargement` keeps small sources from being upscaled into
        // bigger files than the original.
        .resize({ width: v.width, withoutEnlargement: true })
        .webp({ quality: v.quality })
        .toFile(outPath)

      after += (await stat(outPath)).size
    }

    // Intrinsic size of the *thumb* drives the layout; the ratio is identical
    // to the original, which is all the mosaic needs.
    const meta = await sharp(path.join(OUT, `${base}-thumb.webp`)).metadata()
    entry.width = meta.width
    entry.height = meta.height
    manifest[file] = entry
  }

  await writeFile(
    'src/lib/gallery-manifest.json',
    `${JSON.stringify(manifest, null, 2)}\n`,
  )

  const mb = (n) => (n / 1048576).toFixed(1)
  console.log(`images:    ${files.length}`)
  console.log(`skipped:   ${skipped} (already generated)`)
  console.log(`originals: ${mb(before)} MB`)
  console.log(`optimized: ${mb(after)} MB  (both variants)`)
  console.log(`manifest:  src/lib/gallery-manifest.json`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
