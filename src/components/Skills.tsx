'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiNavigation,
  FiCode,
  FiBox,
  FiSliders,
  FiEye,
  FiCpu,
} from 'react-icons/fi'
import { skills } from '@/utils/constants'
import SectionHeading from './ui/SectionHeading'
import Marquee from './ui/Marquee'

/**
 * Skills Section
 *
 * - Category cards, each with an icon and a set of animated proficiency meters
 * - Meters fill when scrolled into view with a sheen
 * - A continuous marquee of tools/platforms below
 */

const categoryIcons: Record<string, any> = {
  'Flight Control & Autonomy': FiNavigation,
  'Programming & Algorithms': FiCode,
  'Simulation & Analysis': FiBox,
  'Control Systems': FiSliders,
  'Machine Learning & CV': FiEye,
  'Hardware & Embedded': FiCpu,
}

const tools = [
  'Ubuntu Linux',
  'Git / GitHub',
  'GStreamer',
  'Skybrush',
  'MATLAB',
  'Docker',
  'VS Code',
  'Jupyter',
  'Gazebo',
  'QGroundControl',
  'OpenCV',
  'ANSYS Fluent',
]

const Meter = ({
  name,
  level,
  description,
  delay,
}: {
  name: string
  level: number
  description: string
  delay: number
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="font-mono text-xs text-neon-cyan">{level}%</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay }}
          className="relative h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet"
        >
          <span
            className="absolute inset-0 animate-shimmer"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="section-container">
      <SectionHeading
        eyebrow="03 — Capabilities"
        title={
          <>
            A full-stack <span className="gradient-text">robotics</span> toolkit
          </>
        }
        subtitle="Spanning flight control, programming, simulation, and the hardware that ties it all together."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(skills).map(([category, skillList], i) => {
          const Icon = categoryIcons[category] || FiCpu
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-base font-semibold leading-tight text-white">
                  {category}
                </h3>
              </div>
              <div className="space-y-4">
                {skillList.map((skill, idx) => (
                  <Meter
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    description={skill.description}
                    delay={idx * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Tools marquee */}
      <div className="mt-12">
        <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
          Tools &amp; Platforms
        </p>
        <Marquee items={tools} />
      </div>
    </section>
  )
}

export default Skills
