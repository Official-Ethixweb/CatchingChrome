import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { ThemeController } from '~/components/ThemeController'
import { NotFoundPage } from '~/components/NotFoundPage'
import { JsonLd } from '~/components/JsonLd'
import { BUSINESS_LD } from '~/lib/business'
import {
  Analytics,
  GtmHeadScript,
  GtmNoScript,
  GoogleAdsHeadScript,
} from '~/components/Analytics'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Catching Chrome | PNW Guide Service' },
      {
        name: 'description',
        content:
          "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters.",
      },
      { name: 'theme-color', content: '#0E2A3B' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Catching Chrome' },
      {
        property: 'og:title',
        content: 'Catching Chrome | PNW Guide Service',
      },
      {
        property: 'og:description',
        content:
          "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters.",
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Catching Chrome | PNW Guide Service',
      },
      {
        name: 'twitter:description',
        content:
          "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters.",
      },
      { property: 'og:image', content: '/brand/og-image.png' },
      { name: 'twitter:image', content: '/brand/og-image.png' },
    ],
    links: [
      // Favicons crop to the salmon roundel on a navy tile — the full lockup's
      // wordmark is unreadable at 16/32px. See scripts/optimize-brand.mjs.
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/brand/favicon-32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/brand/favicon-192.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/brand/apple-touch-icon.png',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      // The font stylesheet is loaded asynchronously (see RootDocument) so it
      // never render-blocks; this warms the fetch in parallel.
      { rel: 'preload', as: 'style', href: FONT_URL },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  return (
    <RootDocument>
      {/* Pushes a page_view to GTM's dataLayer on every route change (no-op
          until VITE_GTM_ID is set). */}
      <Analytics />
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* GTM as high in <head> as possible, per Google's guidance. No-op
            unless VITE_GTM_ID is set. */}
        <GtmHeadScript />
        {/* Google Ads global site tag (gtag.js). No-op in dev. */}
        <GoogleAdsHeadScript />
        <HeadContent />
        {/* Site-wide LocalBusiness schema — one identity, every page. */}
        <JsonLd data={BUSINESS_LD} />
        {/* Load the Google Fonts stylesheet without render-blocking: append it
            as a print-media sheet (fetched but not applied), then flip to all
            once it loads. `display=swap` already prevents invisible text. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_URL}';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONT_URL} />
        </noscript>
      </head>
      <body>
        {/* GTM no-JS fallback, immediately after <body> open per Google. */}
        <GtmNoScript />
        <ThemeController />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
