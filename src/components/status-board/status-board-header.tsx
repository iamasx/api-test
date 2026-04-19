type StatusBoardHeaderProps = {
  boardState: string;
  environment: string;
  isRefreshing: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
  selectedRegionCount: number;
  summaryCount: number;
};

const timestampFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function StatusBoardHeader({
  boardState,
  environment,
  isRefreshing,
  lastUpdated,
  onRefresh,
  selectedRegionCount,
  summaryCount,
}: StatusBoardHeaderProps) {
  return (
    <section className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-600/20 bg-emerald-500/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">{environment}</span>
            <span className="rounded-full border border-slate-300 bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-50">{boardState}</span>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Status Board</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Regional health and failover posture</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Review regional latency, scope dependency impact, and clear the operator checklist before widening traffic away from the primary path.</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Refresh state</p>
          <p className="mt-2 text-sm font-medium">Last updated {timestampFormatter.format(lastUpdated)}</p>
          <p className="mt-1 text-sm text-slate-300">{selectedRegionCount} regions selected across {summaryCount} summary lanes</p>
          <button
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-100"
            onClick={onRefresh}
            type="button"
          >
            {isRefreshing ? "Refreshing snapshot..." : "Refresh snapshot"}
          </button>
        </div>
      </div>
    </section>
  );
}
