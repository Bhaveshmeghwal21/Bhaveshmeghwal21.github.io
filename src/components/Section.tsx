import Link from 'next/link'
import type { ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'

type SectionProps = {
  id: string
  title: string
  description?: string
  action?: { href: string; label: string }
  children: ReactNode
}

export default function Section({ id, title, description, action, children }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className="container-page">
      <div className="border-t border-line py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            {description ? <p className="mt-2 max-w-2xl text-muted">{description}</p> : null}
          </div>
          {action ? (
            <Link
              href={action.href}
              className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              {action.label}
              <FiArrowRight
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ) : null}
        </div>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  )
}
