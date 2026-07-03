'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,24rem)] lg:items-start">
        <div>
          <div data-hero-item className="eyebrow">
            Bhavesh Meghwal
          </div>
          <h1 data-hero-item className="section-title max-w-5xl">
            {site.role}
          </h1>
          <p data-hero-item className="section-copy max-w-3xl">
            {site.heroIntro}
          </p>
          <div data-hero-item className="mt-8 space-y-3 border-l border-white/10 pl-4 text-sm text-zinc-300">
            {site.heroHighlights.map((item) => (
              <div key={item.label} className="flex flex-wrap gap-2">
                <span className="font-mono uppercase tracking-[0.14em] text-zinc-500">
                  {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div
            data-hero-item
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300"
          >
            <a href="#work" className="button-primary">
              Selected work
              <FiArrowRight />
            </a>
            <a
              href={site.resumeGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Resume
              <FiDownload />
            </a>
          </div>
        </div>

        <div data-hero-item className="space-y-4">
          <div className="surface p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem]">
              <Image
                src={site.profileImage}
                alt="Bhavesh Meghwal"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 24rem"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Mechanical Engineering at IIT (BHU), building around drones, autonomy,
              and operator-facing software.
            </p>
          </div>
          <GraphTrace className="h-24 border-0 bg-transparent shadow-none" />
        </div>
      </div>

      <div
        data-hero-item
        className="mt-14 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-4"
      >
        {site.stats.map((stat) => (
          <div key={stat.label}>
            <div className="metric-value">{stat.value}</div>
            <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
