'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  /** Raw string like "15+", "Top 10", "30+ Members". Numbers are animated. */
  value: string
  className?: string
}

/**
 * Counts up the first numeric portion of a string when scrolled into view,
 * preserving any prefix/suffix (e.g. "Top 10", "15+", "30+ Members").
 */
const AnimatedCounter = ({ value, className = '' }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const match = value.match(/(\D*)(\d+)(.*)/)
  const prefix = match ? match[1] : ''
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match ? match[3] : value

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (inView && match) motionVal.set(target)
  }, [inView, target, match, motionVal])

  useEffect(() => {
    if (!match) return
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
      }
    })
  }, [spring, prefix, suffix, match])

  if (!match) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

export default AnimatedCounter
