import type { CollegeOrUniversity, CreativeWork, Graph, Person, ProfilePage, WebSite } from 'schema-dts'
import { EXTERNAL } from '@/content/links'
import { EMAIL, JOB_TITLE, SITE_NAME, SITE_URL } from '@/content/site'
import type { CaseStudy } from '@/content/types'

// Every @id and url is absolute, so the graph never depends on a consumer knowing the page's base URL.
const absolute = (path: string) => new URL(path, SITE_URL).href
const PERSON_ID = absolute('/#person')

function personNode(affiliation?: CollegeOrUniversity): Person {
  return {
    '@type': 'Person',
    ...(affiliation && { affiliation }),
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: absolute('/'),
    jobTitle: JOB_TITLE,
    email: EMAIL,
    sameAs: [EXTERNAL.linkedin, EXTERNAL.github],
  }
}

export function homeGraph(): Graph {
  const website: WebSite = { '@type': 'WebSite', '@id': absolute('/#website'), name: SITE_NAME, url: absolute('/') }
  return { '@context': 'https://schema.org', '@graph': [website, personNode()] }
}

export function aboutGraph(): Graph {
  // affiliation, not alumniOf: alumniOf would claim he has graduated.
  const school: CollegeOrUniversity = { '@type': 'CollegeOrUniversity', name: 'De La Salle Lipa' }
  const page: ProfilePage = {
    '@type': 'ProfilePage',
    url: absolute('/about'),
    mainEntity: personNode(school),
  }
  return { '@context': 'https://schema.org', '@graph': [page] }
}

export function caseStudyGraph(study: CaseStudy): Graph {
  const url = absolute(study.path)
  const work: CreativeWork = {
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: study.structuredData.name,
    description: study.seo.description,
    url,
    [study.structuredData.role]: { '@id': PERSON_ID },
  }
  const person: Person = { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: absolute('/') }
  return { '@context': 'https://schema.org', '@graph': [work, person] }
}
