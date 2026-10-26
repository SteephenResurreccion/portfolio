import type { about } from '@/content/about'

export function SkillsList({ skills }: { skills: (typeof about)['skills'] }) {
  return (
    <section className="flex flex-col gap-2.5 md:gap-3">
      <h2 className="text-section-title font-semibold">{skills.heading}</h2>
      <ul role="list" className="flex flex-col gap-2.5 md:gap-3">
        {skills.items.map((item) => (
          <li key={item.label} className="text-body text-pretty">
            <span className="font-semibold">{item.label}</span> {item.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
