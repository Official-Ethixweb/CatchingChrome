import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { WaveDivider } from '~/components/WaveDivider'
import { SignatureTripsSection } from '~/components/SignatureTripsSection'

export const Route = createFileRoute('/excursions')({
  component: ExcursionsPage,
})

function ExcursionsHeader() {
  return (
    <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      {/* Background image matching the boat view backdrop */}
      <div className="absolute inset-0">
        <img
          src="/nature-river.jpg"
          alt="River boat view backdrop"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink" />
      </div>

      <SiteHeader />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          Excursions
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase">
            Signature Guided Trips
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>

      {/* This page's first section is SignatureTrips overridden to bg-white,
          not the cream the other pages use — hence fill-white here. */}
      <WaveDivider fill="fill-white" />
    </section>
  )
}

function ExcursionsPage() {
  return (
    <>
      <ExcursionsHeader />
      <main>
        <SignatureTripsSection className="bg-white" />
      </main>
      <SiteFooter />
    </>
  )
}
