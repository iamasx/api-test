import type { ShipmentLane } from "./parcel-hub-data";

type LaneBoardProps = { lanes: ShipmentLane[]; resolvedIds: Record<string, boolean>; selectedLaneId: string | null; onInspectLane: (laneId: string) => void };

const laneToneClasses = {
  steady: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  exception: "border-rose-300/25 bg-rose-300/10 text-rose-100",
};

const groupStatusClasses: Record<string, string> = {
  "Address hold": "bg-amber-200/15 text-amber-100",
  Buffered: "bg-sky-200/15 text-sky-100",
  "Hold scan": "bg-rose-200/15 text-rose-100",
  Loaded: "bg-emerald-200/15 text-emerald-100",
  Ready: "bg-slate-200/15 text-slate-100",
  Reweigh: "bg-orange-200/15 text-orange-100",
  "Split sort": "bg-fuchsia-200/15 text-fuchsia-100",
  "Weather hold": "bg-cyan-200/15 text-cyan-100",
};

export function LaneBoard({
  lanes,
  resolvedIds,
  selectedLaneId,
  onInspectLane,
}: LaneBoardProps) {
  if (lanes.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/55 p-8 text-center text-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">No lanes</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">The current lane filter has nothing staged.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">Switch back to all lanes to reopen the board and inspect route-level exceptions.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {lanes.map((lane) => {
        const unresolvedCount = lane.exceptionIds.filter((id) => !resolvedIds[id]).length;
        const resolvedCount = lane.exceptionIds.filter((id) => resolvedIds[id]).length;
        const isSelected = lane.id === selectedLaneId;

        return (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_20px_80px_rgba(15,23,42,0.32)] transition sm:p-6 ${
              isSelected
                ? "border-amber-300/50 bg-slate-900/95"
                : "border-white/10 bg-slate-950/72"
            }`}
            key={lane.id}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${laneToneClasses[lane.tone]}`}>{lane.statusLabel}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">{lane.departureWindow}</span>
                </div>
                <div><h2 className="text-2xl font-semibold text-white">{lane.laneCode}</h2><p className="mt-1 text-sm text-slate-300">{lane.origin} to {lane.destination}</p></div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                  <span>{lane.checkpoint}</span>
                  <span>{lane.trailerFill}</span>
                  <span>{lane.delayedParcels} parcels delayed</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:min-w-52">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Exception queue</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{unresolvedCount}</p>
                  <p className="mt-1 text-sm text-slate-300">{resolvedCount} resolved markers</p>
                </div>
                <button className="rounded-full bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200" onClick={() => onInspectLane(lane.id)} type="button">
                  {lane.exceptionIds.length > 0 ? "Open exception drawer" : "Review lane status"}
                </button>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {lane.parcelGroups.map((group) => (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4" key={group.id}>
                  <p className="text-sm font-medium text-white">{group.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-2xl font-semibold text-slate-100">{group.count}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${groupStatusClasses[group.statusLabel] ?? "bg-white/10 text-slate-100"}`}>{group.statusLabel}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">{group.zone}</p>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
