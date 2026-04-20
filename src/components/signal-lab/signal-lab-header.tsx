type SignalLabHeaderProps = {
  heartbeat: string;
  labState: string;
  activeStreams: number;
  openAnomalies: number;
  mutedStreams: number;
  pausedStreams: number;
  activeStream: string | null;
  comparedStreams: number;
  comparisonView: "summary" | "detail";
  comparisonWindowLabel: string;
};

export function SignalLabHeader({
  heartbeat,
  labState,
  activeStreams,
  openAnomalies,
  mutedStreams,
  pausedStreams,
  activeStream,
  comparedStreams,
  comparisonView,
  comparisonWindowLabel,
}: SignalLabHeaderProps) {
  const panels = [
    {
      label: "Lab state",
      value: labState,
      detail: `Heartbeat ${heartbeat}`,
    },
    {
      label: "Comparison",
      value: `${comparedStreams} pinned / ${openAnomalies} open anomalies`,
      detail: `${comparisonView === "summary" ? "Summary" : "Detail"} view on the ${comparisonWindowLabel}`,
    },
    {
      label: "Inspector lock",
      value: activeStream ?? "No stream selected",
      detail: `Active ${activeStreams} / Paused ${pausedStreams} / Muted ${mutedStreams}`,
    },
  ];

  return (
    <header className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_24px_90px_rgba(8,145,178,0.18)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
            Signal Lab
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Multi-stream comparison workspace for anomaly drift and confidence
            shifts.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Pin multiple streams, switch between summary and detail lenses, and
            inspect confidence movement without leaving the client-side
            workspace.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {panel.label}
              </p>
              <p className="mt-2 text-lg font-medium text-white">
                {panel.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{panel.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
