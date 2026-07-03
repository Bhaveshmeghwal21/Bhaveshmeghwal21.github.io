'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { site } from '@/content/site.mjs'
import GraphTrace from '@/components/motion/GraphTrace'

export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-item]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="section-container pt-12 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:items-end">
        <div>
          <div data-hero-item className="eyebrow">
            Portfolio 2026
          </div>
          <h1 data-hero-item className="section-title max-w-5xl">
            {site.role}
          </h1>
          <p data-hero-item className="section-copy max-w-3xl">
            {site.heroIntro}
          </p>
          <div
            data-hero-item
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300"
          >
            <a href="#work" className="button-primary">
              View selected work
              <FiArrowRight />
            </a>
            <a
              href={site.resumeGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Open resume
              <FiDownload />
            </a>
          </div>
          <div data-hero-item className="mt-10 flex flex-wrap gap-3">
            <span className="chip">Aerial robotics</span>
            <span className="chip">AI tooling</span>
            <span className="chip">Product systems</span>
          </div>
        </div>

        <div data-hero-item className="space-y-4">
          <GraphTrace className="h-64 md:h-80" />
          <div className="grid gap-3 sm:grid-cols-2">
            {site.stats.map((stat) => (
              <div key={stat.label} className="surface-muted px-4 py-4">
                <div className="metric-value">{stat.value}</div>
                <div className="mt-2 text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
