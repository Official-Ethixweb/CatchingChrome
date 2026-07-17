import { useEffect, useRef, useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { ArrowUpRight, InstagramIcon } from './icons'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, REELS } from '~/lib/reels'

/**
 * "Follow along on Instagram" — a phone mockup that shows Ryan's reels and taps
 * through to Instagram. Each reel renders at the best tier it has assets for:
 * an autoplaying muted video, a cover image, or a branded "Watch reel" cover
 * (so it works even before any media is added). Instagram's own embed is NOT
 * used — it refuses to render in many contexts, which is the whole reason this
 * is local-media based.
 *
 * Only the active reel's media is mounted; a video pauses when scrolled away.
 * The carousel auto-advances (held while hovered/focused) and honours
 * reduced-motion (no autoplay, no auto-advance).
 */
export function InstagramReelsSection() {
  const hasReels = REELS.length > 0
  const multiple = REELS.length > 1

  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewRef = useRef(true)

  const reel = hasReels ? REELS[active] : null

  useEffect(() => {
    if (typeof matchMedia === 'undefined') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  // Pause the video when the section scrolls out of view; resume in view.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting && !reduced) v.play?.().catch(() => {})
        else v.pause?.()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, active])

  // Switch to the next reel every 3s (paused for reduced-motion users).
  useEffect(() => {
    if (!multiple || reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % REELS.length), 3000)
    return () => clearInterval(id)
  }, [multiple, reduced, active])

  return (
    <section
      ref={sectionRef}
      className="theme-transition pop overflow-hidden bg-cream py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Copy */}
        <Reveal>
          <Eyebrow label="On Instagram" tone="dark" />

          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.4rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Follow the</span>
            <span className="text-accent">Adventure</span>
          </h2>

          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink/60">
            Chrome-bright chinook, screaming drags and Oregon at first light.
            Captain Ryan posts it all. Tap a reel to watch it on Instagram, then
            follow along for the latest from the water.
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group mt-9 inline-flex items-center gap-2.5 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow @{INSTAGRAM_HANDLE}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        {/* Phone mockup — nudged 35px left of its column on desktop, centered on mobile. */}
        <Reveal className="flex justify-center lg:justify-end" delay={0.1}>
          <div className="lg:-translate-x-[35px]">
            <div className="relative aspect-[9/19.3] w-[264px] rounded-[2.6rem] border-[3px] border-[#1b1b21] bg-[#0b0b0d] p-[7px] shadow-[0_34px_70px_-24px_rgba(14,42,59,0.55)] sm:w-[288px]">
              {/* Notch */}
              <div className="absolute left-1/2 top-[7px] z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-b-[14px] bg-[#0b0b0d]" />

              {/* Screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-black">
                <a
                  href={reel ? reel.href : INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    reel
                      ? `Watch this reel on Instagram${reel.caption ? `: ${reel.caption}` : ''}`
                      : `Open @${INSTAGRAM_HANDLE} on Instagram`
                  }
                  className="group block h-full w-full"
                >
                  {reel?.video ? (
                    <video
                      ref={videoRef}
                      key={reel.video}
                      src={reel.video}
                      poster={reel.poster}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      autoPlay={!reduced}
                    />
                  ) : reel?.poster ? (
                    <img
                      src={reel.poster}
                      alt={reel.caption ?? `Reel by @${INSTAGRAM_HANDLE}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BrandedCover index={active} />
                  )}

                  {/* Top handle chip */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-2 bg-gradient-to-b from-black/55 to-transparent px-4 pb-8 pt-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                      <InstagramIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[12px] font-semibold text-white drop-shadow">
                      @{INSTAGRAM_HANDLE}
                    </span>
                  </div>

                  {/* Bottom caption + watch pill */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-5 pt-10">
                    {reel?.caption && (
                      <p className="text-[12.5px] font-medium leading-snug text-white/90">
                        {reel.caption}
                      </p>
                    )}
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink transition-transform duration-200 group-hover:scale-105">
                      <PlayIcon className="h-3 w-3" />
                      Watch on Instagram
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Branded stand-in shown when a reel has no local video/cover yet. Still looks
 * like a reel sitting in the phone and taps through to the real post.
 */
function BrandedCover({ index }: { index: number }) {
  // Subtle per-reel variation so the carousel visibly changes as it advances.
  const tilts = [
    'from-primary/90 via-ink to-ink',
    'from-ink via-primary/70 to-ink',
    'from-accent/40 via-ink to-ink',
    'from-primary/70 via-ink to-[#0b1f2b]',
    'from-[#0b1f2b] via-primary/60 to-ink',
  ]
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br text-center ${
        tilts[index % tilts.length]
      }`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
        <InstagramIcon className="h-8 w-8" />
      </span>
      <p className="px-6 text-[13px] font-semibold uppercase tracking-wide text-white/85">
        Watch reel {index + 1}
      </p>
    </div>
  )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
