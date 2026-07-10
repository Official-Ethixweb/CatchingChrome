import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, QuoteIcon } from './icons'

type Testimonial = {
  quote: string
  author: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"One of the best guides in Oregon. Ryan is your guy hands down. One of the best people I know."',
    author: 'KEEP_UPWITHJEN',
  },
  {
    quote:
      '"We hooked up early and caught our limits. My son lost three fish and was worried he\'d go home empty-handed. Ryan reassured us that at tide change we\'d get another chance. Ryan was right — Randy ended up catching the biggest fish, weighing in at 29 lb."',
    author: 'KATIE HEMINGWAY',
  },
  {
    quote:
      '"The perfect day on the water. Everything from the gear to the boat was top notch. Captain Ryan put us on the fish immediately and kept us there all day."',
    author: 'MARK TOMLINSON',
  },
  {
    quote:
      '"An unforgettable experience! If you want to catch big fish and have a great time doing it, Catching Chrome is the only way to go."',
    author: 'SARAH JENKINS',
  },
]

const AUTOPLAY_MS = 5000

export function TestimonialsSection() {
  const n = TESTIMONIALS.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef<number | null>(null)

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
    <section className="relative z-10 overflow-hidden bg-paper py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-semibold text-accent">08</span>
          <span className="h-px w-10 bg-ink/30" />
          <span className="text-[12px] font-medium tracking-[0.3em] text-ink/70">
            CLIENT LOG
          </span>
          <span className="h-px w-10 bg-ink/30" />
        </div>

        {/* Headline */}
        <h2 className="mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-ink">
          <span className="flex items-baseline justify-center gap-[0.22em]">
            <span>In Their</span>
            <span className="text-accent">own</span>
          </span>
          <span className="block">Words</span>
        </h2>

        {/* Supporting paragraph — why clients recommend us */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg md:leading-relaxed">
          Across every entry in the log, the same story surfaces: Captain Ryan
          doesn&apos;t just take you fishing, he puts you on fish. Guests come
          back season after season for his uncanny read of the tides, the
          top-notch boats and gear, and the calm, reassuring way he turns a slow
          morning into a 29-pound catch. From a first-timer&apos;s son to
          seasoned anglers, the verdict never changes. This is the crew the
          Pacific Northwest trusts on the water.
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
        <div className="relative h-[24rem] w-full max-w-6xl sm:h-[22rem]">
          {TESTIMONIALS.map((t, i) => {
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
                key={i}
                aria-hidden={!isCenter}
                tabIndex={isCenter ? 0 : -1}
                onClick={() => !isCenter && goTo(i)}
                style={{
                  transform: `translate(-50%, -50%) translateX(${rel * 58}%) scale(${
                    isCenter ? 1 : 0.82
                  })`,
                  opacity: isCenter ? 1 : isNeighbor ? 0.45 : 0,
                  zIndex: 20 - abs,
                  pointerEvents: abs <= 1 ? 'auto' : 'none',
                  cursor: isCenter ? 'default' : 'pointer',
                }}
                className="absolute left-1/2 top-1/2 w-[86%] max-w-2xl text-left transition-[transform,opacity,filter] duration-700 ease-out will-change-transform motion-reduce:transition-none sm:w-[70%] md:w-[60%]"
              >
                <figure className="flex h-[22rem] flex-col items-center justify-center rounded-[2.5rem] bg-white px-6 py-10 text-center shadow-2xl sm:h-[20rem] md:px-12">
                  <QuoteIcon className="h-10 w-10 shrink-0 text-accent opacity-50" />
                  <blockquote className="mt-6 overflow-hidden text-lg font-medium leading-relaxed text-ink/90 md:text-[1.45rem] md:leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-accent" />
                    <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-ink/70">
                      {t.author}
                    </span>
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
          {TESTIMONIALS.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-7 bg-accent'
                  : 'w-2 bg-ink/25 hover:bg-ink/40'
              }`}
            />
          ))}
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
    </section>
  )
}
