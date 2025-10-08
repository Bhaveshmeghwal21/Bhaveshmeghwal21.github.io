'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/utils/animations'
import { personalInfo } from '@/utils/constants'

/**
 * Contact Section Component
 * 
 * Features:
 * - Animated contact form
 * - Email.js integration (TO BE CONFIGURED)
 * - Social media links
 * - Contact information display
 * - Form validation
 * 
 * TO EXPAND:
 * - Integrate Email.js for actual form submission
 * - Add reCAPTCHA
 * - Success/error message animations
 * - Newsletter signup
 */

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_ixgxj5x',      // Your Service ID
        'template_iwdugkg',     // Your Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'wrrMZz_m4ZG9iXy78'     // Your Public Key
      )
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      setStatus('error')
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section-container bg-gradient-to-b from-dark-bg to-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Interested in collaboration or have a project in mind? Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div variants={slideInLeft} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  whileHover={{ x: 5 }}
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-dark-card border border-accent/20 rounded-lg hover:border-highlight/50 transition-all group"
                >
                  <div className="p-3 bg-highlight/10 rounded-lg text-highlight group-hover:bg-highlight group-hover:text-white transition-all">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{personalInfo.email}</p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  whileHover={{ x: 5 }}
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-dark-card border border-accent/20 rounded-lg hover:border-highlight/50 transition-all group"
                >
                  <div className="p-3 bg-highlight/10 rounded-lg text-highlight group-hover:bg-highlight group-hover:text-white transition-all">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">{personalInfo.phone}</p>
                  </div>
                </motion.a>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-dark-card border border-accent/20 rounded-lg"
                >
                  <div className="p-3 bg-highlight/10 rounded-lg text-highlight">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">{personalInfo.location}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-display">
                Connect on Social Media
              </h3>

              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-dark-card border border-accent/20 rounded-lg text-gray-300 hover:text-highlight hover:border-highlight/50 transition-all"
                  aria-label="GitHub"
                >
                  <FiGithub size={24} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-dark-card border border-accent/20 rounded-lg text-gray-300 hover:text-highlight hover:border-highlight/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={slideInRight}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-card border border-accent/20 rounded-lg text-white placeholder-gray-500 focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  status === 'sending'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : status === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-highlight hover:bg-highlight-light shadow-glow'
                }`}
              >
                {status === 'sending' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && '✗ Failed to Send'}
                {status === 'idle' && (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
