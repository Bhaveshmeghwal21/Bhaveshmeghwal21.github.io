'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { personalInfo } from '@/utils/constants'

/**
 * Footer Component
 * 
 * Features:
 * - Social media links
 * - Copyright information
 * - Quick navigation links
 * - Built with technology credits
 * 
 * TO EXPAND:
 * - Add newsletter signup
 * - Include sitemap links
 * - Add back-to-top button
 */

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <footer className="bg-primary border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-2xl font-bold font-display mb-4">
              <span className="text-highlight">BM</span>
              <span className="text-gray-300">.dev</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Aerial Robotics Engineer specializing in autonomous systems and drone technology.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-card rounded-lg text-gray-300 hover:text-highlight hover:bg-accent/20 transition-all"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-card rounded-lg text-gray-300 hover:text-highlight hover:bg-accent/20 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-dark-card rounded-lg text-gray-300 hover:text-highlight hover:bg-accent/20 transition-all"
                aria-label="Email"
              >
                <FiMail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-highlight transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-highlight transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="hover:text-highlight transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>

            <p className="flex items-center gap-1">
              Built with <FiHeart className="text-highlight" /> using Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
