import type { Metadata } from 'next'
import { CompactEntry } from '@/components/home/CompactEntry'
import { FeaturedEntry } from '@/components/home/FeaturedEntry'
import { HomeIntro } from '@/components/home/HomeIntro'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { homeIntro, homeSeo, MORE_PROJECTS_HEADING } from '@/content/home'
import { irisHome } from '@/content/projects/iris'
import { lasPosHome } from '@/content/projects/las-pos'
import { lipaactionHome } from '@/content/projects/lipaaction'
import { noelagritvHome } from '@/content/projects/noelagritv'
import { vcTranscripterHome } from '@/content/projects/vc-transcripter'
import { xiaoLongBaoHome } from '@/content/projects/xiao-long-bao'
import { homeGraph } from '@/lib/json-ld'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata(homeSeo, '/')

export default function HomePage() {
  return (
    <PageShell variant="home">
      <HomeIntro intro={homeIntro} />
      <section id="work" className="flex flex-col gap-10 md:gap-12">
        <FeaturedEntry entry={noelagritvHome} />
        <FeaturedEntry entry={lasPosHome} />
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-ui font-semibold text-muted">{MORE_PROJECTS_HEADING}</h2>
        <CompactEntry entry={lipaactionHome} />
        <CompactEntry entry={irisHome} />
        <CompactEntry entry={xiaoLongBaoHome} />
        <CompactEntry entry={vcTranscripterHome} />
      </section>
      <JsonLd data={homeGraph()} />
    </PageShell>
  )
}
