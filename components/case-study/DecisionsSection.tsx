import type { ReactNode } from 'react'

/** The Decisions section: decision blocks and figures, in page order. */
export function DecisionsSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6 md:gap-7">
      <h2 className="text-section-title font-semibold">Decisions</h2>
      {children}
    </section>
  )
}
