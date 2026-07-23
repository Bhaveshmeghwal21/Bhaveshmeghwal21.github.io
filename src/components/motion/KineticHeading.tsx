'use client'

import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger, SplitText } from '@/lib/motion'

type KineticHeadingProps = {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  /** 'words' gives a snappy stagger; 'lines' suits longer multi-line copy. */
  splitBy?: 'words' | 'lines'
  /** 'load' plays immediately (hero); 'scroll' waits for the heading to enter view. */
  trigger?: 'load' | 'scroll'
  delay?: number
}

/**
 * Word- or line-level kinetic type reveal: each unit slides up out of a
 * clipped mask instead of just fading, using GSAP SplitText + ScrollTrigger.
 */
export default function KineticHeading({
  children,
  as = 'h2',
  className = '',
  splitBy = 'words',
  trigger = 'scroll',
  delay = 0,
}: KineticHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const Tag = as as unknown as 'h2'

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ensureGsapPlugins()

    let split: InstanceType<typeof SplitText> | undefined
    let tween: ReturnType<typeof gsap.to> | undefined
    let cancelled = false

    const ready = document.fonts ? document.fonts.ready : Promise.resolve()

    ready.then(() => {
      if (cancelled || !ref.current) return

      split = SplitText.create(ref.current, {
        type: splitBy,
        mask: splitBy,
        autoSplit: true,
      })

      const targets = splitBy === 'words' ? split.words : split.lines

      gsap.set(targets, { yPercent: 115, opacity: 0 })

      tween = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        ease: 'power4.out',
        stagger: splitBy === 'words' ? 0.045 : 0.1,
        delay,
        scrollTrigger:
          trigger === 'scroll' ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
      })
    })

    return () => {
      cancelled = true
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert()
    }
  }, [splitBy, trigger, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
