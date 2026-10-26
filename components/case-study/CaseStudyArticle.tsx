import type { ReactNode } from 'react'

export function CaseStudyArticle({ children }: { children: ReactNode }) {
  return (
    <article aria-labelledby="cs-title" className="flex flex-col gap-11 md:gap-14">
      {children}
    </article>
  )
}
