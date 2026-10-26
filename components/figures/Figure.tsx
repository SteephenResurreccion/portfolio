import type { ReactNode } from 'react'

type FigureProps = { caption: string; children: ReactNode; className?: string }

export function Figure({ caption, children, className = '' }: FigureProps) {
  return (
    <figure className={`flex flex-col gap-2.5 md:gap-3 ${className}`}>
      {children}
      <figcaption className="text-small text-muted text-pretty">{caption}</figcaption>
    </figure>
  )
}
