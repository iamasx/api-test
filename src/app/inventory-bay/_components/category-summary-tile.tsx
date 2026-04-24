import {
  getAvailableToPromise,
  inventoryBayBands,
  type InventoryBayCategorySummary,
} from "../_data/inventory-bay-data";

type CategorySummaryTileProps = {
  summary: InventoryBayCategorySummary;
};

export function CategorySummaryTile({ summary }: CategorySummaryTileProps) {
  const focusBand = inventoryBayBands.find(
    (band) => band.id === summary.focusItem.bandId,
  );
  console.log("CategorySummaryTile", summary.id);

  return (
    <li>
      <article className="h-full rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.07)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-64">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {summary.zone}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {summary.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {summary.skuCount} SKUs
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {summary.lowStockCount} warnings
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-700">
          {summary.description}
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Fill rate
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {summary.fillRate}%
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Available units
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {summary.availableUnits}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(248,250,252,0.98),rgba(255,255,255,0.94))] p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Focus item
            </span>
            {focusBand ? (
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${focusBand.badgeClassName}`}
              >
                {focusBand.name}
              </span>
            ) : null}
            {summary.criticalCount > 0 ? (
              <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                {summary.criticalCount} critical
              </span>
            ) : null}
          </div>

          <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
            {summary.focusItem.name}
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {summary.focusItem.location} · {summary.focusItem.owner}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white/80 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Cover and ATP
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {summary.focusItem.daysOfCover} days of cover
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {getAvailableToPromise(summary.focusItem)} ATP units
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/80 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Next restock window
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {summary.restockWindow}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {summary.focusItem.nextDelivery}
              </p>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
