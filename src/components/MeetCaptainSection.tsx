import {
  ArrowUpRight,
  AwardIcon,
  FishIcon,
  ShieldCheckIcon,
} from './icons'
import { Eyebrow } from './Eyebrow'

const BADGES = [
  { icon: AwardIcon, label: 'USCG CAPTAIN' },
  { icon: ShieldCheckIcon, label: 'FIRST AID + CPR' },
  { icon: FishIcon, label: '40+ YEARS' },
]

export function MeetCaptainSection() {
  return (
    <section
      data-chapter="dark"
      className="theme-invert pop overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Left bio */}
        <div>
          <Eyebrow label="Your Guide" tone="light" />

          <h2 className="mt-6 font-display text-[clamp(2.75rem,5.4vw,4.8rem)] uppercase leading-[0.88] text-cream">
            <span className="block">Meet</span>
            <span className="flex flex-wrap items-baseline gap-x-[0.28em]">
              <span className="text-accent">Captain</span>
              <span>Ryan</span>
            </span>
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-cream/70">
            <p>
              With over 40 years of fishing experience across Oregon&apos;s
              waterways, Captain Ryan brings unparalleled expertise to every
              trip. A certified U.S. Coast Guard captain, first aid and CPR
              trained, safety is always first.
            </p>
            <p>
              His passion is matched only by his commitment to client
              satisfaction. Patient with beginners, invaluable to experienced
              anglers, and always invested in your success on the water.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <badge.icon className="h-5 w-5 text-accent" />
                <span className="text-[12px] font-medium tracking-[0.18em] text-cream/80">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            className="btn-primary group mt-10 inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Right tilted portrait photo */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px]">
            {/* Backing card */}
            <div className="absolute inset-0 rotate-[-2deg] rounded-[3px] border border-cream/10" />

            {/* Main photo */}
            <div className="relative aspect-[4/5] rotate-[4deg] overflow-hidden rounded-[3px] shadow-2xl shadow-black/40">
              <img
                src="/rsw_1280h_1118.webp"
                alt="Captain Ryan holding a Columbia River chinook"
                width={1118}
                height={1280}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
