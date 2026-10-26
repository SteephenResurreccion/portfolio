import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { RichText } from '@/components/text/RichText'
import { notFound, notFoundSeo } from '@/content/not-found'

// Title and description only: no canonical and no Open Graph; Next adds noindex on the 404 response.
export const metadata: Metadata = { title: notFoundSeo.title, description: notFoundSeo.description }

export default function NotFoundPage() {
  return (
    <PageShell variant="not-found">
      <div className="flex flex-col gap-2.5 md:gap-3">
        <h1 className="text-page-title font-semibold tracking-[-0.015em]">{notFound.heading}</h1>
        <div className="flex flex-col gap-3.5 md:gap-4">
          {notFound.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-body text-pretty">
              <RichText value={paragraph} />
            </p>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
