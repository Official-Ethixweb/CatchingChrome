import { useEffect, useState } from 'react'
import { WeatherGlyph } from './icons'
import { getRiverConditions, type RiverConditions } from '~/lib/weather'

/**
 * Compact live-weather readout for the home water (Columbia River, The Dalles,
 * OR), shown in the centre of the sticky header. Colours are inherited from the
 * sticky bar (currentColor) so it flips with the scroll-driven light/dark
 * theme. Renders nothing until a reading is in — and stays hidden entirely if
 * the OpenWeather key isn't configured (server fn returns null), so it never
 * shows a broken/empty state.
 */
export function OregonWeather({ className = '' }: { className?: string }) {
  const [wx, setWx] = useState<RiverConditions | null>(null)

  // Keep the readout live: fetch on mount, retry a few times if the call fails
  // or the key is briefly unavailable, refresh every 10 minutes, and refetch
  // whenever the tab regains focus. A failed refresh keeps the last good
  // reading on screen rather than blanking it.
  useEffect(() => {
    let alive = true
    let attempts = 0

    const load = () => {
      getRiverConditions()
        .then((data) => {
          if (!alive) return
          if (data) {
            setWx(data)
            attempts = 0
          } else if (attempts < 3) {
            attempts++
            setTimeout(load, 4000)
          }
        })
        .catch(() => {
          if (alive && attempts < 3) {
            attempts++
            setTimeout(load, 4000)
          }
        })
    }

    load()
    const refresh = setInterval(
      () => {
        attempts = 0
        load()
      },
      10 * 60 * 1000,
    )
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        attempts = 0
        load()
      }
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      alive = false
      clearInterval(refresh)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!wx) return null

  return (
    <div
      className={`flex items-center gap-2 text-[12.5px] tracking-wide ${className}`}
      title={`Oregon · ${wx.description} · ${wx.locationLabel}`}
    >
      {/* currentColor so it stays readable on both the light and dark bar
          (accent/cyan washes out on the bone-white sticky bar). */}
      <WeatherGlyph id={wx.conditionId} className="h-[18px] w-[18px] opacity-90" />
      <span className="font-semibold">{wx.tempF}°F</span>
      {/* The condition + location only appear at 2xl; at narrower widths the
          sticky-bar socials/CTAs crowd the centre, so we keep it compact. */}
      <span className="hidden opacity-40 2xl:inline">·</span>
      <span className="hidden capitalize opacity-80 2xl:inline">
        {wx.description || wx.main}
      </span>
      <span className="hidden opacity-55 2xl:inline">· Oregon</span>
    </div>
  )
}
