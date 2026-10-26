import { EXTERNAL } from '../links'
import type { CaseStudy, CompactEntry, Decision, Inline } from '../types'

// No images by rule (no camera feed, no faces).
const appCodeLink: Inline = {
  kind: 'external',
  text: 'App code on GitHub',
  href: EXTERNAL.irisAppRepo,
  srContext: 'for IRIS',
}

export const irisHome: CompactEntry = {
  title: { name: 'IRIS', qualifier: '(team project)' },
  path: '/iris',
  dates: 'Jan 2026 – May 2026',
  body: [
    'I built the camera and recognition pipeline of a Raspberry Pi 4B facial-recognition CCTV (50 of 68 backend commits).',
  ],
}

export const iris: CaseStudy = {
  slug: 'iris',
  path: '/iris',
  title: { name: 'IRIS', qualifier: '(team project)' },
  seo: {
    title: 'IRIS (team project) · Steephen Resurreccion',
    description:
      'IRIS, a team project: a facial-recognition CCTV camera on a Raspberry Pi 4B. I built its camera and recognition pipeline.',
  },
  dek: 'A facial-recognition home-security camera on a Raspberry Pi 4B, with a mobile app. I built its camera and recognition pipeline.',
  status: ['The project ended in May 2026.'],
  meta: { dates: 'Jan 2026 – May 2026', items: [['Team of 3'], [appCodeLink]] },
  stack: ['Python', 'FastAPI', 'OpenCV', 'YOLOv8', 'dlib', 'React Native'],
  opening: [
    [
      "There was an incident where our old camera broke: a Pi Camera NoIR, which was what we designed the system for. So when we changed cameras, we had to change up a lot of stuff. This was because the NoIR worked well in areas that aren't very well lit, so code that worked on the NoIR just didn't work that well on the standard Pi camera.",
    ],
    [
      'In that process, I learned how to further improve the system, along with the changes that needed to be done to adjust for the new camera.',
    ],
  ],
  whereItIsNow: {
    paragraphs: [
      [
        "The project ended in May 2026. A teammate scaffolded the backend, and face matching came with that scaffold. My part was the camera and recognition pipeline around it (50 of 68 backend commits): YOLOv8n person detection, dlib HOG face detection and a recognition thread. The camera loop already used a lot of resources, so running recognition inside it would have frozen the live feed. Recognition ran on its own thread instead, so the loop didn't wait for it.",
      ],
      ['I was also the top contributor to the Expo mobile app (29 of 66 commits).'],
      [
        "If I did it again, I'd probably scope down the project. We tried to do too much, and it may or may not have degraded the quality of the main features we wanted.",
      ],
      ["The backend's code is private."],
    ],
    links: [appCodeLink],
  },
  structuredData: { name: 'IRIS', role: 'contributor' },
}

export const irisDecisions = {
  dlibHog: {
    heading: 'dlib HOG instead of a Haar cascade',
    paragraphs: [
      [
        "On the new camera, the Haar cascade kept detecting faces that weren't there, in furniture and shadows. It's an old, fast detector that looks for simple light and dark rectangle patterns, so shadows can fool it. To cut down on those false positives, I moved face detection to dlib HOG, which describes shapes by the direction of their edges and holds up better under different lighting.",
      ],
      [
        'The cost was a slower detector, so HOG only ran on the person crops: the parts of a frame where YOLOv8n had already found a person, not the whole frame. Running it on every full frame could overload the Raspberry Pi, which tends to overheat.',
      ],
    ],
  },
  falseAlarms: {
    heading: 'Guarding against false alarms',
    paragraphs: [
      [
        'I ran the enrolled faces and the live camera frames through the same CLAHE lighting correction, so a face was always compared like with like. CLAHE boosts contrast in small patches of the image, so faces in dark or bright areas still show detail.',
      ],
      ['One frame can misread a face and trigger a false alarm, so an event only fired when several frames agreed.'],
    ],
  },
} satisfies Record<string, Decision>
