import { metrics } from "@/lib/site";
import CountUp from "./CountUp";

export default function Metrics() {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="scroll-mt-24 bg-night py-24 text-white sm:py-28"
    >
      <div className="section">
        <p className="eyebrow text-accent-ring">By the numbers</p>
        <h2
          id="metrics-heading"
          className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Work that reaches a lot of people
        </h2>

        <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              data-reveal
              className="flex flex-col border-t border-night-line pt-5"
            >
              {/* dd (value) first visually, dt (label + caption) below. The
                  dl only contains dt and dd, so it stays valid. */}
              <dd className="order-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="order-2 mt-2">
                <span className="block text-base font-semibold text-white">
                  {metric.label}
                </span>
                <span className="mt-1 block text-sm text-white/60">
                  {metric.caption}
                </span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
