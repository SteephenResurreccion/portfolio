import type { Route } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/content/site'

export type PageVariant = 'home' | 'case-study' | 'about' | 'not-found'

const NAV_LINK = 'inline-flex min-h-11 items-center px-1.5 text-ui text-ink no-underline'
const NAV_CURRENT =
  'underline decoration-link decoration-2 underline-offset-6 hover:decoration-link-hover'
const NAV_IDLE = 'hover:text-link-hover'

export function SiteHeader({ variant }: { variant: PageVariant }) {
  const isHome = variant === 'home'
  const workHref: Route = isHome ? '/#work' : '/#work'
  const nameClasses = 'text-name font-semibold text-ink'
  return (
    <header
      className={`mx-auto flex w-full max-w-160 flex-col md:flex-row md:items-center md:justify-between md:gap-6 md:pt-10 ${
        isHome ? 'pt-5' : 'pt-2.5'
      }`}
    >
      {isHome ? (
        <h1 className={nameClasses}>{SITE_NAME}</h1>
      ) : (
        <Link
          href="/"
          className={`${nameClasses} inline-flex min-h-11 items-center self-start no-underline hover:text-link-hover md:self-auto`}
        >
          {SITE_NAME}
        </Link>
      )}
      <nav aria-label="Primary">
        <ul role="list" className="-mx-1.5 flex items-center gap-3 md:gap-4">
          <li>
            {isHome ? (
              <a href="#work" className={`${NAV_LINK} ${NAV_IDLE}`}>
                Work
              </a>
            ) : (
              <Link
                href={workHref}
                aria-current={variant === 'case-study' ? 'true' : undefined}
                className={`${NAV_LINK} ${variant === 'case-study' ? NAV_CURRENT : NAV_IDLE}`}
              >
                Work
              </Link>
            )}
          </li>
          <li>
            <Link
              href="/about"
              aria-current={variant === 'about' ? 'page' : undefined}
              className={`${NAV_LINK} ${variant === 'about' ? NAV_CURRENT : NAV_IDLE}`}
            >
              About
            </Link>
          </li>
          <li>
            <a href="#contact" className={`${NAV_LINK} ${NAV_IDLE}`}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
