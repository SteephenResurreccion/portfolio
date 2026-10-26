import type { ReactNode } from 'react'

/** Title and dates: stacked on phones, the date flush right from md. */
export function EntryTitleRow({ heading, dates }: { heading: ReactNode; dates: string }) {
  return (
    <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
      {heading}
      <span className="shrink-0 font-mono text-entry-date text-muted">{dates}</span>
    </div>
  )
}
