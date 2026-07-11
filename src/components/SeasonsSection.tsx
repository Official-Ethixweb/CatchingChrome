import { useState } from 'react'
import { ArrowUpRight } from './icons'

type Level = 'PEAK RUN' | 'STRONG' | 'FAIR'

type FishInfo = {
  name: string
  /** Preferred species photo — drop the real file at this path in public/fish/. */
  image: string
  /** Shown until the species photo above is added (existing asset). */
  fallback: string
}

// One entry per species. Add the real photos at the `image` paths (see
// public/fish/README.md) and they upgrade automatically; until then the
// `fallback` keeps the cards looking intact.
const FISH = {
  springChinook: {
    name: 'Spring Chinook',
    image: '/fish/spring-chinook.jpg',
    fallback: '/summerchinook.png',
  },
  sturgeon: {
    name: 'Sturgeon',
    image: '/fish/sturgeon.jpg',
    fallback: '/nature-river.jpg',
  },
  winterSteelhead: {
    name: 'Winter Steelhead',
    image: '/fish/winter-steelhead.jpg',
    fallback: '/wintersteelhead.png',
  },
  americanShad: {
    name: 'American Shad',
    image: '/fish/american-shad.jpg',
    fallback: '/20240831_124653-1488x1536.jpg',
  },
  summerSteelhead: {
    name: 'Summer Steelhead',
    image: '/fish/summer-steelhead.jpg',
    fallback: '/wintersteelhead.png',
  },
  sockeyeSalmon: {
    name: 'Sockeye Salmon',
    image: '/fish/sockeye-salmon.jpg',
    fallback: '/nature-mountain.jpg',
  },
  fallChinook: {
    name: 'Fall Chinook',
    image: '/fish/fall-chinook.jpg',
    fallback: '/fallchinook.png',
  },
  cohoSalmon: {
    name: 'Coho Salmon',
    image: '/fish/coho-salmon.jpg',
    fallback: '/rsw_1280h_1118.webp',
  },
  cutthroatTrout: {
    name: 'Cutthroat Trout',
    image: '/fish/cutthroat-trout.jpg',
    fallback: '/nature-forest.jpg',
  },
} satisfies Record<string, FishInfo>

type Catch = {
  fish: FishInfo
  months: string
  level: Level
  pct: number
}

type Season = {
  id: string
  label: string
  months: string
  headline: string
  description: string
  catches: Catch[]
}

const SEASONS: Season[] = [
  {
    id: 'spring',
    label: 'Spring',
    months: 'MAR – MAY',
    headline: 'The river wakes up',
    description:
      'Spring chinook pour into the Columbia, prized worldwide for their rich, high-fat meat. Sturgeon fishing stays hot in the deep holes, and the tail end of the winter steelhead run still rewards early risers.',
    catches: [
      { fish: FISH.springChinook, months: 'MAR – JUN', level: 'PEAK RUN', pct: 95 },
      { fish: FISH.sturgeon, months: 'ALL SEASON', level: 'STRONG', pct: 75 },
      { fish: FISH.winterSteelhead, months: 'MAR – APR', level: 'FAIR', pct: 45 },
    ],
  },
  {
    id: 'summer',
    label: 'Summer',
    months: 'JUN – AUG',
    headline: 'Non-stop light-gear action',
    description:
      'Millions of shad flood the river for the fastest fishing of the year, perfect for kids and first-timers. Summer steelhead and sockeye run strong through the warm months, with walleye filling in the slow tides.',
    catches: [
      { fish: FISH.americanShad, months: 'JUN – JUL', level: 'PEAK RUN', pct: 95 },
      { fish: FISH.summerSteelhead, months: 'JUN – SEP', level: 'STRONG', pct: 80 },
      { fish: FISH.sockeyeSalmon, months: 'JUN – JUL', level: 'STRONG', pct: 70 },
    ],
  },
  {
    id: 'fall',
    label: 'Fall',
    months: 'SEP – NOV',
    headline: 'The kings of the year',
    description:
      'Our best pure king fishery. Fall chinook arrive chrome-bright and full of fight, joined by aggressive coho on the tides. This is the season anglers travel across the country for, and dates go fast.',
    catches: [
      { fish: FISH.fallChinook, months: 'AUG – OCT', level: 'PEAK RUN', pct: 100 },
      { fish: FISH.cohoSalmon, months: 'SEP – NOV', level: 'STRONG', pct: 85 },
      { fish: FISH.sturgeon, months: 'ALL SEASON', level: 'FAIR', pct: 50 },
    ],
  },
  {
    id: 'winter',
    label: 'Winter',
    months: 'DEC – FEB',
    headline: 'Chrome in the cold',
    description:
      'Winter steelhead are the hardest-earned and most rewarding fish of the year, sea-bright and strong in the coastal tributaries. Sturgeon keep the big-fish action going on the mainstem between storms.',
    catches: [
      { fish: FISH.winterSteelhead, months: 'DEC – MAR', level: 'PEAK RUN', pct: 90 },
      { fish: FISH.sturgeon, months: 'ALL SEASON', level: 'STRONG', pct: 70 },
      { fish: FISH.cutthroatTrout, months: 'DEC – FEB', level: 'FAIR', pct: 40 },
    ],
  },
]

