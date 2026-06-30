'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { personalInfo } from '@/utils/constants'

/**
 * Footer — a glass slab with a CTA line, quick links, contact, and a
 * gradient bottom bar. Sits above the fixed particle background.
 */

const quickLinks = [
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
]

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative px-4 pb-8 pt-4">
      <div className="mx-auto max-w-7xl">
        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
        >
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Have a drone idea worth <span className="gradient-text">chasing the sky</span> for?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              I&apos;m always up for ambitious aerial robotics and ML projects.
            </p>
            <button onClick={() => scrollTo('contact')} className="btn-primary mt-7">
              Start a conversation <FiArrowUpRight />
            </button>
          </div>
        </motion.div>

        {/* Columns */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-aero-gradient text-sm text-[#04121a]">
                BM
              </span>
              <span className="text-white">Bhavesh Meghwal</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-gray-400">
              Aerial Robotics Engineer building autonomous drones — flight control, computer
              vision, and everything between.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 transition-colors hover:text-neon-cyan"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-neon-cyan">
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.phone}`} className="hover:text-neon-cyan">
                  {personalInfo.phone}
                </a>
              </li>
              <li>IIT (BHU) Varanasi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
