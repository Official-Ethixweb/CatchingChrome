import { ArrowRight } from './icons'
import { Eyebrow } from './Eyebrow'

const STATS = [
  { value: '40+', label: 'Years' },
  { value: '10K+', label: 'Fish Landed' },
  { value: '100%', label: 'USCG Cert.' },
]

export function WelcomeSection() {
  return (
    <section id="about" className="theme-transition pop bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Left photo + stats */}
        <div>
          <div className="relative aspect-[4/5] w-[85%] overflow-hidden rounded-sm">
            <img
              src="/20240831_124653-1488x1536.jpg"
              alt="Guests aboard with a limit of Columbia River salmon"
              width={1488}
              height={1536}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-ink/15 py-6 text-center"
              >
                <div className="font-display text-3xl leading-none text-ink sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right welcome copy */}
        <div>
          <Eyebrow label="Welcome" tone="dark" />

          <h2 className="mt-6 font-display text-[clamp(2.5rem,4.6vw,4.2rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Welcome To</span>
            <span className="block">
              <span className="text-accent">Catching</span> Chrome
            </span>
            <span className="block">Guide Service</span>
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-[17px] leading-relaxed text-ink/70">
            <p>
              Premium fishing experiences throughout Oregon&apos;s legendary
              waterways. With over forty years of local knowledge, Captain Ryan
              delivers exceptional adventures for all skill levels, from the
              Columbia River Gorge to coastal tributaries.
            </p>
            <p>Safe, comfortable, memorable trips. Every time.</p>
          </div>

          <a
            href="/about"
            className="btn-outline group mt-10 inline-flex items-center gap-3 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.18em]"
          >
            About Us
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
