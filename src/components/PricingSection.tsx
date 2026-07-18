import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, PhoneIcon } from './icons'
import { Eyebrow } from './Eyebrow'

type PricingItem = {
  name: string
  price: string
  subtext: string
  isCallForPricing?: boolean
}

const PRICING_ITEMS: PricingItem[] = [
  {
    name: 'Salmon Trips',
    price: 'Full Day $250 / Half Day $150',
    subtext: 'Targeting hard-fighting Chinook and Coho on the Columbia and coastal rivers.',
  },
  {
    name: 'Steelhead Trips',
    price: '$250 / person',
    subtext: 'Chasing legendary winter and summer runs with light tackle or fly rods.',
  },
  {
    name: 'Sturgeon Trips',
    price: '$250 / person',
    subtext: 'Battling the prehistoric heavyweights of the Columbia, the hardest pull in the river.',
  },
  {
    name: 'Crab Trips',
    price: 'From $150 / person',
    subtext: 'Ocean-fresh Dungeness off the Oregon coast. Pots, bait and gear all handled for you.',
  },
  {
    name: 'Shad Trips',
    price: 'Call for pricing',
    subtext: 'Non-stop light gear action, and the perfect first trip for kids.',
    isCallForPricing: true,
  },
  {
    name: 'Booking Deposit',
    price: '$50 / person',
    subtext: 'Required to reserve your date. Remaining balance settled on the day of the trip.',
  },
]

