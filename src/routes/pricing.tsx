import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { PricingSection } from '~/components/PricingSection'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
})

function PricingHeader() {
  return (
    <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      {/* Background image matching the nature/river aesthetic */}
      <div className="absolute inset-0">
        <img
          src="/nature-river.webp"
          alt="River background"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" />
      </div>

      <SiteHeader />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          Pricing
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase">
            Guided Trips & Rates
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>
    </section>
  )
}

function PricingPage() {
  return (
    <>
      <PricingHeader />
      <main>
        <PricingSection />
      </main>
      <SiteFooter />
    </>
  )
}
