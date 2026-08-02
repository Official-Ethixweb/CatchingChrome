/**
 * Builds every derivative of the brand logo from the single 1024px master,
 * plus the second captain photo.
 *
 * The masters live in brand-src/ rather than public/ on purpose: the logo one
 * is a 2MB PNG with a lot of transparent margin, and anything under public/ is
 * deployed whether or not a page ever asks for it. The wordmark is also
 * illegible below ~64px, so the favicons crop to the salmon roundel on a navy
 * tile instead of shrinking the whole lockup.
 *
 * Outputs (all under public/):
 *   brand/logo.webp          header / footer / mobile menu
 *   brand/logo.png           transparent PNG of the lockup — not referenced by
 *                            the site, kept for print / email / listings
 *   brand/favicon-{16,32,192,512}.png
 *   brand/apple-touch-icon.png   180px, opaque (iOS composites onto black)
 *   brand/og-image.png       1200x630 share card
 *   favicon.ico              16+32 packed, for bare /favicon.ico requests
 *   ryan-2.webp              second captain photo for the Meet the Captain
 *                            carousel
 *
 *   node scripts/optimize-brand.mjs
 */
import { mkdir, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'
const SRC = 'brand-src'
const BRAND = path.join(PUBLIC, 'brand')
const MASTER = path.join(SRC, 'logo-master.png')
const INK = '#0E2A3B'

// The roundel only — measured off the 1024px master. Stops above the wordmark
// so the small icons carry the fish, not unreadable lettering.
const ROUNDEL = { left: 145, top: 70, width: 715, height: 520 }

const tile = async (size) => {
  // Scene inset inside the tile so the arc doesn't collide with the edges.
  const inset = Math.round(size * 0.9)
  const scene = await sharp(MASTER)
    .extract(ROUNDEL)
    .resize(inset, Math.round((inset * ROUNDEL.height) / ROUNDEL.width))
    .toBuffer()

  return sharp({
    create: { width: size, height: size, channels: 4, background: INK },
  })
    .composite([{ input: scene, gravity: 'center' }])
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toBuffer()
}

/** Packs PNG buffers into a single .ico (ICO allows PNG-encoded entries). */
const ico = (entries) => {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(entries.length, 4)

  let offset = 6 + entries.length * 16
  const dir = entries.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(size === 256 ? 0 : size, 0)
    e.writeUInt8(size === 256 ? 0 : size, 1)
    e.writeUInt8(0, 2) // palette
    e.writeUInt8(0, 3) // reserved
    e.writeUInt16LE(1, 4) // colour planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)])
}

const kb = (n) => `${Math.round(n / 1024)}KB`
const report = async (file) => console.log(`  ${file}  ${kb((await stat(file)).size)}`)

const run = async () => {
  await mkdir(BRAND, { recursive: true })

  // --- Full lockup, trimmed of its transparent margin ---------------------
  const trimmed = await sharp(MASTER).trim({ threshold: 5 }).toBuffer()

  // The lockup is never displayed wider than ~150px CSS px (the home header at
  // xl); 420 covers that at 2.5x DPR and keeps the file well under the old logo.
  const logoWebp = path.join(BRAND, 'logo.webp')
  await sharp(trimmed).resize({ width: 420 }).webp({ quality: 82 }).toFile(logoWebp)
  await report(logoWebp)

  const logoPng = path.join(BRAND, 'logo.png')
  await sharp(trimmed)
    .resize({ width: 512 })
    .png({ compressionLevel: 9, palette: true })
    .toFile(logoPng)
  await report(logoPng)

  // --- Favicons -----------------------------------------------------------
  for (const size of [16, 32, 192, 512]) {
    const out = path.join(BRAND, `favicon-${size}.png`)
    await writeFile(out, await tile(size))
    await report(out)
  }

  const apple = path.join(BRAND, 'apple-touch-icon.png')
  await writeFile(apple, await tile(180))
  await report(apple)

  const icoPath = path.join(PUBLIC, 'favicon.ico')
  await writeFile(
    icoPath,
    ico([
      { size: 16, data: await tile(16) },
      { size: 32, data: await tile(32) },
    ]),
  )
  await report(icoPath)

  // --- Share card ---------------------------------------------------------
  const og = path.join(BRAND, 'og-image.png')
  const lockup = await sharp(trimmed).resize({ height: 520 }).toBuffer()
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: INK },
  })
    .composite([{ input: lockup, gravity: 'center' }])
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile(og)
  await report(og)

  // --- Second captain photo (carousel slide) ------------------------------
  const ryan = path.join(PUBLIC, 'ryan-2.webp')
  await sharp(path.join(SRC, 'ryan-2-master.jpg'))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(ryan)
  await report(ryan)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
