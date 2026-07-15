import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { ThemeController } from '~/components/ThemeController'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'

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
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/Catching-Chrome-logo_color-1536x1533.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/Catching-Chrome-logo_color-1536x1533.png',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

/**
 * The default is an unstyled "Not Found" string with no header, no footer and
 * no way back — a dead end for anyone arriving on a stale link or a typo. This
 * keeps them inside the site and pointed at the two pages they most likely
 * wanted.
 */
function NotFound() {
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
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-cream/60">
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

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeController />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
