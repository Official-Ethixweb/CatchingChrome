import { useEffect, useRef } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { WaveDivider } from '~/components/WaveDivider'
import { Eyebrow } from '~/components/Eyebrow'
import { JsonLd } from '~/components/JsonLd'
import { ArrowRight, ArrowUpRight } from '~/components/icons'
import { BUSINESS_LD } from '~/lib/business'
import {
  formatDate,
  getArticle,
  relatedArticles,
  type Article,
  type Block,
} from '~/lib/articles'

const SITE = 'https://www.catchingchromeguideservice.com'

export const Route = createFileRoute('/articles/$slug')({
  loader: ({ params }) => {
    const article = getArticle(params.slug)
    if (!article) throw notFound()
    return article
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const url = `${SITE}/articles/${loaderData.slug}`
    const image = `${SITE}${loaderData.image}`
    // Without these the root's homepage og/twitter tags would describe every shared article.
    return {
      meta: [
        {
          // Brand suffix only while the whole title stays short enough not to truncate the keyword.
          title:
            loaderData.title.length + 18 <= 70
              ? `${loaderData.title} | Catching Chrome`
              : loaderData.title,
        },
        { name: 'description', content: loaderData.excerpt },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.excerpt },
        { property: 'og:image', content: image },
        { property: 'article:published_time', content: loaderData.date },
        { name: 'twitter:title', content: loaderData.title },
        { name: 'twitter:description', content: loaderData.excerpt },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: ArticlePage,
})

function faqLd(a: Article) {
  const faq = a.body.find((b) => b.type === 'faq')
  if (!faq || faq.type !== 'faq') return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
    })),
  }
}

/** Renders [anchor](url) links inside plain article text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!m) return part
        const external = /^https?:\/\//.test(m[2])
        return (
          <a
            key={i}
            href={m[2]}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {m[1]}
          </a>
        )
      })}
    </>
  )
}

function articleLd(a: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    image: `${SITE}${a.image}`,
    datePublished: a.date,
    dateModified: a.date,
    mainEntityOfPage: `${SITE}/articles/${a.slug}`,
    // Organization, not Captain Ryan: the posts refer to Ryan in the third person.
    author: { '@type': 'Organization', name: BUSINESS_LD.name, url: BUSINESS_LD.url },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_LD.name,
      url: BUSINESS_LD.url,
      logo: { '@type': 'ImageObject', url: BUSINESS_LD.logo },
    },
  }
}

type ImgBlock = Extract<Block, { type: 'img' }>
type Section = { heading: string | null; blocks: Block[] }

/** Splits the body at each h2; text before the first h2 is the untitled intro. */
function toSections(blocks: Block[]): Section[] {
  const sections: Section[] = [{ heading: null, blocks: [] }]
  for (const b of blocks) {
    if (b.type === 'h2') sections.push({ heading: b.text, blocks: [] })
    else sections[sections.length - 1].blocks.push(b)
  }
  return sections.filter((s) => s.heading !== null || s.blocks.length > 0)
}

function Figure({ b, wide = false }: { b: ImgBlock; wide?: boolean }) {
  const img = (
    <img
      src={b.src}
      alt={b.alt}
      width={b.width}
      height={b.height}
      loading="lazy"
      decoding="async"
      className={`block h-auto rounded-2xl border border-ink/10 shadow-sm ${
        b.graphic || b.width >= b.height
          ? 'w-full'
          : // Tall phone photos: capped and centred, never cropped.
            'mx-auto w-auto max-w-full max-h-[min(78vh,600px)]'
      }`}
    />
  )
  return (
    <figure className={wide ? 'mx-auto max-w-[1120px]' : undefined}>
      {b.graphic ? (
        // Infographic text is small on phones, so the image opens full size.
        <a
          href={b.src}
          target="_blank"
          rel="noopener"
          aria-label={`Open full-size image: ${b.alt}`}
          className="block transition-opacity hover:opacity-90"
        >
          {img}
        </a>
      ) : (
        img
      )}
      {b.caption ? (
        <figcaption className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/70">
          {b.caption}
        </figcaption>
      ) : (
        b.graphic && (
          <figcaption className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 sm:hidden">
            Tap image to enlarge
          </figcaption>
        )
      )}
    </figure>
  )
}

