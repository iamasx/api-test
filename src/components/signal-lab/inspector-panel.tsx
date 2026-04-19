import type { SignalStream } from "./mock-data";

const toneClasses = {
  steady: "text-emerald-200",
  watch: "text-amber-200",
  alert: "text-rose-200",
};

type InspectorPanelProps = {
  stream: SignalStream | null;
  anomalyCount: number;
  isFocused: boolean;
  isMuted: boolean;
  isPaused: boolean;
  onClearSelection: () => void;
  onToggleFocus: () => void;
  onToggleMute: () => void;
  onTogglePause: () => void;
};

export function InspectorPanel({
  stream,
  anomalyCount,
  isFocused,
  isMuted,
  isPaused,
  onClearSelection,
  onToggleFocus,
  onToggleMute,
  onTogglePause,
}: InspectorPanelProps) {
  const controls = [
    { active: isPaused, activeClasses: "border-amber-400/30 bg-amber-400/10 text-amber-100", idleLabel: "Pause stream", activeLabel: "Resume stream", onClick: onTogglePause },
    { active: isMuted, activeClasses: "border-slate-400/30 bg-slate-400/10 text-slate-100", idleLabel: "Mute stream", activeLabel: "Unmute stream", onClick: onToggleMute },
    { active: isFocused, activeClasses: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100", idleLabel: "Focus stream", activeLabel: "Release focus", onClick: onToggleFocus },
  ];

  if (!stream) {
    return (
      <aside
        aria-label="Inspector panel"
        className="rounded-[1.75rem] border border-dashed border-white/10 bg-slate-950/75 p-6 text-slate-300 backdrop-blur"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          Inspector Panel
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-white">No stream selected</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Select a stream card to inspect the synthetic readings, recent markers, and local controls. Selecting the same card again clears the workspace back to this idle state.
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Inspector panel"
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 backdrop-blur"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Inspector Panel</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{stream.name}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {stream.channel} / {stream.region}
          </p>
        </div>
        <button
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/5"
          onClick={onClearSelection}
          type="button"
        >
          Clear selection
        </button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[["Cadence", stream.cadence], ["Open anomalies", String(anomalyCount)]].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-medium text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {controls.map((control) => (
          <button
            key={control.idleLabel}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${control.active ? control.activeClasses : "border-white/10 bg-white/[0.03] text-slate-100 hover:border-white/20"}`}
            onClick={control.onClick}
            type="button"
          >
            {control.active ? control.activeLabel : control.idleLabel}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Inspector reads</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {stream.readings.map((reading) => (
            <div key={reading.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-slate-400">{reading.label}</p>
              <p className="mt-2 text-xl font-medium text-white">{reading.value}</p>
              <p className={`mt-2 text-sm ${toneClasses[reading.tone]}`}>{reading.trend}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Marker trail</p>
        <div className="mt-3 space-y-3">
          {stream.markers.map((marker) => (
            <div key={`${marker.label}-${marker.time}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{marker.label}</p>
                <p className="text-sm text-slate-500">{marker.time}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{marker.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
