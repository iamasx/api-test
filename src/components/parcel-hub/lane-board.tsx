import type { ProjectedLane } from "./parcel-hub-simulator";

type LaneBoardProps = {
  activeScenarioLabel: string | null;
  lanes: ProjectedLane[];
  selectedLaneId: string | null;
  onInspectLane: (laneId: string) => void;
};

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
  "Flex receive": "bg-emerald-200/15 text-emerald-100",
};

export function LaneBoard({
  activeScenarioLabel,
  lanes,
  selectedLaneId,
  onInspectLane,
}: LaneBoardProps) {
  if (lanes.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/55 p-8 text-center text-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">No lanes</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">The current lane filter has nothing staged.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Switch back to all lanes to reopen the board and inspect route-level
          exceptions.
        </p>
      </section>
    );
  }

  const formatSigned = (value: number) => {
    if (value === 0) {
      return "0";
    }

    return `${value > 0 ? "+" : ""}${value}`;
  };

  return (
    <section className="space-y-4">
      {lanes.map((lane) => {
        const isSelected = lane.id === selectedLaneId;
        const introducedRisks = lane.projectedExceptions.filter(
          (exception) => exception.previewState === "introduced",
        ).length;
        const resolvedInPreview = lane.projectedExceptions.filter(
          (exception) => exception.previewState === "resolved",
        ).length;
        const softenedInPreview = lane.projectedExceptions.filter(
          (exception) => exception.previewState === "softened",
        ).length;
        const isScenarioTouched =
          lane.inboundMoves.length > 0 || lane.outboundMoves.length > 0;

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
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${laneToneClasses[lane.projectedTone]}`}
                  >
                    {lane.projectedStatusLabel}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                    {lane.departureWindow}
                  </span>
                  {isScenarioTouched ? (
                    <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-amber-100">
                      {activeScenarioLabel ?? "Scenario preview"}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {lane.laneCode}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {lane.origin} to {lane.destination}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                  <span>{lane.projectedCheckpoint}</span>
                  <span>{lane.trailerFill}</span>
                  <span>{lane.projectedDelayedParcels} parcels delayed</span>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-300">
                  {lane.projectedBalanceNote}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:min-w-52">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Exception queue
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {lane.projectedOpenExceptions}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {lane.projectedResolvedExceptions} resolved or cleared
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    <span>{resolvedInPreview} clears</span>
                    <span>{softenedInPreview} softened</span>
                    <span>{introducedRisks} new risk</span>
                  </div>
                </div>
                <button
                  aria-label={`Inspect ${lane.laneCode} lane`}
                  className="rounded-full bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                  onClick={() => onInspectLane(lane.id)}
                  type="button"
                >
                  {lane.projectedExceptions.length > 0
                    ? "Open exception drawer"
                    : "Review lane status"}
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Pressure
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {lane.pressurePercent}%
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {lane.basePressurePercent}% current / {formatSigned(lane.pressureDelta)} pts
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Headroom
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {lane.headroomParcels}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  parcels before hitting lane capacity
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  SLA risk
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {lane.projectedSlaRiskParcels}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {formatSigned(lane.slaRiskDelta)} vs current
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Delay swing
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {lane.projectedDelayedParcels}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {formatSigned(lane.delayedDelta)} vs current
                </p>
              </div>
            </div>

            {isScenarioTouched ? (
              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {lane.outboundMoves.length > 0 ? (
                  <div className="rounded-[1.5rem] border border-amber-300/15 bg-amber-300/10 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
                      Outbound reassignment
                    </p>
                    <div className="mt-3 space-y-2">
                      {lane.outboundMoves.map((move) => (
                        <div key={move.id}>
                          <p className="text-sm font-medium text-white">
                            {move.parcelCount} {move.label}
                          </p>
                          <p className="mt-1 text-sm text-amber-50/90">
                            {move.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {lane.inboundMoves.length > 0 ? (
                  <div className="rounded-[1.5rem] border border-emerald-300/15 bg-emerald-300/10 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/80">
                      Inbound reassignment
                    </p>
                    <div className="mt-3 space-y-2">
                      {lane.inboundMoves.map((move) => (
                        <div key={move.id}>
                          <p className="text-sm font-medium text-white">
                            {move.parcelCount} {move.label}
                          </p>
                          <p className="mt-1 text-sm text-emerald-50/90">
                            {move.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {lane.parcelGroups.map((group) => (
                <div
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                  key={group.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{group.label}</p>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {formatSigned(group.delta)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-2xl font-semibold text-slate-100">
                      {group.count}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${groupStatusClasses[group.statusLabel] ?? "bg-white/10 text-slate-100"}`}
                    >
                      {group.statusLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {group.zone}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {group.baselineCount} current
                  </p>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
