import { ArrowUpRight } from './icons'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

/**
 * Dedicated Dungeness crab section. Crab used to be folded into the Signature
 * Trips grid and the "Shad & Crabbing" pricing row; it now stands on its own
 * with its own photos and its own "from $150" price.
 */
export function CrabTripsSection() {
  return (
    <section
      id="crab"
      className="theme-transition pop overflow-hidden bg-cream py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <Reveal>
          <Eyebrow label="Crab Trips" tone="dark" />

          <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Dungeness</span>
            <span className="block text-accent">by the pot</span>
          </h2>

          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink/55">
            Drop the pots, pull them back loaded, and take home ocean-fresh
            Dungeness. It is hands-on, easy to pick up, and one of the best days
            on the water for families and first timers.
          </p>

          {/* Price */}
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-ink/45">
              From
            </span>
            <span className="font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-ink">
              $150
            </span>
            <span className="text-[14px] text-ink/50">per person</span>
          </div>

          <ul className="mt-7 flex flex-col gap-2.5 text-[15px] text-ink/60">
            {[
              'Pots, bait, gear and licence handled for you',
              'Great for kids and first time crabbers',
              'Cleaned and bagged before you head home',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>

          <a
            href="/contact"
            className="btn-primary group mt-9 inline-flex items-center gap-2.5 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book a Crab Trip
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        {/* Photo collage */}
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-2xl shadow-ink/20">
              <img
                src="/crabpots.jpg"
                alt="Two anglers hauling Dungeness crab aboard next to the crab pots"
                width={1440}
                height={1080}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* Overlapping vertical shot — hidden on the narrowest screens so it
                never crowds the main photo. */}
            <div className="absolute -bottom-8 -left-6 hidden w-[38%] overflow-hidden rounded-2xl border-4 border-cream shadow-xl shadow-ink/25 sm:block">
              <img
                src="/crabcatch.jpg"
                alt="A cooler filled with fresh Dungeness crab"
                width={898}
                height={1599}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
