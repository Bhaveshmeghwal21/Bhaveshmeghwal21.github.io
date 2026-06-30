'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  FiDownload,
  FiMapPin,
  FiAward,
  FiCpu,
  FiZap,
  FiArrowUpRight,
} from 'react-icons/fi'
import { personalInfo } from '@/utils/constants'
import SectionHeading from './ui/SectionHeading'

/**
 * About Section — a bento-grid layout mixing a profile tile, narrative bio,
 * focus areas, education, and a highlights list. Each tile is a glass panel
 * that lifts on hover.
 */

const focusAreas = [
  'PX4-Autopilot firmware & fault-tolerant control',
  'ROS1/ROS2 with MAVROS sensor integration',
  'Computer Vision (OpenCV, MediaPipe)',
  'CFD analysis with ANSYS FLUENT',
  'Swarm systems with Skybrush',
  'Vision-Language mission planning',
]

const tile = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const About = () => {
  return (
    <section id="about" className="section-container">
      <SectionHeading
        eyebrow="01 — Who I Am"
        title={
          <>
            Engineering <span className="gradient-text">autonomy</span> into the skies
          </>
        }
        subtitle="A hands-on roboticist turning control theory and machine learning into drones that fly themselves."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(0,1fr)]"
      >
        {/* Profile tile */}
        <motion.div
          variants={tile}
          className="glass glass-hover relative overflow-hidden rounded-2xl p-6 md:col-span-1 md:row-span-2 flex flex-col items-center justify-center text-center"
        >
          <div className="absolute inset-0 bg-radial-fade opacity-60" />
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-aero-gradient opacity-30 blur-2xl" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-neon-cyan/40 shadow-glow">
              <Image
                src="/images/profile.jpeg"
                alt="Bhavesh Meghwal"
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <span className="absolute -bottom-1 -right-1 grid h-11 w-11 place-items-center rounded-full border-4 border-dark-card bg-aero-gradient text-lg">
              🚁
            </span>
          </div>
          <h3 className="relative mt-5 font-display text-xl font-bold text-white">
            {personalInfo.name}
          </h3>
          <p className="relative mt-1 text-sm text-neon-cyan">Aerial Robotics Engineer</p>
          <div className="relative mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <FiMapPin size={12} /> IIT (BHU) Varanasi
          </div>
        </motion.div>

        {/* Bio tile */}
        <motion.div
          variants={tile}
          className="glass glass-hover rounded-2xl p-7 md:col-span-2 lg:col-span-3"
        >
          <p className="text-lg leading-relaxed text-gray-300">
            I&apos;m a final-year <span className="text-white font-medium">Mechanical Engineering</span>{' '}
            student at IIT (BHU) Varanasi, deeply focused on{' '}
            <span className="text-neon-cyan font-medium">aerial robotics</span> and autonomous
            systems. As <span className="text-white font-medium">Secretary of the Aero Modelling Club</span>,
            I led a 20–30 member team and drove a{' '}
            <span className="text-neon-cyan font-medium">70% increase</span> in engagement.
          </p>
          <p className="mt-4 leading-relaxed text-gray-400">
            At Inter IIT Tech Meet 13.0, our team secured a{' '}
            <span className="text-white font-medium">Top 10 national rank</span> among 23 IITs by
            implementing a fault-tolerant control algorithm in PX4 that recovers a quadrotor from
            in-flight motor failure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={personalInfo.resumeRobotics}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <FiDownload /> Robotics Resume
            </a>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <FiDownload /> General Resume
            </a>
          </div>
        </motion.div>

        {/* Focus areas tile */}
        <motion.div
          variants={tile}
          className="glass glass-hover rounded-2xl p-7 md:col-span-2 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2 text-neon-cyan">
            <FiZap />
            <h4 className="font-display text-lg font-semibold text-white">What I work on</h4>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {focusAreas.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <FiArrowUpRight className="mt-0.5 shrink-0 text-neon-violet" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Education tile */}
        <motion.div variants={tile} className="glass glass-hover rounded-2xl p-7">
          <div className="mb-3 flex items-center gap-2 text-neon-cyan">
            <FiAward />
            <h4 className="font-display text-lg font-semibold text-white">Education</h4>
          </div>
          <p className="font-medium text-gray-200">B.Tech, Mechanical Engineering</p>
          <p className="mt-1 text-sm text-gray-400">IIT (BHU) Varanasi</p>
          <p className="mt-1 text-sm text-gray-400">Graduating 2026</p>
        </motion.div>

        {/* Current focus tile */}
        <motion.div variants={tile} className="glass glass-hover rounded-2xl p-7">
          <div className="mb-3 flex items-center gap-2 text-neon-cyan">
            <FiCpu />
            <h4 className="font-display text-lg font-semibold text-white">Currently exploring</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Fault-Tolerant Control', 'Vision-Language Models', 'Autonomous Nav', 'VTOL'].map(
              (t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
