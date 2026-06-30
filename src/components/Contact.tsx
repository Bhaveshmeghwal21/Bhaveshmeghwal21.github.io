'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { personalInfo } from '@/utils/constants'
import SectionHeading from './ui/SectionHeading'
import Magnetic from './ui/Magnetic'

/**
 * Contact Section — split layout with contact cards + socials on one side
 * and a glass contact form (EmailJS) on the other.
 */

const contactItems = [
  { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: null },
]

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-neon-cyan/60 focus:outline-none focus:ring-2 focus:ring-neon-cyan/20'

  return (
    <section id="contact" className="section-container">
      <SectionHeading
        eyebrow="05 — Say Hello"
        title={
          <>
            Let&apos;s build something that <span className="gradient-text">flies</span>
          </>
        }
        subtitle="Open to internships, research collaborations, and drone projects. Drop a message and I'll get back to you."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left - info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4 lg:col-span-2"
        >
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="glass glass-hover flex items-center gap-4 rounded-2xl p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    {label}
                  </p>
                  <p className="truncate font-medium text-white">{value}</p>
                </div>
              </div>
            )
            return href ? (
              <a key={label} href={href} className="block">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}

          <div className="glass rounded-2xl p-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-gray-500">
              Find me online
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
                { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                  >
                    <Icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 sm:p-8 lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project or idea..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all ${
                status === 'success'
                  ? 'bg-emerald-500 text-white'
                  : status === 'error'
                  ? 'bg-rose-500 text-white'
                  : status === 'sending'
                  ? 'cursor-not-allowed bg-white/10 text-gray-400'
                  : 'btn-primary'
              }`}
            >
              {status === 'sending' && 'Sending…'}
              {status === 'success' && '✓ Message sent!'}
              {status === 'error' && '✗ Failed — try again'}
              {status === 'idle' && (
                <>
                  Send Message <FiSend />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
