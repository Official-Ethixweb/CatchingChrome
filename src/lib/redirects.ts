/**
 * Legacy / marketing URL redirects.
 *
 * The site is seven flat routes with no per-species or per-trip pages, but ad
 * campaigns, printed material and old links all point at URLs that read like
 * they should exist: /american-shad, /book-now, /rates, /salmon-fishing. Every
 * one of those used to land on the 404 page, which for Google Ads means a
 * disapproved ad ("Destination not working"), and for a guest means a dead end
 * one click from booking.
 *
 * Resolution happens in two passes:
 *  1. EXACT  — a normalized full-path match. Cheap and unambiguous.
 *  2. KEYWORD — an ordered scan for a species or intent word anywhere in the
 *     path, so /fishing/american-shad and /american-shad-trips-oregon land the
 *     same place as /american-shad without needing an entry each.
 *
 * The six species slugs are NOT in here: /american-shad, /fall-chinook,
 * /spring-chinook, /winter-steelhead, /sturgeon and /dungeness-crab are real
 * routes serving real pages (see src/routes/*.tsx and src/lib/species.ts), so
 * they never reach this file. What is here are the *variants* of those slugs,
 * pointed at the canonical page.
 *
 * Status codes are 301 across the board now that every destination is a real,
 * settled page. A permanent redirect is what consolidates ranking signal onto
 * the canonical URL, and none of these targets are going to move.
 */

export type RedirectTarget = {
  /** Path (plus optional hash) to send the visitor to. */
  href: string
  statusCode: 301 | 302
}

/** Canonical species landing pages. Variants below all funnel into these. */
const TRIP = {
  fallChinook: '/fall-chinook',
  springChinook: '/spring-chinook',
  steelhead: '/winter-steelhead',
  sturgeon: '/sturgeon',
  crab: '/dungeness-crab',
  shad: '/american-shad',
} as const

const species = (href: string): RedirectTarget => ({ href, statusCode: 301 })
const alias = (href: string): RedirectTarget => ({ href, statusCode: 301 })

const EXACT: Record<string, RedirectTarget> = {
  // --- Species variants -> the canonical species page -----------------------
  shad: species(TRIP.shad),
  'shad-fishing': species(TRIP.shad),
  'american-shad-fishing': species(TRIP.shad),

  'summer-chinook': species(TRIP.fallChinook),
  chinook: species(TRIP.fallChinook),
  'chinook-salmon': species(TRIP.fallChinook),
  'chinook-fishing': species(TRIP.fallChinook),
  'king-salmon': species(TRIP.fallChinook),
  kings: species(TRIP.fallChinook),
  salmon: species(TRIP.fallChinook),
  'salmon-fishing': species(TRIP.fallChinook),
  'salmon-trips': species(TRIP.fallChinook),
  coho: species(TRIP.fallChinook),
  'coho-salmon': species(TRIP.fallChinook),
  'silver-salmon': species(TRIP.fallChinook),
  springers: species(TRIP.springChinook),
  springer: species(TRIP.springChinook),

  steelhead: species(TRIP.steelhead),
  'summer-steelhead': species(TRIP.steelhead),
  'steelhead-fishing': species(TRIP.steelhead),
  'steelhead-trips': species(TRIP.steelhead),

  'white-sturgeon': species(TRIP.sturgeon),
  'sturgeon-fishing': species(TRIP.sturgeon),
  'sturgeon-trips': species(TRIP.sturgeon),

  crab: species(TRIP.crab),
  crabbing: species(TRIP.crab),
  'crab-trips': species(TRIP.crab),
  'crab-fishing': species(TRIP.crab),
  dungeness: species(TRIP.crab),

  // --- Trip / service pages -------------------------------------------------
  trips: alias('/excursions'),
  tours: alias('/excursions'),
  charters: alias('/excursions'),
  charter: alias('/excursions'),
  excursion: alias('/excursions'),
  services: alias('/excursions'),
  'fishing-trips': alias('/excursions'),
  'guided-trips': alias('/excursions'),
  'guided-fishing': alias('/excursions'),
  'fishing-charters': alias('/excursions'),
  'signature-trips': alias('/excursions'),

  // --- Booking / contact ----------------------------------------------------
  book: alias('/contact'),
  'book-now': alias('/contact'),
  booking: alias('/contact'),
  bookings: alias('/contact'),
  'book-a-trip': alias('/contact'),
  'book-online': alias('/contact'),
  reserve: alias('/contact'),
  reservation: alias('/contact'),
  reservations: alias('/contact'),
  quote: alias('/contact'),
  'get-a-quote': alias('/contact'),
  'request-a-quote': alias('/contact'),
  inquire: alias('/contact'),
  inquiry: alias('/contact'),
  'contact-us': alias('/contact'),
  'get-in-touch': alias('/contact'),
  schedule: alias('/contact'),

  // --- Pricing --------------------------------------------------------------
  rates: alias('/pricing'),
  prices: alias('/pricing'),
  price: alias('/pricing'),
  cost: alias('/pricing'),
  'rates-and-pricing': alias('/pricing'),
  'trip-rates': alias('/pricing'),

  // --- About / captain ------------------------------------------------------
  'about-us': alias('/about'),
  captain: alias('/about#captain'),
  'meet-the-captain': alias('/about#captain'),
  'captain-ryan': alias('/about#captain'),
  guide: alias('/about'),
  guides: alias('/about'),
  'our-team': alias('/about'),
  team: alias('/about'),
  story: alias('/about'),
  'our-story': alias('/about'),

  // --- Gallery --------------------------------------------------------------
  photos: alias('/gallery'),
  'photo-gallery': alias('/gallery'),
  pictures: alias('/gallery'),
  images: alias('/gallery'),
  media: alias('/gallery'),
  catches: alias('/gallery'),

  // --- Commercial / corporate ----------------------------------------------
  corporate: alias('/commercial'),
  'corporate-trips': alias('/commercial'),
  'corporate-charters': alias('/commercial'),
  'group-trips': alias('/commercial'),
  'group-charters': alias('/commercial'),
  'commercial-fishing': alias('/commercial'),
  'commercial-charters': alias('/commercial'),
  business: alias('/commercial'),

  // --- Home aliases ---------------------------------------------------------
  home: alias('/'),
  index: alias('/'),
  'home-page': alias('/'),
  main: alias('/'),

  // --- Single-page-site anchors that were never pages -----------------------
  faq: alias('/#faq'),
  faqs: alias('/#faq'),
  seasons: alias('/#season-calendar'),
  'season-calendar': alias('/#season-calendar'),
  calendar: alias('/#season-calendar'),
  'fishing-calendar': alias('/#season-calendar'),
  fleet: alias('/#fleet'),
  boats: alias('/#fleet'),
  merch: alias('/#merch'),
  merchandise: alias('/#merch'),
  apparel: alias('/#merch'),
  shop: alias('/#merch'),
  store: alias('/#merch'),
  testimonials: alias('/#testimonials'),
  reviews: alias('/#testimonials'),
  'boat-ramps': alias('/#boat-ramps'),
  ramps: alias('/#boat-ramps'),
  partners: alias('/#partners'),
}

