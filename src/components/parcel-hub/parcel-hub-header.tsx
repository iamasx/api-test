type ParcelHubHeaderProps = {
  activeScenarioLabel: string | null;
  delayedParcels: number;
  delayedParcelsDelta: number;
  openExceptions: number;
  openExceptionsDelta: number;
  resolvedExceptions: number;
  resolvedInPreview: number;
  slaRiskParcels: number;
  slaRiskDelta: number;
  syncLabel: string;
  totalLanes: number;
  watchLanes: number;
  watchLanesDelta: number;
};

function formatDelta(value: number) {
  if (value === 0) {
    return "No change from current dispatch";
  }

  return `${value > 0 ? "+" : ""}${value} vs current dispatch`;
}

export function ParcelHubHeader({
  activeScenarioLabel,
  delayedParcels,
  delayedParcelsDelta,
  openExceptions,
  openExceptionsDelta,
  resolvedExceptions,
  resolvedInPreview,
  slaRiskParcels,
  slaRiskDelta,
  syncLabel,
  totalLanes,
  watchLanes,
  watchLanesDelta,
}: ParcelHubHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(24,24,27,0.88))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.42)] sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Parcel Hub</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Route pressure, SLA risk, and exception tradeoffs in one dispatch preview.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            Review outbound lanes, compare simulated balancing paths, and inspect the exception cost of every reassignment before operators touch live dispatch.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
              {activeScenarioLabel ? `Previewing ${activeScenarioLabel}` : "Current dispatch"}
            </span>
            <span className="text-sm text-slate-400">{syncLabel}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:w-[28rem]">
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-50">
            <p className="text-sm text-amber-100/80">Lane pressure</p>
            <p className="mt-2 text-3xl font-semibold">{totalLanes}</p>
            <p className="mt-1 text-sm text-amber-100/80">
              {watchLanes} lanes in watch or exception
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-amber-100/70">
              {formatDelta(watchLanesDelta)}
            </p>
          </div>
          <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-4 text-rose-50">
            <p className="text-sm text-rose-100/80">Delayed parcels</p>
            <p className="mt-2 text-3xl font-semibold">{delayedParcels}</p>
            <p className="mt-1 text-sm text-rose-100/80">
              {openExceptions} projected open exceptions
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-rose-100/70">
              {formatDelta(delayedParcelsDelta)}
            </p>
          </div>
          <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-4 text-sky-50">
            <p className="text-sm text-sky-100/80">Projected SLA risk</p>
            <p className="mt-2 text-3xl font-semibold">{slaRiskParcels}</p>
            <p className="mt-1 text-sm text-sky-100/80">
              parcels still exposed after preview
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sky-100/70">
              {formatDelta(slaRiskDelta)}
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-50">
            <p className="text-sm text-emerald-100/80">Clears and markers</p>
            <p className="mt-2 text-3xl font-semibold">{resolvedExceptions}</p>
            <p className="mt-1 text-sm text-emerald-100/80">
              resolved or cleared exceptions
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-100/70">
              {resolvedInPreview} preview clears, {formatDelta(openExceptionsDelta)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
