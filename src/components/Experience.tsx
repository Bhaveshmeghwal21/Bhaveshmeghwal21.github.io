'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import { fadeInUp, slideInLeft, staggerContainer } from '@/utils/animations'
import { experience } from '@/utils/constants'

/**
 * Experience Section Component
 * 
 * Features:
 * - Vertical timeline layout
 * - Animated entry on scroll
 * - Company, role, and responsibility details
 * - Technology tags
 * - Achievement badges
 * 
 * TO EXPAND:
 * - Add company logos
 * - Include testimonials
 * - Add expandable details
 */

interface TimelineItemProps {
  exp: any
  index: number
  isLast: boolean
}

const TimelineItem = ({ exp, index, isLast }: TimelineItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideInLeft}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 md:pl-12 pb-12"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[19px] top-8 w-0.5 h-full bg-accent/30" />
      )}

      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-2 top-2 w-6 h-6 bg-highlight rounded-full border-4 border-primary shadow-glow" />

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 5 }}
        className="bg-dark-card border border-accent/20 rounded-xl p-6 hover:border-highlight/50 transition-all"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display mb-1">
              {exp.title}
            </h3>
            <p className="text-highlight font-semibold">{exp.company}</p>
          </div>

          {exp.achievement && (
            <span className="px-3 py-1 bg-highlight/10 border border-highlight/30 rounded-full text-highlight text-xs font-medium self-start">
              {exp.achievement}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <FiCalendar />
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiMapPin />
            <span>{exp.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4">{exp.description}</p>

        {/* Responsibilities */}
        <ul className="space-y-2 mb-4">
          {exp.responsibilities.map((resp: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className="text-highlight mt-1">▹</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-accent/20 text-gray-300 text-xs rounded border border-accent/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="section-container bg-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="section-title">Experience & Leadership</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            My journey in aerial robotics, from club leadership to national competitions
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
