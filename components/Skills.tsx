import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 bg-black py-24 sm:py-28"
    >
      <div className="section">
        <SectionHeading
          headingId="skills-heading"
          eyebrow="Skills"
          title="The toolkit I build with"
          description="Grouped by what they do. No vanity percentage bars, just the tools I reach for and the areas I own."
          dark
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              data-reveal
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:from-white/[0.16]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-white">
                  <group.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-sm font-medium text-white/90"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
