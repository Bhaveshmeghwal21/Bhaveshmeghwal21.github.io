'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
}

/**
 * Consistent section header: a monospace "mission control" eyebrow label,
 * a large display title with a gradient accent word, and optional subtitle.
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) => {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'}`}
    >
      <span className={`eyebrow ${isCenter ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-neon-cyan/60" />
        {eyebrow}
      </span>
      <h2 className="section-title mt-4 text-white">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-gray-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading
