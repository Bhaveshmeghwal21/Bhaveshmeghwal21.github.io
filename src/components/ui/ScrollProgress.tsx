'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin gradient progress bar fixed to the very top of the viewport,
 * reflecting overall page scroll progress.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-ember-400"
    />
  )
}

export default ScrollProgress
