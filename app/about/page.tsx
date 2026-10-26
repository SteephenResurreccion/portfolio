import type { Metadata } from 'next'
import { EducationBlock } from '@/components/about/EducationBlock'
import { SkillsList } from '@/components/about/SkillsList'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/text/RichText'
import { about, aboutSeo } from '@/content/about'
import { aboutGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(aboutSeo, '/about')

export default function AboutPage() {
  return (
    <PageShell variant="about">
      <article aria-labelledby="about-title" className="flex flex-col gap-11 md:gap-14">
        <div className="flex flex-col gap-2.5 md:gap-3">
          <h1 id="about-title" className="text-page-title font-semibold tracking-[-0.015em]">
            {about.heading}
          </h1>
          <div className="flex flex-col gap-3.5 md:gap-4">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body text-pretty">
                <RichText value={paragraph} />
              </p>
            ))}
          </div>
        </div>
        <EducationBlock education={about.education} />
        <SkillsList skills={about.skills} />
      </article>
      <JsonLd data={aboutGraph()} />
    </PageShell>
  )
}
