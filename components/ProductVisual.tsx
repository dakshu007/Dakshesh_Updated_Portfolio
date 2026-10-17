import Image from "next/image";
import { AlertTriangle, CheckCircle2, Flame, Moon, Footprints } from "lucide-react";
import type { Product } from "@/lib/data";
import PhoneFrame from "./PhoneFrame";
import { BillZapPhone } from "./BillZapLive";

/** Coded product mockups, so every page has a crafted visual and no stock images. */
export default function ProductVisual({ product }: { product: Product }) {
  if (product.id === "mykavo") return <MyKavoVisual />;
  if (product.id === "habit-tracker") return <HabitVisual />;
  if (product.id === "billzap")
    return (
      <Stage from="#DCFCE7" to="#ECFEFF">
        <div className="mx-auto w-[40%] max-w-[15rem]">
          <BillZapPhone />
        </div>
      </Stage>
    );
  return <GenericVisual product={product} />;
}

function Stage({ children, from, to }: { children: React.ReactNode; from: string; to: string }) {
  return (
    <div
      className="relative grid aspect-[4/3.4] place-items-center overflow-hidden rounded-[2rem] border border-line"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-40" />
      <div className="relative w-full py-8">{children}</div>
    </div>
  );
}

function MyKavoVisual() {
  const rows = [
    { page: "/pricing", status: "critical", note: "Start Free Trial button is missing" },
    { page: "/", status: "ok", note: "No changes" },
    { page: "/blog/seo-guide", status: "warn", note: "Title tag changed" },
    { page: "/checkout", status: "ok", note: "No changes" },
  ];
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#FEF9C3] via-white to-[#FEF3C7] p-5 sm:p-8">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 rounded-md bg-canvas px-3 py-0.5 font-mono text-[11px] text-ink-soft">mykavo.app/monitors</span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/images/logos/mykavo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
              <span className="font-display font-semibold text-ink">yourstore.com</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Watching
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {rows.map((r) => (
              <li key={r.page} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm">
                {r.status === "ok" ? (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <AlertTriangle aria-hidden="true" className={`h-4 w-4 shrink-0 ${r.status === "critical" ? "text-red-500" : "text-amber-500"}`} />
                )}
                <span className="font-mono text-xs text-ink">{r.page}</span>
                <span className="ml-auto truncate text-xs text-ink-muted">{r.note}</span>
                {r.status === "critical" && (
                  <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700">CRITICAL</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {["Visual", "SEO", "Links", "Scripts"].map((c) => (
              <span key={c} className="rounded-lg bg-canvas py-1.5 text-[11px] font-medium text-ink-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="glass absolute bottom-3 right-3 rounded-2xl px-3 py-2 text-xs font-semibold text-ink shadow-lift sm:bottom-5 sm:right-5">
        Alert sent to Slack · before and after attached
      </div>
    </div>
  );
}

function HabitVisual() {
  const habits = [
    { name: "Drink water", goal: "6 / 8 glasses", color: "#38BDF8", done: false, icon: "💧" },
    { name: "Morning run", goal: "5.02 km · 28:41", color: "#22C55E", done: true, icon: "🏃" },
    { name: "Read", goal: "20 pages", color: "#A78BFA", done: false, icon: "📖" },
  ];
  return (
    <Stage from="#E0F2FE" to="#EDE9FE">
      <div className="mx-auto w-[40%] max-w-[15rem]">
        <PhoneFrame className="rotate-[3deg]">
          <div className="flex h-full flex-col bg-[#F4F9FE] px-3 pt-10 text-[11px] text-ink">
            <div className="flex items-center justify-between px-1">
              <span className="font-display text-sm font-bold">Today</span>
              <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                <Flame aria-hidden="true" className="h-3 w-3" /> 12 days
              </span>
            </div>
            <div className="mt-3 flex justify-between px-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span
                  key={i}
                  className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold ${
                    i < 4 ? "bg-sky-400 text-white" : i === 4 ? "bg-ink text-white" : "bg-white text-ink-soft ring-1 ring-black/5"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <ul className="mt-3 space-y-2">
              {habits.map((h) => (
                <li key={h.name} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl text-base" style={{ background: `${h.color}22` }} aria-hidden="true">
                      {h.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{h.name}</span>
                      <span className="block text-[10px] text-ink-soft">{h.goal}</span>
                    </span>
                    {h.done && <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-emerald-500" />}
                  </div>
                  {!h.done && (
                    <div className="mt-2.5 flex h-7 items-center rounded-full bg-canvas p-0.5">
                      <span className="grid h-6 w-10 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: h.color }}>
                        »
                      </span>
                      <span className="flex-1 text-center text-[9px] text-ink-soft">Slide when you are done</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white p-2.5 ring-1 ring-black/5">
                <Moon aria-hidden="true" className="h-3.5 w-3.5 text-violet" />
                <p className="mt-1 font-display text-sm font-bold">7.2 h</p>
                <p className="text-[9px] text-ink-soft">Last night</p>
              </div>
              <div className="rounded-2xl bg-white p-2.5 ring-1 ring-black/5">
                <Footprints aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />
                <p className="mt-1 font-display text-sm font-bold">8,214</p>
                <p className="text-[9px] text-ink-soft">Steps</p>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </Stage>
  );
}

function GenericVisual({ product }: { product: Product }) {
  return (
    <div
      className="relative grid aspect-[4/3.4] place-items-center overflow-hidden rounded-[2rem] border border-line"
      style={{ background: `linear-gradient(135deg, ${product.brand.from}22, #ffffff 55%, ${product.brand.to}22)` }}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle,#000,transparent_70%)]" />
      <div className="relative flex flex-col items-center text-center">
        <span
          className="grid h-28 w-28 place-items-center rounded-[2rem] text-white shadow-lift"
          style={{ background: `linear-gradient(135deg, ${product.brand.from}, ${product.brand.to})` }}
        >
          <product.icon aria-hidden="true" className="h-14 w-14" strokeWidth={1.6} />
        </span>
        {product.achievement.value && (
          <>
            <p className="mt-8 font-display text-6xl font-semibold tracking-tight text-ink">{product.achievement.value}</p>
            <p className="mt-2 text-ink-muted">{product.achievement.label}</p>
          </>
        )}
      </div>
    </div>
  );
}
