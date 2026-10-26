import { Fragment } from 'react'
import { Qualifier } from '@/components/text/Qualifier'
import { RichText } from '@/components/text/RichText'
import type { CaseStudy } from '@/content/types'

export function CaseStudyHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="flex flex-col gap-2.5 md:gap-3">
      <h1 id="cs-title" className="text-page-title font-semibold tracking-[-0.015em]">
        {study.title.name}
        {study.title.qualifier && (
          <>
            {' '}
            <Qualifier text={study.title.qualifier} placement="page-title" />
          </>
        )}
      </h1>
      <p className="text-dek text-pretty">{study.dek}</p>
      <div className="flex flex-col gap-1 pt-1">
        <p className="text-status font-semibold">
          <RichText value={study.status} />
        </p>
        <p className="text-small text-muted">
          <span className="font-mono text-meta-date">{study.meta.dates}</span>
          {study.meta.items.map((item, index) => (
            <Fragment key={index}>
              {' · '}
              <RichText value={item} />
            </Fragment>
          ))}
        </p>
        <p className="font-mono text-stack text-muted">{study.stack.join(' · ')}</p>
      </div>
    </header>
  )
}
