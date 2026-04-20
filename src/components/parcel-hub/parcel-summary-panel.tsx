import type {
  ParcelHubProjectionSummary,
  ProjectedPackageSummary,
} from "./parcel-hub-simulator";

type ParcelSummaryPanelProps = {
  activeScenarioLabel: string | null;
  exceptionTypes: string[];
  packageSummaries: ProjectedPackageSummary[];
  summary: ParcelHubProjectionSummary;
};

function formatSigned(value: number) {
  if (value === 0) {
    return "0";
  }

  return `${value > 0 ? "+" : ""}${value}`;
}

export function ParcelSummaryPanel({
  activeScenarioLabel,
  exceptionTypes,
  packageSummaries,
  summary,
}: ParcelSummaryPanelProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/72 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.32)] sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Parcel mix
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Grouped volume and scenario impact
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {activeScenarioLabel
              ? `Previewing ${activeScenarioLabel} against the current route.`
              : "Use a simulator card to see how package mix and route summary shift under reassignment."}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-white">
            {summary.totalParcels}
          </p>
          <p className="text-sm text-slate-300">parcels staged</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {packageSummaries.map((summary) => (
          <div
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
            key={summary.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-white">{summary.label}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] ${
                      summary.projectionStatus === "improved"
                        ? "bg-emerald-300/10 text-emerald-100"
                        : summary.projectionStatus === "watch"
                          ? "bg-amber-300/10 text-amber-100"
                          : "bg-white/10 text-slate-200"
                    }`}
                  >
                    {summary.projectionStatus}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  {summary.projectionNote}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-white">{summary.count}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  {summary.share}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span className="rounded-full border border-white/10 px-3 py-1">
                {summary.movedParcels} rerouted
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                SLA {formatSigned(summary.slaRiskDelta)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-white">Projected route outcome</p>
          <div className="mt-4 grid gap-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  SLA risk
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {summary.projectedSlaRiskParcels}
                </p>
              </div>
              <p className="text-sm text-slate-300">
                {formatSigned(summary.slaRiskParcelsDelta)} vs current
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Open exceptions
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {summary.projectedOpenExceptions}
                </p>
              </div>
              <p className="text-sm text-slate-300">
                {formatSigned(summary.openExceptionsDelta)} vs current
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Peak pressure
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {summary.projectedPeakPressure}%
                </p>
              </div>
              <p className="text-sm text-slate-300">
                {formatSigned(summary.peakPressureDelta)} pts vs current
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-white">
            Previewed exception movement
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <div className="flex items-center justify-between gap-3">
              <span>Delayed parcels after move</span>
              <span className="font-semibold text-white">
                {summary.projectedDelayedParcels}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Exceptions cleared in preview</span>
              <span className="font-semibold text-white">
                {summary.resolvedInPreview}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Risks softened in preview</span>
              <span className="font-semibold text-white">
                {summary.softenedInPreview}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>New preview risks</span>
              <span className="font-semibold text-white">
                {summary.introducedRiskCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-white">Exception types in rotation</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {exceptionTypes.map((type) => (
            <span
              className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300"
              key={type}
            >
              {type}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-300">
          {summary.projectedOpenExceptions} unresolved items remain after the
          selected preview is compared against the current route.
        </p>
      </div>
    </section>
  );
}
