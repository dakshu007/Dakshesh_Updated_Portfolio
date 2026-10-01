"use client";

import { useState } from "react";
import type { MonthPoint } from "@/lib/analytics";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function label(month: string, withYear = false) {
  const [y, m] = month.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${y}` : MONTHS[m - 1];
}

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

function short(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return String(n);
}

/** Round axis: 4ish clean steps (1, 2, 2.5, 5 x 10^n). */
function niceTicks(max: number): number[] {
  const rough = max / 4;
  const pow = 10 ** Math.floor(Math.log10(rough || 1));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= rough) ?? pow * 10;
  const top = Math.ceil(max / step) * step || step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + 1e-9; v += step) ticks.push(Math.round(v));
  return ticks;
}

/**
 * Monthly Google impressions as columns (one series, so no legend: the card
 * title names it). Hover or focus a month for impressions and clicks; the
 * latest month is labelled on its cap. Colours come from the --viz-* tokens
 * of the surrounding .viz-dark / .viz-light wrapper.
 */
export default function TrendChart({
  data,
  caption,
}: {
  data: MonthPoint[];
  caption: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.impressions));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1];
  const last = data.length - 1;

  return (
    <figure className="m-0">
      <figcaption className="sr-only">{caption}</figcaption>

      <div className="relative h-56 sm:h-64 lg:h-72" aria-hidden="true">
        {/* Gridlines + y ticks */}
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute left-9 right-0 border-t"
            style={{ bottom: `${(t / top) * 100}%`, borderColor: "var(--viz-grid)" }}
          >
            <span
              className="absolute -left-9 w-7 -translate-y-1/2 text-right text-[11px] tabular-nums"
              style={{ color: "var(--viz-text-3)" }}
            >
              {short(t)}
            </span>
          </div>
        ))}

        {/* Columns */}
        <div className="absolute inset-y-0 left-9 right-0 flex items-end">
          {data.map((d, i) => {
            const h = (d.impressions / top) * 100;
            const dim = active !== null && active !== i;
            const align =
              i <= 1 ? "left-0" : i >= data.length - 2 ? "right-0" : "left-1/2 -translate-x-1/2";
            return (
              <div
                key={d.month}
                className="relative flex h-full flex-1 cursor-default items-end justify-center px-[2px] outline-none"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div
                  className="w-full max-w-[24px] rounded-t-[4px] transition-opacity duration-200"
                  style={{
                    height: `${h}%`,
                    background: "var(--viz-mark)",
                    opacity: dim ? 0.35 : 1,
                  }}
                />
                {i === last && active === null && d.impressions > 0 && (
                  <span
                    className="absolute whitespace-nowrap text-xs font-semibold"
                    style={{ bottom: `calc(${h}% + 6px)`, color: "var(--viz-text)", right: 0 }}
                  >
                    {fmt(d.impressions)}
                  </span>
                )}
                {active === i && (
                  <div
                    className={`pointer-events-none absolute z-10 w-max rounded-xl border px-3 py-2 text-xs shadow-lift ${align}`}
                    style={{
                      bottom: `calc(${Math.min(h, 78)}% + 10px)`,
                      background: "var(--viz-surface)",
                      borderColor: "var(--viz-grid)",
                      color: "var(--viz-text-2)",
                    }}
                  >
                    <p className="font-semibold" style={{ color: "var(--viz-text)" }}>
                      {label(d.month, true)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: "var(--viz-mark)" }}
                      />
                      {fmt(d.impressions)} impressions
                    </p>
                    <p className="mt-0.5 pl-3.5">{fmt(d.clicks)} clicks</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* X axis */}
      <div className="ml-9 mt-2 flex" aria-hidden="true">
        {data.map((d, i) => (
          <span
            key={d.month}
            className={`flex-1 text-center text-[11px] ${
              i % 2 === (last % 2) ? "" : "max-sm:invisible"
            }`}
            style={{ color: "var(--viz-text-3)" }}
          >
            {label(d.month)}
          </span>
        ))}
      </div>

      {/* Table view for screen readers */}
      <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Impressions</th>
            <th scope="col">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.month}>
              <th scope="row">{label(d.month, true)}</th>
              <td>{fmt(d.impressions)}</td>
              <td>{fmt(d.clicks)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </figure>
  );
}
