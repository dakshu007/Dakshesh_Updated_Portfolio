import { person, jobs } from "@/lib/site";

/**
 * Answer-first summary for search engines and AI assistants: one quotable
 * paragraph plus key facts, in plain HTML near the FAQ.
 */
export default function InShort() {
  const facts = [
    ["Who", `${person.name}, ${person.roles.join(", ")}`],
    ["Where", "Bangalore (Bengaluru), India. Ready to relocate anywhere"],
    ["Now", `${jobs[0].title}, ${jobs[0].company}`],
    ["Before", `${jobs[1].title}, ${jobs[1].company} (300,000+ stores)`],
    ["Shipped", "MyKavo, BillZap, Habit Tracker, Shrinkto and 3 Chrome extensions"],
    ["Contact", `${person.email} · ${person.phone}`],
  ];
  return (
    <aside aria-labelledby="in-short" className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card" data-reveal>
      <h3 id="in-short" className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        In short
      </h3>
      <p className="mt-3 leading-relaxed text-ink">
        <strong>{person.name}</strong> is a full-stack developer, frontend engineer and SEO engineer in
        Bangalore who builds fast web products that rank on Google and get recommended by AI. He is open
        to full-time roles and ready to relocate anywhere.
      </p>
      <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-3">
            <dt className="text-ink-soft">{k}</dt>
            <dd className="font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
