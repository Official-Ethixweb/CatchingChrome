import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { WaveDivider } from '~/components/WaveDivider'
import { Eyebrow } from '~/components/Eyebrow'
import { ArrowRight, ArrowUpRight } from '~/components/icons'
import {
  ARTICLES,
  CATEGORIES,
  formatDate,
  type Article,
  type ArticleCategory,
} from '~/lib/articles'

const ARTICLES_DESCRIPTION =
  'Oregon fishing articles from Catching Chrome: salmon and steelhead seasons, crabbing guides, fishing reports, and what to expect on a guided trip.'

export const Route = createFileRoute('/articles/')({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: 'Oregon Fishing Articles & Guides | Catching Chrome' },
      { name: 'description', content: ARTICLES_DESCRIPTION },
      { property: 'og:url', content: 'https://www.catchingchromeguideservice.com/articles' },
      { property: 'og:title', content: 'Oregon Fishing Articles & Guides | Catching Chrome' },
      { property: 'og:description', content: ARTICLES_DESCRIPTION },
      { name: 'twitter:title', content: 'Oregon Fishing Articles & Guides | Catching Chrome' },
      { name: 'twitter:description', content: ARTICLES_DESCRIPTION },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.catchingchromeguideservice.com/articles',
      },
    ],
  }),
})

function ArticlesHeader() {
  return (
    <section className="relative -mb-px h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/nature-river.webp"
          alt="Oregon river at first light"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink" />
      </div>

      <SiteHeader />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
          Articles
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70 sm:text-[12px]">
            Notes From The River
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>

      <WaveDivider fill="fill-cream" />
    </section>
  )
}

function Meta({ article }: { article: Article }) {
  return (
    <span className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/70">
      <span>{article.category}</span>
      <span className="h-1 w-1 rounded-full bg-gold" />
      <span className="tabular-nums">{article.readMins} min read</span>
    </span>
  )
}

function Featured({
  article,
  badge,
  eager = false,
}: {
  article: Article
  badge?: string
  eager?: boolean
}) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="card-glow group grid overflow-hidden rounded-3xl border border-ink/10 bg-white lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink lg:aspect-auto lg:min-h-[420px]">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <Meta article={article} />
        <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,2.6rem)] uppercase leading-[0.95] text-ink">
          {article.title}
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
          {article.excerpt}
        </p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/70">
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-primary">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function Card({ article }: { article: Article }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta article={article} />
        <h3 className="mt-4 font-display text-[1.35rem] uppercase leading-[1] text-ink">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink/70">
          {article.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70">
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-primary">
            Read
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function Chip({
  on,
  onClick,
  children,
  count,
}: {
  on: boolean
  onClick: () => void
  children: React.ReactNode
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
        on
          ? 'border-cta bg-cta text-ink'
          : 'border-ink/15 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink'
      }`}
    >
      {children}
      <span
        className={`text-[10px] tabular-nums ${on ? 'text-ink/70' : 'text-ink/35'}`}
      >
        {count}
      </span>
    </button>
  )
}

function ComingSoon() {
  const topics = [
    'Salmon run calendars',
    'Steelhead and sturgeon field notes',
    'Crabbing and family trip tips',
    'What to bring and what to expect',
  ]
  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-white">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-8 sm:p-12 lg:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            New posts landing soon
          </span>
          <h3 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.6rem)] uppercase leading-[0.95] text-ink">
            The first articles are
            <span className="block text-accent">being written</span>
          </h3>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink/70">
            Captain Ryan is putting together field notes from the water. Check
            back soon, or call and ask him directly about what is running.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/excursions"
              className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              See Excursions
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:5039369090"
              className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              Call (503) 936-9090
            </a>
          </div>
        </div>

        <div className="border-t border-ink/10 bg-cream/60 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
            On the way
          </p>
          <ul className="mt-6 space-y-5">
            {topics.map((t) => (
              <li
                key={t}
                className="flex items-center gap-4 border-b border-ink/10 pb-5 last:border-0 last:pb-0"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="text-[15px] font-medium text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ArticlesPage() {
  const [category, setCategory] = useState<ArticleCategory | null>(null)

  const sorted = useMemo(
    () => [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  )
  const visible = category ? sorted.filter((a) => a.category === category) : sorted
  // The newest post in the current view is always featured, so a filter that
  // matches one article shows a full-width card rather than a lone small one.
  const [first, ...rest] = visible
  const gridCols =
    rest.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  const categories = CATEGORIES.filter((c) =>
    ARTICLES.some((a) => a.category === c),
  )

  return (
    <>
      <ArticlesHeader />

      <main>
        <section className="theme-transition pop bg-cream pb-20 pt-24 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Eyebrow label="The Journal" tone="dark" />

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] uppercase leading-[0.9] text-ink">
                <span className="block">Read Up,</span>
                <span className="block accent-underline text-accent">
                  fish better
                </span>
              </h2>
              <p className="max-w-md text-[17px] leading-relaxed text-ink/70 lg:mb-3">
                Run calendars, trip prep and field notes from Captain Ryan.
                Straight answers on what to fish, when to go, and what to bring.
              </p>
            </div>

            {ARTICLES.length === 0 ? (
              <ComingSoon />
            ) : (
              <>
            <div className="mt-10 flex flex-wrap gap-2.5">
              <Chip
                on={category === null}
                onClick={() => setCategory(null)}
                count={ARTICLES.length}
              >
                All
              </Chip>
              {categories.map((c) => (
                <Chip
                  key={c}
                  on={category === c}
                  onClick={() => setCategory(category === c ? null : c)}
                  count={ARTICLES.filter((a) => a.category === c).length}
                >
                  {c}
                </Chip>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {first && (
                <Featured
                  article={first}
                  badge={category ? `Latest in ${category}` : 'Latest'}
                  eager
                />
              )}

              {rest.length === 1 ? (
                <Featured article={rest[0]} />
              ) : (
                rest.length > 1 && (
                  <div className={`grid gap-8 ${gridCols}`}>
                    {rest.map((a) => (
                      <Card key={a.slug} article={a} />
                    ))}
                  </div>
                )
              )}
            </div>
              </>
            )}
          </div>
        </section>

        <section
          data-chapter="dark"
          className="theme-invert pop bg-ink py-24 md:py-28"
        >
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <Eyebrow label="Ready To Fish" tone="light" center />
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] uppercase leading-[0.9] text-cream">
              Put It <span className="accent-underline text-accent">Into Practice</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-cream/70">
              Reading is good. Being on the water with Ryan is better. Tell him
              when you want to go and who is coming.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                Book Your Trip
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/excursions"
                className="btn-outline-cta inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                See Excursions
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
