import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

/**
 * Scroll-driven light/dark theme.
 *
 * Sections that should read as "dark chapters" are marked `data-chapter="dark"`.
 * When one occupies the vertical middle of the viewport we set
 * `data-theme="dark"` on <html>; otherwise we fall back to light. Opted-in
 * sections (`.theme-transition`) then cross-fade between the two (see
 * styles.css). Renders nothing.
 *
 * Re-runs on route change so it re-observes the new page's sections. Pages
 * without any dark chapters simply stay light.
 */
export function ThemeController() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>('[data-chapter="dark"]'),
    )

    if (chapters.length === 0) {
      root.dataset.theme = 'light'
      return
    }

    const active = new Set<Element>()
    const apply = () => {
      root.dataset.theme = active.size > 0 ? 'dark' : 'light'
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target)
          else active.delete(e.target)
        }
        apply()
      },
      // Only the section crossing the middle band of the screen counts as active.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    chapters.forEach((c) => io.observe(c))

    return () => {
      io.disconnect()
      root.dataset.theme = 'light'
    }
  }, [pathname])

  return null
}
