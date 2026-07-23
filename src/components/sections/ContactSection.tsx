'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend } from 'react-icons/fi'
import Reveal from '@/components/motion/Reveal'
import KineticHeading from '@/components/motion/KineticHeading'
import { site } from '@/content/site.mjs'

const links = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: FiMail },
  { label: 'Phone', value: site.phone, href: `tel:${site.phone}`, icon: FiPhone },
  { label: 'GitHub', value: 'Bhaveshmeghwal21', href: site.github, icon: FiGithub },
  { label: 'LinkedIn', value: 'bm-bhavesh-meghwal', href: site.linkedin, icon: FiLinkedin },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const inputClass =
    'w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-zinc-100 placeholder:text-zinc-500'

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'service_ixgxj5x',
        'template_iwdugkg',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'wrrMZz_m4ZG9iXy78'
      )

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-container">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal className="surface p-6 md:p-8">
          <div className="eyebrow">05 / Contact</div>
          <KineticHeading as="h2" className="mt-5 font-display text-4xl leading-tight text-zinc-50">
            If the work fits, send a note.
          </KineticHeading>
          <p className="mt-5 text-base leading-8 text-zinc-300">{site.availability}</p>
          <div className="mt-8 space-y-3">
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                data-cursor
                className="surface-muted flex items-center gap-4 px-4 py-4 text-zinc-200 transition-colors hover:text-white"
              >
                <Icon className="text-accent-300" size={18} />
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {label}
                  </div>
                  <div className="mt-1 text-sm">{value}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="surface p-6 md:p-8" delay={0.08}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Name</span>
                <input
                  className={inputClass}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Email</span>
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block">Subject</span>
              <input
                className={inputClass}
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block">Message</span>
              <textarea
                className={`${inputClass} min-h-40 resize-y`}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              data-cursor
              className="button-primary w-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending' : 'Send message'}
              <FiSend />
            </button>
            {status === 'success' ? (
              <p className="text-sm text-accent-300">Message sent. I will get back to you.</p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm text-rose-300">
                The form failed. Use the direct email link if you need a reply now.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