const LEVEL_COLOR: Record<Level, string> = {
  'PEAK RUN': 'text-accent',
  STRONG: 'text-primary',
  FAIR: 'text-cream/70',
}

// (per-species image map with SSR-safe fallback lives in FishImage below)

// Falls back to an existing asset when the species photo hasn't been added
// yet. Because this is SSR, the image can 404 before React hydrates (so the
// error event is missed) — the ref catches that already-failed case, and
// onError covers failures after hydration.
function FishImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string
  fallback: string
  alt: string
  className: string
}) {
  const swap = (img: HTMLImageElement | null) => {
    if (!img) return
    if (img.complete && img.naturalWidth === 0 && !img.src.endsWith(fallback)) {
      img.src = fallback
    }
  }
  return (
    <img
      ref={swap}
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.currentTarget
        if (!img.src.endsWith(fallback)) img.src = fallback
      }}
    />
  )
}

export function SeasonsSection() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const season = SEASONS[active]
  const slideClass = dir >= 0 ? 'season-in-right' : 'season-in-left'

  const select = (i: number) => {
    if (i === active) return
    setDir(i > active ? 1 : -1)
    setActive(i)
  }

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-28">
      {/* Giant season watermark, slides with the season */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-end justify-start overflow-hidden"
      >
        <span
          key={season.id}
          className={`whitespace-nowrap font-display uppercase leading-[0.8] text-cream/[0.04] ${slideClass}`}
          style={{ fontSize: '20vw' }}
        >
          {season.label}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-accent">04</span>
          <span className="h-px w-10 bg-cream/25" />
          <span className="text-[12px] font-medium tracking-[0.3em] text-cream/50">
            SEASONAL CATALOGUE
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[400px_1fr] lg:gap-16">
          {/* ---- Left: headline, season menu, description ---- */}
          <div>
            <h2 className="font-display text-[clamp(2.6rem,4.5vw,4rem)] uppercase leading-[0.9] text-cream">
              <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
                <span>What&apos;s</span>
                <span className="text-accent">running</span>
              </span>
            </h2>

            {/* Season menu — vertical, underlined like a log book index */}
            <div role="tablist" aria-label="Season" className="mt-10">
              {SEASONS.map((s, i) => {
                const isActive = i === active
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(i)}
                    className={`group flex w-full items-baseline justify-between border-b py-3.5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-accent pl-3'
                        : 'border-cream/12 pl-0 hover:border-cream/35'
                    }`}
                  >
                    <span
                      className={`font-display text-lg uppercase tracking-wide transition-colors duration-300 md:text-xl ${
                        isActive
                          ? 'text-accent'
                          : 'text-cream/55 group-hover:text-cream'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.25em] transition-colors duration-300 ${
                        isActive ? 'text-cream/70' : 'text-cream/35'
                      }`}
                    >
                      {s.months}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Season description — slides on change */}
            <div key={season.id} className={`mt-10 ${slideClass}`}>
              <h3 className="font-display text-2xl uppercase leading-[1.05] text-cream md:text-[1.7rem]">
                {season.headline}
              </h3>

              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-cream/60">
                {season.description}
              </p>

              <a
                href="#"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110"
              >
                Book a {season.label} Trip
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* ---- Right: diagonal fish panels ---- */}
          <div className="relative overflow-hidden">
            <div
              key={season.id}
              className="flex flex-col gap-4 md:-mx-10 md:h-[34rem] md:flex-row md:gap-3 lg:mx-0 lg:-mr-16 lg:pl-6"
            >
              {season.catches.map((c, i) => (
                <div
                  key={c.fish.name}
                  className="season-panel-in relative h-52 md:h-auto md:flex-1"
                  style={{ animationDelay: `${0.1 + i * 0.13}s` }}
                >
                  {/* Skewed frame */}
                  <div className="absolute inset-0 -skew-x-12 overflow-hidden rounded-sm border border-cream/10 bg-night">
                    <FishImage
                      src={c.fish.image}
                      fallback={c.fish.fallback}
                      alt={c.fish.name}
                      className="absolute inset-0 h-full w-full skew-x-12 scale-[1.45] object-cover opacity-80 transition-all duration-700 hover:scale-[1.55] hover:opacity-100"
                    />
                    {/* Bottom gradient for the caption */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

                    {/* Caption — counter-skewed back upright */}
                    <div className="absolute inset-x-0 bottom-0 skew-x-12 px-10 pb-6 md:px-12">
                      <div
                        className={`text-[10px] font-bold tracking-[0.22em] ${LEVEL_COLOR[c.level]}`}
                      >
                        {c.level}
                      </div>
                      <div className="mt-1.5 font-display text-lg uppercase leading-tight text-cream md:text-xl">
                        {c.fish.name}
                      </div>
                      <div className="mt-1 text-[10px] tracking-[0.22em] text-cream/50">
                        {c.months}
                      </div>
                      {/* Run-strength meter */}
                      <div className="mt-3 h-1 w-full max-w-[9rem] overflow-hidden rounded-full bg-cream/15">
                        <div
                          className="season-bar h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{
                            width: `${c.pct}%`,
                            animationDelay: `${0.35 + i * 0.13}s`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
