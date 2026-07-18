import { useEffect, useState } from 'react'
import CurvedLogoLoop from './CurvedLogoLoop'

const PARTNERS = [
  '/catch zone.webp',
  '/talonRods.avif',
  '/logo-yakima-bait-company.png',
  '/fisherman marine and outdoor.png',
]

/**
 * Phone + tablet view: one partner logo at a time, shown large and
 * crossfading/scaling smoothly into the next every 2.5s. Replaces the curved
 * marquee below lg, where a row of tiny logos on a wave reads as clutter.
 * Reduced-motion holds on the first logo.
 */
function PartnerRotator() {
  const [i, setI] = useState(0)
  const [visible, setVisible] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof matchMedia === 'undefined') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) return

    let timeoutId: ReturnType<typeof setTimeout>
    const intervalId = setInterval(() => {
      setVisible(false)
      timeoutId = setTimeout(() => {
        setI((prev) => (prev + 1) % PARTNERS.length)
        setVisible(true)
      }, 500) // matches transition duration (500ms)
    }, 3000) // 2.5s display + 0.5s transition

    return () => {
      clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [reduced])

  return (
    <div className="relative flex h-[96px] w-full items-center justify-center overflow-hidden sm:h-[120px]">
      {PARTNERS.map((logo, idx) => {
        const isCatchZone = logo.includes('catch zone')
        const active = idx === i
        return (
          <img
            key={logo}
            src={logo}
            alt="Partner logo"
            aria-hidden={!active}
            className={`absolute max-h-[58px] w-auto max-w-[72%] object-contain transition-all duration-500 ease-in-out sm:max-h-[80px] ${
              active && visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={isCatchZone ? { filter: 'brightness(0)' } : undefined}
          />
        )
      })}
    </div>
  )
}

export function PartnersSection() {
  return (
    <section
      id="partners"
      className="flex flex-col items-center bg-cream pt-8 pb-12 md:pt-10 md:pb-16"
    >
      {/* Desktop: curved logo loop riding the hero wave */}
      <div className="relative hidden h-[70px] w-full overflow-hidden md:h-[130px] lg:block">
        <CurvedLogoLoop logos={PARTNERS} speed={0.6} spacing={245} />
      </div>

      {/* Phone + tablet: one bigger logo at a time */}
      <div className="w-full lg:hidden">
        <PartnerRotator />
      </div>

      {/* Title below the logos */}
      <div className="mt-6 flex select-none flex-col items-center justify-center gap-1.5 px-4 text-center md:mt-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/70 md:text-[11px]">
          Our Partners
        </span>
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-primary md:text-[16px]">
          The Gear We Trust
        </h2>
      </div>
    </section>
  )
}
