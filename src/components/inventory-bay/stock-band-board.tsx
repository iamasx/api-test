import type { InventoryItem, StockBand, StorageZone } from "@/app/inventory-bay/mock-data";

type StockBandBoardProps = {
  activeBands: StockBand[];
  items: InventoryItem[];
  hasFilters: boolean;
  onClearFilters: () => void;
  zoneMap: Record<string, StorageZone>;
};

export function StockBandBoard({ activeBands, items, hasFilters, onClearFilters, zoneMap }: StockBandBoardProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/75 p-8 text-center shadow-[0_14px_40px_rgba(120,53,15,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Bay clear</p>
        <h2 className="mt-3 text-2xl font-semibold text-stone-950">No inventory lines match the current filters.</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">Widen the zone or band selection to bring the mock stock lanes back into view.</p>
        {hasFilters ? <button className="mt-5 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white" onClick={onClearFilters} type="button">Reset inventory filters</button> : null}
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {activeBands.map((band) => {
        const bandItems = items.filter((item) => item.bandId === band.id);

        return (
          <div className="rounded-[1.75rem] border border-stone-900/10 bg-white/78 p-5 shadow-[0_14px_48px_rgba(120,53,15,0.1)] backdrop-blur" key={band.id}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">{band.label}</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-950">{band.summary}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{band.guidance}</p>
              </div>
              <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-700">{bandItems.length} SKU{bandItems.length === 1 ? "" : "s"}</div>
            </div>

            {bandItems.length ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {bandItems.map((item) => {
                  const zone = zoneMap[item.zoneId];
                  const fillPercent = Math.min(100, Math.round((item.unitsOnHand / item.capacity) * 100));
                  const thresholdPercent = Math.min(100, Math.round((item.reorderPoint / item.capacity) * 100));
                  const needsAttention = item.bandId === "critical" || item.unitsOnHand <= item.reorderPoint;

                  return (
                    <article className="rounded-[1.5rem] border border-stone-900/10 bg-stone-50/90 p-5" key={item.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{item.sku}</p>
                          <h3 className="mt-2 text-xl font-semibold text-stone-950">{item.name}</h3>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${needsAttention ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"}`}>{needsAttention ? "Threshold" : "Covered"}</span>
                      </div>
                      <p className="mt-3 text-sm text-stone-600">{zone.label} · {zone.shelf} · {zone.climate}</p>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-sm text-stone-500">Units on hand</p>
                          <p className="text-3xl font-semibold text-stone-950">{item.unitsOnHand}</p>
                        </div>
                        <div className="text-right text-sm text-stone-600">
                          <p>Threshold {item.reorderPoint}</p>
                          <p>Capacity {item.capacity}</p>
                        </div>
                      </div>
                      <div className="relative mt-3 h-3 rounded-full bg-stone-200">
                        <div className={`h-3 rounded-full ${needsAttention ? "bg-rose-500" : "bg-emerald-600"}`} style={{ width: `${fillPercent}%` }} />
                        <span className="absolute top-[-4px] h-5 w-0.5 bg-stone-950/70" style={{ left: `${thresholdPercent}%` }} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-stone-600">
                        <span className="rounded-full bg-white px-3 py-1">Pick {item.dailyPickRate}/day</span>
                        <span className="rounded-full bg-white px-3 py-1">Lead {item.leadTimeDays}d</span>
                        <span className="rounded-full bg-white px-3 py-1">{item.palletFace}</span>
                        <span className="rounded-full bg-white px-3 py-1">Count {item.lastCountedAt}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : <div className="mt-5 rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 text-sm leading-6 text-stone-600">No stock lanes sit in this band for the current zone selection.</div>}
          </div>
        );
      })}
    </section>
  );
}
