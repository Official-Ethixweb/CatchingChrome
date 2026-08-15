import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/**
 * The router's default not-found is an unstyled "Not Found" string with no
 * header, no footer and no way back — a dead end for anyone arriving on a stale
 * link or a typo. This keeps them inside the site and pointed at the two pages
 * they most likely wanted.
 *
 * Rendered from two places: the root route's `notFoundComponent`, and the
 * catch-all `/$` route for paths that don't match a redirect rule.
 */
export function NotFoundPage() {
  return (
    <>
      <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center">
        <SiteHeader />

        <span className="font-display text-[clamp(4rem,14vw,9rem)] leading-none text-accent">
          404
        </span>
        <h1 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.6rem)] uppercase leading-[0.95] text-cream">
          That page slipped the hook
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-cream/70">
          The link you followed doesn&apos;t exist. The fish, however, are still
          out there.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Back to Home
          </a>
          <a
            href="/contact"
            className="btn-outline-cta inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Book a Trip
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
