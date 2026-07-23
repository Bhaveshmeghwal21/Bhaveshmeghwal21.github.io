'use client'

import { useEffect, useId, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

type DroneProps = {
  className?: string
  /** Gentle hover bob + idle roll sway (for the hero, where nothing else drives it). */
  bob?: boolean
  /** Tilts the rig toward the cursor (rotateX/Y) — hero-only, self-contained. */
  interactive?: boolean
  /** Exposes the preserve-3d stage so a parent (e.g. FlightPath) can bank it into turns. */
  stageRef?: React.MutableRefObject<HTMLDivElement | null>
}

const PODS = [
  { x: 46, y: 46, cw: true, led: 'var(--accent)' },
  { x: 154, y: 46, cw: false, led: 'var(--accent)' },
  { x: 46, y: 154, cw: false, led: 'var(--accent-2)' },
  { x: 154, y: 154, cw: true, led: 'var(--accent-2)' },
]

/**
 * A quadcopter built as five flat SVG layers stacked on their own translateZ
 * inside a preserve-3d stage (shadow -70 / arms -20 / chassis 0 / props +22
 * / gimbal +34). No WebGL: rotating the stage separates the layers into a
 * genuine parallax-3D read — the trick behind most "3D" hero art that isn't
 * actually a 3D engine. Props spin, nav LEDs pulse, and the stage itself can
 * be driven by mouse (interactive), idle sway (bob), or an external ref
 * (stageRef, for path-banking in FlightPath).
 */
export default function Drone({ className = '', bob = false, interactive = false, stageRef }: DroneProps) {
  const rigRef = useRef<HTMLDivElement>(null)
  const stageInnerRef = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (stageRef) stageRef.current = stageInnerRef.current
  }, [stageRef])

  useEffect(() => {
    const rig = rigRef.current
    const stage = stageInnerRef.current
    if (!rig || !stage || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('.prop-cw', { rotation: 360, duration: 0.22, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
      gsap.to('.prop-ccw', { rotation: -360, duration: 0.19, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
      gsap.to('.nav-led', {
        opacity: 0.25,
        duration: 0.85,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.18,
      })

      if (bob) {
        // Idle "alive" sway lives on rig-translateY + stage-rotateZ only —
        // rotateX/rotateY on the stage stay free for the mouse-tilt tween
        // below so the two never fight over the same property.
        gsap.to(rig, { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to(stage, { rotateZ: 2.5, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, rig)

    let onMove: ((e: MouseEvent) => void) | null = null
    if (interactive) {
      const rotateY = gsap.quickTo(stage, 'rotateY', { duration: 0.7, ease: 'power3.out' })
      const rotateX = gsap.quickTo(stage, 'rotateX', { duration: 0.7, ease: 'power3.out' })
      onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        rotateY(nx * 26)
        rotateX(-ny * 18)
      }
      window.addEventListener('mousemove', onMove)
    }

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [bob, interactive])

  return (
    <div ref={rigRef} className={`drone-rig aspect-square ${className}`} aria-hidden>
      <div ref={stageInnerRef} className="drone-stage">
        {/* Layer 1 — ambient shadow (furthest back) */}
        <svg className="drone-layer" style={{ transform: 'translateZ(-70px)' }} viewBox="0 0 200 200">
          <defs>
            <radialGradient id={`${uid}-shadow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="128" rx="58" ry="20" fill={`url(#${uid}-shadow)`} />
        </svg>

        {/* Layer 2 — arms + prop-wash rings */}
        <svg className="drone-layer" style={{ transform: 'translateZ(-20px)' }} viewBox="0 0 200 200">
          <defs>
            <linearGradient id={`${uid}-arm`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#30364a" />
              <stop offset="100%" stopColor="#181c28" />
            </linearGradient>
          </defs>
          {PODS.map((pod) => (
            <line
              key={`arm-${pod.x}-${pod.y}`}
              x1="100"
              y1="100"
              x2={pod.x}
              y2={pod.y}
              stroke={`url(#${uid}-arm)`}
              strokeWidth="9"
              strokeLinecap="round"
            />
          ))}
          {PODS.map((pod) => (
            <circle
              key={`ring-${pod.x}-${pod.y}`}
              cx={pod.x}
              cy={pod.y}
              r="27"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
          ))}
        </svg>

        {/* Layer 3 — chassis body */}
        <svg className="drone-layer" style={{ transform: 'translateZ(0px)' }} viewBox="0 0 200 200">
          <defs>
            <radialGradient id={`${uid}-body`} cx="38%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#2a2f3d" />
              <stop offset="60%" stopColor="#181c28" />
              <stop offset="100%" stopColor="#0e1119" />
            </radialGradient>
          </defs>
          {PODS.map((pod) => (
            <circle
              key={`pod-${pod.x}-${pod.y}`}
              cx={pod.x}
              cy={pod.y}
              r="9"
              fill="#151823"
              stroke="rgba(255,255,255,0.18)"
            />
          ))}
          <rect x="76" y="72" width="48" height="56" rx="16" fill={`url(#${uid}-body)`} stroke="rgba(255,255,255,0.16)" />
          <path d="M100 60 L109 73 L91 73 Z" fill="var(--accent)" />
          <line x1="84" y1="104" x2="116" y2="104" stroke="rgba(255,255,255,0.12)" />
          <line x1="84" y1="112" x2="116" y2="112" stroke="rgba(255,255,255,0.08)" />
        </svg>

        {/* Layer 4 — motor pods + spinning props (nearer viewer) */}
        <svg className="drone-layer" style={{ transform: 'translateZ(22px)' }} viewBox="0 0 200 200">
          {PODS.map((pod) => (
            <g key={`prop-${pod.x}-${pod.y}`}>
              <circle className="nav-led" cx={pod.x} cy={pod.y} r="3" fill={pod.led} />
              <g className={pod.cw ? 'prop-cw' : 'prop-ccw'} transform={`translate(${pod.x}, ${pod.y})`}>
                <ellipse rx="24" ry="3.2" fill="rgba(244,244,245,0.55)" />
                <ellipse rx="3.2" ry="24" fill="rgba(244,244,245,0.18)" />
                <circle r="2.4" fill="#f4f4f5" />
              </g>
            </g>
          ))}
        </svg>

        {/* Layer 5 — camera gimbal (closest to viewer, sells the depth pop) */}
        <svg className="drone-layer" style={{ transform: 'translateZ(34px)' }} viewBox="0 0 200 200">
          <circle cx="100" cy="86" r="6.5" fill="#0b0d13" stroke="var(--accent-2)" strokeWidth="1.5" />
          <circle cx="100" cy="86" r="2.4" fill="var(--accent-2)" />
          <circle cx="98" cy="84" r="0.9" fill="rgba(255,255,255,0.9)" />
        </svg>
      </div>
    </div>
  )
}