function PricingRow({ item, index }: { item: PricingItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(200)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Rod tip coordinates
  const rodX = 28
  const rodY = isHovered ? 22 : 16 // Bends down slightly on hover (adjusted 8px to align with rod tip SVG absolute offset)

  // Hook loop coordinates
  const hookX = width - 12
  const hookY = isHovered ? 21 : 16 // Bobs down on hover

  // Slack curve vs Straight line
  const pathD = isHovered
    ? `M ${rodX} ${rodY} L ${hookX} ${hookY}` // Taut straight line
    : `M ${rodX} ${rodY} Q ${rodX + (hookX - rodX) * 0.45} ${rodY + 28} ${hookX} ${hookY}` // Curved slack line

  return (
    <div
      className="group flex flex-col justify-between py-6 border-b border-cream/10 md:flex-row md:items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Service info */}
      <div className="md:max-w-[35%] shrink-0">
        <h3 className="font-display text-xl uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-accent md:text-2xl">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm text-cream/70 leading-relaxed">
          {item.subtext}
        </p>
      </div>

      {/* Middle: Fishing rod & string (desktop/tablet only) */}
      <div
        ref={containerRef}
        className="hidden md:block flex-1 relative h-12 mx-6 overflow-visible"
      >
        {/* Rod SVG */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          className="absolute left-0 bottom-1 pointer-events-none"
        >
          {/* Cork Handle */}
          <path d="M 3 33 L 10 26" stroke="#C4A484" strokeWidth="4.5" strokeLinecap="round" />
          {/* Reel */}
          <circle cx="9" cy="27" r="4.5" fill="#7F8C8D" stroke="#0E2A3B" strokeWidth="1.5" />
          <circle cx="9" cy="27" r="2" fill="#BDC3C7" />
          {/* Rod Blank - bends dynamically! */}
          <path
            d={isHovered ? "M 9 27 Q 20 22 28 14" : "M 9 27 L 28 8"}
            stroke="#BDC3C7"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Guides */}
          <circle cx="16" cy="20" r="1.5" stroke="#00CCCC" strokeWidth="1" />
          <circle cx="22" cy="14" r="1" stroke="#00CCCC" strokeWidth="1" />
        </svg>

        {/* Fishing Line (SVG path) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <path
            d={pathD}
            stroke={isHovered ? "#00CCCC" : "#B9C4CC"}
            strokeWidth={isHovered ? "1.8" : "1"}
            fill="none"
            className="transition-all duration-300"
            strokeDasharray={isHovered ? "none" : "2 2"}
          />
        </svg>

        {/* Hook/Lure SVG */}
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{
            position: 'absolute',
            left: `${width - 20}px`,
            top: `${hookY - 3}px`,
          }}
          className="pointer-events-none transition-all duration-300 text-cream/70 group-hover:text-accent"
        >
          {/* Eyelet */}
          <circle cx="8" cy="3" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          {/* Shank & Bend */}
          <path
            d="M 8 5.5 V 17 C 8 20.5 5 22.5 2 20.5 C 0.5 19.5 0 17.5 0 16.5 L 1.8 15.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tiny Red Lure Bead (visual interest!) */}
          <circle cx="8" cy="9" r="2" fill="#E74C3C" className="group-hover:fill-accent" />
        </svg>
      </div>

      {/* Right: Price */}
      <div className="mt-4 md:mt-0 shrink-0 text-left md:text-right">
        {item.isCallForPricing ? (
          <a
            href="tel:5039369090"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-5 py-2 text-[14px] font-bold tracking-wider text-accent transition-all duration-300 hover:bg-accent hover:text-ink"
          >
            <PhoneIcon className="h-4 w-4" />
            {item.price}
          </a>
        ) : (
          <div className="font-display text-xl text-accent transition-all duration-300 group-hover:scale-105 md:text-2xl">
            {item.price}
          </div>
        )}
      </div>
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-ink py-24 md:py-28">

      {/* Decorative background grid/lines */}
      <div className="hero-lines absolute inset-0 pointer-events-none opacity-40" />

      {/* Glow effects */}
      <div className="absolute -left-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-64 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="Pricing Options" tone="light" />

        {/* Heading */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.75rem,6vw,5.2rem)] uppercase leading-[0.9] text-cream">
            <span className="block">Fair Rates,</span>
            <span className="block leading-[0.9] text-accent">No Hidden Fees</span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-cream/70 lg:mb-2">
            Choose your next Pacific Northwest adventure. All gear, bait, and clean-up are fully covered.
          </p>
        </div>

        {/* Main Grid content */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
          {/* Main Pricing List: 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-2">
            {PRICING_ITEMS.map((item, idx) => (
              <PricingRow key={item.name} item={item} index={idx} />
            ))}
          </div>

          {/* Info Card: 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="relative rounded-sm border border-cream/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-3 rounded-full bg-accent px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                Booking Info
              </div>

              <h3 className="font-display text-lg uppercase tracking-wide text-cream">
                Trip Policies
              </h3>
              
              <div className="mt-6 space-y-6 text-sm leading-relaxed text-cream/70">
                <div>
                  <h4 className="font-semibold text-accent uppercase tracking-wider text-[11px]">
                    Deposit & Payment
                  </h4>
                  <p className="mt-2 text-cream/70 leading-relaxed">
                    A $50 deposit per person is required to secure your booking date. The remaining balance is due on the day of your trip.
                  </p>
                </div>

                <div className="h-px bg-cream/10" />

                <div>
                  <h4 className="font-semibold text-accent uppercase tracking-wider text-[11px]">
                    Cancelation Policy
                  </h4>
                  <p className="mt-2 text-cream/70 leading-relaxed">
                    Cancel 14+ days in advance for a full refund or to reschedule. Cancellations made within 14 days forfeit the deposit.
                  </p>
                </div>

                <div className="h-px bg-cream/10" />

                <div>
                  <h4 className="font-semibold text-accent uppercase tracking-wider text-[11px]">
                    Captain's Guarantee
                  </h4>
                  <p className="mt-2 text-cream/70 leading-relaxed">
                    If the captain has to cancel due to weather, river safety conditions, or unforeseen events, you receive a full refund or rescheduling options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section under the prices */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-sm border border-cream/5 bg-white/[0.01] p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h4 className="font-display text-xl uppercase text-cream">Ready to lock in your dates?</h4>
            <p className="mt-1 text-sm text-cream/70">Calendar fills up fast during peak salmon and steelhead runs.</p>
          </div>
          <a
            href="tel:5039369090"
            className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book Your Trip Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
