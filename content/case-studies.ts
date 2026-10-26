import { iris } from './projects/iris'
import { lasPos } from './projects/las-pos'
import { lipaaction } from './projects/lipaaction'
import { noelagritv } from './projects/noelagritv'
import type { CaseStudy, CaseStudySlug } from './types'

/** Case-study order, which is also the "Next:" chain; the last one loops back to the first. */
export const CASE_STUDIES: readonly CaseStudy[] = [noelagritv, lasPos, lipaaction, iris]

export function nextCaseStudy(current: CaseStudySlug): CaseStudy {
  const index = CASE_STUDIES.findIndex((study) => study.slug === current)
  if (index === -1) throw new Error(`Unknown case study slug: ${current}`)
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length]
  if (!next) throw new Error(`No case study after ${current}`)
  return next
}
