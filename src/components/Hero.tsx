'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { personalInfo, roles, heroHighlights, stats } from '@/utils/constants'
import Magnetic from './ui/Magnetic'
import AnimatedCounter from './ui/AnimatedCounter'
import DroneAnimation from './DroneAnimation'

/**
 * Hero Section
 *
 * A cinematic "mission control" landing:
 * - Layered aurora orbs + masked grid background
 * - Status pill and live-typed rotating role headline
 * - Gradient name, mission highlight chips, magnetic CTAs
 * - Telemetry-style drone visual on the right
 * - Animated stat strip + scroll cue
 */

const useTypedRole = () => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = roles[index]
    const speed = deleting ? 40 : 90
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1)
        setText(next)
        if (next === full) {
          setTimeout(() => setDeleting(true), 1400)
        }
      } else {
        const next = full.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return text
}

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub', external: true },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', external: true },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email', external: false },
]

const Hero = () => {
  const typed = useTypedRole()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background: grid + aurora orbs */}
      <div className="absolute inset-0 grid-bg" />
      <div className="aurora-orb -top-24 -left-10 h-80 w-80 bg-neon-cyan/30 animate-float-slow" />
      <div
        className="aurora-orb top-1/3 right-0 h-96 w-96 bg-neon-violet/30 animate-float"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="aurora-orb bottom-0 left-1/3 h-72 w-72 bg-neon-blue/20 animate-float-slow"
        style={{ animationDelay: '0.8s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-gray-300">Available for 2026 roles &amp; collaborations</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
            >
              <span className="text-white">Hi, I&apos;m </span>
              <span className="gradient-text-animate">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span className="text-white">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 h-9 md:h-10 font-mono text-xl md:text-2xl text-gray-300"
            >
              <span className="text-neon-cyan">&gt;</span>{' '}
              <span className="text-white">{typed}</span>
              <span className="ml-0.5 inline-block w-[3px] h-6 md:h-7 -mb-1 bg-neon-cyan animate-pulse" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-gray-400 leading-relaxed"
            >
              Mechanical Engineering @ <span className="text-white font-medium">IIT (BHU) Varanasi</span>{' '}
              building autonomous drones — from PX4 fault-tolerant control to vision-language
              mission planning.
            </motion.p>

            {/* Highlight chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-7 flex flex-wrap gap-2.5 justify-center lg:justify-start"
            >
              {heroHighlights.map((h) => (
                <div key={h.label} className="chip">
                  <span className="text-neon-cyan font-mono text-[11px] uppercase tracking-wider">
                    {h.label}
                  </span>
                  <span className="text-gray-300">{h.value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-9 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Magnetic>
                <a href="#projects" className="btn-primary">
                  Explore Projects
                  <FiArrowDown />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={personalInfo.resumeRobotics}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FiDownload />
                  Resume
                </a>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex gap-3 justify-center lg:justify-start"
            >
              {socials.map(({ icon: Icon, href, label, external }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:text-neon-cyan hover:border-neon-cyan/50"
                  >
                    <Icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* Right column - telemetry drone visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative gradient-border rounded-3xl p-1">
              <div className="relative h-[460px] rounded-[22px] overflow-hidden bg-dark-card/60">
                {/* HUD corner ticks */}
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(
                  (pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} h-4 w-4 border-neon-cyan/50`}
                      style={{
                        borderTopWidth: pos.includes('top') ? 2 : 0,
                        borderBottomWidth: pos.includes('bottom') ? 2 : 0,
                        borderLeftWidth: pos.includes('left') ? 2 : 0,
                        borderRightWidth: pos.includes('right') ? 2 : 0,
                      }}
                    />
                  )
                )}

                {/* Telemetry readout */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/80">
                  ● Live Telemetry
                </div>

                <DroneAnimation />

                {/* Bottom readout bar */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[11px] text-gray-400">
                  <span>ALT 12.4m</span>
                  <span className="text-neon-cyan">MODE: AUTO</span>
                  <span>BATT 87%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-dark-card/40 px-6 py-6 text-center backdrop-blur">
              <AnimatedCounter
                value={stat.value}
                className="block font-display text-3xl md:text-4xl font-bold gradient-text"
              />
              <div className="mt-1 text-xs md:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-gray-500 hover:text-neon-cyan transition-colors"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero
