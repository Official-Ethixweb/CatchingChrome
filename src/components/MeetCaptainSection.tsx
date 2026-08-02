import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  AwardIcon,
  ChevronLeft,
  ChevronRight,
  FishIcon,
  ShieldCheckIcon,
} from './icons'
import { Eyebrow } from './Eyebrow'

const BADGES = [
  { icon: AwardIcon, label: 'USCG CAPTAIN' },
  { icon: ShieldCheckIcon, label: 'FIRST AID + CPR' },
  { icon: FishIcon, label: '40+ YEARS' },
]

/**
 * Slide order is the original photo first, then the newer one.
 *
 * Both are landscape (1280x1118 and 1079x813), so the frame is 8:7 rather than
 * the portrait 4:5 it used when there was a single image, and each photo is
 * `object-contain` inside it — nothing is cropped, the whole fish is visible in
 * both. 8:7 matches the first photo almost exactly; the small letterbox the
 * second one leaves is filled by a blurred copy of itself, so the frame still
 * reads as full-bleed instead of showing bars.
 */
const PHOTOS = [
  {
    src: '/rsw_1280h_1118.webp',
    width: 1280,
    height: 1118,
    alt: 'Captain Ryan holding a Columbia River chinook on the boat',
  },
  {
    src: '/ryan-2.webp',
    width: 1079,
    height: 813,
    alt: 'Captain Ryan with a bright chinook salmon caught on the lower Columbia',
  },
]

const SLIDE_MS = 5200

/** Cross-fading photo carousel: auto-advances, pauses on hover/focus. */
function CaptainCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(
      () => setActive((a) => (a + 1) % PHOTOS.length),
      SLIDE_MS,
    )
    return () => clearInterval(id)
  }, [paused])

  const go = (dir: number) =>
    setActive((a) => (a + dir + PHOTOS.length) % PHOTOS.length)

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[540px]">
        {/* Backing card */}
        <div className="absolute inset-0 rotate-[-2deg] rounded-[3px] border border-cream/10" />

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Photos of Captain Ryan"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="group relative aspect-[8/7] rotate-[4deg] overflow-hidden rounded-[3px] bg-ink shadow-2xl shadow-black/40"
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              aria-hidden={i !== active}
              // The incoming slide sits on top and fades in over the outgoing
              // one, which holds full opacity for the length of the fade and
              // only then drops (duration-0 + a delay), by which point it is
              // fully covered. Fading both at once dipped the frame to black
              // through the middle of every transition.
              // .captain-slide is excluded from the scroll-theme transition
              // shorthand in styles.css; without that exclusion the fade below
              // is overridden and the slides hard-cut.
              className={`captain-slide absolute inset-0 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === active
                  ? 'z-10 scale-100 opacity-100 transition-all duration-[1100ms]'
                  : 'z-0 scale-[1.04] opacity-0 transition-all delay-[1100ms] duration-0'
              }`}
            >
              {/* Blurred copy of the same file (one fetch, served from cache)
                  filling whatever the contained photo leaves over. */}
              <img
                src={photo.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
              />
              <span className="absolute inset-0 bg-ink/40" />

              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
            </div>
          ))}

          {/* Bottom scrim so the controls stay legible over any photo */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/75 to-transparent" />

          {/* Arrows — always on where there is no hover (touch), revealed on
              hover or keyboard focus on pointer devices */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 transition-opacity duration-300 focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
            {[
              { dir: -1, label: 'Previous photo', Icon: ChevronLeft },
              { dir: 1, label: 'Next photo', Icon: ChevronRight },
            ].map(({ dir, label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(dir)}
                aria-label={label}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 bg-ink/50 text-cream backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2.5">
            {PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${PHOTOS.length}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-7 bg-accent'
                    : 'w-1.5 bg-cream/45 hover:bg-cream/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MeetCaptainSection() {
  return (
    <section
      data-chapter="dark"
      className="theme-invert pop overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Left bio */}
        <div>
          <Eyebrow label="Your Guide" tone="light" />

          <h2 className="mt-6 font-display text-[clamp(2.75rem,5.4vw,4.8rem)] uppercase leading-[0.88] text-cream">
            <span className="block">Meet</span>
            <span className="flex flex-wrap items-baseline gap-x-[0.28em]">
              <span className="text-accent">Captain</span>
              <span>Ryan</span>
            </span>
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-cream/70">
            <p>
              With over 40 years of fishing experience across Oregon&apos;s
              waterways, Captain Ryan brings unparalleled expertise to every
              trip. A certified U.S. Coast Guard captain, first aid and CPR
              trained, safety is always first.
            </p>
            <p>
              His passion is matched only by his commitment to client
              satisfaction. Patient with beginners, invaluable to experienced
              anglers, and always invested in your success on the water.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <badge.icon className="h-5 w-5 text-accent" />
                <span className="text-[12px] font-medium tracking-[0.18em] text-cream/80">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            className="btn-primary group mt-10 inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Right tilted photo carousel */}
        <CaptainCarousel />
      </div>
    </section>
  )
}
