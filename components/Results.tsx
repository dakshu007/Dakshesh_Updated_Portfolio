import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  VerifiedBadge,
  TotalsGrid,
  ImpressionsChart,
  RankingsList,
} from "./ResultsBlocks";

export default function Results() {
  return (
    <section id="results" aria-labelledby="results-heading" className="section-y relative scroll-mt-20">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="section">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow" data-reveal>Proven results</p>
            <h2 id="results-heading" className="display-2 mt-5 text-ink" data-split>
              I don&apos;t just build websites. I build websites that{" "}
              <span className="serif-em text-gradient">get found.</span>
            </h2>
            <p className="lead mt-5" data-reveal>
              Every site I ship is tracked. These are the real numbers my products and client sites
              earned on Google, ChatGPT and in real visits.
            </p>
          </div>
          <div data-reveal>
            <VerifiedBadge />
          </div>
        </div>

        <div className="mt-12" data-reveal>
          <TotalsGrid />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-6">
            <div data-reveal>
              <ImpressionsChart />
            </div>
            <p className="rounded-3xl border border-line bg-accent-soft p-6 leading-relaxed text-ink" data-reveal>
              <strong>AI search is real traffic.</strong> 43 percent of tracked visits came from ChatGPT and
              other AI assistants, more than from Google. I build pages AI can read, trust and recommend.
            </p>
          </div>
          <div data-reveal>
            <RankingsList limit={7} />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
          <Link href="/results" className="btn-primary" data-magnetic>
            See the full report
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <span className="text-sm text-ink-soft">Every site, all 23 keywords and the monthly trend.</span>
        </div>
      </div>
    </section>
  );
}
