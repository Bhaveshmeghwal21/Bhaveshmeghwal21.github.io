import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  children?: ReactNode
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {children ? <div className="mt-4 text-pretty text-lg leading-8 text-muted">{children}</div> : null}
    </header>
  )
}