/**
 * Ordered — first match wins, so the specific species words come before the
 * generic "fishing"/"charter" catch-alls. Only run when EXACT misses.
 */
const KEYWORD_RULES: Array<{ test: RegExp; target: RedirectTarget }> = [
  { test: /shad/, target: species(TRIP.shad) },
  { test: /steelhead/, target: species(TRIP.steelhead) },
  { test: /sturgeon/, target: species(TRIP.sturgeon) },
  { test: /crab|dungeness/, target: species(TRIP.crab) },
  { test: /spring-?chinook|springer/, target: species(TRIP.springChinook) },
  {
    test: /chinook|salmon|coho|\bking\b|silver/,
    target: species(TRIP.fallChinook),
  },
  { test: /book|reserv|quote|inquir|contact|schedul/, target: alias('/contact') },
  { test: /price|pricing|rate|cost/, target: alias('/pricing') },
  { test: /corporate|commercial|group|company|team-building/, target: alias('/commercial') },
  { test: /photo|gallery|picture|image/, target: alias('/gallery') },
  { test: /captain|about|bio|story/, target: alias('/about') },
  { test: /merch|apparel|shirt|hat|hoodie|shop|store/, target: alias('/#merch') },
  { test: /trip|tour|charter|excursion|fishing|guide/, target: alias('/excursions') },
]

/**
 * Strips the noise that separates the same URL written five ways: casing, a
 * trailing slash, an old file extension, underscores from a legacy CMS, and
 * the `/fishing/american-shad/` style path prefixes ad copy tends to grow.
 */
function normalize(pathname: string): string {
  return decodeURIComponent(pathname)
    .toLowerCase()
    .replace(/\.(html?|php|aspx?)$/, '')
    .replace(/[\s_+]+/g, '-')
    .replace(/^\/+|\/+$/g, '')
    .replace(/-{2,}/g, '-')
}

/**
 * Returns where an unmatched path should go, or null to let it 404.
 *
 * Falling through to a real 404 matters: blanket-redirecting every unknown URL
 * to the homepage is a soft-404, which Google treats as a quality problem.
 * Only paths that plausibly meant something get rescued.
 */
export function resolveRedirect(pathname: string): RedirectTarget | null {
  const path = normalize(pathname)
  if (!path) return null

  const exact = EXACT[path]
  if (exact) return exact

  // A nested path (/services/american-shad) matches on its last segment too.
  const lastSegment = path.slice(path.lastIndexOf('/') + 1)
  if (lastSegment !== path) {
    const nested = EXACT[lastSegment]
    if (nested) return nested
  }

  for (const rule of KEYWORD_RULES) {
    if (rule.test.test(path)) return rule.target
  }

  return null
}
