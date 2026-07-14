import type { FishShape } from '~/components/FishArt'

/**
 * Oregon salmon fishing calendar — the data behind the Seasonal Catalogue.
 *
 * Digitised from Captain Ryan's "Oregon Salmon Fishing Calendar" graphics:
 * best months by species (spring / summer / fall Chinook + coho), the peak
 * windows, and the best rivers for each run. Ratings are the four tiers from
 * the printed legend.
 */

export type Rating = 'excellent' | 'good' | 'fair' | 'poor'

export const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

export const MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

// Shorthand so the 12-month rating rows below read like the printed grid.
const E: Rating = 'excellent'
const G: Rating = 'good'
const F: Rating = 'fair'
const P: Rating = 'poor'

export type Species = {
  id: string
  name: string
  shape: FishShape
  /** Human-readable peak window, e.g. "Apr – May". */
  peak: string
  /** Best rivers for this run (from "Best Rivers by Season"). */
  rivers: string[]
  /** One-line field note. */
  blurb: string
  /** Exactly 12 ratings, Jan → Dec. */
  ratings: Rating[]
}

export const SPECIES: Species[] = [
  {
    id: 'spring-chinook',
    name: 'Spring Chinook',
    shape: 'salmon',
    peak: 'Apr – May',
    rivers: ['Willamette', 'Clackamas', 'Sandy', 'McKenzie', 'Rogue'],
    blurb:
      'Prized worldwide for their rich, high-fat meat. The first great run of the year and worth the wait.',
    //         Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
    ratings: [P, P, G, E, E, G, F, P, P, P, P, P],
  },
  {
    id: 'summer-chinook',
    name: 'Summer Chinook',
    shape: 'salmon',
    peak: 'July',
    rivers: ['Columbia', 'Deschutes', 'John Day'],
    blurb:
      'Bright, hard-fighting "June hogs" that peak in the warm mid-summer water of the upper Columbia.',
    ratings: [P, P, P, P, F, G, E, G, F, P, P, P],
  },
  {
    id: 'fall-chinook',
    name: 'Fall Chinook',
    shape: 'salmon',
    peak: 'Late Aug – Oct',
    rivers: [
      'Columbia',
      'Rogue',
      'Umpqua',
      'Wilson',
      'Trask',
      'Nestucca',
      'Nehalem',
    ],
    blurb:
      'Our best pure king fishery. Chrome-bright, full of fight — the season anglers travel across the country for.',
    ratings: [P, P, P, P, P, P, F, E, E, E, G, F],
  },
  {
    id: 'coho',
    name: 'Coho (Silver)',
    shape: 'salmon',
    peak: 'Sep – Oct',
    rivers: ['Tillamook Bay', 'Siletz', 'Alsea', 'Siuslaw', 'Coos', 'Coquille'],
    blurb:
      'Aggressive, acrobatic silvers that flood the coastal rivers in fall. A blast on lighter gear.',
    ratings: [P, P, P, P, P, P, P, F, E, E, G, P],
  },
]

export const RATING_META: Record<
  Rating,
  { label: string; note: string; rank: number }
> = {
  excellent: { label: 'Excellent', note: 'Peak fishing', rank: 3 },
  good: { label: 'Good', note: 'Strong opportunity', rank: 2 },
  fair: { label: 'Fair', note: 'Fish available, not peak', rank: 1 },
  poor: { label: 'Poor', note: 'Very limited', rank: 0 },
}

/**
 * Overall river rating for a given month — the best run available across all
 * species that month (mirrors the "Overall Oregon River Salmon Calendar").
 */
export function overallRating(monthIndex: number): Rating {
  let best: Rating = 'poor'
  for (const s of SPECIES) {
    const r = s.ratings[monthIndex]
    if (RATING_META[r].rank > RATING_META[best].rank) best = r
  }
  return best
}

/** Species sorted by how good this month is for them (best first). */
export function speciesByMonth(monthIndex: number): Species[] {
  return [...SPECIES].sort(
    (a, b) =>
      RATING_META[b.ratings[monthIndex]].rank -
      RATING_META[a.ratings[monthIndex]].rank,
  )
}
