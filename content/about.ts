import type { Rich, Seo } from './types'

// The only page where Claude and agents may appear (content-rules).
export const aboutSeo: Seo = {
  title: 'About · Steephen Resurreccion',
  description:
    "I'm a full-stack developer and CS senior at De La Salle Lipa in the Philippines, graduating in 2027.",
}

export const about = {
  heading: 'About',
  paragraphs: [
    ["I'm a full-stack developer (web, mobile and ML, end to end) and a CS senior graduating in 2027."],
    [
      "I got into development during my first year in middle school, where I first learned how to code in C++. Since then, I've been making simple tools and programs for fun. I wish to get into development and improve my skills through experience and mentorship.",
    ],
    [
      "At a time when agentic engineering has become quite important, I think that it's important to really understand the system design under the hood rather than the code-writing part itself. That's why I really take my time and slice the workload into smaller pieces for agents, then connect the pieces. That way, security checks can run in the background while I do research or overhaul a feature.",
    ],
    [
      'Outside of coding, I take my time in learning the piano, working out, and some badminton. Routine is important to keep yourself in check, but I can be quite spontaneous myself if need be.',
    ],
  ] satisfies readonly Rich[],
  education: {
    heading: 'Education',
    school: 'De La Salle Lipa',
    degree: 'BS Computer Science, specialization in Internet of Things',
    dates: 'Aug 2023 – Jun 2027 (expected)',
    place: [{ kind: 'nowrap', text: 'Lipa City' }, ', Philippines'] satisfies Rich,
    coursework: 'Coursework: Data Structures & Algorithms, Operating Systems, Databases, Machine Learning',
    thesis: [
      'Thesis: ',
      { kind: 'internal', text: 'LipaAction', href: '/lipaaction' },
      ', an ML-assisted incident-reporting platform (in progress)',
    ] satisfies Rich,
  },
  skills: {
    heading: 'Skills',
    items: [
      {
        label: 'Languages:',
        text: 'TypeScript, JavaScript, HTML/CSS, Python, SQL (PostgreSQL), C++; familiar: Kotlin, Java, Lua',
      },
      {
        label: 'Frameworks & Libraries:',
        text: 'Next.js, React, React Native / Expo, Tailwind CSS, Jetpack Compose, Ktor, FastAPI, Prisma, NextAuth, Zod, pandas, scikit-learn, XGBoost, OpenCV, YOLOv8, dlib',
      },
      {
        label: 'Tools & Platforms:',
        text: 'Git & GitHub, GitHub Actions, Docker, PostgreSQL, PostGIS, SQLite, Supabase, Vercel, Jupyter, Android Studio, VS Code, Raspberry Pi / Linux, Claude Code (directing AI coding agents)',
      },
      {
        label: 'Concepts:',
        text: 'REST API design, database design & migrations, authentication (OAuth, role-based access), web security, payments & logistics integrations, unit/integration testing, CI/CD, ML classification & clustering, i18n',
      },
    ],
  },
} as const
