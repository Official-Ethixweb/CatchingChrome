import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'
import {
  ADS_ID,
  adsEnabled,
  GTM_ID,
  gtmEnabled,
  trackEvent,
  trackPageView,
} from '~/lib/analytics'

/**
 * The tag-loading components rendered in __root.tsx, plus the always-mounted
 * <Analytics /> that reports page views and phone/email clicks. Tracking
 * state and the functions that dispatch events live in ~/lib/analytics —
 * this file only renders.
 */

/** The GTM loader snippet for the document <head>. Rendered only when enabled. */
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

/** Loads gtag.js for the Google Ads tag and initialises the command queue. */
export function GoogleAdsHeadScript() {
  if (!adsEnabled) return null
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html:
            `window.dataLayer=window.dataLayer||[];` +
            `function gtag(){dataLayer.push(arguments);}` +
            `gtag('js',new Date());` +
            `gtag('config','${ADS_ID}');`,
        }}
      />
    </>
  )
}

/**
 * Pushes a page_view to the dataLayer on every route change (first load
 * included) and reports phone/email link taps. Renders nothing.
 */
export function Analytics() {
  // Re-renders on navigation; the search string is included so ?query changes
  // that swap content still count as a view.
  const href = useRouterState({
    select: (s) => s.location.pathname + s.location.searchStr,
  })

  useEffect(() => {
    trackPageView(href)
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
