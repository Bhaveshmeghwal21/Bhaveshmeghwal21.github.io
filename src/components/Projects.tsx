'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGithub,
  FiExternalLink,
  FiFileText,
  FiArrowUpRight,
  FiX,
  FiCalendar,
  FiCheckCircle,
} from 'react-icons/fi'
import { projects, categories } from '@/utils/constants'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import TiltCard from './ui/TiltCard'

/**
 * Projects Section
 *
 * - Animated category filter (layout shared pill)
 * - Spotlight + tilt project cards with category-coded gradient headers
 * - Click a card to open a rich detail modal (full description,
 *   achievements, full tech stack, and all links)
 */

const categoryGradients: Record<string, string> = {
  'Control Systems': 'from-cyan-400/30 to-blue-600/20',
  'Computer Vision': 'from-violet-400/30 to-fuchsia-600/20',
  Simulation: 'from-emerald-400/30 to-teal-600/20',
  Hardware: 'from-amber-400/30 to-orange-600/20',
  'Machine Learning': 'from-pink-400/30 to-rose-600/20',
}

const linkMeta: Record<string, { icon: any; label: string }> = {
  github: { icon: FiGithub, label: 'Code' },
  demo: { icon: FiExternalLink, label: 'Demo' },
  report: { icon: FiFileText, label: 'Report' },
  paper: { icon: FiFileText, label: 'Paper' },
  video: { icon: FiExternalLink, label: 'Video' },
  dataset: { icon: FiExternalLink, label: 'Dataset' },
}

const ProjectCard = ({ project, onOpen }: any) => {
  const grad = categoryGradients[project.category] || 'from-cyan-400/30 to-blue-600/20'
  return (
    <TiltCard className="h-full">
      <SpotlightCard className="h-full">
        <button
          onClick={() => onOpen(project)}
          className="flex h-full w-full flex-col text-left"
        >
          {/* Header band */}
          <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${grad}`}>
            <div className="absolute inset-0 grid-bg opacity-40" />
            {project.featured && (
              <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neon-cyan backdrop-blur">
                ★ Featured
              </span>
            )}
            <span className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              {project.category}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-neon-cyan">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-1 text-[11px] text-neon-cyan">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-sm">
              <span className="font-mono text-xs text-gray-500">{project.duration}</span>
              <span className="inline-flex items-center gap-1 font-medium text-neon-cyan">
                Details <FiArrowUpRight />
              </span>
            </div>
          </div>
        </button>
      </SpotlightCard>
    </TiltCard>
  )
}

const ProjectModal = ({ project, onClose }: any) => {
  if (!project) return null
  const grad = categoryGradients[project.category] || 'from-cyan-400/30 to-blue-600/20'
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl"
      >
        <div className={`relative h-36 bg-gradient-to-br ${grad}`}>
          <div className="absolute inset-0 grid-bg opacity-40" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <FiX />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
            {project.featured && (
              <span className="chip border-neon-cyan/40 text-neon-cyan">★ Featured</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar /> {project.duration}
            </span>
            {project.company && <span>@ {project.company}</span>}
          </div>

          <p className="mt-5 leading-relaxed text-gray-300">{project.fullDescription}</p>

          {/* Achievements */}
          <div className="mt-6">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-neon-cyan">
              Key Outcomes
            </h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.achievements.map((a: string) => (
                <li key={a} className="flex items-start gap-2 text-sm text-gray-300">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-neon-violet" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="mt-6">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-neon-cyan">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t: string) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-7 flex flex-wrap gap-3">
            {Object.entries(project.links).map(([key, url]) => {
              const meta = linkMeta[key]
              if (!meta || !url) return null
              const Icon = meta.icon
              return (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  <Icon /> {meta.label}
                </a>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [active, setActive] = useState<any>(null)

  const filtered =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="section-container">
      <SectionHeading
        eyebrow="02 — Selected Work"
        title={
          <>
            Projects that <span className="gradient-text">take flight</span>
          </>
        }
        subtitle="From fault-tolerant flight controllers to AI mission planners — click any project for the full breakdown."
      />

      {/* Filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const activeCat = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCat ? 'text-[#04121a]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeCat && (
                <motion.span
                  layoutId="proj-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-aero-gradient"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {category}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} onOpen={setActive} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

export default Projects
