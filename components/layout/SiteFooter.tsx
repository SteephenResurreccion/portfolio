import { COPYRIGHT, FOOTER_LOCATION } from '@/content/site'
import { ContactLinks } from './ContactLinks'

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-16 flex w-full max-w-160 flex-col gap-1 border-t border-rule pt-5 pb-12 text-ui text-muted md:mt-24 md:pt-6 md:pb-16"
    >
      <h2 className="sr-only">Contact</h2>
      <ContactLinks />
      <p className="text-small">
        {FOOTER_LOCATION}
        <span className="whitespace-nowrap">{COPYRIGHT}</span>
      </p>
    </footer>
  )
}
