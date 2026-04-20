import {
  getAvailableToPromise,
  getStockFillPercentage,
  type InventoryBayBand,
  type InventoryBayItem,
} from "../_data/inventory-bay-data";

type InventoryBayCardProps = {
  item: InventoryBayItem;
  band: InventoryBayBand;
};

export function InventoryBayCard({ item, band }: InventoryBayCardProps) {
  const titleId = `${item.id}-title`;
  const availableToPromise = getAvailableToPromise(item);
  const fillPercentage = getStockFillPercentage(item);

  return (
    <article
      aria-labelledby={titleId}
      className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${band.badgeClassName}`}
            >
              {band.name}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {item.sku}
            </span>
          </div>

          <h3
            id={titleId}
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950"
          >
            {item.name}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {item.statusDetail}
          </p>
        </div>

        <div className="min-w-44 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Bay location
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {item.location}
          </p>
          <p className="mt-2 text-sm text-slate-600">{item.owner}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-slate-600">
          <span>Stock fill</span>
          <span>{fillPercentage}% of target</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full ${band.meterClassName}`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Units on hand
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            {item.unitsOnHand} units on hand
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Available to promise
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            {availableToPromise} available to promise
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Days of cover
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            {item.daysOfCover} days of cover
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Reorder point
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            Reorder at {item.reorderPoint}
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(248,250,252,0.96),rgba(255,255,255,0.96))] px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.85fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Next delivery
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {item.nextDelivery}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Action now
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {item.actionLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
