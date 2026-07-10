import { ArrowRight, ArrowUpRight } from './icons'
import FlowingMenu from './FlowingMenu'

const TRIPS = [
  {
    index: '01',
    season: 'AUG – OCT',
    title: 'Fall Chinook',
    image: '/fallchinook.png',
    body: 'Our best pure king fishery. Season opens in August and runs through late October — the most powerful, chrome-bright kings of the year.',
  },
  {
    index: '02',
    season: 'MID-MAR – MID-JUN',
    title: 'Spring Chinook',
    image: '/summerchinook.png',
    body: 'Columbia River spring chinook — prized worldwide for their flavor. Anglers travel across the country for this run.',
  },
  {
    index: '03',
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

export function SignatureTripsSection({ className = "bg-paper" }: { className?: string } = {}) {
  return (
    <section id="excursions" className={`${className} py-24 md:py-28`}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-accent">03</span>
          <span className="h-px w-10 bg-ink/30" />
          <span className="text-[12px] font-medium tracking-[0.3em] text-ink/70">
            SIGNATURE TRIPS
          </span>
        </div>

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
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {TRIPS.map((trip) => (
            <div key={trip.index} className="group">
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-sm">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-accent">{trip.index}</span>
                <span className="text-[11px] tracking-[0.2em] text-ink/45">
                  {trip.season}
                </span>
              </div>

              <h3 className="mt-5 font-display text-4xl uppercase leading-none text-ink lg:text-[2.6rem]">
                {trip.title}
              </h3>

              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink/55">
                {trip.body}
              </p>

              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-ink/60"
              >
                Book Now
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
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
          <div className="mb-12 flex items-center gap-4">
            <span className="text-sm font-semibold text-accent">03.B</span>
            <span className="h-px w-10 bg-ink/30" />
            <span className="text-[12px] font-medium tracking-[0.3em] text-ink/70">
              DESTINATIONS
            </span>
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
