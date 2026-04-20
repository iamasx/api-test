import type {
  ProjectedLane,
  ProjectedLaneException,
} from "./parcel-hub-simulator";

export type DrawerScope = "open" | "resolved" | "all";

type ExceptionDrawerProps = {
  activeScenarioLabel: string | null;
  exceptions: ProjectedLaneException[];
  onClearSelection: () => void;
  onScopeChange: (scope: DrawerScope) => void;
  onToggleResolved: (exceptionId: string) => void;
  scope: DrawerScope;
  selectedLane: ProjectedLane | null;
};

const severityClasses = {
  high: "border-rose-300/20 bg-rose-400/10 text-rose-100",
  medium: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  low: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

const previewStateClasses = {
  active: "border-white/10 bg-white/5 text-slate-200",
  softened: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  resolved: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  introduced: "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100",
};

export function ExceptionDrawer({
  activeScenarioLabel,
  exceptions,
  onClearSelection,
  onScopeChange,
  onToggleResolved,
  scope,
  selectedLane,
}: ExceptionDrawerProps) {
  const scopedExceptions = exceptions.filter((exception) => {
    if (scope === "open") return !exception.isResolved;
    if (scope === "resolved") return exception.isResolved;
    return true;
  });

  return (
    <aside
      aria-label="Exception drawer"
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.42)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Exception drawer</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{selectedLane ? selectedLane.laneCode : "Choose a lane"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {selectedLane
              ? `${selectedLane.origin} to ${selectedLane.destination} with ${selectedLane.departureWindow} dispatch window.`
              : "Select a lane card to inspect active exceptions or verify that a clear lane has nothing parked."}
          </p>
          {selectedLane ? (
            <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                {selectedLane.projectedStatusLabel}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
                {selectedLane.projectedOpenExceptions} open after preview
              </span>
              {activeScenarioLabel ? (
                <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-amber-100">
                  {activeScenarioLabel}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        {selectedLane ? (
          <button className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10" onClick={onClearSelection} type="button">Close</button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["open", "resolved", "all"] as DrawerScope[]).map((nextScope) => (
          <button
            className={`rounded-full px-3 py-2 text-sm transition ${
              nextScope === scope
                ? "bg-white text-slate-950"
                : "border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
            key={nextScope}
            onClick={() => onScopeChange(nextScope)}
            type="button"
          >
            {nextScope === "open" ? "Open" : nextScope === "resolved" ? "Resolved" : "All"}
          </button>
        ))}
      </div>

      {!selectedLane ? (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Waiting on selection</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">The drawer stays local to this route. Pick any lane to review exception details or confirm that a steady lane is clear.</p>
        </div>
      ) : scopedExceptions.length > 0 ? (
        <div className="mt-5 space-y-3">
          {scopedExceptions.map((exception) => {
            return (
              <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4" key={exception.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${severityClasses[exception.severity]}`}>{exception.severity}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{exception.type}</span>
                  <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${previewStateClasses[exception.previewState]}`}>{exception.previewLabel}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{exception.updatedAt}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{exception.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exception.detail}</p>
                <div className="mt-3 rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Preview note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {exception.previewNote}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1 text-sm text-slate-300">
                    <p>{exception.owner}</p>
                    <p>{exception.affectedParcels} parcels affected</p>
                  </div>
                  {exception.canToggleResolved ? (
                    <button
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        exception.isResolved ? "border border-emerald-300/25 bg-emerald-300/10 text-emerald-100 hover:bg-emerald-300/15" : "bg-amber-300 text-slate-950 hover:bg-amber-200"
                      }`}
                      onClick={() => onToggleResolved(exception.id)}
                      type="button"
                    >
                      {exception.isResolved ? "Reopen marker" : "Mark resolved"}
                    </button>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Preview only
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Zero state</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{exceptions.length === 0 ? "This lane has no parked exceptions." : "No items match the current drawer view."}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {exceptions.length === 0
              ? "The lane is clear right now. Switch to a different lane if you want to inspect active holds."
              : "Try the open or all tabs to bring unresolved items back into view."}
          </p>
        </div>
      )}
    </aside>
  );
}
