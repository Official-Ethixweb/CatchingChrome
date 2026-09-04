/**
 * The wavy sweep that ends a hero, curving into the section beneath it.
 *
 * `fill` has to name the colour of whatever section actually follows, because
 * the illusion is that the next section is rising up over the hero — a wave in
 * any other colour reads as a stripe. That colour is not the same on every
 * page (cream after most heroes, white after the excursions one), so it is a
 * prop rather than a constant.
 *
 * The 1px overhang (`-bottom-px`, +1px height) and the path running to y=205
 * are not cosmetic: with the fill edge landing exactly on the hero's bottom
 * edge, that last device-pixel row was only partly covered and the hero's ink
 * bled through as a thin line across the section seam. Overhanging puts solid
 * fill on that row instead. The heroes pair this with `-mb-px` so a fractional
 * viewport height can't open a real gap there either.
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
      className={`pointer-events-none absolute inset-x-0 -bottom-px z-10 h-[71px] w-full md:h-[131px] ${fill} ${className}`}
    >
      <path d="M0,205 L0,150 C 360,190 1080,70 1440,130 L1440,205 Z" />
    </svg>
  )
}
