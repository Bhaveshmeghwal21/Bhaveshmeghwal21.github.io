'use client'

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

type DroneProps = {
  className?: string
  /** Adds a gentle hover bob (for the hero). Leave off when a scroll path drives position. */
  bob?: boolean
}

const PODS = [
  { x: 46, y: 46, cw: true, led: '#ff5a33' },
  { x: 154, y: 46, cw: false, led: '#ff5a33' },
  { x: 46, y: 154, cw: false, led: '#ffb020' },
  { x: 154, y: 154, cw: true, led: '#ffb020' },
]

/**
 * Top-down quadcopter, drawn in SVG and animated with GSAP:
 * spinning two-blade props (CW/CCW pairs), pulsing nav LEDs,
 * and an optional hover bob. Front of the airframe points up.
 */
export default function Drone({ className = '', bob = false }: DroneProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('.prop-cw', {
        rotation: 360,
        duration: 0.22,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
      gsap.to('.prop-ccw', {
        rotation: -360,
        duration: 0.19,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
      gsap.to('.nav-led', {
        opacity: 0.25,
        duration: 0.85,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.18,
      })
      if (bob) {
        gsap.to(svg, { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, svg)

    return () => ctx.revert()
  }, [bob])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      style={{ filter: 'drop-shadow(0 12px 26px rgba(255, 90, 51, 0.18))' }}
    >
      {/* Arms */}
      {PODS.map((pod) => (
        <line
          key={`arm-${pod.x}-${pod.y}`}
          x1="100"
          y1="100"
          x2={pod.x}
          y2={pod.y}
          stroke="#252a36"
          strokeWidth="8"
          strokeLinecap="round"
        />
      ))}

      {/* Motor pods, prop-wash rings, LEDs, props */}
      {PODS.map((pod) => (
        <g key={`pod-${pod.x}-${pod.y}`}>
          <circle
            cx={pod.x}
            cy={pod.y}
            r="26"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <circle cx={pod.x} cy={pod.y} r="9" fill="#151823" stroke="rgba(255,255,255,0.16)" />
          <circle className="nav-led" cx={pod.x} cy={pod.y} r="3" fill={pod.led} />
          <g className={pod.cw ? 'prop-cw' : 'prop-ccw'} transform={`translate(${pod.x}, ${pod.y})`}>
            <ellipse rx="24" ry="3.2" fill="rgba(244,244,245,0.55)" />
            <circle r="2.4" fill="#f4f4f5" />
          </g>
        </g>
      ))}

      {/* Body */}
      <rect
        x="76"
        y="72"
        width="48"
        height="56"
        rx="16"
        fill="#171a24"
        stroke="rgba(255,255,255,0.16)"
      />
      {/* Heading wedge (front) */}
      <path d="M100 60 L108 72 L92 72 Z" fill="#ff5a33" />
      {/* Camera gimbal */}
      <circle cx="100" cy="86" r="6.5" fill="#0b0d13" stroke="rgba(255,176,32,0.7)" strokeWidth="1.5" />
      <circle cx="100" cy="86" r="2.4" fill="rgba(255,176,32,0.85)" />
      {/* Body detail lines */}
      <line x1="84" y1="104" x2="116" y2="104" stroke="rgba(255,255,255,0.12)" />
      <line x1="84" y1="112" x2="116" y2="112" stroke="rgba(255,255,255,0.08)" />
    </svg>
  )
}
