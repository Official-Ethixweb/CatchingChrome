import { useEffect, useMemo, useRef, useState, type SVGProps } from 'react'
import { ArrowUpRight, ChevronDown, WeatherGlyph } from './icons'
import { FishGlyph } from './FishArt'
import { Eyebrow } from './Eyebrow'
import {
  SPECIES,
  MONTHS_SHORT,
  MONTHS_FULL,
  RATING_META,
  speciesByMonth,
  type Rating,
} from '~/lib/fishingCalendar'
import {
  getRiverConditions,
  biteOutlook,
  type RiverConditions,
  type OutlookTier,
} from '~/lib/weather'

/* --- Small inline marks ------------------------------------------------- */

function StarMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  )
}

/* --- Rating cell -------------------------------------------------------- */

const CELL_FILL: Record<Rating, string> = {
  excellent: 'bg-accent',
  good: 'bg-primary',
  fair: 'bg-primary/25',
  poor: 'bg-transparent border border-cream/15',
}

/* --- Weather / outlook strip ------------------------------------------- */

const FILL_BY_TIER: Record<OutlookTier, string> = {
  prime: 'bg-gradient-to-r from-primary to-accent',
  promising: 'bg-primary',
  fair: 'bg-primary/70',
  slow: 'bg-cream/45',
  tough: 'bg-cream/30',
}

