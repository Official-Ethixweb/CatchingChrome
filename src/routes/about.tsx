import { createFileRoute, Link } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { MeetCaptainSection } from '~/components/MeetCaptainSection'
import { Eyebrow } from '~/components/Eyebrow'
import { Reveal, CountUp } from '~/components/Reveal'
import { FishGlyph, type FishShape } from '~/components/FishArt'
import {
  ArrowRight,
  ArrowUpRight,
  FishIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '~/components/icons'
import { useEffect, useRef, useState } from 'react'
import type { ComponentType, SVGProps } from 'react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Catching Chrome Guide Service' },
      {
        name: 'description',
        content:
          "The story behind Catching Chrome: forty-plus years chasing chrome-bright salmon and steelhead across Oregon's rivers with Captain Ryan.",
      },
      { property: 'og:title', content: 'About Catching Chrome' },
      {
        property: 'og:description',
        content:
          "The story, the guide, and the obsession behind Oregon's chrome-chasing guide service.",
      },
    ],
  }),
  component: AboutPage,
})

/* --------------------------- Decorative drift --------------------------- */

type Drifter = {
  shape: FishShape
  className: string
  duration: string
  delay: string
}

/** A layer of faint, slowly drifting fish silhouettes for dark bands. */
function FishDrift({ drifters }: { drifters: Drifter[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {drifters.map((d, i) => (
        <div
          key={i}
          className={`fish-drift absolute ${d.className}`}
          style={{ animationDuration: d.duration, animationDelay: d.delay }}
        >
          <FishGlyph shape={d.shape} className="h-full w-full" />
        </div>
      ))}
    </div>
  )
}

/* -------------------------------- Hero ---------------------------------- */

function AboutHero() {
  return (
    <section className="relative flex min-h-[88vh] w-full flex-col overflow-hidden bg-ink">
      {/* Background image + gradients */}
      <div className="absolute inset-0">
        <img
          src="/nature-river.jpg"
          alt="Fog lifting off an Oregon river at dawn"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
        <div className="hero-lines absolute inset-0 opacity-70" />
      </div>

      {/* Drifting chrome */}
      <FishDrift
        drifters={[
          {
            shape: 'salmon',
            className: 'left-[6%] top-[30%] h-24 w-48 text-cream/[0.06]',
            duration: '17s',
            delay: '0s',
          },
          {
            shape: 'trout',
            className: 'right-[8%] top-[24%] h-20 w-40 text-cream/[0.05]',
            duration: '21s',
            delay: '1.5s',
          },
          {
            shape: 'sturgeon',
            className: 'left-[18%] bottom-[16%] h-16 w-56 text-cream/[0.04]',
            duration: '24s',
            delay: '0.8s',
          },
        ]}
      />

      <SiteHeader />

      {/* Centered content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <Reveal>
          <Eyebrow label="About Catching Chrome" tone="light" center />
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,6rem)] uppercase leading-[0.9] text-cream">
            <span className="block">The Pursuit</span>
            <span className="block">
              of <span className="chrome-text">Chrome</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-cream/65">
            Four decades of Oregon river knowledge, one relentless obsession,
            putting you on the brightest, hardest-fighting fish of the run.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary group inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]"
            >
              Book a Trip
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#captain"
              className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-cream/5 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-colors duration-200 hover:bg-cream/15"
            >
              Meet the Captain
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- Story ---------------------------------- */

function StorySection() {
  return (
    <section className="theme-transition bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow label="Our Story" tone="dark" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.4vw,3.8rem)] uppercase leading-[0.92] text-ink">
              <span className="block">Born on the</span>
              <span className="block text-accent">river</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-ink/70">
              <p>
                Catching Chrome started the way most good things on the water do,
                with a kid, a rod, and a river that wouldn&apos;t let go.
                Growing up on Oregon&apos;s banks, Captain Ryan spent forty-plus
                years learning how these waters breathe: where the fish hold,
                how the runs time out, and what it takes to turn a tough day into
                a memorable one.
              </p>
              <p>
                That obsession became a guide service built on one promise, an
                honest shot at the brightest fish of the year, guided personally,
                every single trip.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              to="/excursions"
              className="btn-outline group mt-10 inline-flex items-center gap-3 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.18em]"
            >
              See Our Excursions
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Photo + floating badge */}
        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] w-[88%] overflow-hidden rounded-2xl border border-ink/10 shadow-2xl shadow-ink/20">
            <img
              src="/20240831_124653-1488x1536.jpg"
              alt="Guests aboard with a limit of Columbia River salmon"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-6 right-0 rounded-2xl border border-ink/10 bg-cream px-7 py-5 text-center shadow-xl shadow-ink/15">
            <div className="font-display text-4xl leading-none text-accent">
              40+
            </div>
            <div className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-ink/70">
              Years Guiding
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------- Chrome explainer --------------------------- */

function ChromeSection() {
  return (
    <section
      data-chapter="dark"
      className="theme-invert relative overflow-hidden bg-ink py-28 md:py-36"
    >
      <FishDrift
        drifters={[
          {
            shape: 'salmon',
            className: 'left-[-4%] top-[18%] h-28 w-72 text-primary/[0.10]',
            duration: '20s',
            delay: '0s',
          },
          {
            shape: 'salmon',
            className:
              'right-[-3%] bottom-[14%] h-24 w-64 text-accent/[0.08] scale-x-[-1]',
            duration: '26s',
            delay: '1.2s',
          },
        ]}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <Eyebrow label="The Idea" tone="light" center />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-[clamp(2rem,4.2vw,3.4rem)] uppercase leading-[1.05] text-cream">
            <span className="chrome-text">Chrome</span> is a fish fresh from the
            salt.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-cream/70">
            mirror-bright, sea-lice still on, and full of ocean fight. Landing
            one is the whole point. That chase, chinook, coho, and steelhead
            straight off the tide, is what we named ourselves after, and what we
            put you on.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- Stats ---------------------------------- */

const STATS: {
  target: number
  prefix?: string
  suffix?: string
  label: string
}[] = [
  { target: 40, suffix: '+', label: 'Years on the Water' },
  { target: 10000, suffix: '+', label: 'Fish Landed' },
  { target: 5000, suffix: '+', label: 'Anglers Guided' },
  { target: 100, suffix: '%', label: 'USCG Certified' },
]

function StatsBand() {
  return (
    <section
      data-chapter="dark"
      className="theme-invert bg-ink py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-6 md:px-10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="border-l border-cream/15 px-4 first:border-l-0 sm:px-6 lg:px-8"
          >
            {/* Sized against "10,000+", the longest value, in the narrowest
                cell it ever gets: the four-up row at exactly 1024, where each
                column is ~167px wide. Both the floor and the slope have to
                clear it, or the number sets wider than the column it sits in. */}
            <div className="font-display text-[clamp(1.6rem,3.5vw,3.6rem)] leading-none text-accent">
              <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[12px] font-medium uppercase tracking-[0.2em] text-cream/70">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- Values --------------------------------- */

const VALUES: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  body: string
}[] = [
  {
    icon: FishIcon,
    title: 'Chrome-Bright Obsession',
    body: "We live for that first mirror-flash of a sea-bright fish. It's why we push off the ramp before the sun does.",
  },
  {
    icon: MapPinIcon,
    title: 'Four Decades of Local Water',
    body: "Forty-plus years reading Oregon's rivers, we know where fish hold in every tide, flow, and season.",
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety, Always First',
    body: 'USCG-licensed, first-aid and CPR trained, with top-maintained boats so you can focus on the fight.',
  },
  {
    icon: UsersIcon,
    title: 'Every Angler Welcome',
    body: 'Patient with first-timers, dialed-in for veterans. Kids, families, and bucket-listers all leave with a story.',
  },
]

function ValuesSection() {
  return (
    <section className="theme-transition bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <Eyebrow label="What Sets Us Apart" tone="dark" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,4.6vw,4rem)] uppercase leading-[0.92] text-ink">
            <span className="block">The Catching Chrome</span>
            <span className="block text-accent">difference</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <article className="card-glow group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-display text-xl uppercase leading-tight text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/70">
                  {v.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Journey --------------------------------- */

const JOURNEY: { phase: string; title: string; body: string }[] = [
  {
    phase: 'Phase 01',
    title: 'The First Cast',
    body: "Ryan grew up on Oregon's banks, learning the rivers one drift at a time, long before any of it was a business.",
  },
  {
    phase: 'Phase 02',
    title: 'Going Pro',
    body: 'Decades of hard-won knowledge turned into a USCG captain’s license and a commitment to guiding the right way.',
  },
  {
    phase: 'Phase 03',
    title: 'Catching Chrome',
    body: 'The guide service was born from one focus: putting clients on chrome-bright kings and steelhead, trip after trip.',
  },
  {
    phase: 'Phase 04',
    title: 'The Next Run',
    body: 'Today we chase runs across the Columbia, Willamette, and coastal tributaries, and protect them for the runs to come.',
  },
]

function JourneySection() {
  const spineRef = useRef<HTMLSpanElement>(null)
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([])
  // Height (px) of the gold progress line, and which nodes it has reached.
  const [fill, setFill] = useState(0)
  const [active, setActive] = useState<boolean[]>(() =>
    JOURNEY.map(() => false),
  )

  useEffect(() => {
    const spine = spineRef.current
    if (!spine) return

    // Reduced motion: show the completed timeline, no scroll linkage.
    if (
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setFill(spine.offsetHeight)
      setActive(JOURNEY.map(() => true))
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = spine.getBoundingClientRect()
      // The line fills down to a trigger line ~55% down the viewport.
      const trigger = window.innerHeight * 0.55
      setFill(Math.max(0, Math.min(rect.height, trigger - rect.top)))
      setActive(
        nodeRefs.current.map((n) => {
          if (!n) return false
          const nr = n.getBoundingClientRect()
          return nr.top + nr.height / 2 <= trigger
        }),
      )
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="theme-transition bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal className="text-center">
          <Eyebrow label="Our Journey" tone="dark" center />
        </Reveal>
        <Reveal delay={0.06} className="text-center">
          <h2 className="mx-auto mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.92] text-ink">
            From one river to a<span className="text-accent"> lifetime</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* Spine track (faint) */}
          <span
            ref={spineRef}
            aria-hidden="true"
            className="absolute left-[15px] top-2 bottom-2 w-[2px] -translate-x-1/2 bg-ink/15 md:left-1/2"
          />
          {/* Gold progress line that fills as you scroll */}
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-2 w-[2px] -translate-x-1/2 bg-accent md:left-1/2"
            style={{ height: `${fill}px` }}
          />
          <div className="space-y-10 md:space-y-0">
            {JOURNEY.map((m, i) => {
              const left = i % 2 === 0
              const on = active[i]
              return (
                <Reveal
                  key={m.phase}
                  className={`relative flex md:min-h-[9rem] md:items-center ${
                    left ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Node — highlights once the line reaches it */}
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el
                    }}
                    aria-hidden="true"
                    className={`absolute left-[15px] top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent transition-all duration-500 md:left-1/2 md:top-1/2 md:-translate-y-1/2 ${
                      on
                        ? 'scale-125 bg-accent shadow-[0_0_0_5px_rgba(245,166,35,0.18)]'
                        : 'scale-100 bg-cream'
                    }`}
                  />
                  <div
                    className={`pl-10 md:w-[46%] md:pl-0 ${
                      left ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div
                      className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${
                        on ? 'text-accent' : 'text-accent/45'
                      }`}
                    >
                      {m.phase}
                    </div>
                    <h3 className="mt-2 font-display text-2xl uppercase leading-none text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- CTA ----------------------------------- */

function CtaBand() {
  return (
    <section className="hero-gradient relative overflow-hidden py-24 md:py-28">
      <FishDrift
        drifters={[
          {
            shape: 'trout',
            className: 'left-[-2%] top-[22%] h-24 w-56 text-cream/[0.07]',
            duration: '19s',
            delay: '0s',
          },
          {
            shape: 'salmon',
            className:
              'right-[-2%] bottom-[18%] h-24 w-60 text-cream/[0.06] scale-x-[-1]',
            duration: '23s',
            delay: '1s',
          },
        ]}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] uppercase leading-[0.92] text-cream">
            Ready to chase <span className="chrome-text">chrome?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-cream/70">
            Dates go fast when the runs are on. Lock in your spot on the boat and
            come see what all the fuss is about.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary group inline-flex items-center gap-3 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.16em]"
            >
              Book Your Trip
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/excursions"
              className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-cream/5 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-colors duration-200 hover:bg-cream/15"
            >
              View Excursions
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------- Page ---------------------------------- */

function AboutPage() {
  return (
    <>
      <AboutHero />
      <main>
        <StorySection />
        <ChromeSection />
        <StatsBand />
        <ValuesSection />
        <JourneySection />
        <div id="captain" className="scroll-mt-24">
          <MeetCaptainSection />
        </div>
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
