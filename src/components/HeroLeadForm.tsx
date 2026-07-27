import { useRef, useState } from 'react'
import { ArrowRight, PhoneIcon } from './icons'
import { Recaptcha, resetRecaptcha } from './Recaptcha'
import { sendContactEnquiry } from '~/lib/contact'
import { trackEvent, trackAdsConversion } from './Analytics'

// Public reCAPTCHA site key (safe to expose). When unset the checkbox is
// hidden and the form still submits; the server only enforces the challenge
// once its secret is configured. Mirrors the /contact page.
const RECAPTCHA_SITE_KEY = (
  import.meta.env as Record<string, string | undefined>
).VITE_RECAPTCHA_SITE_KEY

const TRIPS = ['Salmon', 'Steelhead', 'Sturgeon', 'Crab', 'Not sure yet']

const inputCls =
  'w-full rounded-lg border border-cream/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/45 outline-none transition-colors focus:border-accent focus:bg-white/[0.1]'

/**
 * Short landing form for the hero. Three fields (name, phone, trip interest)
 * keep it frictionless — a quick lead-grab that lifts landing-page conversion.
 * It posts to the same delivery + reCAPTCHA pipeline as the full contact page,
 * tagged `source: "Homepage hero form"`, and is phone-only (no email needed).
 */
export function HeroLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', tripType: 'Salmon' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const captchaWidgetId = useRef<number | null>(null)

  const resetCaptcha = () => {
    setCaptchaToken('')
    resetRecaptcha(captchaWidgetId.current)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setCaptchaError(true)
      return
    }
    setSending(true)
    setFailed(false)
    setCaptchaError(false)
    try {
      const res = await sendContactEnquiry({
        data: {
          name: form.name,
          phone: form.phone,
          tripType: form.tripType,
          source: 'Homepage hero form',
          captchaToken,
        },
      })
      if (res.ok) {
        setDone(true)
        // Confirmed lead: report it to GTM and fire the Google Ads "Contact"
        // conversion so hero leads count toward the campaign too.
        trackEvent('contact_form_submit', {
          form_name: 'hero',
          trip_type: form.tripType,
        })
        trackAdsConversion()
      } else if (res.reason === 'captcha') {
        setCaptchaError(true)
        resetCaptcha()
      } else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-cream/15 bg-ink p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="h-7 w-7"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl uppercase tracking-wide text-white">
          You&apos;re on the list
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Thanks, {form.name.split(' ')[0] || 'friend'}. Captain Ryan will reach
          out to lock in your dates. Prefer to talk now?
        </p>
        <a
          href="tel:5039369090"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
        >
          <PhoneIcon className="h-4 w-4" />
          (503) 936-9090
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cream/15 bg-ink p-6 shadow-2xl sm:p-7"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
          Check Available Dates
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] text-white sm:text-[1.7rem]">
        Reserve your spot
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-white/65">
        Drop your details and Captain Ryan gets back to you within 24 hours.
      </p>

      <div className="mt-5 space-y-3">
        <input
          type="text"
          required
          aria-label="Your name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          type="tel"
          required
          aria-label="Phone number"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputCls}
        />
        <select
          aria-label="Trip interest"
          value={form.tripType}
          onChange={(e) => setForm({ ...form, tripType: e.target.value })}
          className={`${inputCls} bg-ink text-white/90`}
        >
          {TRIPS.map((t) => (
            <option key={t} value={t} className="bg-ink text-white">
              {t}
            </option>
          ))}
        </select>

        {RECAPTCHA_SITE_KEY && (
          <div>
            <Recaptcha
              siteKey={RECAPTCHA_SITE_KEY}
              onToken={(t) => {
                setCaptchaToken(t)
                setCaptchaError(false)
              }}
              onExpire={() => setCaptchaToken('')}
              onWidgetId={(id) => {
                captchaWidgetId.current = id
              }}
            />
            {captchaError && (
              <p role="alert" className="mt-1.5 text-[12px] text-accent">
                Please confirm you&apos;re not a robot.
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className="btn-primary group mt-4 inline-flex w-full items-center justify-center gap-2 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Get My Dates'}
        {!sending && (
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>

      {failed ? (
        <p className="mt-3 text-center text-[12px] leading-relaxed text-white/70">
          Couldn&apos;t send just now — call{' '}
          <a href="tel:5039369090" className="font-semibold text-accent">
            (503) 936-9090
          </a>{' '}
          and Ryan will sort you out.
        </p>
      ) : (
        <p className="mt-3 text-center text-[11px] tracking-wide text-white/45">
          USCG Certified · 40+ Years · No spam, ever
        </p>
      )}
    </form>
  )
}
