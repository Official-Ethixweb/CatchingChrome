import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, QuoteIcon } from './icons'
import { Eyebrow } from './Eyebrow'
import {
  CURATED_REVIEWS,
  getGoogleReviews,
  type Review,
} from '~/lib/googleReviews'

const AUTOPLAY_MS = 3000

// Opens the Google Maps review dialog for the business listing.
const GOOGLE_REVIEW_URL =
  'https://www.google.com/maps/place//@45.4819691,-122.6543856,11z/data=!3m1!4b1!4m3!3m2!1s0x5e6214cf4e6cde5:0xfbf37ae5c8f3bd19!12e1?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D'

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 ${i < Math.round(rating) ? 'text-accent' : 'text-ink/15'}`}
          fill="currentColor"
        >
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </span>
  )
}

export function TestimonialsSection() {
  // Curated reviews render immediately (and on the server); live Google
  // reviews swap in once the Places API answers. See ~/lib/googleReviews.
  const [reviews, setReviews] = useState<Review[]>(CURATED_REVIEWS)
  const n = reviews.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef<number | null>(null)

  useEffect(() => {
    let alive = true
    getGoogleReviews()
      .then((live) => {
        if (alive && live?.length) {
          setReviews(live)
          setActive(0)
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n],
  )
  const goTo = useCallback((i: number) => setActive(((i % n) + n) % n), [n])

  // Auto-advance, paused on hover/focus and for reduced-motion users.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, n])

  // Lightweight swipe support for touch / trackpad drags.
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    dragStartX.current = null
  }

  return (
    <section className="theme-transition relative z-10 overflow-hidden bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Eyebrow label="Client Log" tone="dark" center />

        {/* Headline */}
        <h2 className="mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-ink">
          <span className="flex flex-wrap items-baseline justify-center gap-x-[0.22em]">
            <span>In Their</span>
            <span className="text-accent">own</span>
          </span>
          <span className="block">Words</span>
        </h2>

        {/* Supporting paragraph — why clients recommend us */}
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg md:leading-relaxed">
          Every entry tells the same story: Captain Ryan doesn&apos;t just take
          you fishing, he puts you on fish. First-timers or seasoned anglers,
          the verdict never changes.
        </p>
      </div>

      {/* Peek carousel */}
      <div
        className="relative mt-14 flex touch-pan-y select-none items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Stage */}
        <div className="relative h-[32rem] w-full max-w-6xl sm:h-[28rem]">
          {reviews.map((t, i) => {
            // signed distance from the active card, wrapped so the carousel loops
            let rel = i - active
            if (rel > n / 2) rel -= n
            if (rel < -n / 2) rel += n
            const abs = Math.abs(rel)
            const isCenter = rel === 0
            const isNeighbor = abs === 1

            return (
              <button
                type="button"
                key={`${t.author}-${i}`}
                aria-hidden={!isCenter}
                tabIndex={isCenter ? 0 : -1}
                onClick={() => !isCenter && goTo(i)}
                style={{
                  // Off-centre cards slide aside, drop back and tilt away, so the
                  // deck reads as depth rather than a flat filmstrip.
                  transform: `translate(-50%, -50%) translateX(${rel * 56}%) scale(${
                    isCenter ? 1 : 0.8
                  }) rotate(${isCenter ? 0 : rel > 0 ? 2.5 : -2.5}deg)`,
                  opacity: isCenter ? 1 : isNeighbor ? 0.5 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                  zIndex: 20 - abs,
                  pointerEvents: abs <= 1 ? 'auto' : 'none',
                  cursor: isCenter ? 'default' : 'pointer',
                }}
                className="review-card absolute left-1/2 top-1/2 w-[86%] max-w-2xl text-left will-change-transform motion-reduce:transition-none sm:w-[70%] md:w-[60%]"
              >
                <figure className="flex h-[30rem] flex-col items-center justify-center rounded-[2.5rem] bg-white px-6 py-9 text-center shadow-2xl sm:h-[26rem] md:px-12">
                  <QuoteIcon className="h-8 w-8 shrink-0 text-accent opacity-50" />
                  {/* Sized so the longest real review still fits without clipping. */}
                  <blockquote className="mt-4 text-[14px] font-medium leading-relaxed text-ink/90 sm:text-[15px] md:text-[1.1rem] md:leading-[1.7]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex flex-col items-center gap-3">
                    <Stars rating={t.rating} />
                    <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-ink/70">
                      {t.author}
                    </span>
                    {t.relativeTime && (
                      <span className="text-[11px] tracking-[0.08em] text-ink/70">
                        {t.relativeTime}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </button>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {reviews.map((_, i) => {
            const isActive = i === active
            return (
              <button
                type="button"
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={isActive}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  isActive ? 'w-7 bg-accent/25' : 'w-2 bg-ink/25 hover:bg-ink/40'
                }`}
              >
                {isActive && (
                  <span
                    key={paused ? 'paused' : active}
                    className={`absolute inset-0 rounded-full bg-accent ${
                      paused ? '' : 'dot-sweep'
                    }`}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Leave-a-review CTA */}
      <div className="mt-12 flex justify-center px-6">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.18em] text-ink transition-opacity duration-200 hover:opacity-85"
        >
          Leave a Review on Google
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
