import type { PackageSummary } from "./parcel-hub-data";

type ParcelSummaryPanelProps = { exceptionTypes: string[]; openExceptions: number; packageSummaries: PackageSummary[]; totalParcels: number };

export function ParcelSummaryPanel({
  exceptionTypes,
  openExceptions,
  packageSummaries,
  totalParcels,
}: ParcelSummaryPanelProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/72 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.32)] sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Parcel mix</p><h2 className="mt-2 text-2xl font-semibold text-white">Grouped volume summary</h2></div>
        <div className="text-right"><p className="text-3xl font-semibold text-white">{totalParcels}</p><p className="text-sm text-slate-300">parcels staged</p></div>
      </div>
      <div className="mt-5 space-y-3">
        {packageSummaries.map((summary) => (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4" key={summary.id}>
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-medium text-white">{summary.label}</p><p className="mt-1 text-sm text-slate-300">{summary.note}</p></div>
              <div className="text-right"><p className="text-xl font-semibold text-white">{summary.count}</p><p className="text-xs uppercase tracking-[0.22em] text-slate-400">{summary.share}</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-white">Exception types in rotation</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {exceptionTypes.map((type) => (
            <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300" key={type}>{type}</span>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-300">{openExceptions} unresolved items remain in this local mock queue.</p>
      </div>
    </section>
  );
}
