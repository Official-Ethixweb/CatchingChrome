import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { ThemeController } from '~/components/ThemeController'

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
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
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
