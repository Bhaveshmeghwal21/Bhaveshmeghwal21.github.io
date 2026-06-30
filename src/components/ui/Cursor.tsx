'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor for pointer devices:
 * - A small solid dot that tracks the cursor precisely.
 * - A larger trailing ring that lags with spring physics and grows
 *   when hovering interactive elements (a, button, [data-cursor]).
 *
 * Disabled on touch devices and when the user prefers reduced motion.
 */
const Cursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('cursor-enabled')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      const interactive = !!target.closest('a, button, [data-cursor], input, textarea, select')
      setHovering(interactive)
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('cursor-enabled')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-neon-cyan/70 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          backgroundColor: hovering ? 'rgba(34,211,238,0.12)' : 'rgba(34,211,238,0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-neon-cyan mix-blend-screen"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}

export default Cursor
