import Link from "next/link";
import { ArrowRight, Download, Check, TrendingUp, Star } from "lucide-react";
import { person, experienceLabel, WHATSAPP_URL } from "@/lib/site";
import HeroVisual from "./HeroVisual";
import ExperienceValue from "./ExperienceValue";
import { WhatsAppIcon, GooglePlayIcon, GoogleIcon, OpenAIIcon } from "./icons";
import { monthly } from "@/lib/results";

/** Sparkline points for the Google impressions card. */
function sparkPath(w: number, h: number) {
  const values = monthly.map((m) => m.impressions);
  const max = Math.max(...values);
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * (h - 6) - 3]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z`, last: pts[pts.length - 1] };
}

export default function Hero() {
  const spark = sparkPath(220, 64);

  const stats = [
    { value: <ExperienceValue initial={experienceLabel()} />, label: "Shipping production code" },
    { value: <span data-count="300000" data-suffix="+">300,000+</span>, label: "Stores using UI I built" },
    { value: <span data-count="2200" data-suffix="+">2,200+</span>, label: "Chrome extension users" },
    { value: <span data-count="130">130</span>, label: "Countries reached" },
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,#000_20%,transparent_75%)]" />
        <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-[#C9D6FF] opacity-50 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[-6rem] h-[40rem] w-[40rem] rounded-full bg-[#E4D8FF] opacity-60 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[30rem] rounded-full bg-[#FFDDEE] opacity-40 blur-[120px]" />
      </div>

      <div className="section">
        <div className="grid items-center gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          {/* Copy */}
          <div className="relative z-10 lg:col-span-7">
            <Link
              href="#hire"
              data-reveal
              className="group inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 py-1.5 pl-2 pr-4 text-sm font-medium text-ink shadow-sm backdrop-blur transition-colors hover:border-emerald-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-emerald-500" />
              </span>
              <span>
                Open to work in <strong className="font-semibold">Bangalore</strong>
                <span className="hidden sm:inline"> · Ready to relocate anywhere</span>
              </span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <h1 id="hero-heading" className="display-hero mt-7 text-ink" data-split>
              Full-Stack Developer, Frontend{" "}
              <span className="serif-em text-gradient pr-[0.06em]">&amp;</span> SEO Engineer
              <span className="text-ink-soft"> in Bangalore.</span>
            </h1>

            <p className="lead mt-7 max-w-[40rem] text-pretty" data-reveal>
              I&apos;m <strong className="font-semibold text-ink">{person.name}</strong>. I
              design, build and grow fast web products that{" "}
              <strong className="font-semibold text-ink">rank on Google</strong> and get{" "}
              <strong className="font-semibold text-ink">recommended by AI</strong>. I built{" "}
              <Link href="/mykavo" className="font-semibold text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent">MyKavo</Link>,{" "}
              <Link href="/billzap" className="font-semibold text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent">BillZap</Link>{" "}
              and front ends used by 300,000+ stores.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
              <Link href="#hire" className="btn-primary px-7 py-4 text-[0.95rem]" data-magnetic>
                Hire me
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href={person.resume}
                download
                className="btn-secondary px-6 py-4 text-[0.95rem]"
                data-magnetic
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download resume
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost py-4"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                WhatsApp me
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted" data-reveal>
              {["Reply within 24 hours", "Full-time or freelance", "Remote or on-site"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
              <HeroVisual />

              {/* Google proof card */}
              <div
                className="glass absolute right-0 top-[4%] w-[15.5rem] rounded-2xl p-4 shadow-lift sm:w-[17rem]"
                data-parallax="0.12"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                    <GoogleIcon className="h-3.5 w-3.5" /> Verified on Google
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp aria-hidden="true" className="h-3 w-3" /> 7.5x
                  </span>
                </div>
                <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
                  <span data-count="70233">70,233</span>
                </p>
                <p className="text-xs text-ink-muted">Google impressions earned by sites I built</p>
                <svg viewBox="0 0 220 64" className="mt-3 h-14 w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2B4BF2" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2B4BF2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={spark.area} fill="url(#spark)" />
                  <path d={spark.line} fill="none" stroke="#2B4BF2" strokeWidth="2" strokeLinecap="round" />
                  <circle cx={spark.last[0]} cy={spark.last[1]} r="4" fill="#2B4BF2" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>

              {/* ChatGPT card */}
              <div
                className="glass absolute left-0 top-[38%] hidden items-center gap-3 rounded-2xl p-3 pr-4 shadow-lift sm:flex"
                data-parallax="0.22"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">
                  <OpenAIIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">2,101 visits from ChatGPT</span>
                  <span className="block text-xs text-ink-muted">AI recommends my work</span>
                </span>
              </div>

              {/* BillZap live card */}
              <Link
                href="/billzap"
                className="glass absolute bottom-[6%] right-[6%] flex items-center gap-3 rounded-2xl p-3 pr-4 shadow-lift transition-transform hover:-translate-y-0.5"
                data-parallax="0.18"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                  <GooglePlayIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">BillZap is live</span>
                  <span className="block text-xs text-ink-muted">Now on Google Play</span>
                </span>
              </Link>

              {/* MyKavo card */}
              <div
                className="glass absolute bottom-[22%] left-[4%] hidden items-center gap-2 rounded-full px-3 py-2 shadow-lift md:flex"
                data-parallax="0.3"
              >
                <Star aria-hidden="true" className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-ink">MyKavo: 25 active users in 3 months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:mt-6 lg:grid-cols-4" data-reveal>
          {stats.map((s) => (
            <div key={s.label} className="bg-white/80 px-6 py-6 backdrop-blur sm:px-8 sm:py-7">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-ink tabular sm:text-4xl">
                {s.value}
              </dd>
              <dd className="mt-1 text-sm text-ink-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
