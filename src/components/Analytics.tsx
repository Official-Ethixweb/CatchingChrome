import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

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
const GTM_ID = (import.meta.env as Record<string, string | undefined>)
  .VITE_GTM_ID?.trim()

/** True only for a well-formed container id, so a stray value can't inject junk. */
export const gtmEnabled = !!GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID)

/** The loader snippet for the document <head>. Rendered only when enabled. */
export function GtmHeadScript() {
  if (!gtmEnabled) return null
  return (
    <script
      // Standard GTM bootstrap: it creates dataLayer and injects gtm.js.
      dangerouslySetInnerHTML={{
        __html:
          `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
          `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
          `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=` +
          `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
          `})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  )
}

/** The no-JS fallback iframe for immediately after <body>. Rendered only when enabled. */
export function GtmNoScript() {
  if (!gtmEnabled) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="gtm"
      />
    </noscript>
  )
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
 * Push a page_view on every route change, first load included.
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
export function Analytics() {
  // Re-renders on navigation; the search string is included so ?query changes
  // that swap content still count as a view.
  const href = useRouterState({
    select: (s) => s.location.pathname + s.location.searchStr,
  })

  useEffect(() => {
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
  }, [href])

  // Conversion tracking for phone and email taps. One delegated, capture-phase
  // listener catches clicks on any tel:/mailto: link anywhere on the site —
  // header, sticky bar, footer, contact page, mobile menu — so a new link
  // added later is covered without touching this file. These are the primary
  // lead actions for a guide service alongside the contact form; a click means
  // intent to call, which is as close to a phone-call conversion as the web can
  // measure. (True call-connect tracking needs a call-tracking number, which is
  // a separate service.)
  useEffect(() => {
    if (!gtmEnabled || typeof document === 'undefined') return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const link = a.getAttribute('href') || ''
      const label = (a.textContent || '').trim().slice(0, 80)
      if (link.startsWith('tel:')) {
        trackEvent('phone_click', { link_url: link, link_text: label })
      } else if (link.startsWith('mailto:')) {
        trackEvent('email_click', { link_url: link, link_text: label })
      }
    }
    // Capture phase so the event is recorded even if something calls
    // stopPropagation on the way up.
    document.addEventListener('click', onClick, { capture: true })
    return () =>
      document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
