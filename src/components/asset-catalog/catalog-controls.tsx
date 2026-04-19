import type { AssetAvailability, AvailabilityOption } from "@/app/asset-catalog/mock-data";

type CatalogControlsProps = {
  activeAvailability: AssetAvailability | "all";
  availabilityCounts: Array<AvailabilityOption & { count: number }>;
  hasFilters: boolean;
  onAvailabilityChange: (availability: AssetAvailability | "all") => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  query: string;
  resultCount: number;
  totalCount: number;
};

export function CatalogControls({
  activeAvailability,
  availabilityCounts,
  hasFilters,
  onAvailabilityChange,
  onQueryChange,
  onReset,
  query,
  resultCount,
  totalCount,
}: CatalogControlsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="flex-1 space-y-2">
          <span className="text-sm font-medium text-slate-700">Search inventory</span>
          <input
            aria-label="Search assets"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name, tag, zone, or kit item"
            type="search"
            value={query}
          />
        </label>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{resultCount}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalCount}</span> assets
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          aria-pressed={activeAvailability === "all"}
          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
            activeAvailability === "all"
              ? "border-cyan-700 bg-cyan-950 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
          }`}
          onClick={() => onAvailabilityChange("all")}
          type="button"
        >
          Any status
        </button>
        {availabilityCounts.map((availability) => (
          <button
            key={availability.id}
            aria-pressed={activeAvailability === availability.id}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
              activeAvailability === availability.id
                ? "border-cyan-700 bg-cyan-950 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
            }`}
            onClick={() => onAvailabilityChange(availability.id)}
            type="button"
          >
            {availability.label} - {availability.count}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Availability filters stay local to this route and only affect the mock asset catalog below.
        </p>
        {hasFilters ? (
          <button
            className="rounded-full border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            onClick={onReset}
            type="button"
          >
            Reset search and filters
          </button>
        ) : null}
      </div>
    </section>
  );
}
