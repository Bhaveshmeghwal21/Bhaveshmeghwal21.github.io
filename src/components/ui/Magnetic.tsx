'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How strongly the element is pulled toward the cursor (0-1). */
  strength?: number
}

/**
 * Wraps children so they're gently "pulled" toward the cursor while hovered,
 * springing back to center on leave. Great for CTA buttons and icon links.
 * Falls back to no movement on touch / reduced-motion automatically because
 * the pointer events simply won't fire.
 */
const Magnetic = ({ children, className = '', strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16 })
  const springY = useSpring(y, { stiffness: 220, damping: 16 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic
