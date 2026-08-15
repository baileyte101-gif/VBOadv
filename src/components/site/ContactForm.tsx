'use client'

import { useEffect, useRef, useState } from 'react'
import type { ContactForm as ContactFormSpec } from '@/content/types'

/**
 * The contact form.
 *
 * ★ Conversion tracking is the point of this component, not a nice-to-have.
 * VBO has recorded zero leads despite months of traffic. It was flagged
 * 2026-08-10 and never resolved, which means nothing this build produces can be
 * proved to generate business. Both events fire here.
 *
 * Two rules govern when they fire:
 *  1. Only after the server confirms the message was accepted. Firing on click
 *     would replace "zero leads" with "leads that did not happen", which is a
 *     worse problem because it looks like success.
 *  2. Exactly once per submission. A resubmission after an error does not
 *     double count.
 *
 * GA4 `generate_lead` and Meta `Lead` are the standard event names for this on
 * both platforms, so they map onto conversions without custom configuration.
 *
 * Accessibility: real <label> elements rather than placeholders (a placeholder
 * disappears on focus and is not an accessible name), visible focus rings that
 * are not the browser default on a dark ground, errors tied to their input with
 * aria-describedby and announced via role="alert", and the summary moved to
 * focus on failure so a keyboard user is not left guessing.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ spec }: { spec: ContactFormSpec }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const mountedAt = useRef(Date.now())
  const errorRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'error' && (formError || Object.keys(errors).length > 0)) {
      errorRef.current?.focus()
    }
    if (status === 'sent') {
      successRef.current?.focus()
    }
  }, [status, formError, errors])

  function trackConversion() {
    // Fired only on a confirmed send. See the note at the top of this file.
    window.gtag?.('event', 'generate_lead', {
      event_category: 'contact',
      event_label: 'contact_form',
      currency: 'USD',
      value: 0,
    })
    window.fbq?.('track', 'Lead', { content_name: 'Contact form' })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrors({})
    setFormError('')

    const data = new FormData(event.currentTarget)
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      business: data.get('business'),
      message: data.get('message'),
      company_website: data.get('company_website'),
      elapsed_ms: Date.now() - mountedAt.current,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))

      if (response.ok) {
        trackConversion()
        setStatus('sent')
        return
      }

      if (result.errors) setErrors(result.errors)
      setFormError(
        result.error ??
          (result.errors ? 'Check the fields marked below.' : 'That did not send. Please try again.')
      )
      setStatus('error')
    } catch {
      setFormError(
        'That did not send, and it may be your connection. Please email hello@vboadv.com and we will pick it up.'
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="close-panel max-w-2xl focus-ring"
      >
        <p className="prose-body">
          Thanks. That is with Tim, and you will get a reply within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
      {(formError || Object.keys(errors).length > 0) && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="form-error-summary focus-ring"
        >
          {formError}
        </div>
      )}

      {spec.fields.map((field) => {
        const id = `contact-${field.name}`
        const errorId = `${id}-error`
        const invalid = Boolean(errors[field.name])
        return (
          <div key={field.name} className="form-row">
            <label htmlFor={id} className="form-label">
              {field.label}
              {field.required && (
                <span className="text-[#B8962E]" aria-hidden>
                  {' '}
                  *
                </span>
              )}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={id}
                name={field.name}
                rows={6}
                required={field.required}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? errorId : undefined}
                className={`form-input ${invalid ? 'form-input-invalid' : ''}`}
              />
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type}
                required={field.required}
                autoComplete={
                  field.name === 'name'
                    ? 'name'
                    : field.name === 'email'
                      ? 'email'
                      : field.name === 'business'
                        ? 'organization'
                        : 'off'
                }
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? errorId : undefined}
                className={`form-input ${invalid ? 'form-input-invalid' : ''}`}
              />
            )}
            {invalid && (
              <p id={errorId} className="form-error">
                {errors[field.name]}
              </p>
            )}
          </div>
        )
      })}

      {/* Honeypot. Hidden from sight and from assistive tech, never autofilled. */}
      <div className="hp-field" aria-hidden>
        <label htmlFor="contact-company_website">Company website</label>
        <input
          id="contact-company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-gold mt-2">
        {status === 'sending' ? 'Sending' : spec.submitLabel}
      </button>

      <p className="form-microcopy">{spec.microcopy}</p>
    </form>
  )
}
