import { SOCIALS } from './socials'

/**
 * Site-wide LocalBusiness facts, structured for JSON-LD (see __root.tsx).
 *
 * Address: this is a boat-based, service-area business with no storefront, so
 * the address is city-level only (no street). Gladstone, OR is the location of
 * the verified Google Business Profile (see PLACE_QUERY in googleReviews.ts),
 * and every directory listing should use exactly this name, city and phone so
 * Google and AI assistants see one consistent business. Google requires an
 * `address` on LocalBusiness for local rich results; a locality-level
 * PostalAddress satisfies that without publishing a street address.
 *
 * TODO(Ryan): if the GBP ever moves or shows a different city, update
 * `address` here and in every listing at the same time.
 *
 * No aggregateRating: Google does not show review stars for reviews a business
 * publishes about itself (self-serving reviews), so marking up the Client Log
 * would earn nothing and risks a structured-data warning.
 *
 * Every other value already appears, verbatim, somewhere on the site
 * (SiteFooter, contact.tsx, MeetCaptainSection) — kept in one place so schema
 * and visible copy can't drift apart.
 */
export const BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.catchingchromeguideservice.com/#business',
  name: 'Catching Chrome Guide Service',
  alternateName: 'Catching Chrome',
  url: 'https://www.catchingchromeguideservice.com/',
  telephone: '+1-503-936-9090',
  email: 'ryanbfishin@gmail.com',
  image: 'https://www.catchingchromeguideservice.com/brand/og-image.png',
  logo: 'https://www.catchingchromeguideservice.com/brand/logo.png',
  description:
    'Guided salmon, steelhead and sturgeon trips on the Columbia River and Oregon coastal rivers, plus Dungeness crab off the Oregon coast.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gladstone',
    addressRegion: 'OR',
    postalCode: '97027',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'State',
    name: 'Oregon',
  },
  founder: {
    '@type': 'Person',
    name: 'Captain Ryan',
    jobTitle: 'USCG-licensed fishing guide',
  },
  knowsAbout: [
    'Winter steelhead fishing',
    'Spring Chinook salmon fishing',
    'Fall Chinook salmon fishing',
    'White sturgeon fishing',
    'American shad fishing',
    'Dungeness crabbing',
    'Columbia River fishing',
  ],
  priceRange: '$150-$250',
  // Placeholder social links (href: '#', e.g. Facebook as of 2026-07-16) are
  // deliberately excluded — a sameAs entry that 404s is worse than omitting it.
  sameAs: SOCIALS.filter((s) => s.href !== '#').map((s) => s.href),
} as const
