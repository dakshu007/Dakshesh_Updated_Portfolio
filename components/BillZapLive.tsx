import Link from "next/link";
import { ArrowRight, WifiOff, QrCode, Mic, FileText, Check } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import { GooglePlayIcon, WhatsAppIcon } from "./icons";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.billzap.app";

const items = [
  { name: "Sugar", meta: "2 kg · HSN 1701 · 5%", amount: "96.00" },
  { name: "Basmati rice", meta: "5 kg · HSN 1006 · 5%", amount: "475.00" },
  { name: "Sunflower oil", meta: "1 L · HSN 1512 · 5%", amount: "165.00" },
];

const features = [
  { icon: WifiOff, title: "Works with no signal", desc: "Every bill is saved on the phone. No account, no server." },
  { icon: QrCode, title: "UPI QR on every bill", desc: "Customers pay before they leave, straight to your bank." },
  { icon: Mic, title: "Voice billing", desc: "Say \"do kilo chini\" and it becomes a GST line item." },
  { icon: FileText, title: "GSTR-1 ready", desc: "Auto CGST, SGST or IGST with HSN codes and exports." },
];

/** Static QR-like pattern, decorative only. */
function FakeQr() {
  const cells = Array.from({ length: 121 }, (_, i) => {
    const x = i % 11;
    const y = Math.floor(i / 11);
    const finder = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
    return finder || ((x * 7 + y * 13 + x * y) % 3 === 0);
  });
  return (
    <div className="grid h-16 w-16 grid-cols-[repeat(11,1fr)] gap-[1px] rounded-md bg-white p-1 ring-1 ring-black/10">
      {cells.map((on, i) => (
        <span key={i} className={on ? "bg-ink" : "bg-transparent"} />
      ))}
    </div>
  );
}

export function PlayBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={`inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white shadow-[0_14px_30px_-14px_rgba(10,11,16,0.6)] transition-colors hover:bg-black ${className}`}
    >
      <GooglePlayIcon className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wider text-white/70">Get it on</span>
        <span className="block text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}

export function BillZapPhone() {
  return (
      <PhoneFrame className="rotate-[-4deg]">
        <div className="flex h-full flex-col bg-[#F6FBF8] pt-10 text-[11px] text-ink">
          <div className="flex items-center justify-between px-4">
            <span className="font-display text-sm font-bold text-emerald-700">BillZap</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800">Offline</span>
          </div>
          <div className="mx-3 mt-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Tax Invoice #0142</span>
              <span className="text-ink-soft">Today</span>
            </div>
            <p className="text-[10px] text-ink-soft">Sri Murugan Stores · Intra-state</p>
            <ul className="mt-2 divide-y divide-line">
              {items.map((it) => (
                <li key={it.name} className="flex items-center justify-between py-1.5">
                  <span>
                    <span className="block font-medium">{it.name}</span>
                    <span className="block text-[9px] text-ink-soft">{it.meta}</span>
                  </span>
                  <span className="font-medium tabular">₹{it.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1 space-y-0.5 border-t border-dashed border-line pt-2 text-[10px] text-ink-muted">
              <div className="flex justify-between"><span>CGST 2.5%</span><span className="tabular">₹18.40</span></div>
              <div className="flex justify-between"><span>SGST 2.5%</span><span className="tabular">₹18.40</span></div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl bg-emerald-50 px-2.5 py-2">
              <span className="font-semibold">Total</span>
              <span className="font-display text-base font-bold tabular">₹772.80</span>
            </div>
          </div>
          <div className="mx-3 mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <FakeQr />
            <span>
              <span className="block font-semibold">Scan to pay</span>
              <span className="block text-[10px] text-ink-soft">Any UPI app</span>
            </span>
          </div>
          <div className="mx-3 mt-auto mb-4 flex items-center justify-center gap-2 rounded-full bg-[#0B7A43] py-2.5 font-semibold text-white">
            <WhatsAppIcon className="h-4 w-4" />
            Share on WhatsApp
          </div>
        </div>
      </PhoneFrame>
  );
}

export default function BillZapLive() {
  return (
    <section id="billzap-live" aria-labelledby="billzap-heading" className="relative scroll-mt-20 py-10 sm:py-14">
      <div className="section">
        <div
          className="relative isolate overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-gradient-to-br from-[#ECFDF3] via-white to-[#F0FDF9] px-6 py-14 sm:px-12 lg:px-16 lg:py-20"
          data-reveal="scale"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-300/30 blur-[100px]" />
          <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_80%_50%,#000,transparent_70%)]" />

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                Just released
              </p>
              <h2 id="billzap-heading" className="display-2 mt-6 text-ink" data-split>
                BillZap is live on <span className="serif-em text-emerald-700">Google Play.</span>
              </h2>
              <p className="lead mt-5 max-w-xl">
                A free GST billing app for Indian shops. Make a proper tax invoice in 30 seconds, put a
                UPI QR on it and send it on WhatsApp, all without internet. I built the 26,000-line
                Flutter app and its website end to end.
              </p>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f.title} className="flex gap-3" data-reveal>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                      <f.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{f.title}</span>
                      <span className="block text-sm leading-relaxed text-ink-muted">{f.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PlayBadge />
                <Link href="/billzap" className="btn-secondary">
                  How I built it
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-5 text-sm text-ink-soft">Free forever · No sign-up · 12 Indian languages</p>
            </div>

            {/* Phone */}
            <div className="relative mx-auto w-full max-w-[19rem]">
              <div data-parallax="0.08">
                <BillZapPhone />
              </div>

              <div className="glass absolute right-[calc(100%-1.25rem)] top-[44%] hidden whitespace-nowrap sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-ink shadow-lift" data-parallax="0.2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                Bill ready in 30s
              </div>
              <div className="glass absolute -right-6 bottom-24 rounded-2xl px-3 py-2 text-xs font-semibold text-ink shadow-lift sm:-right-12" data-parallax="0.3">
                <span className="block text-[10px] font-medium uppercase tracking-wider text-ink-soft">Price</span>
                ₹0 forever
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
