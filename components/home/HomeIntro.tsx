import { ContactLinks } from '@/components/layout/ContactLinks'
import { RichText } from '@/components/text/RichText'
import type { Rich } from '@/content/types'

type HomeIntroProps = { intro: { paragraphs: readonly Rich[]; location: string } }

/** The unheaded intro: three paragraphs, the location line and the contact row. */
export function HomeIntro({ intro }: HomeIntroProps) {
  return (
    <section className="flex flex-col gap-2.5 md:gap-3">
      {intro.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-pretty">
          <RichText value={paragraph} />
        </p>
      ))}
      <div className="flex flex-col gap-0.5 pt-1 text-ui">
        <p className="text-muted">{intro.location}</p>
        <ContactLinks />
      </div>
    </section>
  )
}
