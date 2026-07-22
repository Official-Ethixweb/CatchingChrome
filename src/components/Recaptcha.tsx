import { useEffect, useRef } from 'react'

/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox) widget.
 *
 * Loads api.js once (explicit-render mode, via a shared ready promise so
 * multiple mounts never inject the script twice) and renders a single checkbox
 * widget. SSR-safe: the script only loads and the widget only renders in the
 * browser. The parent gets the solved token through `onToken`, is told when it
 * expires through `onExpire`, and receives the widget id so it can reset the
 * box after a submit.
 */

declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => number
      reset: (id?: number) => void
      getResponse: (id?: number) => string
    }
    __ccGrecaptchaReady?: () => void
  }
}

let readyPromise: Promise<void> | null = null

/** Resolves once window.grecaptcha.render is available. */
function grecaptchaReady(): Promise<void> {
  if (typeof window === 'undefined') return new Promise<void>(() => {})
  if (window.grecaptcha?.render) return Promise.resolve()
  if (readyPromise) return readyPromise
  readyPromise = new Promise<void>((resolve) => {
    window.__ccGrecaptchaReady = () => resolve()
    const s = document.createElement('script')
    s.src =
      'https://www.google.com/recaptcha/api.js?onload=__ccGrecaptchaReady&render=explicit'
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
      if (cancelled || rendered.current || !ref.current || !window.grecaptcha) {
        return
      }
      rendered.current = true
      const id = window.grecaptcha.render(ref.current, {
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
