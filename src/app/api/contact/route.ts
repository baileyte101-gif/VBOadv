import { NextResponse } from 'next/server'

/**
 * Contact form endpoint.
 *
 * VBO has recorded zero leads despite months of traffic. That is the problem
 * this endpoint and the form in front of it exist to fix, so the rules here are
 * about not losing a message rather than about features.
 *
 * ★ REQUIRES CONFIGURATION BEFORE GO-LIVE.
 * Delivery needs two environment variables set on the Vercel project:
 *   CONTACT_API_KEY    Resend API key (https://resend.com), server side only
 *   CONTACT_TO         where inquiries are delivered, e.g. hello@vboadv.com
 * With neither set the endpoint returns 503 and the form shows the visitor the
 * email address and phone number instead of pretending to have sent anything.
 * It never reports success it cannot back up, because a silently swallowed
 * inquiry is the exact failure we are here to fix.
 *
 * Security posture (OWASP 2025):
 *  - Validation is server side and independent of the client. The browser check
 *    is convenience; this one is the control.
 *  - Fails closed. No stack traces or provider errors reach the response body.
 *  - No secret is ever logged, and the submitted message body is not logged.
 *  - Honeypot field plus a submit-time floor for trivial bot traffic.
 *  - Per-IP rate limit, best effort in a serverless runtime.
 *  - /api/ is already disallowed in robots.ts.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX = { name: 120, email: 200, business: 160, message: 5000 }
const MIN_SUBMIT_MS = 2500
const RATE_LIMIT = { windowMs: 60_000, max: 5 }

const hits = new Map<string, { count: number; reset: number }>()

function rateLimited(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_LIMIT.windowMs })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT.max
}

/** Deliberately permissive. Rejecting unusual but valid addresses loses leads. */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Try again in a minute.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Could not read that request.' }, { status: 400 })
  }

  // Honeypot: a field no human sees and no human fills. Accepted, discarded.
  if (clean(body.company_website, 200)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const elapsed = Number(body.elapsed_ms)
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email)
  const business = clean(body.business, MAX.business)
  const message = clean(body.message, MAX.message)

  // Field-keyed so the form can put each message next to the input it belongs
  // to, rather than showing one generic failure at the top.
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Enter your name.'
  if (!email) errors.email = 'Enter your email address.'
  else if (!looksLikeEmail(email)) errors.email = 'That email address does not look right. Check for a typo.'
  if (!business) errors.business = 'Enter your business name.'
  if (!message) errors.message = 'Tell us what you are trying to fix.'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  const apiKey = process.env.CONTACT_API_KEY
  const to = process.env.CONTACT_TO
  if (!apiKey || !to) {
    // Configuration gap, not a visitor error. Say so plainly and let the form
    // fall back to the address and phone number printed on the page.
    console.error('[contact] delivery not configured: CONTACT_API_KEY and CONTACT_TO must be set')
    return NextResponse.json(
      { error: 'The form is not able to send right now. Please email hello@vboadv.com and we will pick it up.' },
      { status: 503 }
    )
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'VBO Website <website@vboadv.com>',
        to: [to],
        reply_to: email,
        subject: `Website inquiry: ${business}`,
        text: [
          `Name:     ${name}`,
          `Email:    ${email}`,
          `Business: ${business}`,
          '',
          'What they are trying to fix:',
          message,
        ].join('\n'),
      }),
    })

    if (!response.ok) {
      // Log the status only. The provider body can echo the submission back.
      console.error(`[contact] provider rejected the send, status ${response.status}`)
      return NextResponse.json(
        { error: 'That did not send. Please email hello@vboadv.com and we will pick it up.' },
        { status: 502 }
      )
    }
  } catch {
    console.error('[contact] provider request failed')
    return NextResponse.json(
      { error: 'That did not send. Please email hello@vboadv.com and we will pick it up.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
