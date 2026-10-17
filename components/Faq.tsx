import { Plus } from "lucide-react";

/**
 * Answer-first FAQ using native <details>, so every answer is in the HTML
 * (crawlable, quotable by AI) and works without JavaScript.
 */
export default function Faq({
  id = "faq",
  eyebrow = "FAQ",
  title,
  items,
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  items: { question: string; answer: string }[];
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section-y relative scroll-mt-20">
      <div className="section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow" data-reveal>{eyebrow}</p>
            <h2 id={`${id}-heading`} className="display-2 mt-5 text-ink" data-split>
              {title}
            </h2>
            {aside}
          </div>
          <div className="divide-y divide-line border-y border-line">
            {items.map((item, i) => (
              <details key={item.question} className="group py-2" open={i === 0} data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-ink sm:text-xl">{item.question}</h3>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-prose pb-5 leading-relaxed text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
