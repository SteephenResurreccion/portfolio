// The external-link allowlist (R92). Every external href on the site comes from here,
// so a URL outside this list is a type error. check-site keeps its own independent copy.
export const EXTERNAL = {
  linkedin: 'https://www.linkedin.com/in/steephen-resurreccion/',
  github: 'https://github.com/SteephenResurreccion',
  noelagritvSite: 'https://noelagritv.com',
  noelagritvRepo: 'https://github.com/SteephenResurreccion/noel-agritv',
  xiaoLongBaoRepo: 'https://github.com/SteephenResurreccion/XiaoLongBaoLipa',
  // The labelled test-mode demo: no real orders, payments, deliveries or SMS.
  xiaoLongBaoDemo: 'https://xiao-long-bao-lipa.vercel.app',
  irisAppRepo: 'https://github.com/ShanPla/IRIS-Mobile-Frontend',
} as const

export type ExternalHref = (typeof EXTERNAL)[keyof typeof EXTERNAL]
