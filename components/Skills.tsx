import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-y relative scroll-mt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-32 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#DCE4FF] opacity-70 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#EDE4FF] opacity-70 blur-[130px]" />
      </div>

      <div className="section relative">
        <div className="max-w-3xl">
          <p className="eyebrow" data-reveal>Skills</p>
          <h2 id="skills-heading" className="display-2 mt-5 text-ink" data-split>
            The full stack, <span className="serif-em text-gradient">front to back.</span>
          </h2>
          <p className="lead mt-5" data-reveal>
            Grouped by what they do. No vanity percentage bars, just the tools I ship production
            code with every week.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <li
              key={group.id}
              className="spotlight group rounded-3xl border border-line bg-white/80 p-7 shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              data-reveal
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <group.icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line bg-canvas px-3 py-1 text-[13px] text-ink-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
