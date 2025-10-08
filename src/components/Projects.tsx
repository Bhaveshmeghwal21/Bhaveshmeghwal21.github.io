'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiFileText } from 'react-icons/fi'
import { fadeInUp, staggerContainer, cardHover } from '@/utils/animations'
import { projects, categories } from '@/utils/constants'

/**
 * Projects Section Component
 * 
 * Features:
 * - Filterable project cards by category
 * - Hover effects revealing project details
 * - Links to GitHub, demos, and reports
 * - Tech stack tags
 * - Featured projects highlighted
 * 
 * TO EXPAND:
 * - Add project images
 * - Implement individual project pages
 * - Add video embeds
 * - Search functionality
 */

const ProjectCard = ({ project }: any) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      className="relative group"
    >
      <div className="bg-dark-card border border-accent/20 rounded-xl overflow-hidden hover:border-highlight/50 transition-all duration-300 h-full flex flex-col">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-highlight rounded-full text-xs font-semibold text-white">
              Featured
            </span>
          </div>
        )}

        {/* Image Placeholder - Replace with actual images */}
        <div className="h-48 bg-gradient-to-br from-accent to-accent-light relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-20">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <span className="text-highlight text-sm font-medium mb-2">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 font-display">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-accent/20 text-gray-300 text-xs rounded border border-accent/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-highlight text-xs">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-accent/20">
            {project.links.github && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-highlight transition-colors text-sm"
              >
                <FiGithub /> Code
              </motion.a>
            )}

            {project.links.demo && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-highlight transition-colors text-sm"
              >
                <FiExternalLink /> Demo
              </motion.a>
            )}

            {project.links.report && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.links.report}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-highlight transition-colors text-sm"
              >
                <FiFileText /> Report
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="section-container bg-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A showcase of my work in aerial robotics, autonomous systems, and drone technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-highlight text-white shadow-glow'
                  : 'bg-dark-card text-gray-300 border border-accent/20 hover:border-highlight/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={fadeInUp}
            className="text-center py-12 text-gray-400"
          >
            No projects found in this category.
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default Projects
