/**
 * Tracking state and dispatch — the non-component half of Analytics.tsx.
 *
 * Split out so that file can stay component-only (Vite Fast Refresh only
 * reloads cleanly when a file exports nothing but components); everything
 * here is plain state and functions, imported by the components that render
 * the tags and by the forms that report conversions.
 */

/**
 * Google Tag Manager.
 *
 * GTM is the container; GA4 (and anything else) is configured inside it, so the
 * client can add or change tags without another code deploy. Everything here is
 * gated on VITE_GTM_ID — with no id set (local dev, or before the client hands
 * one over) nothing loads and nothing tracks, so development never pollutes the
 * real property and the site ships analytics-ready without being analytics-on.
 *
 * The id is a Vite env var, so it is inlined into the bundle at build time. To
 * enable: set VITE_GTM_ID=GTM-XXXXXXX in `.env` (and in the Vercel production
 * env), then rebuild/redeploy. See .env.example.
 */

// Read once. VITE_ vars are replaced at build, so this is a constant string.
export const GTM_ID = (import.meta.env as Record<string, string | undefined>)
  .VITE_GTM_ID?.trim()

/** True only for a well-formed container id, so a stray value can't inject junk. */
export const gtmEnabled = !!GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID)

/**
 * Google Ads conversion tracking.
 *
 * This is separate from the GTM/GA4 container above. It loads the Google Ads
 * global site tag (gtag.js) and fires the "Contact" conversion action so paid
 * search leads are attributed back to the campaign. The id and label are
 * public, client-side identifiers (they ship in the page regardless of where
 * they're stored) — but they're still *this client's* account, so they live
 * in an env var rather than a literal: a value that can be wrong belongs
 * somewhere it can be checked and changed without touching code, not baked
 * into a shared component file. Set VITE_GOOGLE_ADS_ID and
 * VITE_GOOGLE_ADS_CONTACT_LABEL in `.env` (see .env.example). Blank = no Ads
 * tag loads at all, same fail-safe shape as GTM_ID above.
 *
 * Gated on a production build (in addition to the id being set) so local dev
 * never loads the tag or reports a conversion into the live campaign. The
 * event fires only on a confirmed lead (see trackAdsConversion callers),
 * never on page load.
 */
export const ADS_ID = (import.meta.env as Record<string, string | undefined>)
  .VITE_GOOGLE_ADS_ID?.trim()
export const ADS_CONTACT_LABEL = (
  import.meta.env as Record<string, string | undefined>
).VITE_GOOGLE_ADS_CONTACT_LABEL?.trim()
export const adsEnabled =
  import.meta.env.PROD && !!ADS_ID && !!ADS_CONTACT_LABEL

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

/**
 * Report a Google Ads conversion for a completed contact enquiry. Safe to call
 * from anywhere: it no-ops on the server and when the Ads tag never loaded
 * (local dev, or before the gtag.js request resolves).
 */
export function trackAdsConversion(): void {
  if (typeof window === 'undefined') return
  const w = window as GtagWindow
  if (typeof w.gtag !== 'function') return
  w.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${ADS_CONTACT_LABEL}`,
  })
}

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> }

/**
 * Push a named event to the dataLayer for GTM to act on. Safe to call from
 * anywhere and at any time — it no-ops until GTM is enabled, and on the server.
 * This is how conversions are reported: the code fires a plain event, and which
 * of them count as a GA4 conversion is decided inside GTM, not here.
 */
export function trackEvent(
  event: string,
  params: Record<string, unknown> = {},
): void {
  if (!gtmEnabled || typeof window === 'undefined') return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...params })
}

/**
 * Last route we sent, held at module scope on purpose. A per-component ref would
 * reset if the component ever remounts (React StrictMode double-mounts in dev,
 * for one), which would fire the first page_view twice and inflate every
 * session's landing count. Module scope survives remounts within a page load
 * and resets on a real reload — exactly one push per distinct route.
 */
let lastSentHref: string | null = null

/**
 * Push a page_view for this route, once per distinct href.
 *
 * This is a client-routed SPA: navigating between pages never reloads the
 * document, so GA4's automatic page_view (which only fires on a real load)
 * would report one hit per session and miss the whole journey. Pushing an
 * explicit event on each route change makes every page show up.
 *
 * NOTE for the GTM side: to avoid double-counting the first view, configure the
 * GA4 Configuration tag with send_page_view = false and send page_view from a
 * GA4 Event tag triggered by the custom `page_view` event pushed here. (See
 * .env.example / the setup notes.)
 */
export function trackPageView(href: string): void {
  if (!gtmEnabled) return
  if (typeof window === 'undefined') return
  if (lastSentHref === href) return
  lastSentHref = href

  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({
    event: 'page_view',
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  })
}
