type SignalLabHeaderProps = {
  heartbeat: string;
  labState: string;
  activeStreams: number;
  openAnomalies: number;
  mutedStreams: number;
  pausedStreams: number;
  focusedStream: string | null;
};

export function SignalLabHeader({
  heartbeat,
  labState,
  activeStreams,
  openAnomalies,
  mutedStreams,
  pausedStreams,
  focusedStream,
}: SignalLabHeaderProps) {
  const panels = [
    { label: "Lab State", value: labState, detail: `Heartbeat ${heartbeat}` },
    { label: "Active Sweep", value: `${activeStreams} streams / ${openAnomalies} anomalies`, detail: `Paused ${pausedStreams} / Muted ${mutedStreams}` },
    { label: "Focus Lock", value: focusedStream ?? "No stream focused", detail: "Select a card again to clear the inspector.", span: true },
  ];

  return (
    <header className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_24px_90px_rgba(8,145,178,0.18)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
            Signal Lab
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Synthetic streams with local controls and live inspector state.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            The workspace stays client-side: stream focus, anomaly triage, and
            operator toggles all update locally without server calls.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 ${panel.span ? "sm:col-span-2 xl:col-span-1" : ""}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{panel.label}</p>
              <p className="mt-2 text-lg font-medium text-white">{panel.value}</p>
              <p className="mt-1 text-sm text-slate-400">{panel.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
