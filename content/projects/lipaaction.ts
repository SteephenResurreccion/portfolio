import type { CaseStudy, CompactEntry, Decision } from '../types'

// Text only by rule: no screenshots, no diagram, no code link.
export const lipaactionHome: CompactEntry = {
  title: { name: 'LipaAction', qualifier: '(undergraduate thesis)' },
  path: '/lipaaction',
  dates: 'May 2026 – Present',
  body: [
    "In a team of 3, I'm leading the technical build of an ML-assisted platform for escalating barangay (village) incident reports to 5 city agencies.",
  ],
}

export const lipaaction: CaseStudy = {
  slug: 'lipaaction',
  path: '/lipaaction',
  title: { name: 'LipaAction', qualifier: '(undergraduate thesis)' },
  seo: {
    title: 'LipaAction (undergraduate thesis) · Steephen Resurreccion',
    description:
      'LipaAction, my undergraduate thesis: an ML-assisted platform for escalating barangay (village) incident reports to 5 city agencies. I lead the technical build.',
  },
  dek: "An ML-assisted platform for escalating barangay (village) incident reports to 5 city agencies: a mobile app for residents, a model that scores each report's priority, and dashboards for the agencies.",
  status: ["Ongoing; user acceptance testing is designed but hasn't been run yet."],
  meta: {
    dates: 'May 2026 – Present',
    items: [['Team of 3; I lead the technical build'], ['about 1,000 automated tests as of Sep 2026']],
  },
  stack: ['Expo', 'Supabase/PostGIS', 'FastAPI', 'XGBoost'],
  opening: [
    [
      "This was a big project. I'm not sure how far I had to go in security before it started becoming exhaustive. This was supposed to be a platform meant for city agencies and the local government, so security came first. This is different from just a standard website and POS system, after all; we had to really think about how we wanted to build this, and how it'd work in the first place.",
    ],
    [
      'What was initially supposed to be a 5-man group turned into 4, then turned into 3. We just had to split our roles based on what we did best. It was best if we worked on our own parts without interconnecting too much.',
    ],
  ],
  whereItIsNow: {
    paragraphs: [
      [
        "It's still ongoing: we've designed the user acceptance testing, but we haven't run it yet. The platform is built for 4 target barangays.",
      ],
      ["The code is private, so there's no link."],
    ],
  },
  structuredData: { name: 'LipaAction', role: 'contributor' },
}

export const lipaactionDecisions = {
  xgboost: {
    heading: 'XGBoost, trained on rule-labeled records',
    paragraphs: [
      [
        'We had 2.3k city disaster-office records, and XGBoost is a strong default for table-style data and small datasets like that. Nobody had labeled the records with a priority, so we wrote a set of rules, and each record got the label the rules voted for most. The model learned from those labels.',
      ],
    ],
  },
  pinnedModel: {
    heading: 'Pinning the validated model',
    paragraphs: [
      [
        "I deployed it as a FastAPI service on a VM and pinned the validated model files, feature order and library versions. A test checks that the model files haven't changed. The model reads its inputs by position, not by name, so a changed feature order could stop it with an error or, worse, quietly give wrong priorities. And code that works on one library version can return an error on another.",
      ],
    ],
  },
  serverPriority: {
    heading: 'Priority on the server, not the client',
    paragraphs: [
      [
        "A report's priority is meant to show which incidents need attention first, so it shouldn't be set by the app that sent the report. I moved priority scoring to the server: when a resident submits a report, a database trigger fires, an Edge Function sends the report's details to the model service, and the priority it returns (Low to Critical) is saved on the report.",
      ],
    ],
  },
  rowLevelSecurity: {
    heading: 'Row-level security for 8 roles',
    paragraphs: [
      [
        'Residents, barangay staff and agency staff each need to see and change different things, so I enforced an 8-role access matrix with row-level security: the database checks what each role can read and change, row by row.',
      ],
    ],
  },
} satisfies Record<string, Decision>
