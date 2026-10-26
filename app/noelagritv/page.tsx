import type { Metadata } from 'next'
import { CaseStudyArticle } from '@/components/case-study/CaseStudyArticle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { DecisionBlock } from '@/components/case-study/DecisionBlock'
import { DecisionsSection } from '@/components/case-study/DecisionsSection'
import { NextCaseStudy } from '@/components/case-study/NextCaseStudy'
import { Opening } from '@/components/case-study/Opening'
import { WhereItIsNow } from '@/components/case-study/WhereItIsNow'
import { Figure } from '@/components/figures/Figure'
import { PhonePairFigure } from '@/components/figures/PhonePairFigure'
import { ResponsiveImage } from '@/components/figures/ResponsiveImage'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { noelagritv, noelagritvDecisions, noelagritvImages } from '@/content/projects/noelagritv'
import { caseStudyGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(noelagritv.seo, noelagritv.path)

const HERO_SIZES = '(min-width: 672px) 638px, calc(100vw - 34px)'

export default function NoelAgriTVPage() {
  return (
    <PageShell variant="case-study">
      <CaseStudyArticle>
        <CaseStudyHeader study={noelagritv} />
        <Figure caption={noelagritvImages.storefront.caption}>
          <ResponsiveImage image={noelagritvImages.storefront.image} sizes={HERO_SIZES} priority />
        </Figure>
        <Opening paragraphs={noelagritv.opening} />
        <DecisionsSection>
          <DecisionBlock decision={noelagritvDecisions.googleSheet} />
          <DecisionBlock decision={noelagritvDecisions.cashOnDelivery} />
          <PhonePairFigure checkout={noelagritvImages.checkout} lookup={noelagritvImages.lookup} />
        </DecisionsSection>
        <WhereItIsNow content={noelagritv.whereItIsNow} />
        <NextCaseStudy current="noelagritv" />
      </CaseStudyArticle>
      <JsonLd data={caseStudyGraph(noelagritv)} />
    </PageShell>
  )
}
