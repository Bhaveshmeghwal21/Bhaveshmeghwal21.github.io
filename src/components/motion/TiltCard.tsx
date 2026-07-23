'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  /** Max tilt in degrees. */
  max?: number
  /** Scale applied on hover, on top of the tilt. */
  liftScale?: number
}

/**
 * Mouse-driven 3D tilt: the outer div supplies the perspective, the inner
 * div is a preserve-3d surface GSAP rotates toward the cursor and lifts
 * (translateZ + scale) on hover — the standard "3D card" read seen on
 * gsap.com / Awwwards-tier sites, built from CSS transforms alone.
 */
export default function TiltCard({ children, className = '', style, max = 9, liftScale = 1.015 }: TiltCardProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const inner = innerRef.current
    if (!host || !inner || prefersReducedMotion()) return

    const rotateX = gsap.quickTo(inner, 'rotateX', { duration: 0.5, ease: 'power3.out' })
    const rotateY = gsap.quickTo(inner, 'rotateY', { duration: 0.5, ease: 'power3.out' })
    const scaleTo = gsap.quickTo(inner, 'scale', { duration: 0.45, ease: 'power3.out' })
    const liftZ = gsap.quickTo(inner, 'z', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      rotateY(nx * max)
      rotateX(-ny * max)
    }
    const onEnter = () => {
      scaleTo(liftScale)
      liftZ(26)
    }
    const onLeave = () => {
      rotateX(0)
      rotateY(0)
      scaleTo(1)
      liftZ(0)
    }

    host.addEventListener('mousemove', onMove)
    host.addEventListener('mouseenter', onEnter)
    host.addEventListener('mouseleave', onLeave)

    return () => {
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseenter', onEnter)
      host.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(inner)
    }
  }, [max, liftScale])

  return (
    <div ref={hostRef} style={style} className={`tilt-card ${className}`}>
      <div ref={innerRef} className="tilt-card-inner">
        {children}
      </div>
    </div>
  )
}
