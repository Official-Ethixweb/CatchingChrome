import { useEffect, useRef, useState } from 'react'

interface CurvedLogoLoopProps {
  logos: string[]
  /** px travelled along the path per frame */
  speed?: number
  /** gap between logos, in path-length units */
  spacing?: number
  className?: string
}

// viewBox matches Hero wave curve SVG (1440 x 200)
const VIEW_W = 1440
const VIEW_H = 200
const PATH_D =
  'M -120 150 L 0 150 C 360 190 1080 70 1440 130 L 1560 130'

export default function CurvedLogoLoop({
  logos,
  speed = 0.5,
  spacing = 220,
  className = '',
}: CurvedLogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])
  const offsetRef = useRef(0)
  const lenRef = useRef(0)
  const [slots, setSlots] = useState<number[]>([])
  const [calculatedSpacing, setCalculatedSpacing] = useState(spacing)

  // Measure path length and build slot indices with mathematically equal spacing
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    lenRef.current = len

    // Determine how many slots can fit based on target spacing, at least logos.length
    const targetSpacing = spacing
    let n = Math.round(len / targetSpacing)
    n = Math.max(logos.length, n)

    // Calculate exact spacing so slots divide the path length with perfect uniformity
    const actualSpacing = len / n
    setCalculatedSpacing(actualSpacing)
    setSlots(Array.from({ length: n }, (_, i) => i))
  }, [logos.length, spacing])

  // Update layout and run animation
  useEffect(() => {
    const path = pathRef.current
    if (!path || slots.length === 0 || !containerRef.current) return
    const len = lenRef.current

    const place = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const screenW = rect.width
      const screenH = rect.height

      const o = offsetRef.current
      for (const i of slots) {
        const el = logoRefs.current[i]
        if (!el) continue

        // Positions slots at exact intervals of calculatedSpacing
        const d = (i * calculatedSpacing + o) % len
        const p = path.getPointAtLength(d)
        // Sample slightly ahead to compute the tangent angle
        const p2 = path.getPointAtLength(Math.min(d + 1, len))

        // Convert path viewBox coordinates to client screen pixels
        const px = (p.x / VIEW_W) * screenW
        const py = (p.y / VIEW_H) * screenH

        // Scale tangent delta to handle stretched aspect ratio rotation
        const dx = ((p2.x - p.x) / VIEW_W) * screenW
        const dy = ((p2.y - p.y) / VIEW_H) * screenH
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI

        // Set position and rotation via inline CSS transform
        el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${angle}deg)`
      }
    }

    place()

    // Handle screen resize events to recalculate positions instantly
    window.addEventListener('resize', place)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => window.removeEventListener('resize', place)
    }

    let frame = 0
    const step = () => {
      // Move from right to left (scrolling marquee direction)
      offsetRef.current = (offsetRef.current - speed + len) % len
      place()
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', place)
    }
  }, [slots, speed, calculatedSpacing])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 bottom-0 z-20 w-full h-[70px] md:h-[130px] overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Hidden SVG with path only used to generate path coordinates in JS */}
      <svg className="hidden" aria-hidden="true">
        <path ref={pathRef} d={PATH_D} />
      </svg>

      {slots.map((i) => {
        const logoUrl = logos[i % logos.length]
        const isCatchZone = logoUrl.includes('catch zone')

        return (
          <div
            key={i}
            ref={(el) => {
              logoRefs.current[i] = el
            }}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-[85%] pointer-events-auto will-change-transform"
          >
            <img
              src={logoUrl}
              alt="Partner logo"
              className="h-9 w-auto max-w-[110px] md:h-12 md:max-w-[150px] object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
              style={isCatchZone ? { filter: 'brightness(0)' } : undefined}
            />
          </div>
        )
      })}
    </div>
  )
}
