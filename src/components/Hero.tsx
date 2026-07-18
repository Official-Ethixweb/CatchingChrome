import { useEffect, useState } from 'react'
import { SiteHeader } from './SiteHeader'
import { WaveDivider } from './WaveDivider'
import { ArrowRight } from './icons'

const SLIDES = [
  '/nature-river.jpg',
  '/nature-forest.jpg',
  '/nature-mountain.jpg',
  '/nature-valley.jpg',
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
    <section className="relative h-screen min-h-[640px] w-full bg-ink">
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

      {/* Legibility overlay — evenly weighted now that the copy is centred */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/55 to-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />

      <SiteHeader />

      {/* Content: centred copy */}
      <div className="absolute inset-0 z-10 flex items-center pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <div className="hero-fade mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="font-display text-[clamp(2.2rem,4.9vw,4.6rem)] uppercase leading-[0.98] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
              Experience Oregon&apos;s Premier Fishing Adventures
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:text-lg">
              Expert-guided excursions on the Pacific Northwest&apos;s most
              pristine waters.
            </p>

            <a
              href="/contact"
              className="btn-primary group mt-9 inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] shadow-xl"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Sweeps into PartnersSection, which is bg-cream. It filled with `paper`
          until now — a frost-blue left over from when that token was still a
          section background, which drew a faint blue band across the seam. */}
      <WaveDivider fill="fill-cream" />
    </section>
  )
}
