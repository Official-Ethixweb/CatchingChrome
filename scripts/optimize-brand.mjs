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

const ACCENT = '#60B1D2'

/**
 * The leaping salmon, measured off the 1024px master.
 *
 * Square on purpose. The previous crop was 715x520, which did two visible
 * things wrong: a non-square scene centred in a square tile left dead navy
 * bands above and below it, and the box cut inside the badge's ring (the ring
 * spans x 100-922) then stopped flat at y 590, so the round badge came out as
 * a half-dome with its bottom sliced off.
 *
 * This box holds the whole fish (x 230-735, y 175-600) and stops above the
 * wordmark, whose ascenders start around y 590. Keep the bottom edge under
 * that line if you ever re-measure: the lettering is illegible at 16px and
 * dragging it into frame is what made the old icon look cropped.
 */
const FISH = { left: 230, top: 95, width: 502, height: 502 }

/**
 * The badge is round, so the icon is round: a circular scene on a navy tile
 * with a thin brand-blue ring. The ring matters at small sizes, it gives the
 * mark a crisp edge instead of letting the dark scene bleed into dark browser
 * chrome.
 *
 * Rendered once at 512 and scaled down per size rather than composited at each
 * size directly, because masking and stroking a circle at 16px aliases badly
 * whereas a downscale from 512 resolves to a clean soft edge.
 */
const MASTER_TILE = 512

const badge = async () => {
  const r = MASTER_TILE / 2 - 8
  const c = MASTER_TILE / 2
  const circle = (attrs) =>
    Buffer.from(
      `<svg width="${MASTER_TILE}" height="${MASTER_TILE}"><circle cx="${c}" cy="${c}" r="${r}" ${attrs}/></svg>`,
    )

  const scene = await sharp(MASTER)
    .extract(FISH)
    .resize(MASTER_TILE, MASTER_TILE)
    .toBuffer()

  const masked = await sharp(scene)
    .composite([{ input: circle('fill="#fff"'), blend: 'dest-in' }])
    .png()
    .toBuffer()

  return sharp({
    create: {
      width: MASTER_TILE,
      height: MASTER_TILE,
      channels: 4,
      background: INK,
    },
  })
    .composite([
      { input: masked },
      { input: circle(`fill="none" stroke="${ACCENT}" stroke-width="14"`) },
    ])
    .png()
    .toBuffer()
}

const tile = async (size, master) => {
  const src = master ?? (await badge())
  return sharp(src)
    .resize(size, size)
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
  // Built once, scaled per size.
  const master = await badge()

  for (const size of [16, 32, 192, 512]) {
    const out = path.join(BRAND, `favicon-${size}.png`)
    await writeFile(out, await tile(size, master))
    await report(out)
  }

  const apple = path.join(BRAND, 'apple-touch-icon.png')
  await writeFile(apple, await tile(180, master))
  await report(apple)

  const icoPath = path.join(PUBLIC, 'favicon.ico')
  await writeFile(
    icoPath,
    ico([
      { size: 16, data: await tile(16, master) },
      { size: 32, data: await tile(32, master) },
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
