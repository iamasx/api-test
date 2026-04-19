import type { AlertMarker } from "@/app/radar-console/mock-data";

type RadarConsoleHeaderProps = {
  focusedSector: string | null;
  heartbeat: string;
  markers: AlertMarker[];
  scopeCount: number;
  sweepStatus: string;
  watchCount: number;
};

const toneClasses = {
  steady: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  watch: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-100",
};

export function RadarConsoleHeader({
  focusedSector,
  heartbeat,
  markers,
  scopeCount,
  sweepStatus,
  watchCount,
}: RadarConsoleHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/75 p-5 text-slate-100 shadow-[0_24px_80px_-44px_rgba(34,211,238,0.6)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Radar console</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Synthetic sector sweep</h1>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-100">
              {sweepStatus}
            </span>
          </div>
          <p className="max-w-2xl text-sm text-slate-300">
            {focusedSector ? `${focusedSector} is pinned for the current pass.` : "The console is sampling all four sectors on this pass."} Heartbeat {heartbeat}.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Tracks in scope</p>
            <p className="mt-2 text-3xl font-semibold text-white">{scopeCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Watch tags</p>
            <p className="mt-2 text-3xl font-semibold text-white">{watchCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Heartbeat</p>
            <p className="mt-2 text-2xl font-semibold text-white">{heartbeat}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className={`min-w-48 flex-1 rounded-2xl border px-4 py-3 ${toneClasses[marker.tone]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.18em]">{marker.label}</p>
              <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-semibold">{marker.count}</span>
            </div>
            <p className="mt-2 text-sm text-current/85">{marker.detail}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
