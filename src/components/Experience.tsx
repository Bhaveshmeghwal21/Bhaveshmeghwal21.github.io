'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi'
import { experience } from '@/utils/constants'
import SectionHeading from './ui/SectionHeading'

/**
 * Experience Section — a vertical timeline with a gradient rail, glowing
 * nodes, and glass cards that slide in as they enter the viewport.
 */

const TimelineItem = ({ exp, index }: { exp: any; index: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative pl-12 pb-10 last:pb-0"
    >
      {/* Node */}
      <span className="absolute left-[10px] top-1.5 z-10 grid h-5 w-5 place-items-center rounded-full bg-dark-bg">
        <span className="h-3 w-3 rounded-full bg-aero-gradient shadow-glow" />
      </span>

      <div className="glass glass-hover rounded-2xl p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{exp.title}</h3>
            <p className="text-sm font-medium text-neon-cyan">{exp.company}</p>
          </div>
          {exp.achievement && (
            <span className="chip border-neon-violet/40 text-neon-violet">
              <FiAward size={12} /> {exp.achievement}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar /> {exp.period}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin /> {exp.location}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-300">{exp.description}</p>

        <ul className="mt-4 space-y-2">
          {exp.responsibilities.map((resp: string) => (
            <li key={resp} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.technologies.map((tech: string) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <SectionHeading
        eyebrow="04 — Journey"
        title={
          <>
            Experience &amp; <span className="gradient-text">leadership</span>
          </>
        }
        subtitle="From club leadership to national competitions and industry internships."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Gradient rail */}
        <span className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent" />
        {experience.map((exp, index) => (
          <TimelineItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Experience
