import CurvedLogoLoop from './CurvedLogoLoop'

const PARTNERS = [
  '/catch zone.webp',
  '/talonRods.avif',
  '/logo-yakima-bait-company.png',
  '/fisherman marine and outdoor.png',
]

export function PartnersSection() {
  return (
    <section id="partners" className="bg-paper pt-8 pb-12 md:pt-10 md:pb-16 flex flex-col items-center">
      {/* Animating asset container */}
      <div className="relative w-full h-[70px] md:h-[130px] overflow-hidden">
        <CurvedLogoLoop
          logos={PARTNERS}
          speed={0.6}
          spacing={245}
        />
      </div>

      {/* Title below the logos */}
      <div className="flex flex-col items-center justify-center gap-1.5 select-none text-center px-4 mt-6 md:mt-8">
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-ink/50 uppercase">
          Our Partners
        </span>
        <h2 className="text-[13px] md:text-[16px] font-semibold tracking-[0.2em] text-primary uppercase">
          The Gear We Trust
        </h2>
      </div>
    </section>
  )
}
