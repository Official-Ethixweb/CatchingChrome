import { PhoneIcon } from './icons'

const PHONE = '(503) 936-9090'
const PHONE_HREF = 'tel:5039369090'

/**
 * The hero's single call to action: tap the number to dial. It replaced the
 * Book Now button entirely (2026-08-02, user directive) — the phone is the
 * fastest route to a booking, so nothing competes with it here.
 *
 * The motion is CSS keyframes (see styles.css) rather than rAF, so it keeps
 * running in background tabs, and it all switches off under
 * prefers-reduced-motion.
 */
export function HeroCall() {
  return (
    <div className="mt-9 flex justify-center">
      <a
        href={PHONE_HREF}
        data-cta="hero-call"
        aria-label={`Call Catching Chrome at ${PHONE}`}
        className="hero-phone group relative inline-flex items-center gap-4 rounded-full border-2 border-accent/70 bg-ink/50 px-6 py-3.5 backdrop-blur-sm transition-colors duration-200 hover:border-accent md:px-8 md:py-4"
      >
        {/* Ripple rings, emitted on hover/focus */}
        <span aria-hidden="true" className="hero-phone-ring" />
        <span aria-hidden="true" className="hero-phone-ring hero-phone-ring-2" />

        <span className="hero-phone-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-ink md:h-12 md:w-12">
          <PhoneIcon className="h-5 w-5 md:h-6 md:w-6" />
        </span>

        <span className="flex flex-col text-left leading-none">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/65 md:text-[11px]">
            Call the captain
          </span>
          <span className="mt-1.5 font-display text-[20px] tracking-wide text-white transition-colors duration-200 group-hover:text-accent md:text-[26px]">
            {PHONE}
          </span>
        </span>
      </a>
    </div>
  )
}
