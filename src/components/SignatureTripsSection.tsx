import { ArrowRight, ArrowUpRight } from './icons'
import FlowingMenu from './FlowingMenu'
import { Eyebrow } from './Eyebrow'

const TRIPS = [
  {
    season: 'Aug to Oct',
    title: 'Fall Chinook',
    image: '/fallchinook.png',
    body: 'Our best pure king fishery. Season opens in August and runs through late October, the most powerful, chrome-bright kings of the year.',
  },
  {
    season: 'Mid March to Mid June',
    title: 'Spring Chinook',
    image: '/summerchinook.png',
    body: 'Columbia River spring chinook, prized worldwide for their flavor. Anglers travel across the country for this run.',
  },
  {
    season: 'Dec to April',
    title: 'Winter Steelhead',
    image: '/wintersteelhead.png',
    body: 'Chrome winter fish on the coastal tributaries. Hard-running, acrobatic, and the reason a lot of anglers put up with the rain.',
  },
  {
    season: 'May to July',
    title: 'Sturgeon',
    image: '/sturgeon.jpg',
    body: 'The prehistoric heavyweight of the Columbia. Big, powerful fish that pull back harder than anything else in the river.',
  },
  // Shad stays last: a niche fishery, so the marquee runs get the top spots.
  {
    season: 'Mid May to Mid June',
    title: 'American Shad',
    image: '/americanshad.png',
    body: 'Warm-weather, light-gear action. Non-stop bites make this the perfect trip for kids or first-time anglers.',
  },
  // Crab has its own dedicated section (CrabTripsSection) rather than a card here.
]

// No page exists per destination, so these point at the excursions page rather
// than at "#", which reads as a link, takes the click and does nothing.
const DESTINATIONS = [
  { link: '/excursions', text: 'Columbia River', image: '/nature-river.jpg' },
  { link: '/excursions', text: 'Deschutes River', image: '/nature-mountain.jpg' },
  { link: '/excursions', text: 'Willamette River', image: '/nature-valley.jpg' },
  {
    link: '/excursions',
    text: 'Coastal Tributaries',
    image: '/nature-forest.jpg',
  },
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
          <h2 className="font-display text-[clamp(2.6rem,6.2vw,5.6rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Our Signature</span>
            <span className="block leading-[0.85] text-accent">trips</span>
          </h2>

          <p className="max-w-sm text-[17px] leading-relaxed text-ink/55 lg:mb-3">
            Our most popular fishing adventures on Oregon&apos;s pristine waters,
            each one guided personally by Captain Ryan.
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
                  loading="lazy"
                  decoding="async"
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
                {/* md is where the columns are narrowest — three of them across
                    a tablet leaves ~153px of text box, and "American" alone
                    sets wider than that at 3xl. The size climbs back at lg,
                    where the columns are wide enough to carry it. */}
                <h3 className="font-display text-3xl uppercase leading-none text-ink md:text-2xl lg:text-[2.3rem]">
                  {trip.title}
                </h3>

                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/55">
                  {trip.body}
                </p>

                <a
                  href="/contact"
                  className="btn-outline mt-6 inline-flex w-fit items-center gap-2 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.18em]"
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
            href="/excursions"
            className="btn-outline group inline-flex items-center gap-3 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em]"
          >
            View All Excursions
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
              bgColor="#0E2A3B"
              textColor="#F7F6F2"
              marqueeBgColor="#F7F6F2"
              marqueeTextColor="#0E2A3B"
              borderColor="rgba(247, 246, 242, 0.18)"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
