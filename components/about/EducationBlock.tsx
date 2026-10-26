import { RichText } from '@/components/text/RichText'
import type { about } from '@/content/about'

export function EducationBlock({ education }: { education: (typeof about)['education'] }) {
  return (
    <section className="flex flex-col gap-6 md:gap-7">
      <h2 className="text-section-title font-semibold">{education.heading}</h2>
      <div className="flex flex-col gap-2 md:gap-2.5">
        <h3 className="text-block-title font-semibold">{education.school}</h3>
        <p className="text-body">{education.degree}</p>
        <p className="text-small text-muted">
          <span className="font-mono text-meta-date">{education.dates}</span>
          {' · '}
          <RichText value={education.place} />
        </p>
        <p className="text-body text-pretty">{education.coursework}</p>
        <p className="text-body text-pretty">
          <RichText value={education.thesis} />
        </p>
      </div>
    </section>
  )
}
