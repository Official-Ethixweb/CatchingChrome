import { useEffect, useState } from 'react'
import { SiteHeader } from './SiteHeader'
import { ArrowRight } from './icons'

const SLIDES = [
  '/nature-river.jpg',
  '/nature-forest.jpg',
  '/nature-mountain.jpg',
  '/nature-valley.jpg',
]

const CAPTAIN = '/rsw_1280h_1118.webp'

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
    <section className="relative h-screen min-h-[640px] w-full bg-ink">
      {/* Background slideshow */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Legibility overlay — darker on the left where the copy sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />

      <SiteHeader />

      {/* Content: copy on the left, Captain Ryan on the right */}
      <div className="absolute inset-0 z-10 flex items-center pb-16">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left copy — pulled downwards by 20% */}
          <div className="hero-fade max-w-2xl text-left translate-y-[20%]">
            <h1 className="font-display text-[clamp(2.2rem,4.9vw,4.6rem)] uppercase leading-[0.98] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
              Experience Oregon&apos;s Premier Fishing Adventures
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] md:text-lg">
              Expert-guided excursions on the Pacific Northwest&apos;s most
              pristine waters.
            </p>

            <a
              href="#"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink shadow-xl transition-all duration-200 hover:bg-cream"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Captain Ryan — pulled downwards by 20% and corners made pointy */}
          <div className="hero-fade hidden justify-self-end lg:block translate-y-[20%] z-30">
            <div className="relative w-[26rem] max-w-full">
              <img
                src={CAPTAIN}
                alt="Captain Ryan on the water"
                className="aspect-[4/5] w-full rounded-none object-cover object-center shadow-2xl ring-1 ring-white/20"
              />
              {/* Name badge */}
              <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-ink/70 px-5 py-2.5 backdrop-blur-sm">
                <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white">
                  Captain Ryan
                </div>
                <div className="text-[10px] tracking-[0.22em] text-accent">
                  USCG · 40+ YEARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved section — a wavy curve sweeping into the light section below */}
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1440 200"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[70px] w-full fill-paper md:h-[130px]"
      >
        <path d="M0,200 L0,150 C 360,190 1080,70 1440,130 L1440,200 Z" />
      </svg>

    </section>
  )
}
