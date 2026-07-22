import { createServerFn } from '@tanstack/react-start'

// Minimal ambient typing for the server-only env lookup (no @types/node here).
declare const process: { env: Record<string, string | undefined> }

/**
 * Contact form delivery.
 *
 * The form previously resolved a `setTimeout` and rendered "Message Sent!"
 * without sending anything anywhere — every enquiry was discarded while the
 * guest was told Ryan would reply within 24 hours. This module actually
 * delivers it, and, just as importantly, reports honestly when it cannot: the
 * form's error branch keeps the typed message and hands the guest a phone
 * number and a pre-filled mail link rather than swallowing the lead.
 *
 * Delivery goes through the SMTP2GO email API over plain fetch — no SDK,
 * mirroring how ./weather.ts and ./googleReviews.ts call their APIs. The key
 * stays server-side; the browser only ever sees `{ ok }`.
 *
 * To enable: add SMTP2GO_API_KEY and CONTACT_TO_EMAIL to `.env` (see
 * .env.example). CONTACT_FROM_EMAIL must be on the SMTP2GO-verified sender
 * domain (catchingchromeguideservice.com). Until the key + to-address are set,
 * `reason` is 'unconfigured' and the UI shows the call/email fallback.
 */

export type ContactPayload = {
  name: string
  email: string
  phone: string
  tripType: string
  groupSize: string
  message: string
  /** reCAPTCHA v2 token; only enforced when RECAPTCHA_SECRET_KEY is set. */
  captchaToken?: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'unconfigured' | 'invalid' | 'failed' | 'captcha' }

/**
 * Verify a reCAPTCHA v2 token with Google. Returns true only on an explicit
 * success; any network/parse trouble is treated as a failed challenge so a
 * broken verifier can never wave a bot through.
 */
async function verifyCaptcha(secret: string, token: string): Promise<boolean> {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return false
    const json = (await res.json()) as { success?: boolean }
    return json.success === true
  } catch {
    return false
  }
}

const MAX = { name: 120, email: 200, phone: 40, tripType: 60, groupSize: 8, message: 4000 }

/** Trim, cap length, and strip CR/LF so nothing can be injected into headers. */
function clean(v: unknown, max: number): string {
  return String(v ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const sendContactEnquiry = createServerFn({ method: 'POST' })
  .validator((d: ContactPayload) => d)
  .handler(async ({ data }): Promise<ContactResult> => {
    const name = clean(data.name, MAX.name)
    const email = clean(data.email, MAX.email)
    const phone = clean(data.phone, MAX.phone)
    const tripType = clean(data.tripType, MAX.tripType)
    const groupSize = clean(data.groupSize, MAX.groupSize)
    // The message is the one field allowed to keep its line breaks.
    const message = String(data.message ?? '').trim().slice(0, MAX.message)

    // Re-check on the server: the `required` attributes in the markup are a
    // convenience for the guest, not a guarantee about what arrives here.
    if (!name || !email || !phone) return { ok: false, reason: 'invalid' }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { ok: false, reason: 'invalid' }
    }

    // Bot check. Only enforced once the secret is configured, so the form keeps
    // working in local/dev before keys exist; in production (secret set) a
    // missing or invalid token is rejected before we ever send mail.
    const captchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (captchaSecret) {
      const token = clean(data.captchaToken, 3000)
      if (!token) return { ok: false, reason: 'captcha' }
      if (!(await verifyCaptcha(captchaSecret, token))) {
        return { ok: false, reason: 'captcha' }
      }
    }

    const key = process.env.SMTP2GO_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    // Must be an address on the SMTP2GO-verified sender domain.
    const from =
      process.env.CONTACT_FROM_EMAIL ?? 'noreply@catchingchromeguideservice.com'
    if (!key || !to) return { ok: false, reason: 'unconfigured' }

    const rows: Array<[string, string]> = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone],
      ['Trip interest', tripType],
      ['Group size', groupSize],
    ]

    const html = `
      <h2>New trip enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      <p style="color:#666;margin-top:16px">Message</p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>') || '<em>(none)</em>'}</p>
    `

    // Plain-text alternative — improves deliverability and covers text clients.
    const text = [
      'New trip enquiry',
      ...rows.map(([k, v]) => `${k}: ${v}`),
      '',
      'Message:',
      message || '(none)',
    ].join('\n')

    try {
      const res = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'X-Smtp2go-Api-Key': key,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender: `Catching Chrome <${from}>`,
          to: [to],
          subject: `Trip enquiry from ${name} (${tripType}, ${groupSize})`,
          html_body: html,
          text_body: text,
          // So Ryan can hit reply and land in the guest's inbox.
          custom_headers: [{ header: 'Reply-To', value: email }],
        }),
        signal: AbortSignal.timeout(10000),
      })

      // SMTP2GO can return HTTP 200 with a per-message failure, so confirm the
      // API actually accepted and queued exactly the one recipient.
      if (!res.ok) return { ok: false, reason: 'failed' }
      const json = (await res.json()) as {
        data?: { succeeded?: number; failed?: number }
      }
      if (!json?.data?.succeeded) return { ok: false, reason: 'failed' }
      return { ok: true }
    } catch {
      return { ok: false, reason: 'failed' }
    }
  })
