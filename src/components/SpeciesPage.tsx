import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { WaveDivider } from './WaveDivider'
import { Eyebrow } from './Eyebrow'
import { ArrowRight, ArrowUpRight } from './icons'
import { INCLUDED, SPECIES_PAGES, type SpeciesPage as Data } from '~/lib/species'

/**
 * Layout shared by every per-species landing page.
 *
 * One component rather than six near-identical route files: the routes stay
 * thin (slug + head tags) and the shape of the page is defined once here, so a
 * change to the booking CTA or the included list lands on all of them.
 */
export function SpeciesPage({ data }: { data: Data }) {
  return (
    <>
      <SpeciesHero data={data} />

      <main>
        <Intro data={data} />
        <Highlights data={data} />
        <DayPlan data={data} />
        <Included data={data} />
        <Faqs data={data} />
        <Related data={data} />
      </main>

      <SiteFooter />
    </>
  )
}

function SpeciesHero({ data }: { data: Data }) {
  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={`${data.name} fishing with Catching Chrome`}
          // The hero image is the largest paint on the page and sits above the
          // fold, so it loads eagerly and at high priority rather than lazily.
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/45 to-ink" />
      </div>

      <SiteHeader />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        {data.season && (
          <span className="mb-6 rounded-full bg-cream/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
            {data.season}
          </span>
        )}

        <h1 className="font-display text-4xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
          {data.name}
        </h1>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70 sm:text-[12px]">
            {data.tagline}
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book This Trip
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="tel:5039369090"
            className="btn-outline-cta inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Call (503) 936-9090
          </a>
        </div>
      </div>

      <WaveDivider fill="fill-cream" />
    </section>
  )
}

function Intro({ data }: { data: Data }) {
  return (
    <section className="theme-transition pop bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="The Trip" tone="dark" />

        <div className="mt-6 grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] uppercase leading-[0.9] text-ink">
              <span className="block">Guided</span>
              <span className="block accent-underline text-accent">
                {data.name}
              </span>
            </h2>

            {data.intro.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="mt-7 text-[17px] leading-relaxed text-ink/70"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Quick facts: the details someone comparing guides scans for before
              they read a word of the body copy. */}
          <aside className="h-fit rounded-2xl border border-ink/10 bg-white p-7 lg:sticky lg:top-28">
            <h3 className="font-display text-xl uppercase leading-none text-ink">
              Trip At A Glance
            </h3>
            <dl className="mt-6 flex flex-col gap-4">
              {data.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-ink/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                    {fact.label}
                  </dt>
                  <dd className="text-[15.5px] leading-relaxed text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="/contact"
              className="btn-primary group mt-7 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              Check Availability
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Highlights({ data }: { data: Data }) {
  return (
    <section
      data-chapter="dark"
      className="theme-invert pop overflow-hidden bg-ink py-24 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="Why This Trip" tone="light" />

        <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
          What Makes It Worth The Drive
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.highlights.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/[0.04] p-7"
            >
              <h3 className="font-display text-2xl uppercase leading-none text-accent">
                {item.title}
              </h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-cream/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DayPlan({ data }: { data: Data }) {
  return (
    <section className="theme-transition pop bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="How The Day Runs" tone="dark" center />

        <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-ink">
          Ramp To Cooler
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {data.dayPlan.map((s) => (
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
      </div>
    </section>
  )
}

function Included({ data }: { data: Data }) {
  return (
    <section
      data-chapter="dark"
      className="theme-invert pop overflow-hidden bg-ink py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <Eyebrow label="What's Included" tone="light" />
          <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
            <span className="block">Gear Handled,</span>
            <span className="block accent-underline text-accent">
              catch handled
            </span>
          </h2>
          <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-cream/70">
            Every trip is fully outfitted. Bring a valid fishing license, dress
            for the weather, and the rest is covered.
          </p>

          <ul className="mt-9 flex flex-col gap-4">
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

        <div className="lg:pt-16">
          <h3 className="font-display text-xl uppercase leading-none text-cream">
            What To Bring
          </h3>
          <ul className="mt-6 flex flex-col gap-4">
            {data.bring.map((line) => (
              <li
                key={line}
                className="flex items-start gap-4 border-b border-cream/10 pb-4 text-[15.5px] leading-relaxed text-cream/70 last:border-b-0"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>

          <a
            href="/pricing"
            className="btn-outline-cta group mt-10 inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            See Full Pricing
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Faqs({ data }: { data: Data }) {
  return (
    <section className="theme-transition pop bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Eyebrow label="Questions" tone="dark" center />

        <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-ink">
          {data.name} FAQ
        </h2>

        <div className="mt-14 flex flex-col gap-4">
          {data.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-ink/10 bg-white p-6 open:border-accent/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg uppercase leading-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45">
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function Related({ data }: { data: Data }) {
  const related = data.related
    .map((slug) => SPECIES_PAGES[slug])
    .filter((s): s is Data => Boolean(s))

  return (
    <section
      data-chapter="dark"
      className="theme-invert pop bg-ink py-24 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="Other Trips" tone="light" center />

        <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
          While You Are Here
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {related.map((trip) => (
            <a
              key={trip.slug}
              href={`/${trip.slug}`}
              className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {trip.season && (
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
                    {trip.season}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl uppercase leading-none text-cream transition-colors duration-300 group-hover:text-accent">
                  {trip.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/70">
                  {trip.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                  View Trip
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/excursions"
            className="btn-outline-cta group inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em]"
          >
            View All Excursions
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
