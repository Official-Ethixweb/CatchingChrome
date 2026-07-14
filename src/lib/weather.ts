import { createServerFn } from '@tanstack/react-start'
import { overallRating, RATING_META, type Rating } from './fishingCalendar'

// Minimal ambient typing for the server-only env lookup (no @types/node here).
declare const process: { env: Record<string, string | undefined> }

/**
 * Live conditions for the home water, used to nudge the fishing calendar's
 * "today" outlook. The OpenWeather key stays server-side: the browser calls
 * `getRiverConditions()` (a TanStack server function) and never sees the key.
 *
 * To enable: add OPENWEATHER_API_KEY=<key> to a `.env` file (see .env.example).
 * Without it, the server function returns null and the UI falls back to the
 * seasonal outlook only.
 */

// Home water for the live reading — Columbia River, The Dalles pool, prime
// fall-Chinook country. Adjust to Ryan's preferred launch if desired.
const SPOT = {
  lat: 45.6,
  lon: -121.18,
  label: 'Columbia River · The Dalles, OR',
}

export type RiverConditions = {
  tempF: number
  feelsF: number
  windMph: number
  gustMph: number | null
  cloudsPct: number
  /** OpenWeather condition group, e.g. "Clouds", "Rain", "Clear". */
  main: string
  /** Human description, e.g. "overcast clouds". */
  description: string
  /** OpenWeather condition id (2xx thunder, 5xx rain, 8xx clouds…). */
  conditionId: number
  pressure: number
  locationLabel: string
  fetchedAt: number
}

export const getRiverConditions = createServerFn({ method: 'GET' }).handler(
  async (): Promise<RiverConditions | null> => {
    const key = process.env.OPENWEATHER_API_KEY
    if (!key) return null

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${SPOT.lat}&lon=${SPOT.lon}&units=imperial&appid=${key}`

    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
      if (!res.ok) return null
      const d = await res.json()
      const w = d.weather?.[0] ?? {}
      return {
        tempF: Math.round(d.main?.temp ?? 0),
        feelsF: Math.round(d.main?.feels_like ?? d.main?.temp ?? 0),
        windMph: Math.round(d.wind?.speed ?? 0),
        gustMph: d.wind?.gust != null ? Math.round(d.wind.gust) : null,
        cloudsPct: Math.round(d.clouds?.all ?? 0),
        main: w.main ?? 'Unknown',
        description: w.description ?? '',
        conditionId: w.id ?? 800,
        pressure: Math.round(d.main?.pressure ?? 1013),
        locationLabel: SPOT.label,
        fetchedAt: Date.now(),
      }
    } catch {
      return null
    }
  },
)

/* ---- Pure outlook logic (safe to run in the browser) ------------------- */

export type OutlookTier = 'prime' | 'promising' | 'fair' | 'slow' | 'tough'

export type BiteOutlook = {
  /** 0–100 bite index. */
  score: number
  tier: OutlookTier
  label: string
  /** Short, human reason referencing today's conditions. */
  reason: string
}

const TIER_LABEL: Record<OutlookTier, string> = {
  prime: 'Prime',
  promising: 'Promising',
  fair: 'Fair',
  slow: 'Slow',
  tough: 'Tough',
}

const BASE_BY_RATING: Record<Rating, number> = {
  excellent: 78,
  good: 62,
  fair: 46,
  poor: 28,
}

/**
 * Blend the month's seasonal baseline with live weather into a single bite
 * outlook. Salmon bite better in soft light, on a little fresh rain, and in
 * fishable wind — the modifiers below encode that in a deliberately modest way.
 */
export function biteOutlook(
  monthIndex: number,
  wx: RiverConditions | null,
): BiteOutlook {
  const rating = overallRating(monthIndex)
  let score = BASE_BY_RATING[rating]

  if (!wx) {
    const tier = tierFor(score)
    return {
      score,
      tier,
      label: TIER_LABEL[tier],
      reason: `Seasonal outlook: ${RATING_META[rating].label.toLowerCase()} salmon window right now.`,
    }
  }

  const positives: string[] = []
  const negatives: string[] = []

  // Cloud cover — low light is prime.
  if (wx.cloudsPct >= 65) {
    score += 8
    positives.push('soft overcast light')
  } else if (wx.cloudsPct <= 30) {
    score -= 4
    negatives.push('bright bluebird sky')
  }

  // Wind — some chop helps, too much shuts the river down.
  if (wx.windMph < 8) {
    score += 3
  } else if (wx.windMph > 28) {
    score -= 12
    negatives.push('heavy wind')
  } else if (wx.windMph > 18) {
    score -= 6
    negatives.push('a stiff breeze')
  }

  // Precip — a little fresh water pulls fish; storms push them down.
  const id = wx.conditionId
  if (id >= 200 && id < 300) {
    score -= 10
    negatives.push('thunderstorms')
  } else if ((id >= 300 && id < 400) || (id >= 500 && id <= 501)) {
    score += 6
    positives.push('a light freshet')
  } else if (id >= 502 && id < 600) {
    score -= 8
    negatives.push('heavy rain')
  }

  // Temperature comfort.
  if (wx.tempF > 82) {
    score -= 6
    negatives.push('midsummer heat')
  } else if (wx.tempF < 34) {
    score -= 4
    negatives.push('a hard freeze')
  } else if (wx.tempF >= 44 && wx.tempF <= 68) {
    score += 3
  }

  // Barometric pressure — a falling glass ahead of a front turns fish on.
  if (wx.pressure < 1005) {
    score += 5
    positives.push('a dropping barometer')
  } else if (wx.pressure > 1025) {
    score -= 3
  }

  score = Math.max(5, Math.min(98, Math.round(score)))
  const tier = tierFor(score)

  let reason: string
  if (negatives.length && (tier === 'slow' || tier === 'tough')) {
    reason = `${cap(negatives[0])} is working against the bite today.`
  } else if (positives.length) {
    reason = `${cap(positives[0])} has the fish moving today.`
  } else {
    reason = `Steady conditions over ${article(RATING_META[rating].label.toLowerCase())} salmon window.`
  }

  return { score, tier, label: TIER_LABEL[tier], reason }
}

function tierFor(score: number): OutlookTier {
  if (score >= 75) return 'prime'
  if (score >= 60) return 'promising'
  if (score >= 45) return 'fair'
  if (score >= 30) return 'slow'
  return 'tough'
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** "excellent" -> "an excellent". Ratings are a closed set, so a vowel test is enough. */
function article(s: string) {
  return `${/^[aeiou]/.test(s) ? 'an' : 'a'} ${s}`
}
