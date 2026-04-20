import type { InventoryBayBandSummary } from "../_data/inventory-bay-data";

type StockBandSummaryCardProps = {
  summary: InventoryBayBandSummary;
};

export function StockBandSummaryCard({ summary }: StockBandSummaryCardProps) {
  return (
    <li
      className={`rounded-[1.75rem] border p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${summary.surfaceClassName}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {summary.eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            {summary.name}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${summary.badgeClassName}`}
        >
          {summary.itemCount} SKUs
        </span>
      </div>

      <p className="mt-3 max-w-sm text-sm leading-7 text-slate-700">
        {summary.description}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Units on hand
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">
            {summary.unitsOnHand}
          </p>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/72 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Available to promise
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">
            {summary.availableToPromise}
          </p>
        </div>
      </div>
    </li>
  );
}
