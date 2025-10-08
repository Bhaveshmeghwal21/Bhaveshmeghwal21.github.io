'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInUp, staggerContainer, progressBar } from '@/utils/animations'
import { skills } from '@/utils/constants'

/**
 * Skills Section Component
 * 
 * Features:
 * - Grouped skills by category
 * - Animated progress bars showing proficiency
 * - Scroll-triggered animations
 * - Descriptions for each skill
 * 
 * TO EXPAND:
 * - Add interactive hover tooltips
 * - Include certification badges
 * - Add skill endorsements
 */

interface SkillBarProps {
  name: string
  level: number
  description: string
  delay: number
}

const SkillBar = ({ name, level, description, delay }: SkillBarProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{name}</span>
        <span className="text-highlight font-semibold">{level}%</span>
      </div>
      
      <div className="h-2 bg-dark-card rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
          className="h-full bg-gradient-to-r from-highlight to-highlight-light rounded-full"
        />
      </div>
      
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="section-container bg-gradient-to-b from-dark-bg to-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="section-title">Technical Skills</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            My expertise spans across flight control systems, programming, simulation, and hardware integration
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-dark-card border border-accent/20 rounded-xl p-8 hover:border-highlight/30 transition-all"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-highlight mb-6 font-display">
                {category}
              </h3>

              {/* Skills in Category */}
              <div className="space-y-6">
                {skillList.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    description={skill.description}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 bg-dark-card border border-accent/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Tools & Platforms</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Ubuntu Linux', 'Git/GitHub', 'GStreamer', 'Skybrush',
              'MATLAB', 'Docker', 'VS Code', 'Jupyter'
            ].map((tool) => (
              <motion.span
                key={tool}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-accent/20 text-gray-300 rounded-lg border border-accent/30 hover:border-highlight/50 transition-all"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
