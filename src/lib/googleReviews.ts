import { createServerFn } from '@tanstack/react-start'

// Minimal ambient typing for the server-only env lookup (no @types/node here).
declare const process: { env: Record<string, string | undefined> }

/**
 * Google reviews for the Client Log.
 *
 * Google only exposes review text through the Places API — the public Maps
 * page withholds it behind a sign-in wall, and scraping it would breach
 * Google's terms and break the first time they change their markup. So the
 * browser calls `getGoogleReviews()` (a TanStack server function) and the key
 * stays server-side, mirroring how live weather works in ./weather.ts.
 *
 * To enable: add GOOGLE_PLACES_API_KEY=<key> to `.env` (see .env.example).
 * The key needs the "Places API (New)" enabled on a billing-enabled Google
 * Cloud project. Without it we fall back to CURATED_REVIEWS below.
 *
 * Google returns at most 5 reviews and does not allow storing them, so these
 * are fetched per-request and cached only in memory.
 */

// Business listing: https://maps.google.com/?cid=18154016341532131097
const PLACE_QUERY = 'Catching Chrome Guide Service, Gladstone, Oregon'

export type Review = {
  quote: string
  author: string
  rating: number
  /** Absent for curated entries, present on live Google results. */
  relativeTime?: string
}

/**
 * Verbatim reviews as published on catchingchromeguideservice.com. These are
 * the fallback whenever the Places API is unavailable, so the section never
 * renders empty — and never renders anything Ryan's guests didn't actually say.
 */
export const CURATED_REVIEWS: Review[] = [
  {
    quote:
      'One of the best guides in Oregon just so happens to be one of my very good friends. If you ever find yourself in Oregon and want one of the best experiences, Ryan is your guy hands down. One of the best people I know.',
    author: 'keep_upwithJen',
    rating: 5,
  },
  {
    quote:
      'We hooked up early as my husband and I caught our limits. My son lost three fish and was worried he would go home empty-handed. Ryan assured us that at tide change we would get another chance. Ryan was right, Randy ended up catching one and it was the biggest fish weighing in at 29 lb.',
    author: 'Kate Hemingway',
    rating: 5,
  },
  {
    quote:
      'Ryan was amazing. Very patient and understanding. He really worked to make sure we caught fish and was patient with my daughter as she kept getting tangled with her flasher.',
    author: 'John Cook',
    rating: 5,
  },
  {
    quote:
      'Had a great time, caught our limits of Columbia springers. Great guy and Ryan will put you on the fish.',
    author: 'Jeremy K',
    rating: 5,
  },
]

type PlacesReview = {
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: { displayName?: string }
  rating?: number
  relativePublishTimeDescription?: string
}

export const getGoogleReviews = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Review[] | null> => {
    const key = process.env.GOOGLE_PLACES_API_KEY
    if (!key) return null

    try {
      const res = await fetch(
        'https://places.googleapis.com/v1/places:searchText',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': key,
            'X-Goog-FieldMask':
              'places.displayName,places.rating,places.userRatingCount,places.reviews',
          },
          body: JSON.stringify({ textQuery: PLACE_QUERY, maxResultCount: 1 }),
          signal: AbortSignal.timeout(6000),
        },
      )
      if (!res.ok) return null

      const data = await res.json()
      const reviews: PlacesReview[] = data?.places?.[0]?.reviews ?? []

      const mapped = reviews
        .map((r) => ({
          quote: (r.originalText?.text ?? r.text?.text ?? '').trim(),
          author: r.authorAttribution?.displayName?.trim() ?? '',
          rating: r.rating ?? 5,
          relativeTime: r.relativePublishTimeDescription,
        }))
        .filter((r) => r.quote && r.author)

      return mapped.length ? mapped : null
    } catch {
      return null
    }
  },
)
