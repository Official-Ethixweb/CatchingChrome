import { useEffect, useRef } from 'react'

/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox) widget.
 *
 * Loads the reCAPTCHA script once (explicit-render mode, via a shared ready
 * promise so multiple mounts never inject it twice) and renders a single
 * checkbox. SSR-safe: the script only loads and the widget only renders in the
 * browser.
 *
 * We load **enterprise.js**, because keys created in Google's current
 * Cloud-managed reCAPTCHA console (the only kind you can make now) render with
 * the enterprise loader — the classic api.js reports "Invalid site key" for
 * them. We still verify tokens with the classic `siteverify` endpoint on the
 * server (confirmed working for these keys), so no Google Cloud project /
 * CreateAssessment is required. The `enterprise ?? classic` fallback below
 * keeps this working even with a legacy key.
 */

type GrecaptchaApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number
  reset: (id?: number) => void
  getResponse: (id?: number) => string
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaApi & { enterprise?: GrecaptchaApi }
    __ccGrecaptchaReady?: () => void
  }
}

/** The active reCAPTCHA API — enterprise namespace when present, else classic. */
function grecaptchaApi(): GrecaptchaApi | undefined {
  if (typeof window === 'undefined') return undefined
  return window.grecaptcha?.enterprise ?? window.grecaptcha
}

/** Reset a rendered widget (clears the check + token). Safe to call with null. */
export function resetRecaptcha(widgetId: number | null) {
  if (widgetId === null) return
  grecaptchaApi()?.reset(widgetId)
}

let readyPromise: Promise<void> | null = null

/** Resolves once the reCAPTCHA render API is available. */
function grecaptchaReady(): Promise<void> {
  if (typeof window === 'undefined') return new Promise<void>(() => {})
  if (grecaptchaApi()?.render) return Promise.resolve()
  if (readyPromise) return readyPromise
  readyPromise = new Promise<void>((resolve) => {
    window.__ccGrecaptchaReady = () => resolve()
    const s = document.createElement('script')
    s.src =
      'https://www.google.com/recaptcha/enterprise.js?onload=__ccGrecaptchaReady&render=explicit'
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  })
  return readyPromise
}

export function Recaptcha({
  siteKey,
  onToken,
  onExpire,
  onWidgetId,
}: {
  siteKey: string
  onToken: (token: string) => void
  onExpire: () => void
  onWidgetId?: (id: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    let cancelled = false
    grecaptchaReady().then(() => {
      const api = grecaptchaApi()
      if (cancelled || rendered.current || !ref.current || !api) return
      rendered.current = true
      const id = api.render(ref.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: onToken,
        'expired-callback': onExpire,
        'error-callback': onExpire,
      })
      onWidgetId?.(id)
    })
    return () => {
      cancelled = true
    }
    // Render exactly once for a given site key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  return <div ref={ref} />
}
