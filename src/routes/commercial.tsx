import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { WaveDivider } from '~/components/WaveDivider'
import { Eyebrow } from '~/components/Eyebrow'
import {
  AnchorIcon,
  ArrowUpRight,
  AwardIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '~/components/icons'

export const Route = createFileRoute('/commercial')({
  component: CommercialPage,
  head: () => ({
    meta: [
      { title: 'Commercial & Corporate Charters | Catching Chrome' },
      {
        name: 'description',
        content:
          'Multi-boat corporate and group fishing charters on Oregon rivers. Team outings, client entertaining and large private parties, run end to end by Captain Ryan.',
      },
    ],
  }),
})

const OFFERINGS = [
  {
    icon: UsersIcon,
    title: 'Team Outings',
    body: 'Get the whole department on the water. We run multiple boats side by side so the group fishes together and shares the same day, not separate trips.',
  },
  {
    icon: AwardIcon,
    title: 'Client Entertaining',
    body: 'A guided day on the Columbia beats a conference room. Rods, tackle and coaching are handled, so your guests can focus on the fishing and the conversation.',
  },
  {
    icon: AnchorIcon,
    title: 'Large Private Parties',
    body: 'Reunions, bachelor parties and milestone birthdays. Tell us the headcount and the date, and we will build the fleet around it.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Fully Licensed & Insured',
    body: 'USCG-licensed captains, first aid and CPR trained, with all safety equipment aboard. Certificates of insurance available on request for corporate bookings.',
  },
]

const INCLUDED = [
  'Multiple guided boats running as one group',
  'All rods, reels, tackle and bait',
  'Licensed, insured USCG captains on every vessel',
  'Fish filleting, cleaning and packing',
  'Flexible launch points across Oregon rivers',
  'Invoicing and COI paperwork for company bookings',
]

const STEPS = [
  {
    step: '01',
    title: 'Tell us the group',
    body: 'Headcount, target dates and what the day is for. Six anglers or sixty, that first note is all we need.',
  },
  {
    step: '02',
    title: 'We build the fleet',
    body: 'Ryan assembles the right number of boats and guides, picks the river running best on your dates, and sends a written quote.',
  },
  {
    step: '03',
    title: 'Everyone fishes',
    body: 'You show up. We handle gear, safety, coaching and the catch. Your group leaves with fish in the cooler.',
  },
]

function CommercialHeader() {
  return (
    <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/nature-river.webp"
          alt="Guide boats on an Oregon river"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink" />
      </div>

      <SiteHeader />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
          Commercial
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70 sm:text-[12px]">
            Corporate &amp; Group Charters
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>

      <WaveDivider fill="fill-cream" />
    </section>
  )
}

function CommercialPage() {
  return (
    <>
      <CommercialHeader />

      <main>
        {/* Intro */}
        <section className="theme-transition pop bg-cream py-24 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Eyebrow label="For Companies & Groups" tone="dark" />

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] uppercase leading-[0.9] text-ink">
                <span className="block">Bigger Boats,</span>
                <span className="block text-accent">bigger groups</span>
              </h2>

              <p className="max-w-md text-[17px] leading-relaxed text-ink/70 lg:mb-3">
                Most guide services cap you at a single boat. We scale the trip
                to the group, running a coordinated fleet so your whole company
                fishes the same water on the same day.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {OFFERINGS.map((item) => (
                <article
                  key={item.title}
                  className="card-glow group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-7"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section
          data-chapter="dark"
          className="theme-invert pop overflow-hidden bg-ink py-24 md:py-28"
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <Eyebrow label="What's Included" tone="light" />
              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
                <span className="block">One Invoice,</span>
                <span className="block text-accent">everything handled</span>
              </h2>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-cream/70">
                Every commercial booking is quoted per person with the whole day
                covered. No per-boat surprises, no gear rental line items.
              </p>

              <a
                href="/contact"
                className="btn-primary group mt-10 inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                Request a Group Quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <ul className="flex flex-col justify-center gap-4">
              {INCLUDED.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-4 border-b border-cream/10 pb-4 text-[15.5px] leading-relaxed text-cream/70 last:border-b-0"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="theme-transition pop bg-cream py-24 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Eyebrow label="How It Works" tone="dark" center />

            <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-ink">
              Three Steps To The Water
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((s) => (
                <article
                  key={s.step}
                  className="flex flex-col rounded-2xl border border-ink/10 bg-white p-8 md:p-6 lg:p-8"
                >
                  <span className="font-display text-5xl leading-none text-accent">
                    {s.step}
                  </span>
                  <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <a
                href="/contact"
                className="btn-outline group inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em]"
              >
                Start Planning Your Trip
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
