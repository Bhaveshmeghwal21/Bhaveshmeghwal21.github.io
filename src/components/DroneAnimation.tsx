'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * 2D Drone Animation Component
 * 
 * Features:
 * - Animated quadcopter with rotating propellers
 * - Hover/floating effect
 * - Mouse parallax tracking
 * - Glowing LED navigation lights
 * - Flight path trail
 */

const DroneAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Flight Path Trail */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.path
          d="M 100 300 Q 250 100, 400 300 T 700 300"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Drone Container with Parallax */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -20, 0],
          x: mousePosition.x,
          rotateX: mousePosition.y * 0.5,
          rotateY: mousePosition.x * 0.5,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          x: {
            type: "spring",
            stiffness: 50,
            damping: 20
          },
          rotateX: {
            type: "spring",
            stiffness: 50,
            damping: 20
          },
          rotateY: {
            type: "spring",
            stiffness: 50,
            damping: 20
          }
        }}
        style={{ perspective: 1000 }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
          {/* Drone Body (Center) */}
          <g>
            {/* Main Body */}
            <rect
              x="85"
              y="85"
              width="30"
              height="30"
              rx="4"
              fill="#1a1a2e"
              stroke="#22d3ee"
              strokeWidth="2"
            />
            
            {/* Center Camera */}
            <circle cx="100" cy="100" r="8" fill="#6366f1" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="4" fill="#22d3ee" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Arms */}
            {/* Top-Left Arm */}
            <line x1="100" y1="100" x2="50" y2="50" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            {/* Top-Right Arm */}
            <line x1="100" y1="100" x2="150" y2="50" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom-Left Arm */}
            <line x1="100" y1="100" x2="50" y2="150" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom-Right Arm */}
            <line x1="100" y1="100" x2="150" y2="150" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />

            {/* Motors */}
            {/* Top-Left Motor */}
            <circle cx="50" cy="50" r="12" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />
            {/* Top-Right Motor */}
            <circle cx="150" cy="50" r="12" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />
            {/* Bottom-Left Motor */}
            <circle cx="50" cy="150" r="12" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />
            {/* Bottom-Right Motor */}
            <circle cx="150" cy="150" r="12" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="2" />

            {/* Propellers - Top-Left (Counter-clockwise) */}
            <g>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50px", originY: "50px" }}
              >
                <ellipse cx="50" cy="40" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
                <ellipse cx="50" cy="60" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
              </motion.g>
            </g>

            {/* Propellers - Top-Right (Clockwise) */}
            <g>
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "50px" }}
              >
                <ellipse cx="150" cy="40" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
                <ellipse cx="150" cy="60" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
              </motion.g>
            </g>

            {/* Propellers - Bottom-Left (Clockwise) */}
            <g>
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50px", originY: "150px" }}
              >
                <ellipse cx="50" cy="140" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
                <ellipse cx="50" cy="160" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
              </motion.g>
            </g>

            {/* Propellers - Bottom-Right (Counter-clockwise) */}
            <g>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "150px" }}
              >
                <ellipse cx="150" cy="140" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
                <ellipse cx="150" cy="160" rx="15" ry="4" fill="#22d3ee" opacity="0.6" />
              </motion.g>
            </g>

            {/* LED Navigation Lights */}
            {/* Red LED - Left */}
            <circle cx="40" cy="100" r="3" fill="#ff0000">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Green LED - Right */}
            <circle cx="160" cy="100" r="3" fill="#00ff00">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.5s" />
            </circle>

            {/* Glow Effects */}
            <circle cx="50" cy="50" r="20" fill="#22d3ee" opacity="0.1">
              <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="50" r="20" fill="#22d3ee" opacity="0.1">
              <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle cx="50" cy="150" r="20" fill="#22d3ee" opacity="0.1">
              <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="1.5s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle cx="150" cy="150" r="20" fill="#22d3ee" opacity="0.1">
              <animate attributeName="r" values="20;25;20" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
              <animate attributeName="opacity" values="0.1;0.2;0.1" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
            </circle>
          </g>
        </svg>
      </motion.div>

      {/* Tech Labels */}
      <motion.div
        className="absolute top-10 right-10 text-highlight text-sm font-mono"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        PX4-Autopilot
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-highlight text-sm font-mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        Quadrotor Control
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-5 text-highlight text-sm font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        ROS2
      </motion.div>
    </div>
  )
}

export default DroneAnimation
