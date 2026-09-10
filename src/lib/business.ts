import { SOCIALS } from './socials'

/**
 * Site-wide LocalBusiness facts, structured for JSON-LD (see __root.tsx).
 *
 * No `address` field: this is a boat-based, service-area business with no
 * storefront, so per Google's own guidance for service-area businesses we
 * describe where the business operates via `areaServed` instead of inventing
 * a street address. Every value here already appears, verbatim, somewhere on
 * the site (SiteFooter, contact.tsx) — kept in one place so schema and visible
 * copy can't drift apart.
 */
export const BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Catching Chrome Guide Service',
  alternateName: 'Catching Chrome',
  url: 'https://www.catchingchromeguideservice.com/',
  telephone: '+1-503-936-9090',
  email: 'ryanbfishin@gmail.com',
  image: 'https://www.catchingchromeguideservice.com/brand/og-image.png',
  logo: 'https://www.catchingchromeguideservice.com/brand/logo.png',
  description:
    "Expert-guided fishing excursions on Oregon and the Pacific Northwest's most pristine waters.",
  areaServed: {
    '@type': 'State',
    name: 'Oregon',
  },
  priceRange: '$150-$250',
  // Placeholder social links (href: '#', e.g. Facebook as of 2026-07-16) are
  // deliberately excluded — a sameAs entry that 404s is worse than omitting it.
  sameAs: SOCIALS.filter((s) => s.href !== '#').map((s) => s.href),
} as const
