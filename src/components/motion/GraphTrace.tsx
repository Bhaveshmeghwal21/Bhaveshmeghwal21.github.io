'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type GraphTraceProps = {
  className?: string
}

export default function GraphTrace({ className = '' }: GraphTraceProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      path.style.opacity = '1'
      return
    }

    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    })

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.out',
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div className={`graph-frame ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 440 260"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trace-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.92)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
          </linearGradient>
        </defs>
        <path
          d="M0 205 L60 180 L115 192 L168 120 L230 132 L288 74 L355 108 L440 38"
          fill="none"
          stroke="url(#trace-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          ref={pathRef}
          opacity="0"
        />
      </svg>
    </div>
  )
}
