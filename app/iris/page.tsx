import type { Metadata } from 'next'
import { CaseStudyArticle } from '@/components/case-study/CaseStudyArticle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { DecisionBlock } from '@/components/case-study/DecisionBlock'
import { DecisionsSection } from '@/components/case-study/DecisionsSection'
import { NextCaseStudy } from '@/components/case-study/NextCaseStudy'
import { Opening } from '@/components/case-study/Opening'
import { WhereItIsNow } from '@/components/case-study/WhereItIsNow'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { iris, irisDecisions } from '@/content/projects/iris'
import { caseStudyGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(iris.seo, iris.path)

export default function IrisPage() {
  return (
    <PageShell variant="case-study">
      <CaseStudyArticle>
        <CaseStudyHeader study={iris} />
        <Opening paragraphs={iris.opening} />
        <DecisionsSection>
          <DecisionBlock decision={irisDecisions.dlibHog} />
          <DecisionBlock decision={irisDecisions.falseAlarms} />
        </DecisionsSection>
        <WhereItIsNow content={iris.whereItIsNow} />
        <NextCaseStudy current="iris" />
      </CaseStudyArticle>
      <JsonLd data={caseStudyGraph(iris)} />
    </PageShell>
  )
}