/**
 * One article section. On large screens the heading and photos sit in a sticky
 * left column beside the text, and infographics run full width underneath, so
 * the page uses its whole width instead of a single narrow column.
 */
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const pad = (n: number) => String(n).padStart(2, '0')

type TocItem = { id: string; title: string; number: number }

function Contents({ items }: { items: TocItem[] }) {
  const jump = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
  return (
    <nav
      aria-label="In this article"
      className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/70">
        In this article
      </p>
      <ol className="mt-4 divide-y divide-ink/10">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={jump}
              className="group flex items-baseline gap-4 py-3 text-[15px] font-medium leading-snug text-ink/80 transition-colors hover:text-ink"
            >
              <span className="w-6 shrink-0 font-display text-[12px] tabular-nums text-accent">
                {pad(it.number)}
              </span>
              <span className="decoration-accent/50 underline-offset-4 group-hover:underline">
                {it.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Thin accent bar across the top that fills as the article is read. */
function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = document.getElementById(targetId)
    let raf = 0
    const update = () => {
      raf = 0
      if (!el || !bar.current) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1
      bar.current.style.transform = `scaleX(${p})`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [targetId])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

function ArticleSection({
  section,
  number,
  standfirst,
  toc,
}: {
  section: Section
  number: number
  standfirst?: string
  toc?: TocItem[]
}) {
  const photos = section.blocks.filter((b): b is ImgBlock => b.type === 'img' && !b.graphic)
  const graphics = section.blocks.filter((b): b is ImgBlock => b.type === 'img' && !!b.graphic)
  const text = section.blocks.filter((b) => b.type !== 'img')
  const intro = section.heading === null
  // The contents list goes in whichever intro column would otherwise be shorter.
  const tocLeft = !!toc?.length && photos.length === 0

  return (
    <section
      id={section.heading ? slugify(section.heading) : undefined}
      className="scroll-mt-24 border-t border-ink/10 py-14 first:border-t-0 first:pt-0 lg:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {section.heading ? (
            <div>
              <span className="flex items-center gap-3 font-display text-[13px] tabular-nums tracking-[0.2em] text-accent">
                {pad(number)}
                <span className="h-px w-10 bg-accent/60" />
              </span>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,2.75rem)] uppercase leading-[0.95] text-ink">
                {section.heading}
              </h2>
            </div>
          ) : (
            standfirst && (
              <p className="border-l-2 border-accent pl-6 text-[clamp(1.3rem,2.1vw,1.7rem)] font-medium leading-[1.35] text-ink">
                {standfirst}
              </p>
            )
          )}
          {photos.map((b) => (
            <Figure key={b.src} b={b} />
          ))}
          {tocLeft && <Contents items={toc!} />}
        </div>

        <div className="space-y-10">
          <Body blocks={text} dropCap={intro} />
          {!tocLeft && toc && toc.length > 0 && <Contents items={toc} />}
        </div>
      </div>

      {graphics.map((b) => (
        <div key={b.src} className="mt-12 lg:mt-16">
          <Figure b={b} wide />
        </div>
      ))}
    </section>
  )
}

function Body({ blocks, dropCap = false }: { blocks: Block[]; dropCap?: boolean }) {
  const firstP = dropCap ? blocks.findIndex((b) => b.type === 'p') : -1
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
          case 'img':
            // Placed by ArticleSection, never inline.
            return null
          case 'ul':
            return (
              <ul key={i} className="space-y-3">
                {b.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 text-[17px] leading-[1.7] text-ink/80 md:text-[18px]"
                  >
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="!my-10 rounded-r-2xl border-l-2 border-accent bg-white px-7 py-6 font-display text-[clamp(1.25rem,2vw,1.6rem)] uppercase leading-[1.1] text-ink"
              >
                {b.text}
              </blockquote>
            )
          case 'faq':
            return (
              <div key={i} className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
                {b.items.map((f) => (
                  <details key={f.q} className="group p-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.05rem] uppercase leading-tight text-ink [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="mt-0.5 text-xl leading-none text-primary transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[16px] leading-[1.7] text-ink/80">
                      <Inline text={f.a} />
                    </p>
                  </details>
                ))}
              </div>
            )
          case 'cta':
            return (
              <div key={i} className="!mt-10">
                <a
                  href={b.href}
                  className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
                >
                  {b.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            )
          default:
            return (
              <p
                key={i}
                className={`text-[17px] leading-[1.75] text-ink/80 md:text-[18px] ${
                  i === firstP
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-accent'
                    : ''
                }`}
              >
                <Inline text={b.text} />
              </p>
            )
        }
      })}
    </div>
  )
}

function RelatedCard({ a, wide }: { a: Article; wide: boolean }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: a.slug }}
      className={`card-glow group flex overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04] ${
        wide ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden ${wide ? 'md:aspect-auto md:min-h-[300px] md:w-1/2' : ''}`}
      >
        <img
          src={a.image}
          alt={a.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-col p-6 ${wide ? 'justify-center md:w-1/2 md:p-10' : ''}`}>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/70">
          {a.category} · {formatDate(a.date)}
        </span>
        <h3
          className={`mt-3 font-display uppercase leading-[1.05] text-cream ${wide ? 'text-2xl md:text-3xl' : 'text-lg'}`}
        >
          {a.title}
        </h3>
        {wide && (
          <p className="mt-4 text-[15px] leading-relaxed text-cream/70">{a.excerpt}</p>
        )}
      </div>
    </Link>
  )
}

function ArticlePage() {
  const article = Route.useLoaderData()
  const related = relatedArticles(article.slug)
  // A closing CTA block becomes the end-of-article booking card instead of a second button.
  const last = article.body[article.body.length - 1]
  const cta = last?.type === 'cta' ? last : null
  const sections = toSections(cta ? article.body.slice(0, -1) : article.body)
  const offset = sections[0]?.heading === null ? 0 : 1
  const toc: TocItem[] = sections.flatMap((s, i) =>
    s.heading ? [{ id: slugify(s.heading), title: s.heading, number: i + offset }] : [],
  )

  return (
    <>
      <JsonLd data={articleLd(article)} />
      {faqLd(article) && <JsonLd data={faqLd(article)!} />}

      <section className="relative -mb-px h-[58vh] min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/45 to-ink" />
        </div>

        <SiteHeader />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-10 text-center">
          <span className="mb-6 rounded-full bg-cream/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
            {article.category}
          </span>
          <h1 className="max-w-4xl font-display text-3xl uppercase leading-[1.05] tracking-wide text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70 sm:text-[12px]">
              {formatDate(article.date)} · {article.readMins} min read
            </p>
            <span className="h-px w-6 bg-accent" />
          </div>
        </div>

        <WaveDivider fill="fill-cream" />
      </section>

      <main>
        <ReadingProgress targetId="article-body" />
        <article id="article-body" className="theme-transition bg-cream pb-16 pt-12 md:pb-20 md:pt-14">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <Link
              to="/articles"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
              All Articles
            </Link>

            <div className="mt-10">
              {sections.map((s, i) => (
                <ArticleSection
                  key={i}
                  section={s}
                  number={i + offset}
                  standfirst={i === 0 ? article.excerpt : undefined}
                  toc={i === 0 && s.heading === null ? toc : undefined}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-white p-8 sm:flex-row sm:items-center md:p-10">
              <div>
                <p className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] uppercase leading-none text-ink">
                  Ready to fish it?
                </p>
                <p className="mt-3 text-[16px] text-ink/70">
                  Tell Ryan your dates and who is coming.
                </p>
              </div>
              <a
                href={cta?.href ?? '/contact'}
                className="btn-primary group inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
              >
                {cta?.label ?? 'Book A Trip'}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section
            data-chapter="dark"
            className="theme-invert bg-ink py-20 md:py-24"
          >
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <Eyebrow label="Keep Reading" tone="light" />
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] uppercase leading-[0.9] text-cream">
                More From <span className="accent-underline text-accent">The Journal</span>
              </h2>

              {/* Columns follow the card count so a short list never leaves empty columns. */}
              <div
                className={`mt-12 grid gap-6 ${
                  related.length >= 3 ? 'md:grid-cols-3' : related.length === 2 ? 'md:grid-cols-2' : ''
                }`}
              >
                {related.map((a) => (
                  <RelatedCard key={a.slug} a={a} wide={related.length === 1} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
