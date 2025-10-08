'use client'

import { motion } from 'framer-motion'
import { FiChevronDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { fadeInUp, slideInLeft, slideInRight } from '@/utils/animations'
import { personalInfo } from '@/utils/constants'
import DroneAnimation from './DroneAnimation'

/**
 * Hero Section Component
 * 
 * Features:
 * - Animated particle background resembling drone flight paths
 * - Name and tagline with stagger animation
 * - Smooth scroll indicator
 * - Call-to-action buttons
 * - Social media links
 * - Floating tech stack badges
 * 
 * Design: Dark theme with highlight color accents
 */

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-primary to-accent opacity-90" />
      
      {/* Animated Grid Lines - Drone Flight Path Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(233, 69, 96, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233, 69, 96, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Greeting */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-highlight/10 border border-highlight/30 rounded-full text-highlight text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display"
            >
              <span className="text-white">{personalInfo.name}</span>
            </motion.h1>

            {/* Tagline with Gradient */}
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold"
            >
              <span className="bg-gradient-to-r from-highlight via-highlight-light to-highlight bg-clip-text text-transparent glow-text">
                {personalInfo.tagline}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl"
            >
              Mechanical Engineering student at IIT (BHU) specializing in aerial robotics, 
              autonomous systems, and drone technology. Top 10 National Rank at Inter IIT 
              Tech Meet 13.0 in Aerial Robotics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="btn-primary inline-flex items-center gap-2"
              >
                View Projects
                <FiChevronDown className="animate-bounce" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resume}
                download
                className="btn-secondary inline-flex items-center gap-2"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 1 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-accent/20 text-gray-300 hover:text-highlight hover:bg-accent/30 transition-all"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-accent/20 text-gray-300 hover:text-highlight hover:bg-accent/30 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-lg bg-accent/20 text-gray-300 hover:text-highlight hover:bg-accent/30 transition-all"
                aria-label="Email"
              >
                <FiMail size={24} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Drone Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            transition={{ delay: 0.4 }}
            className="relative hidden lg:block h-[500px]"
          >
            <DroneAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-highlight transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-sm font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  )
}

export default Hero
