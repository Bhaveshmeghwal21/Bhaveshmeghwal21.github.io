'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@/contexts/ThemeContext'

/**
 * Navbar
 *
 * - Floating glass pill that condenses once scrolled
 * - Animated active-section indicator (shared layoutId)
 * - Mobile slide-down sheet
 * - Theme toggle with crossfade icon
 */

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navItems.map((item) => item.href.substring(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`nav-glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 transition-all duration-300 md:px-6 ${
          scrolled
            ? 'glass py-2.5 shadow-lg'
            : 'border border-transparent bg-transparent py-3.5'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-aero-gradient text-sm font-bold text-[#04121a]">
            BM
          </span>
          <span className="hidden text-white sm:inline">
            Bhavesh<span className="gradient-text">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = activeSection === item.href.substring(1)
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-neon-cyan transition-colors hover:border-neon-cyan/40"
          >
            {mounted && theme === 'dark' ? <FiMoon size={17} /> : <FiSun size={17} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white md:hidden"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass absolute left-4 right-4 top-[72px] rounded-2xl p-3 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                  activeSection === item.href.substring(1)
                    ? 'bg-neon-cyan/10 text-neon-cyan'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
