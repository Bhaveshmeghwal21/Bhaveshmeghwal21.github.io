import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { site } from '@/content/site.mjs'

// EmailJS public keys are designed to ship to the browser. Abuse protection
// (allowed origins, rate limits) is configured in the EmailJS dashboard.
const EMAILJS = {
  serviceId: 'service_ixgxj5x',
  templateId: 'template_iwdugkg',
  publicKey: 'wrrMZz_m4ZG9iXy78',
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** A mailto: link carrying the visitor's message, used when sending fails. */
function mailtoWith(name: string, message: string) {
  const subject = `Portfolio message from ${name}`
  // Keep the URL well under the length mail clients reliably accept.
  const body = message.length > 1800 ? `${message.slice(0, 1800)}…` : message
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackHref, setFallbackHref] = useState(`mailto:${site.email}`)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) return

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { name, email, message, subject: `Portfolio message from ${name}` },
        EMAILJS.publicKey
      )
      form.reset()
      setStatus('sent')
    } catch (error) {
      console.error('Contact form failed', error)
      // The form keeps its contents, and the fallback link carries the message.
      setFallbackHref(mailtoWith(name, message))
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            className="field"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            className="field"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={5000}
          required
          className="field resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === 'sent' ? 'Thanks, your message is on its way.' : null}
          {status === 'error' ? (
            <>
              The message could not be sent.{' '}
              <a href={fallbackHref} className="link">
                Send it from your email app
              </a>{' '}
              instead, or write to {site.email}.
            </>
          ) : null}
        </p>
      </div>
    </form>
  )
}
