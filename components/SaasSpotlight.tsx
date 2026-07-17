import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ScanEye, SearchCheck, BellRing } from "lucide-react";

const monitors = [
  "Visual diffs",
  "SEO monitoring",
  "Broken links",
  "Script watch",
  "Performance",
  "SSL and uptime",
];

const proofPoints = [
  {
    icon: ScanEye,
    text: "Visual diffs with a change percentage for every page",
  },
  {
    icon: SearchCheck,
    text: "SEO, links, scripts and performance in one scan",
  },
  {
    icon: BellRing,
    text: "Alerts that carry before and after evidence",
  },
];

/**
 * Home-page spotlight for MyKavo, the flagship SaaS. Styled in the product's
 * own black and yellow rather than the site accent, so it reads as a distinct
 * "product moment" between the dark Cartrabbit strip and the products grid.
 */
export default function SaasSpotlight() {
  return (
    <section
      aria-labelledby="mykavo-heading"
      className="relative isolate overflow-hidden py-24 sm:py-28"
    >
      {/* Warm wash that settles into the canvas colour before the next section */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #FFFBEB 0%, #FFF6D6 52%, #FAFAF7 100%)",
          }}
        />
        <div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "#FFC700" }}
        />
        <div
          className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "#FFE380" }}
        />
      </div>

      <div className="section grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div data-reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A16207]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFC700]" />
            My SaaS product
          </p>

          <div className="mt-5 flex items-center gap-4">
            <Image
              src="/images/logos/mykavo.png"
              alt="MyKavo logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-2xl shadow-card ring-1 ring-black/10"
            />
            <h2
              id="mykavo-heading"
              className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              MyKavo
            </h2>
          </div>

          <p className="mt-5 font-display text-2xl font-bold leading-tight text-ink sm:text-[2rem]">
            Know what changed. <span className="text-[#A16207]">Fix what matters.</span>
          </p>

          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">
            MyKavo watches your websites for visual, SEO, content, link, script
            and performance changes, and alerts you with before and after
            evidence before small problems become expensive ones. It is the
            largest product I have designed, built and run end to end.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="What MyKavo monitors">
            {monitors.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#EAB308]/40 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://mykavo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-black"
            >
              Try free now
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#FFC700]" />
            </a>
            <Link href="/mykavo" className="btn-secondary">
              Explore MyKavo
            </Link>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Free plan included. No credit card needed.
          </p>
        </div>

        <div data-reveal className="relative">
          <div className="rounded-3xl border border-[#EAB308]/30 bg-white/80 p-8 shadow-lift backdrop-blur">
            <div
              className="mx-auto grid w-fit place-items-center rounded-[32px] p-3"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,199,0,0.28), rgba(255,199,0,0))",
              }}
            >
              <Image
                src="/images/logos/mykavo.png"
                alt=""
                width={128}
                height={128}
                className="h-32 w-32 rounded-[26px] shadow-lift ring-1 ring-black/10"
              />
            </div>

            <ul className="mt-8 space-y-4">
              {proofPoints.map((point) => (
                <li key={point.text} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#FFF3C4] text-[#A16207]">
                    <point.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink-muted">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
