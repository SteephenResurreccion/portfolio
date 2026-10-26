import type { ReactNode } from 'react'
import { BackLink } from './BackLink'
import { SiteFooter } from './SiteFooter'
import { SiteHeader, type PageVariant } from './SiteHeader'

// main's top padding and gap per page type (design-system-v20 §3.3), phone first.
const MAIN_CLASSES: Record<PageVariant, string> = {
  home: 'pt-8 gap-14 md:pt-18 md:gap-20',
  'case-study': 'pt-6 gap-2 md:pt-14 md:gap-4',
  about: 'pt-6 md:pt-14',
  'not-found': 'pt-6 md:pt-14',
}

type PageShellProps = { variant: PageVariant; children: ReactNode }

export function PageShell({ variant, children }: PageShellProps) {
  return (
    <>
      <SiteHeader variant={variant} />
      <main className={`mx-auto flex w-full max-w-160 grow flex-col ${MAIN_CLASSES[variant]}`}>
        {variant === 'case-study' && <BackLink />}
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
