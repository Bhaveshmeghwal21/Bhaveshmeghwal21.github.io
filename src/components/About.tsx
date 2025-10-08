'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FiDownload, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/utils/animations'
import { personalInfo, stats } from '@/utils/constants'

/**
 * About Section Component
 * 
 * Features:
 * - Professional bio with key highlights
 * - Stats cards showing achievements
 * - Resume download buttons (robotics-focused and general)
 * - Responsive grid layout
 * - Scroll-triggered animations using Intersection Observer
 * 
 * Structure:
 * - Section title
 * - Bio text with highlighted achievements
 * - Stats grid (4 cards)
 * - Resume download buttons
 */

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const statIcons = [FiTrendingUp, FiAward, FiUsers, FiAward]

  return (
    <section id="about" className="section-container bg-gradient-to-b from-dark-bg to-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-16"
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center">
          <h2 className="section-title">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-highlight to-highlight-light mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <motion.div variants={slideInLeft} className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-highlight to-highlight-light rounded-full blur-2xl opacity-20 animate-pulse-slow" />
              
              {/* Profile Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-highlight shadow-glow">
                <Image
                  src="/images/profile.jpeg"
                  alt="Bhavesh Meghwal - Aerial Robotics Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-highlight rounded-full flex items-center justify-center border-4 border-primary">
                <span className="text-2xl">🚁</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div variants={slideInRight} className="space-y-6">
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I'm a <span className="text-highlight font-semibold">Mechanical Engineering</span> student 
                at <span className="text-highlight font-semibold">IIT (BHU) Varanasi</span>, graduating in 2026. 
                My passion lies in <span className="text-highlight font-semibold">aerial robotics</span> and 
                <span className="text-highlight font-semibold"> autonomous systems</span>, where I combine 
                theoretical knowledge with hands-on implementation.
              </p>

              <p>
                As <span className="text-highlight font-semibold">Secretary of the Aero Modelling Club</span>, 
                I've led a team of 20-30 members and achieved a <span className="text-highlight font-semibold">
                70% increase in club involvement</span>. My leadership extends beyond management—I actively 
                mentor students and organize technical workshops on drone technology, OpenCV, and simulation tools.
              </p>

              <p>
                My technical expertise was validated at <span className="text-highlight font-semibold">
                Inter IIT Tech Meet 13.0</span>, where our team secured a <span className="text-highlight font-semibold">
                Top 10 national rank</span> in Aerial Robotics among 23 IITs. This achievement stemmed from 
                implementing a sophisticated fault-tolerant control algorithm in PX4 for quadrotors experiencing 
                motor failure.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-white mb-3">Key Highlights:</h3>
                <ul className="space-y-2">
                  {[
                    'PX4-Autopilot firmware modification & FTC implementation',
                    'ROS1/ROS2 expertise with MAVROS integration',
                    'Computer Vision with OpenCV & MediaPipe',
                    'CFD Analysis using ANSYS FLUENT',
                    'Swarm drone systems with Skybrush',
                    'UAV internship at PAWAAC Drones'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-highlight text-xl">▹</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resume Download Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resumeRobotics}
                download
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiDownload />
                Robotics Resume
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resume}
                download
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiDownload />
                General Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Cards - Below Bio and Image */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => {
              const Icon = statIcons[index]
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-highlight to-highlight-light opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300" />
                  
                  <div className="relative bg-dark-card p-6 rounded-xl border border-accent/20 hover:border-highlight/50 transition-all duration-300 h-full">
                    <Icon className="text-highlight text-3xl mb-4" />
                    
                    <div className="text-4xl font-bold text-white mb-2 font-display">
                      {stat.value}
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
        </motion.div>

        {/* Education & Current Focus */}
        <motion.div
          variants={fadeInUp}
          className="bg-dark-card border border-accent/20 rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-highlight font-semibold text-lg mb-2">Education</h3>
              <p className="text-gray-300">B.Tech Mechanical Engineering</p>
              <p className="text-gray-400 text-sm">IIT (BHU) Varanasi</p>
              <p className="text-gray-400 text-sm">Graduating 2026</p>
            </div>

            <div>
              <h3 className="text-highlight font-semibold text-lg mb-2">Current Focus</h3>
              <p className="text-gray-300">Fault-Tolerant Control</p>
              <p className="text-gray-400 text-sm">Vision-Language Models</p>
              <p className="text-gray-400 text-sm">Autonomous Navigation</p>
            </div>

            <div>
              <h3 className="text-highlight font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-300">{personalInfo.location}</p>
              <p className="text-gray-400 text-sm">Open to opportunities</p>
              <p className="text-gray-400 text-sm">Remote & On-site</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