function WeatherStrip({
  wx,
  loading,
  monthIndex,
}: {
  wx: RiverConditions | null
  loading: boolean
  monthIndex: number
}) {
  const outlook = useMemo(() => biteOutlook(monthIndex, wx), [monthIndex, wx])

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 rounded-md border border-cream/12 bg-cream/[0.03] p-5 sm:p-6 md:grid-cols-[1fr_1.15fr] md:gap-10">
      {/* Live conditions */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/15 text-accent">
          <WeatherGlyph id={wx?.conditionId ?? 802} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/45">
            On the water today
          </div>
          {loading ? (
            <div className="mt-1 text-sm text-cream/50">Reading the river…</div>
          ) : wx ? (
            <>
              <div className="mt-1 font-display text-xl uppercase leading-none text-cream">
                {wx.tempF}°F · {wx.description || wx.main}
              </div>
              <div className="mt-1.5 text-[12px] tracking-[0.04em] text-cream/50">
                {wx.locationLabel} · Wind {wx.windMph} mph
                {wx.gustMph ? ` (gusts ${wx.gustMph})` : ''}
              </div>
            </>
          ) : (
            <>
              <div className="mt-1 font-display text-xl uppercase leading-none text-cream">
                Seasonal outlook
              </div>
              <div className="mt-1.5 text-[12px] tracking-[0.04em] text-cream/45">
                Live conditions offline, showing the run calendar.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bite outlook meter */}
      <div className="flex flex-col justify-center border-t border-cream/10 pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/45">
            Bite outlook
          </span>
          <span className="font-display text-lg uppercase text-accent">
            {outlook.label}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream/12">
          <div
            className={`h-full rounded-full transition-all duration-700 ${FILL_BY_TIER[outlook.tier]}`}
            style={{ width: `${outlook.score}%` }}
          />
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-cream/55">
          {outlook.reason}
        </p>
      </div>
    </div>
  )
}

/* --- Main section ------------------------------------------------------- */

const AUTO_CYCLE_MS = 4500

export function SeasonsSection() {
  const currentMonth = useMemo(() => new Date().getMonth(), [])

  // Default the selection to the strongest species in the current month.
  const [sel, setSel] = useState(() => ({
    species: SPECIES.indexOf(speciesByMonth(currentMonth)[0]),
    month: currentMonth,
  }))

  // Automated tour: step through each species at its own peak month so the
  // calendar keeps surfacing the run that's most worth booking.
  const cycle = useMemo(
    () =>
      SPECIES.map((sp, si) => {
        let best = 0
        sp.ratings.forEach((r, mi) => {
          if (RATING_META[r].rank > RATING_META[sp.ratings[best]].rank) best = mi
        })
        return { species: si, month: best }
      }),
    [],
  )
  const [autoPaused, setAutoPaused] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const stepRef = useRef(-1)

  useEffect(() => {
    if (autoPaused) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const id = window.setInterval(() => {
      stepRef.current = (stepRef.current + 1) % cycle.length
      setSel(cycle[stepRef.current])
    }, AUTO_CYCLE_MS)
    return () => window.clearInterval(id)
  }, [autoPaused, cycle])

  const [wx, setWx] = useState<RiverConditions | null>(null)
  const [wxLoading, setWxLoading] = useState(true)

  useEffect(() => {
    let alive = true
    getRiverConditions()
      .then((data) => {
        if (alive) setWx(data)
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setWxLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const species = SPECIES[sel.species]
  const selRating = species.ratings[sel.month]

  return (
    <section
      data-chapter="dark"
      className="theme-invert relative overflow-hidden bg-ink py-24 md:py-28"
    >
      <div
        className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10"
        onMouseEnter={() => setAutoPaused(true)}
        onMouseLeave={() => setAutoPaused(false)}
        onFocusCapture={() => setAutoPaused(true)}
        onBlurCapture={() => setAutoPaused(false)}
      >
        <Eyebrow label="Fishing Calendar" tone="light" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] uppercase leading-[0.9] text-cream">
            <span className="block">Oregon Salmon</span>
            <span className="block text-accent">calendar</span>
          </h2>
          <p className="max-w-md text-[15.5px] leading-relaxed text-cream/60">
            The best months to fish our rivers, by species, pulled straight
            from Captain Ryan&apos;s log. Tap a month or a run to see where the
            fish are and when to book.
          </p>
        </div>

        {/* Live weather + bite outlook */}
        <WeatherStrip wx={wx} loading={wxLoading} monthIndex={sel.month} />

        {/* The full grid is a lot of detail for a first read, so it stays
            folded away behind a toggle until asked for. */}
        <button
          type="button"
          onClick={() => setCalendarOpen((o) => !o)}
          aria-expanded={calendarOpen}
          aria-controls="season-calendar"
          className="glow-border mt-8 flex w-full items-center justify-between gap-4 rounded-md border bg-cream/[0.03] px-5 py-4 text-left sm:px-6"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-cream/70">
            View Full Season Calendar
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-cta transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              calendarOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          id="season-calendar"
          className="collapse-grid"
          data-open={calendarOpen}
          inert={!calendarOpen}
        >
          <div className="collapse-inner">
            <div className="collapse-content">
        {/* Calendar grid */}
        <div className="mt-8 overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            <div
              role="grid"
              aria-label="Salmon fishing calendar by species and month"
              className="grid items-stretch gap-1.5"
              style={{
                gridTemplateColumns: 'minmax(150px, 1.3fr) repeat(12, 1fr)',
              }}
            >
              {/* Header row */}
              <div aria-hidden="true" />
              {MONTHS_SHORT.map((m, i) => {
                const isNow = i === currentMonth
                const isSel = i === sel.month
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSel((s) => ({ ...s, month: i }))}
                    className="group flex flex-col items-center gap-1 pb-1.5"
                  >
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                        isSel
                          ? 'text-accent'
                          : 'text-cream/55 group-hover:text-cream'
                      }`}
                    >
                      {m}
                    </span>
                    {isNow ? (
                      <span className="rounded-full bg-accent px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-ink">
                        Now
                      </span>
                    ) : (
                      <span className="h-[3px] w-4 rounded-full bg-transparent" />
                    )}
                  </button>
                )
              })}

              {/* Species rows */}
              {SPECIES.map((sp, si) => {
                const rowActive = si === sel.species
                return (
                  <div key={sp.id} className="contents">
                    {/* Row label */}
                    <button
                      type="button"
                      onClick={() => setSel((s) => ({ ...s, species: si }))}
                      className={`flex items-center gap-3 rounded-sm border-l-2 py-2 pl-3 pr-2 text-left transition-colors ${
                        rowActive
                          ? 'border-accent bg-cream/[0.04]'
                          : 'border-transparent hover:bg-cream/[0.02]'
                      }`}
                    >
                      <FishGlyph
                        shape={sp.shape}
                        className={`h-6 w-11 shrink-0 transition-colors ${
                          rowActive ? 'text-accent' : 'text-cream/45'
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block font-display text-[13px] uppercase leading-tight transition-colors ${
                            rowActive ? 'text-cream' : 'text-cream/75'
                          }`}
                        >
                          {sp.name}
                        </span>
                        <span className="block text-[10px] tracking-[0.14em] text-cream/40">
                          Peak {sp.peak}
                        </span>
                      </span>
                    </button>

                    {/* Rating cells */}
                    {sp.ratings.map((r, mi) => {
                      const isSelCell = si === sel.species && mi === sel.month
                      const inSelCol = mi === sel.month
                      const isNowCol = mi === currentMonth
                      const meta = RATING_META[r]
                      return (
                        <button
                          key={mi}
                          type="button"
                          role="gridcell"
                          aria-label={`${sp.name}, ${MONTHS_FULL[mi]}: ${meta.label}`}
                          onClick={() => setSel({ species: si, month: mi })}
                          className={`relative flex h-11 items-center justify-center rounded-sm transition-all duration-200 ${CELL_FILL[r]} ${
                            isSelCell
                              ? 'outline outline-2 outline-accent outline-offset-[-2px]'
                              : inSelCol
                                ? 'opacity-100'
                                : 'opacity-90 hover:opacity-100'
                          }`}
                        >
                          {r === 'excellent' && (
                            <StarMark className="h-4 w-4 text-ink" />
                          )}
                          {isNowCol && r === 'poor' && (
                            <span className="h-1 w-1 rounded-full bg-cream/25" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {(['excellent', 'good', 'fair', 'poor'] as Rating[]).map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-[3px] ${CELL_FILL[r]}`}
              >
                {r === 'excellent' && (
                  <StarMark className="h-2.5 w-2.5 text-ink" />
                )}
              </span>
              <span className="text-[12px] tracking-[0.04em] text-cream/55">
                <span className="text-cream/80">{RATING_META[r].label}</span>
                <span className="text-cream/40">, {RATING_META[r].note}</span>
              </span>
            </div>
          ))}
        </div>
            </div>
          </div>
        </div>

        {/* Detail panel — reacts to the selected species + month, and eases
            in on every automated switch. */}
        <div className="relative mt-10">
          <div
            key={`${sel.species}-${sel.month}`}
            className="panel-swap grid grid-cols-1 gap-8 rounded-md border border-cream/12 bg-cream/[0.03] p-6 md:grid-cols-[1.2fr_1fr] md:gap-12 md:p-9"
          >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-[11px] uppercase tracking-[0.2em] text-cream/45">
                {MONTHS_FULL[sel.month]}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                  selRating === 'excellent'
                    ? 'bg-accent text-ink'
                    : selRating === 'good'
                      ? 'bg-primary text-cream'
                      : selRating === 'fair'
                        ? 'bg-primary/25 text-cream'
                        : 'border border-cream/20 text-cream/60'
                }`}
              >
                {selRating === 'excellent' && (
                  <StarMark className="h-3 w-3" />
                )}
                {RATING_META[selRating].label}
              </span>
            </div>

            <h3 className="mt-4 font-display text-3xl uppercase leading-none text-cream md:text-4xl">
              {species.name}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/60">
              {species.blurb}
            </p>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Peak window
                </div>
                <div className="mt-1 font-display text-lg uppercase text-accent">
                  {species.peak}
                </div>
              </div>
            </div>

            <a
              href="/#excursions"
              className="btn-primary group mt-8 inline-flex w-fit items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              Book a {species.name.split(' ')[0]} Trip
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Best rivers for this run */}
          <div className="border-t border-cream/10 pt-7 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/45">
              Best rivers
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {species.rivers.map((river) => (
                <span
                  key={river}
                  className="rounded-full border border-cream/15 px-3.5 py-1.5 text-[12px] tracking-[0.03em] text-cream/70"
                >
                  {river}
                </span>
              ))}
            </div>

            <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/45">
              Also running in {MONTHS_SHORT[sel.month]}
            </div>
            <div className="mt-3 space-y-1.5">
              {speciesByMonth(sel.month)
                .filter((s) => s.ratings[sel.month] !== 'poor' && s.id !== species.id)
                .map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      setSel((prev) => ({
                        ...prev,
                        species: SPECIES.indexOf(s),
                      }))
                    }
                    className="flex w-full items-center justify-between text-left text-[13px] text-cream/60 transition-colors hover:text-cream"
                  >
                    <span>{s.name}</span>
                    <span className="text-cream/40">
                      {RATING_META[s.ratings[sel.month]].label}
                    </span>
                  </button>
                ))}
              {speciesByMonth(sel.month).filter(
                (s) => s.ratings[sel.month] !== 'poor' && s.id !== species.id,
              ).length === 0 && (
                <p className="text-[13px] text-cream/40">
                  A quiet month, the runs are resting.
                </p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
