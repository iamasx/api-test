import { formatLastUpdated } from "@/app/control-room/mock-data";

type ControlRoomHeaderProps = {
  criticalCount: number;
  environment: string;
  isRefreshing: boolean;
  lastUpdated: string;
  warningCount: number;
  onRefresh: () => void;
};

export function ControlRoomHeader({
  criticalCount,
  environment,
  isRefreshing,
  lastUpdated,
  warningCount,
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
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Control Room
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Isolated operations dashboard for route-level testing. Metrics,
            alerts, and activity feed entries refresh in place with no server
            calls or shared dependencies.
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
    </header>
  );
}
