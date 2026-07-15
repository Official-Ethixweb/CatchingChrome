/**
 * The wavy sweep that ends a hero, curving into the section beneath it.
 *
 * `fill` has to name the colour of whatever section actually follows, because
 * the illusion is that the next section is rising up over the hero — a wave in
 * any other colour reads as a stripe. That colour is not the same on every
 * page (cream after most heroes, white after the excursions one), so it is a
 * prop rather than a constant.
 *
 * Drop it in as the last child of a `relative` hero that clips its overflow.
 */
export function WaveDivider({
  fill = 'fill-cream',
  className = '',
}: {
  /** Tailwind fill utility matching the next section's background, e.g. "fill-white". */
  fill?: string
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 1440 200"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[70px] w-full md:h-[130px] ${fill} ${className}`}
    >
      <path d="M0,200 L0,150 C 360,190 1080,70 1440,130 L1440,200 Z" />
    </svg>
  )
}
