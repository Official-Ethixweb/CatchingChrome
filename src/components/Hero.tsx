import { useEffect, useState } from 'react'
import { SiteHeader } from './SiteHeader'
import { ArrowUpRight } from './icons'

const SLIDES = [
  '/nature-river.jpg',
  '/nature-forest.jpg',
  '/nature-mountain.jpg',
  '/nature-valley.jpg',
]

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`hero-kenburns absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/85" />

      <SiteHeader />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-fade">
          <h1 className="mx-auto max-w-5xl font-display text-[clamp(2.4rem,6.4vw,5.6rem)] uppercase leading-[0.98] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
            Experience Oregon&apos;s Premier Fishing Adventures
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            Expert-guided excursions on the Pacific Northwest&apos;s most
            pristine waters.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg transition-all duration-200 hover:brightness-110"
            >
              Book Now
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-white/60 bg-white/10 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
            >
              Explore Trips
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
