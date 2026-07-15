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
 * Delivery goes through Resend over plain fetch — no SDK, mirroring how
 * ./weather.ts and ./googleReviews.ts call their APIs. The key stays
 * server-side; the browser only ever sees `{ ok }`.
 *
 * To enable: add RESEND_API_KEY and CONTACT_TO_EMAIL to `.env` (see
 * .env.example). Until they are set, `reason` is 'unconfigured' and the UI
 * shows the call/email fallback.
 */

export type ContactPayload = {
  name: string
  email: string
  phone: string
  tripType: string
  groupSize: string
  message: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'unconfigured' | 'invalid' | 'failed' }

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

    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'
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

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Catching Chrome <${from}>`,
          to: [to],
          // So Ryan can hit reply and land in the guest's inbox.
          reply_to: email,
          subject: `Trip enquiry — ${name} (${tripType}, ${groupSize})`,
          html,
        }),
        signal: AbortSignal.timeout(10000),
      })
      if (!res.ok) return { ok: false, reason: 'failed' }
      return { ok: true }
    } catch {
      return { ok: false, reason: 'failed' }
    }
  })
