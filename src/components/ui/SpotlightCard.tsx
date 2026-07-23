'use client'

import { useRef, useState, ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Spotlight color, defaults to cyan */
  spotlightColor?: string
}

/**
 * A glassmorphic card that renders a soft radial "spotlight" following the
 * cursor, plus a subtle highlighted border that tracks the same position.
 */
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 90, 51, 0.16)',
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative overflow-hidden rounded-2xl glass glass-hover ${className}`}
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

export default SpotlightCard
