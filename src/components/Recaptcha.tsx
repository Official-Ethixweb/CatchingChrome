import { useEffect, useRef } from 'react'
import { grecaptchaApi, grecaptchaReady } from '~/lib/recaptcha'

/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox) widget.
 *
 * Loads the reCAPTCHA script once (explicit-render mode, via a shared ready
 * promise so multiple mounts never inject it twice, see ~/lib/recaptcha) and
 * renders a single checkbox. SSR-safe: the script only loads and the widget
 * only renders in the browser.
 */
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
