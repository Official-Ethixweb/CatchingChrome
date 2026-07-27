import { useEffect, useState } from 'react'
import { SiteHeader } from './SiteHeader'
import { WaveDivider } from './WaveDivider'
import { ArrowRight } from './icons'

const SLIDES = [
  '/nature-river.webp',
  '/nature-forest.webp',
  '/nature-mountain.webp',
  '/nature-valley.webp',
]

export function Hero() {
  const [active, setActive] = useState(0)
  // Only the first slide loads with the page — it's the LCP. The rest are
  // mounted after first paint so they don't compete for bandwidth on slow
  // connections (this was pulling ~2.3MB of JPGs before the hero could show).
  const [loadRest, setLoadRest] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const warm = setTimeout(() => setLoadRest(true), 1500)
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length)
    }, 5500)
    return () => {
      clearTimeout(warm)
      clearInterval(id)
    }
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      {/* Background slideshow */}
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES.map((src, i) => {
          // Defer every slide after the first until the hero has painted.
          if (i > 0 && !loadRest) return null
          return (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1280}
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={`hero-kenburns absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1600ms] ease-in-out ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        })}
      </div>

      {/* Legibility overlay — even weight now the copy is centred */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/55 to-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/25" />

      <SiteHeader />

      {/* Content: centred headline + CTA (the lead form that used to sit on the
          right was removed on request; the hero now drives to the contact page). */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-6 pb-16 pt-28 md:px-10 md:pt-32">
        <div className="hero-fade mx-auto max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.8rem)] uppercase leading-[0.98] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
            Experience Oregon&apos;s Premier Fishing Adventures
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:text-lg">
            Expert-guided excursions on the Pacific Northwest&apos;s most
            pristine waters.
          </p>

          {/* Trust chips */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {['USCG Certified', '40+ Years Experience', 'Gear Included'].map(
              (chip) => (
                <div key={chip} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/75">
                    {chip}
                  </span>
                </div>
              ),
            )}
          </div>

          <a
            href="/contact"
            className="btn-primary group mt-9 inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] shadow-xl"
          >
            Book Now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Sweeps into PartnersSection, which is bg-cream. It filled with `paper`
          until now — a frost-blue left over from when that token was still a
          section background, which drew a faint blue band across the seam. */}
      <WaveDivider fill="fill-cream" />
    </section>
  )
}
