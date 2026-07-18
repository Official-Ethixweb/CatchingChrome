import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { WaveDivider } from '~/components/WaveDivider'
import { Eyebrow } from '~/components/Eyebrow'
import { ArrowRight, ArrowUpRight, FishIcon } from '~/components/icons'
import {
  CLIPS,
  GROUPS,
  MEDIA,
  SPECIES,
  ratioOf,
  type MediaGroup,
  type MediaItem,
  type Species,
} from '~/lib/gallery'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: 'Gallery | Catching Chrome Guide Service' },
      {
        name: 'description',
        content:
          'Photos and clips from the boat: kids landing their first king, families limiting out together, solo anglers with chinook, coho, steelhead and sturgeon on Oregon rivers.',
      },
    ],
  }),
})

/* ── Hero ─────────────────────────────────────────────────────────────── */

function GalleryHeader() {
  return (
    <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/Gallery/rsw_1280h_960-3.webp"
          alt="Sunrise over the Columbia River with guide boats on the water"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink" />
      </div>

      <SiteHeader />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
          Gallery
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70 sm:text-[12px]">
            Every Fish Has A Story
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>

      <WaveDivider fill="fill-cream" />
    </section>
  )
}

/* ── Filter chip ──────────────────────────────────────────────────────── */

function Chip({
  on,
  onClick,
  children,
  count,
}: {
  on: boolean
  onClick: () => void
  children: React.ReactNode
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-on={on}
      aria-pressed={on}
      className={`gal-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${
        on
          ? 'border-cta bg-cta text-ink'
          : 'border-ink/15 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink'
      }`}
    >
      {children}
      {count != null && (
        <span
          className={`text-[10px] tabular-nums ${on ? 'text-ink/70' : 'text-ink/35'}`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

/* ── Mosaic tile ──────────────────────────────────────────────────────── */

function Tile({
  item,
  index,
  onOpen,
}: {
  item: MediaItem
  index: number
  onOpen: () => void
}) {
  const speciesLabel = SPECIES.find((s) => s.id === item.species)?.label

  // The tile takes the photo's own aspect ratio, so there is no crop at all —
  // the angler and their fish are both in frame without anyone opening it.
  // Any fixed-height cell would have to cut one or the other, since a person
  // holding a salmon fills a tall frame from head to knee. Declaring the ratio
  // up front (rather than waiting on the image) also reserves the space, so
  // the column doesn't reflow as photos arrive.
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ animationDelay: `${Math.min(index, 14) * 40}ms` }}
      className="gal-card gal-in group relative block w-full overflow-hidden rounded-2xl bg-ink text-left shadow-sm hover:-translate-y-1 hover:shadow-2xl focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: ratioOf(item.src) }}
        className="gal-media block w-full"
      />

      {/* Veil + caption only exist on hover/focus, so the grid reads as
          photographs first and captions second. */}
      <span className="gal-veil pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0" />

      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <span className="gal-cap block translate-y-3 opacity-0">
          <span className="gal-rule mb-2 block h-px w-8 bg-accent opacity-0" />
          <span className="block text-[13.5px] font-medium leading-snug text-cream">
            {item.caption}
          </span>
          {speciesLabel && (
            <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cta">
              <FishIcon className="h-3 w-3" />
              {speciesLabel}
            </span>
          )}
        </span>
      </span>
    </button>
  )
}

/* ── Editorial blocks woven into the grid ─────────────────────────────── */

/**
 * These read as part of the mosaic rather than as a banner above it. They only
 * exist in the unfiltered view — once someone picks a filter they've told us
 * what they want to look at, and prose between the tiles is just in the way.
 */
/**
 * Sits in the photo flow as one more column item, so it's framed by pictures
 * on every side. Earlier versions gave the copy its own band or its own narrow
 * track beside a shorter run of photos — both left a tall void next to the
 * text, and mixing column widths between runs meant the photo edges stopped
 * lining up from one block to the next.
 *
 * Height comes from the content, so prose can never overflow into the tile
 * below it.
 */
function Note({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  body: string
  children?: React.ReactNode
}) {
  return (
    <div className="gal-note gal-in flex flex-col justify-center rounded-2xl border border-ink/10 bg-white/60 px-5 py-7 sm:px-6 sm:py-8">
      <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
        <span className="h-px w-5 bg-accent" />
        {eyebrow}
      </span>
      <h3 className="mt-4 font-display text-[clamp(1.5rem,2vw,1.9rem)] uppercase leading-[0.95] text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{body}</p>
      {children}
    </div>
  )
}

/* ── Clip deck ────────────────────────────────────────────────────────── */

const CLIP_MS = 3000

/**
 * One clip at a time, rotating every three seconds, with its neighbours
 * peeking behind it so the stack reads as a deck of cards.
 *
 * The rotation yields to the viewer: the clips run 4.7–6.6s, so advancing on
 * a blind timer would cut off anyone who actually pressed play. Playing a clip
 * (or hovering, or focusing) holds the deck until it ends.
 */
function ClipDeck() {
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const n = CLIPS.length

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n],
  )

  useEffect(() => {
    if (held) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), CLIP_MS)
    return () => window.clearInterval(id)
  }, [held, n])

  // Never leave a clip playing (and audible) behind the card that replaced it.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== active && !v.paused) v.pause()
    })
  }, [active])

  return (
    <div
      className="mt-14"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* Stage — tall enough for the 9:16 clip plus its caption, or the card
          spills past the bottom edge */}
      <div className="relative h-[540px] select-none sm:h-[600px]">
        {CLIPS.map((clip, i) => {
          let rel = i - active
          if (rel > n / 2) rel -= n
          if (rel < -n / 2) rel += n
          const abs = Math.abs(rel)
          const isCenter = rel === 0

          return (
            <figure
              key={clip.src}
              aria-hidden={!isCenter}
              style={{
                transform: `translate(-50%, -50%) translateX(${rel * 72}%) scale(${
                  isCenter ? 1 : 0.82
                }) rotate(${isCenter ? 0 : rel > 0 ? 2.5 : -2.5}deg)`,
                opacity: isCenter ? 1 : abs === 1 ? 0.4 : 0,
                filter: isCenter ? 'none' : 'blur(2px)',
                zIndex: 20 - abs,
                pointerEvents: isCenter ? 'auto' : 'none',
              }}
              className="clip-card absolute left-1/2 top-1/2 w-[260px] overflow-hidden rounded-2xl border border-cream/10 bg-ink shadow-2xl will-change-transform sm:w-[290px]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={clip.src}
                controls={isCenter}
                playsInline
                preload="metadata"
                tabIndex={isCenter ? 0 : -1}
                onPlay={() => setHeld(true)}
                onPause={() => setHeld(false)}
                onEnded={() => setHeld(false)}
                className="block aspect-[478/850] w-full bg-black"
              />
              <figcaption className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/70">
                {clip.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous clip"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-cta hover:text-cta"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>

        <div className="flex items-center gap-2.5">
          {CLIPS.map((clip, i) => {
            const on = i === active
            return (
              <button
                type="button"
                key={clip.src}
                onClick={() => setActive(i)}
                aria-label={`Show clip ${i + 1}: ${clip.caption}`}
                aria-current={on}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  on ? 'w-7 bg-cta/25' : 'w-2 bg-cream/25 hover:bg-cream/40'
                }`}
              >
                {on && (
                  <span
                    key={held ? 'held' : active}
                    className={`absolute inset-0 rounded-full bg-cta ${
                      held ? '' : 'dot-sweep'
                    }`}
                    style={{ animationDuration: `${CLIP_MS}ms` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next clip"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-cta hover:text-cta"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/* ── Lightbox ─────────────────────────────────────────────────────────── */

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: MediaItem[]
  index: number
  onClose: () => void
  onStep: (dir: number) => void
}) {
  const item = items[index]
  const touchX = useRef<number | null>(null)

  // A phone has no arrow keys and no hover, so swiping is the only gesture a
  // visitor arrives already knowing. The buttons stay for everyone else.
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 45) onStep(dx < 0 ? 1 : -1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    // Lock the page behind the overlay so the mosaic doesn't scroll underneath.
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onStep])

  if (!item) return null

  const speciesLabel = SPECIES.find((s) => s.id === item.species)?.label

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      /* The extra bottom padding on a phone is the landing strip for the step
         buttons, which move under the photo there rather than sitting on top
         of it. */
      className="gal-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 pb-24 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-cta hover:text-cta sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M5 5l14 14M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onStep(-1)
        }}
        aria-label="Previous photo"
        className="absolute bottom-7 left-[calc(50%-4.5rem)] z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-cta hover:text-cta sm:bottom-auto sm:left-6 sm:h-11 sm:w-11"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onStep(1)
        }}
        aria-label="Next photo"
        className="absolute bottom-7 right-[calc(50%-4.5rem)] z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-cta hover:text-cta sm:bottom-auto sm:right-6 sm:h-11 sm:w-11"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <figure
        key={item.src}
        onClick={(e) => e.stopPropagation()}
        className="gal-lightbox-panel flex max-h-full max-w-5xl flex-col items-center"
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[62vh] w-auto rounded-xl object-contain shadow-2xl sm:max-h-[74vh]"
        />
        <figcaption className="mt-5 flex flex-col items-center gap-2 text-center">
          <span className="text-[15px] font-medium text-cream">
            {item.caption}
          </span>
          <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em]">
            {speciesLabel && (
              <span className="inline-flex items-center gap-1.5 text-cta">
                <FishIcon className="h-3 w-3" />
                {speciesLabel}
              </span>
            )}
            <span className="tabular-nums text-cream/35">
              {index + 1} / {items.length}
            </span>
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

function GalleryPage() {
  const [group, setGroup] = useState<MediaGroup | null>(null)
  const [species, setSpecies] = useState<Species | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const filtered = useMemo(
    () =>
      MEDIA.filter(
        (m) =>
          (!group || m.group === group) && (!species || m.species === species),
      ),
    [group, species],
  )

  // Re-key the mosaic on every filter change so the stagger animation replays.
  const passKey = `${group ?? 'all'}-${species ?? 'all'}`
  const filtering = group !== null || species !== null

  /**
   * The photos flow as columns, and columns give no say over which one an item
   * lands in — an editorial block dropped inside would just fall wherever, and
   * the Catching Chrome one is meant to sit on the right. So the blocks are
   * lifted out as full-width bands and the photos are split around them.
   */
  const withIndex = useMemo(
    () => filtered.map((item, i) => ({ item, mediaIndex: i })),
    [filtered],
  )

  /**
   * One flat list, one mosaic: the copy is just another item in the column
   * flow. Splitting the photos into separate runs so text could sit beside
   * them is what produced the voids and the misaligned photo edges — separate
   * runs balance their columns independently and can't agree on a width.
   *
   * `mediaIndex` is tracked separately because the lightbox indexes into
   * `filtered`, not into this list.
   */
  const cells = useMemo(() => {
    const out: Array<
      | { kind: 'media'; item: MediaItem; mediaIndex: number }
      | { kind: 'note'; id: 'intro' | 'brand' }
    > = []

    if (!filtering) out.push({ kind: 'note', id: 'intro' })

    filtered.forEach((item, i) => {
      if (!filtering && i === 15) out.push({ kind: 'note', id: 'brand' })
      out.push({ kind: 'media', item, mediaIndex: i })
    })

    return out
  }, [filtered, filtering])

  const step = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i == null ? i : (i + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  )

  const activeGroup = GROUPS.find((g) => g.id === group)
  const activeSpecies = SPECIES.find((s) => s.id === species)

  return (
    <>
      <GalleryHeader />

      <main>
        {/* Intro + filters */}
        <section className="theme-transition pop bg-cream pb-10 pt-24 md:pt-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Eyebrow label="From the Boat" tone="dark" />

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] uppercase leading-[0.9] text-ink">
                <span className="block">Real Days,</span>
                <span className="block text-accent">real fish</span>
              </h2>

              <p className="max-w-md text-[17px] leading-relaxed text-ink/70 lg:mb-3">
                Nothing here is a stock photo. Every frame came off Ryan&apos;s
                phone or a guest&apos;s, on an Oregon river, on a day someone
                booked. Filter by who was aboard, or by what they caught.
              </p>
            </div>

            <hr className="mt-10 border-t border-ink/15" />

            {/* Who's aboard */}
            <div className="mt-10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
                Who&apos;s aboard
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <Chip
                  on={group === null}
                  onClick={() => setGroup(null)}
                  count={MEDIA.length}
                >
                  Everything
                </Chip>
                {GROUPS.map((g) => (
                  <Chip
                    key={g.id}
                    on={group === g.id}
                    onClick={() => setGroup(group === g.id ? null : g.id)}
                    count={MEDIA.filter((m) => m.group === g.id).length}
                  >
                    {g.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* What they caught */}
            <div className="mt-8 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
                What they caught
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                <Chip on={species === null} onClick={() => setSpecies(null)}>
                  Any Species
                </Chip>
                {SPECIES.map((s) => (
                  <Chip
                    key={s.id}
                    on={species === s.id}
                    onClick={() => setSpecies(species === s.id ? null : s.id)}
                    count={MEDIA.filter((m) => m.species === s.id).length}
                  >
                    {s.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Live caption for the current selection */}
            <div className="mt-9 flex flex-col items-center gap-1.5 text-center">
              <p className="max-w-xl text-[15px] leading-relaxed text-ink/70">
                {activeGroup?.blurb ??
                  'Eighty-plus photos and clips from the last twelve seasons.'}
                {activeSpecies && ` ${activeSpecies.note}.`}
              </p>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] tabular-nums text-ink/35">
                {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
              </span>
            </div>
          </div>
        </section>

        {/* Mosaic */}
        <section className="theme-transition bg-cream pb-24 md:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            {filtered.length === 0 ? (
              <p className="py-24 text-center text-[15px] text-ink/70">
                No shots match that combination yet. Try a different species.
              </p>
            ) : (
              <div key={passKey} className="gal-mosaic">
                {cells.map((cell, i) =>
                  cell.kind === 'note' ? (
                    cell.id === 'intro' ? (
                      <Note
                        key="intro"
                        eyebrow="The Log"
                        title={
                          <>
                            <span className="block">Twelve Seasons,</span>
                            <span className="block text-accent">
                              one river system
                            </span>
                          </>
                        }
                        body="Chinook in the summer heat, coho through the fall, steelhead out of a drift boat in January, and sturgeon that were swimming before any of us got here."
                      />
                    ) : (
                      <Note
                        key="brand"
                        eyebrow="Catching Chrome"
                        title={
                          <>
                            <span className="block">Ryan Puts You</span>
                            <span className="block text-accent">on fish</span>
                          </>
                        }
                        body="USCG-licensed, fully insured, running Oregon water since 2012. Rods, tackle and coaching are aboard, and your catch leaves cleaned, bagged and sealed."
                      >
                        <a
                          href="/contact"
                          className="btn-outline mt-6 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                        >
                          Book a Trip
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </Note>
                    )
                  ) : (
                    <Tile
                      key={cell.item.src}
                      item={cell.item}
                      index={i}
                      onOpen={() => setOpen(cell.mediaIndex)}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* Clips */}
        <section
          data-chapter="dark"
          className="theme-invert pop overflow-hidden bg-ink py-24 md:py-28"
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Eyebrow label="Clips" tone="light" />

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
                <span className="block">Sound On,</span>
                <span className="block text-accent">rods bent</span>
              </h2>
              <p className="max-w-md text-[16px] leading-relaxed text-cream/70 lg:mb-3">
                A few seconds from the middle of a fight, straight off the deck.
              </p>
            </div>

            <ClipDeck />
          </div>
        </section>

        {/* CTA */}
        <section className="theme-transition pop bg-cream py-24 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <Eyebrow label="Your Turn" tone="dark" center />
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-ink">
              The Next One Is Yours
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ink/70">
              Every photo on this page started with someone picking a date.
              Tell Ryan when you want to go and who&apos;s coming.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                Book Your Trip
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="/commercial"
                className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em]"
              >
                Bringing a Group?
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {open != null && (
        <Lightbox
          items={filtered}
          index={open}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </>
  )
}
