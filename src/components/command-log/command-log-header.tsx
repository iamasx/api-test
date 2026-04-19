type CommandLogHeaderProps = {
  captureVolume: number;
  eventCount: number;
  failedCount: number;
  runningCount: number;
  freshness: string;
  activeTagCount: number;
};

export function CommandLogHeader({
  captureVolume,
  eventCount,
  failedCount,
  runningCount,
  freshness,
  activeTagCount,
}: CommandLogHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-stone-950/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-300">
            <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-cyan-100">
              isolated route
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-100">
              {eventCount} stream events visible
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Command Log
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-300 sm:text-base">
            Synthetic command history grouped into event windows with local tag
            filters and a pin-ready detail rail. Nothing here leaves the client.
          </p>
        </div>
        <div className="space-y-3 lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            Freshness {freshness}
          </span>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Captured</p>
              <p className="mt-2 text-2xl font-semibold text-stone-100">{captureVolume}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Escalations</p>
              <p className="mt-2 text-2xl font-semibold text-rose-100">{failedCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">In Flight</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-100">
                {runningCount}
                <span className="ml-2 text-sm font-normal text-stone-400">
                  {activeTagCount > 0 ? `${activeTagCount} tags active` : "all tags"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
