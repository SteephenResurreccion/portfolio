import { EXTERNAL } from '../links'
import type { CompactEntry } from '../types'

// No case study, so the Home title is not a link.
export const xiaoLongBaoHome: CompactEntry = {
  title: { name: 'Xiao Long Bao Lipa', qualifier: '(freelance)' },
  dates: 'Mar 2026',
  body: [
    "A Next.js 16 ordering site, scrapped when the business didn't take off; its checkout, delivery and SMS integrations exist in code and never ran live. ",
    { kind: 'external', text: 'Code on GitHub', href: EXTERNAL.xiaoLongBaoRepo, srContext: 'for Xiao Long Bao Lipa' },
    ' · ',
    { kind: 'external', text: 'Try the demo', href: EXTERNAL.xiaoLongBaoDemo, srContext: 'of Xiao Long Bao Lipa' },
  ],
}
