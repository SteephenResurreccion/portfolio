import type { Metadata } from 'next'
import { CaseStudyArticle } from '@/components/case-study/CaseStudyArticle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { DecisionBlock } from '@/components/case-study/DecisionBlock'
import { DecisionsSection } from '@/components/case-study/DecisionsSection'
import { NextCaseStudy } from '@/components/case-study/NextCaseStudy'
import { Opening } from '@/components/case-study/Opening'
import { WhereItIsNow } from '@/components/case-study/WhereItIsNow'
import { SyncDiagramFigure } from '@/components/las-pos/SyncDiagramFigure'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { lasPos, lasPosDecisions, syncDiagram } from '@/content/projects/las-pos'
import { caseStudyGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(lasPos.seo, lasPos.path)

export default function LasPosPage() {
  return (
    <PageShell variant="case-study">
      <CaseStudyArticle>
        <CaseStudyHeader study={lasPos} />
        <Opening paragraphs={lasPos.opening} />
        <DecisionsSection>
          <DecisionBlock decision={lasPosDecisions.offlineFirst} />
          <DecisionBlock decision={lasPosDecisions.uniqueEventId} />
          <SyncDiagramFigure diagram={syncDiagram} />
          <DecisionBlock decision={lasPosDecisions.stockChanges} />
        </DecisionsSection>
        <WhereItIsNow content={lasPos.whereItIsNow} />
        <NextCaseStudy current="las-pos" />
      </CaseStudyArticle>
      <JsonLd data={caseStudyGraph(lasPos)} />
    </PageShell>
  )
}
