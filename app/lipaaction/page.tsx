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
import { lipaaction, lipaactionDecisions } from '@/content/projects/lipaaction'
import { caseStudyGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(lipaaction.seo, lipaaction.path)

export default function LipaActionPage() {
  return (
    <PageShell variant="case-study">
      <CaseStudyArticle>
        <CaseStudyHeader study={lipaaction} />
        <Opening paragraphs={lipaaction.opening} />
        <DecisionsSection>
          <DecisionBlock decision={lipaactionDecisions.xgboost} />
          <DecisionBlock decision={lipaactionDecisions.pinnedModel} />
          <DecisionBlock decision={lipaactionDecisions.serverPriority} />
          <DecisionBlock decision={lipaactionDecisions.rowLevelSecurity} />
        </DecisionsSection>
        <WhereItIsNow content={lipaaction.whereItIsNow} />
        <NextCaseStudy current="lipaaction" />
      </CaseStudyArticle>
      <JsonLd data={caseStudyGraph(lipaaction)} />
    </PageShell>
  )
}
