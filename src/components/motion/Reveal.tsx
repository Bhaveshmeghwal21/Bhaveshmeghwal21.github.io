'use client'

import { ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(node, { opacity: 1, y: 0 })
      return
    }

    gsap.set(node, { opacity: 0, y })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        gsap.to(node, {
          opacity: 1,
          y: 0,
          delay,
          duration: 0.8,
          ease: 'power3.out',
        })

        observer.disconnect()
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [delay, y])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
