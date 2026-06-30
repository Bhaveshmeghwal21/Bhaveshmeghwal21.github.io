'use client'

import { ReactNode } from 'react'

interface MarqueeProps {
  items: string[]
  className?: string
}

/**
 * Infinite horizontal marquee. The item list is duplicated so the CSS
 * translateX(-50%) loop appears seamless. Pauses on hover.
 */
const Marquee = ({ items, className = '' }: MarqueeProps) => {
  const doubled = [...items, ...items]

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className="marquee-track gap-4 hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="chip whitespace-nowrap px-4 py-2 text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
