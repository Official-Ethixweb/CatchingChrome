/**
 * Cohesive, on-brand fish illustrations for Catching Chrome.
 *
 * Four base body shapes (salmon, trout, sturgeon, shad) cover every species.
 * They power two things:
 *   - <FishArt>   a framed field-guide "specimen plate" (teal wash + fish + eye)
 *                 used as the Seasonal Catalogue fallback.
 *   - <FishGlyph> a plain single-colour silhouette (currentColor) used as
 *                 decorative drifting art on the About page.
 */

import type { ReactElement } from 'react'

export type FishShape = 'salmon' | 'trout' | 'sturgeon' | 'shad'

/* --- Pure silhouettes: fins + tail + body, filled by the parent --------- */

function SalmonBody() {
  return (
    <>
      <path d="M112,44 L130,22 L150,43 Z" />
      <path d="M182,48 L193,38 L196,50 Z" />
      <path d="M74,74 L98,94 L102,76 Z" />
      <path d="M152,86 L168,100 L176,82 Z" />
      <path d="M204,60 L242,42 L228,66 L242,90 L204,74 Z" />
      <path d="M22,68 C62,40 104,34 146,37 C176,39 198,48 210,60 L210,74 C198,84 176,90 146,92 C104,95 62,92 22,68 Z" />
    </>
  )
}

function TroutBody() {
  return (
    <>
      <path d="M108,46 L124,26 L146,45 Z" />
      <path d="M180,50 L190,42 L193,52 Z" />
      <path d="M76,76 L98,94 L104,78 Z" />
      <path d="M150,86 L166,98 L172,82 Z" />
      <path d="M202,62 L238,50 L226,68 L238,88 L202,76 Z" />
      <path d="M24,68 C62,44 104,36 146,40 C176,43 196,52 208,64 L208,74 C196,86 176,92 146,94 C104,97 62,92 24,68 Z" />
    </>
  )
}

function SturgeonBody() {
  return (
    <>
      {/* scutes along the back */}
      <path d="M70,52 L78,46 L84,53 Z" />
      <path d="M104,49 L112,43 L118,50 Z" />
      <path d="M140,48 L148,42 L154,49 Z" />
      {/* dorsal fin, set well back */}
      <path d="M182,52 L196,42 L202,54 Z" />
      {/* shark-like (heterocercal) tail, long upper lobe */}
      <path d="M214,60 L250,36 L242,58 L232,70 Z" />
      {/* long, flat-bellied body with pointed snout */}
      <path d="M18,66 C58,56 108,52 158,54 C186,55 206,58 220,64 L214,74 C186,76 148,76 108,74 C68,72 40,72 18,66 Z" />
      {/* barbels under the snout (stroked with currentColor) */}
      <path
        d="M24,68 C20,72 18,76 16,80 M30,68 C28,73 26,78 25,83"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </>
  )
}

function ShadBody() {
  return (
    <>
      <path d="M106,36 L122,16 L142,35 Z" />
      <path d="M78,84 L100,102 L106,84 Z" />
      <path d="M150,90 L164,104 L172,86 Z" />
      <path d="M198,60 L236,40 L222,68 L236,96 L198,76 Z" />
      <path d="M26,68 C60,32 106,26 148,32 C176,36 196,46 206,60 L206,78 C196,92 176,102 148,106 C106,112 60,104 26,68 Z" />
    </>
  )
}

const SHAPES: Record<FishShape, () => ReactElement> = {
  salmon: SalmonBody,
  trout: TroutBody,
  sturgeon: SturgeonBody,
  shad: ShadBody,
}

/** Eye position per shape, in the translated body coordinate space. */
const EYE: Record<FishShape, { cx: number; cy: number; r: number }> = {
  salmon: { cx: 48, cy: 64, r: 3.2 },
  trout: { cx: 48, cy: 64, r: 3.2 },
  sturgeon: { cx: 46, cy: 64, r: 2.8 },
  shad: { cx: 50, cy: 62, r: 3.2 },
}

/**
 * Framed "specimen plate": a subtle teal wash with the fish centred on top.
 * Fills its container. Used as the Seasonal Catalogue image fallback.
 */
export function FishArt({
  shape,
  className = '',
}: {
  shape: FishShape
  className?: string
}) {
  const Body = SHAPES[shape]
  const eye = EYE[shape]
  const gid = `fishfill-${shape}`
  return (
    <svg
      viewBox="0 0 260 130"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F5A69" />
          <stop offset="55%" stopColor="#0E2A3B" />
          <stop offset="100%" stopColor="#061a1f" />
        </linearGradient>
        <linearGradient id={`${gid}-fish`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7F6F2" />
          <stop offset="100%" stopColor="#B9C4CC" />
        </linearGradient>
      </defs>

      {/* background wash */}
      <rect x="0" y="0" width="260" height="130" fill={`url(#${gid}-bg)`} />

      {/* faint horizon lines for a field-guide feel */}
      <g stroke="#F7F6F2" strokeOpacity="0.05" strokeWidth="1">
        <line x1="0" y1="40" x2="260" y2="40" />
        <line x1="0" y1="90" x2="260" y2="90" />
      </g>

      {/* the fish specimen (barbels stroke reads currentColor = muted) */}
      <g
        transform="translate(6,12)"
        fill={`url(#${gid}-fish)`}
        style={{ color: '#B9C4CC' }}
      >
        <Body />
      </g>

      {/* eye punched back to the background colour */}
      <circle cx={eye.cx + 6} cy={eye.cy + 12} r={eye.r} fill="#0E2A3B" />
    </svg>
  )
}

/**
 * Plain fish silhouette in currentColor, no background — for decorative,
 * drifting art. Colour and size come from the caller via `className`.
 */
export function FishGlyph({
  shape,
  className = '',
}: {
  shape: FishShape
  className?: string
}) {
  const Body = SHAPES[shape]
  return (
    <svg
      viewBox="0 0 260 130"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(6,12)">
        <Body />
      </g>
    </svg>
  )
}
