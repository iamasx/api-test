import type { StockBand, StockBandId, StorageZone } from "@/app/inventory-bay/mock-data";

type CountOption = {
  id: string;
  count: number;
};

type InventoryBayControlsProps = {
  selectedZone: string;
  selectedBand: StockBandId | "all";
  criticalOnly: boolean;
  hasFilters: boolean;
  zones: StorageZone[];
  bands: StockBand[];
  zoneCounts: CountOption[];
  bandCounts: CountOption[];
  onZoneChange: (zoneId: string) => void;
  onBandChange: (bandId: StockBandId | "all") => void;
  onCriticalToggle: () => void;
  onClear: () => void;
};

export function InventoryBayControls({
  selectedZone,
  selectedBand,
  criticalOnly,
  hasFilters,
  zones,
  bands,
  zoneCounts,
  bandCounts,
  onZoneChange,
  onBandChange,
  onCriticalToggle,
  onClear,
}: InventoryBayControlsProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-900/10 bg-white/75 p-5 shadow-[0_14px_48px_rgba(120,53,15,0.1)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-stone-600">
          Filter the bay by zone, stock band, or critical-only pressure.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            criticalOnly ? "bg-rose-600 text-white shadow-lg shadow-rose-600/25" : "bg-stone-200 text-stone-700 hover:bg-stone-300"
          }`} onClick={onCriticalToggle} type="button">
            Critical floor only
          </button>
          <button
            className="rounded-2xl border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-default disabled:opacity-50"
            disabled={!hasFilters}
            onClick={onClear}
            type="button"
          >
            Reset view
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedZone === "all" ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-700"
          }`} onClick={() => onZoneChange("all")} type="button">
            All zones
          </button>
          {zones.map((zone) => (
            <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedZone === zone.id ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-900"
            }`} key={zone.id} onClick={() => onZoneChange(zone.id)} type="button">
              {zone.label} ({zoneCounts.find((option) => option.id === zone.id)?.count ?? 0})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedBand === "all" ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-700"
          }`} onClick={() => onBandChange("all")} type="button">
            All bands
          </button>
          {bands.map((band) => (
            <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedBand === band.id ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"
            }`} key={band.id} onClick={() => onBandChange(band.id)} type="button">
              {band.label} ({bandCounts.find((option) => option.id === band.id)?.count ?? 0})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
