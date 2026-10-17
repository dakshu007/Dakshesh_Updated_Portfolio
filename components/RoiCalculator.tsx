"use client";

import { useId, useState } from "react";

const COST = 4999;

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/**
 * Plug in your own numbers: what 30+ new members would be worth against the
 * ₹4,999 JP Fitness spent on three months of local SEO.
 */
export default function RoiCalculator() {
  const id = useId();
  const [fee, setFee] = useState(1500);
  const [months, setMonths] = useState(3);
  const [members, setMembers] = useState(30);

  const revenue = fee * months * members;
  const multiple = revenue / COST;
  const perMember = COST / Math.max(members, 1);

  const rows: { key: string; label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }[] = [
    { key: "fee", label: "Monthly membership fee", value: fee, set: setFee, min: 300, max: 5000, step: 100, unit: "₹" },
    { key: "months", label: "Months an average member stays", value: months, set: setMonths, min: 1, max: 12, step: 1, unit: "" },
    { key: "members", label: "New members from the website", value: members, set: setMembers, min: 5, max: 100, step: 1, unit: "" },
  ];

  return (
    <div className="grid gap-8 rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-9 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        {rows.map((r) => (
          <div key={r.key}>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={`${id}-${r.key}`} className="text-sm font-semibold text-ink">
                {r.label}
              </label>
              <output htmlFor={`${id}-${r.key}`} className="font-display text-xl font-semibold text-ink tabular">
                {r.unit === "₹" ? fmt(r.value) : r.value}
              </output>
            </div>
            <input
              id={`${id}-${r.key}`}
              type="range"
              min={r.min}
              max={r.max}
              step={r.step}
              value={r.value}
              onChange={(e) => r.set(Number(e.target.value))}
              className="mt-3 w-full accent-[#2B4BF2]"
            />
          </div>
        ))}
        <p className="text-xs leading-relaxed text-ink-soft">
          Example figures: change them to match your business. JP Fitness spent {fmt(COST)} on three months of
          local SEO and got 30+ new members in 75 days.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-ink p-6 text-white sm:p-8" aria-live="polite">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">Revenue from those members</p>
          <p className="mt-2 font-display text-5xl font-semibold tracking-tight tabular">{fmt(revenue)}</p>
        </div>
        <dl className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
          <div>
            <dt className="text-xs text-white/70">SEO cost</dt>
            <dd className="mt-1 font-display text-2xl font-semibold tabular">{fmt(COST)}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/70">Return</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-[#9DFFC8] tabular">{multiple.toFixed(0)}x</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-white/70">Cost per new member</dt>
            <dd className="mt-1 font-display text-2xl font-semibold tabular">{fmt(perMember)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
