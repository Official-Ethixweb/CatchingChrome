import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { NotFoundPage } from '~/components/NotFoundPage'
import { resolveRedirect } from '~/lib/redirects'

/**
 * Catch-all for every path no real route claims.
 *
 * Ad campaigns and old links point at URLs the site never had (/american-shad,
 * /book-now, /rates). Each one used to serve a 404, which gets an ad
 * disapproved and loses the click. This runs before render, so on a cold visit
 * from an ad the server answers with a real Location header rather than
 * painting a 404 and then moving.
 *
 * Anything with no sensible destination still 404s — see resolveRedirect.
 */
/**
 * Carries the query string across the redirect, which is how `gclid` (and any
 * utm_*) survives to the landing page — drop it and Google Ads conversion
 * tracking loses the click. The query has to sit before the hash, so it can't
 * just be concatenated onto an href that already ends in `#fall-chinook`.
 */
function withSearch(href: string, searchStr: string) {
  if (!searchStr || searchStr === '?') return href
  const hashAt = href.indexOf('#')
  if (hashAt === -1) return href + searchStr
  return href.slice(0, hashAt) + searchStr + href.slice(hashAt)
}

export const Route = createFileRoute('/$')({
  beforeLoad: ({ location }) => {
    const target = resolveRedirect(location.pathname)

    if (target) {
      throw redirect({
        // `href` rather than `to`: these destinations carry hashes and are
        // plain strings, and a relative href stays an internal navigation
        // (redirect() only forces a document load for absolute URLs).
        href: withSearch(target.href, location.searchStr),
        statusCode: target.statusCode,
      })
    }

    // Hands off to notFoundComponent below *and* sets a 404 status, so an
    // unknown URL isn't reported to Google as a soft 404.
    throw notFound()
  },
  component: NotFoundPage,
  notFoundComponent: NotFoundPage,
})
