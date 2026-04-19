import type { ReportingWindow, ReportingWindowId } from "@/app/telemetry-desk/mock-data";

type TelemetryDeskHeaderProps = {
  activeMetricCount: number;
  alertCount: number;
  focusedMetricLabel: string | null;
  onReset: () => void;
  onWindowChange: (windowId: ReportingWindowId) => void;
  panelCount: number;
  periodLabel: string;
  windowId: ReportingWindowId;
  windows: ReportingWindow[];
};

export function TelemetryDeskHeader({
  activeMetricCount,
  alertCount,
  focusedMetricLabel,
  onReset,
  onWindowChange,
  panelCount,
  periodLabel,
  windowId,
  windows,
}: TelemetryDeskHeaderProps) {
  const activeWindow = windows.find((window) => window.id === windowId);

  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-4 py-2 text-cyan-100">Telemetry Desk</span>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/12 px-4 py-2 text-amber-100">/telemetry-desk</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Route-local desk with focused trend comparisons.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            Reporting window, metric focus, alert filtering, and panel baselines all stay inside this route and reset locally without touching shared state.
          </p>
        </div>
        <div className="space-y-4 xl:max-w-md xl:text-right">
          <p className="text-sm text-slate-300">
            Reporting window <span className="font-semibold text-white">{periodLabel}</span>
            {focusedMetricLabel ? ` • Focused on ${focusedMetricLabel}` : ""}
          </p>
          <div className="flex flex-wrap gap-3 xl:justify-end">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-3"><span className="block text-xs uppercase tracking-[0.22em] text-slate-400">Active tiles</span><strong className="mt-2 block text-2xl text-white">{activeMetricCount}</strong></div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-3"><span className="block text-xs uppercase tracking-[0.22em] text-slate-400">Panels</span><strong className="mt-2 block text-2xl text-white">{panelCount}</strong></div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-3"><span className="block text-xs uppercase tracking-[0.22em] text-slate-400">Alerts</span><strong className="mt-2 block text-2xl text-white">{alertCount}</strong></div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {windows.map((window) => (
            <button
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${window.id === windowId ? "border-cyan-300/40 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08]"}`}
              key={window.id}
              onClick={() => onWindowChange(window.id)}
              type="button"
            >
              {window.label}
              <span className="ml-2 text-xs opacity-70">{window.range}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-400">{activeWindow?.cadence}</p>
          <button className="rounded-full border border-amber-300/25 bg-amber-300/12 px-4 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-300/18" onClick={onReset} type="button">
            Reset selectors
          </button>
        </div>
      </div>
    </header>
  );
}
