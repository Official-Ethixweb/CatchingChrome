import { ArrowRight, ArrowUpRight } from './icons'
import FlowingMenu from './FlowingMenu'
import { Eyebrow } from './Eyebrow'

const TRIPS = [
  {
    season: 'AUG – OCT',
    title: 'Fall Chinook',
    image: '/fallchinook.png',
    body: 'Our best pure king fishery. Season opens in August and runs through late October — the most powerful, chrome-bright kings of the year.',
  },
  {
    season: 'MID-MAR – MID-JUN',
    title: 'Spring Chinook',
    image: '/summerchinook.png',
    body: 'Columbia River spring chinook — prized worldwide for their flavor. Anglers travel across the country for this run.',
  },
  {
    season: 'MID-MAY – MID-JUN',
    title: 'American Shad',
    image: '/wintersteelhead.png',
    body: 'Warm-weather, light-gear action. Non-stop bites make this the perfect trip for kids or first-time anglers.',
  },
]

const DESTINATIONS = [
  { link: '#', text: 'Columbia River', image: '/nature-river.jpg' },
  { link: '#', text: 'Deschutes River', image: '/nature-mountain.jpg' },
  { link: '#', text: 'Willamette River', image: '/nature-valley.jpg' },
  { link: '#', text: 'Coastal Tributaries', image: '/nature-forest.jpg' },
]

export function SignatureTripsSection({ className = "bg-cream" }: { className?: string } = {}) {
  return (
    <section
      id="excursions"
      className={`theme-transition pop ${className} py-24 md:py-28`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Eyebrow label="Signature Trips" tone="dark" />

        {/* Headline + intro */}
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(3rem,6.2vw,5.6rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Our Signature</span>
            <span className="block leading-[0.85] text-accent">trips</span>
          </h2>

          <p className="max-w-sm text-[17px] leading-relaxed text-ink/55 lg:mb-3">
            Our most popular fishing adventures on Oregon&apos;s pristine waters
            — each one guided personally by Captain Ryan.
          </p>
        </div>

        {/* Divider */}
        <hr className="mt-10 border-t border-ink/15" />

        {/* Trip grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TRIPS.map((trip) => (
            <article
              key={trip.title}
              className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Darkening wash on hover for caption legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Season chip */}
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
                  {trip.season}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-3xl uppercase leading-none text-ink lg:text-[2.3rem]">
                  {trip.title}
                </h3>

                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/55">
                  {trip.body}
                </p>

                <a
                  href="#"
                  className="mt-6 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
                >
                  Book Now
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-16 flex justify-center md:mt-20">
          <a
            href="#"
            className="group inline-flex items-center gap-4 rounded-full border border-ink/80 py-2 pl-8 pr-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-ink/5"
          >
            View All Excursions
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream">
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        {/* Destinations marquee */}
        <div className="mt-24 w-full border-t border-ink/15 pt-12">
          <div className="mb-12">
            <Eyebrow label="Destinations" tone="dark" />
          </div>
          <div
            style={{
              height: '500px',
              position: 'relative',
              width: '100%',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            <FlowingMenu
              items={DESTINATIONS}
              bgColor="#F7F6F2"
              textColor="#0E2A3B"
              marqueeBgColor="#167A8E"
              marqueeTextColor="#F7F6F2"
              borderColor="#B9C4CC"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
