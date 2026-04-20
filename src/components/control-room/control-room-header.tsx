import { formatLastUpdated } from "@/app/control-room/mock-data";

type ControlRoomHeaderProps = {
  activeAlertFilterLabel: string;
  activeFeedFilterLabel: string;
  activeRegionLabel: string;
  criticalCount: number;
  environment: string;
  filteredAlertCount: number;
  isRefreshing: boolean;
  lastUpdated: string;
  selectedAlertTitle: string | null;
  warningCount: number;
  onOpenPalette: () => void;
  onRefresh: () => void;
};

export function ControlRoomHeader({
  activeAlertFilterLabel,
  activeFeedFilterLabel,
  activeRegionLabel,
  criticalCount,
  environment,
  filteredAlertCount,
  isRefreshing,
  lastUpdated,
  selectedAlertTitle,
  warningCount,
  onOpenPalette,
  onRefresh,
}: ControlRoomHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/12 px-4 py-2 text-emerald-200">
              {environment}
            </span>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-amber-100">
              local mock telemetry
            </span>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-cyan-100">
              focus {activeRegionLabel}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Control Room
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Keyboard-first operations desk for fast incident triage. Open the
            command palette to jump between regions, filter the live timeline,
            and stage alert-specific remediation shortcuts without leaving the
            dashboard.
          </p>
        </div>
        <div className="space-y-3 lg:text-right">
          <p className="text-sm text-slate-300">
            Last updated{" "}
            <span className="font-medium text-white">
              {formatLastUpdated(lastUpdated)}
            </span>
          </p>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <span className="rounded-full border border-rose-400/25 bg-rose-500/12 px-4 py-2 text-sm text-rose-100">
              {criticalCount} critical
            </span>
            <span className="rounded-full border border-amber-300/25 bg-amber-400/12 px-4 py-2 text-sm text-amber-100">
              {warningCount} warning
            </span>
            <button
              className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200 hover:bg-cyan-300/18"
              onClick={onOpenPalette}
              type="button"
            >
              Open command palette
              <span className="ml-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/80">
                Ctrl/Cmd + K
              </span>
            </button>
            <button
              className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:bg-cyan-100"
              disabled={isRefreshing}
              onClick={onRefresh}
              type="button"
            >
              {isRefreshing ? "Refreshing..." : "Refresh mock metrics"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-300 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.9fr)]">
        <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Selected alert
          </p>
          <p className="mt-2 text-base font-medium text-white">
            {selectedAlertTitle ?? "No alert drilldown armed"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Palette and queue actions keep the drilldown pane aligned with the
            current operator focus.
          </p>
        </div>
        <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Queue state
          </p>
          <p className="mt-2 text-base font-medium text-white">
            {filteredAlertCount} alerts in view
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Severity filter: <span className="text-slate-200">{activeAlertFilterLabel}</span>
          </p>
        </div>
        <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Timeline lens
          </p>
          <p className="mt-2 text-base font-medium text-white">
            {activeFeedFilterLabel}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Activity filtering is shared between the timeline panel and command
            palette.
          </p>
        </div>
      </div>
    </header>
  );
}
