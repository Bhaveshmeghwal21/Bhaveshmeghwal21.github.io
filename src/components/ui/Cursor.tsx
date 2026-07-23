'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Reticle-style custom cursor for pointer devices:
 * - A small solid dot that tracks the cursor precisely (1:1, no lag).
 * - A trailing ring that lags behind with spring physics and expands to
 *   "lock on" when hovering anything interactive.
 *
 * Disabled on touch devices and when the user prefers reduced motion.
 */
const Cursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 })

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
      {/* Trailing reticle ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-accent-400/70 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          rotate: hovering ? 45 : 0,
          borderColor: hovering ? 'rgba(255,176,32,0.85)' : 'rgba(255,90,51,0.6)',
          backgroundColor: hovering ? 'rgba(255,176,32,0.1)' : 'rgba(255,90,51,0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
      {/* Precise center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent-400 mix-blend-screen"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}

export default Cursor
