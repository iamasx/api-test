import type {
  ComparisonWindow,
  SignalAnomaly,
  SignalStream,
} from "./mock-data";
import {
  getConfidenceShiftLabel,
  getWindowLabel,
  type InspectorPeerNote,
} from "./signal-lab-model";

const toneClasses = {
  steady: "text-emerald-200",
  watch: "text-amber-200",
  alert: "text-rose-200",
};

type InspectorPanelProps = {
  stream: SignalStream | null;
  anomalies: SignalAnomaly[];
  peerNotes: InspectorPeerNote[];
  comparisonWindow: ComparisonWindow;
  isCompared: boolean;
  isMuted: boolean;
  isPaused: boolean;
  onClearSelection: () => void;
  onToggleCompare: () => void;
  onToggleMute: () => void;
  onTogglePause: () => void;
};

export function InspectorPanel({
  stream,
  anomalies,
  peerNotes,
  comparisonWindow,
  isCompared,
  isMuted,
  isPaused,
  onClearSelection,
  onToggleCompare,
  onToggleMute,
  onTogglePause,
}: InspectorPanelProps) {
  const controls = [
    {
      active: isPaused,
      activeClasses: "border-amber-400/30 bg-amber-400/10 text-amber-100",
      idleLabel: "Pause stream",
      activeLabel: "Resume stream",
      onClick: onTogglePause,
    },
    {
      active: isMuted,
      activeClasses: "border-slate-400/30 bg-slate-400/10 text-slate-100",
      idleLabel: "Mute stream",
      activeLabel: "Unmute stream",
      onClick: onToggleMute,
    },
    {
      active: isCompared,
      activeClasses: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
      idleLabel: "Pin stream",
      activeLabel: "Unpin stream",
      onClick: onToggleCompare,
    },
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
        <h2 className="mt-4 text-2xl font-semibold text-white">
          No stream selected
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Inspect a stream card or jump in from the anomaly feed to explain
          confidence changes, compare peers, and review local controls.
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
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Inspector Panel
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {stream.name}
          </h2>
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
        {[
          ["Confidence", `${stream.confidence}%`],
          ["Visible shift", `${getConfidenceShiftLabel(stream, comparisonWindow)} in the ${getWindowLabel(comparisonWindow)}`],
          ["Open anomalies", String(anomalies.length)],
          ["Compared peers", String(peerNotes.length)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-lg font-medium text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {controls.map((control) => (
          <button
            key={control.idleLabel}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              control.active
                ? control.activeClasses
                : "border-white/10 bg-white/[0.03] text-slate-100 hover:border-white/20"
            }`}
            onClick={control.onClick}
            type="button"
          >
            {control.active ? control.activeLabel : control.idleLabel}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Confidence narrative
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {stream.confidenceStory}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Baseline", stream.baseline],
            ["Drift driver", stream.driftDriver],
            ["Outlook", stream.outlook],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Anomaly explanations
          </p>
          <p className="text-sm text-slate-400">
            {anomalies.length} linked to this stream
          </p>
        </div>
        <div className="mt-3 space-y-3">
          {anomalies.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
              No anomalies are linked to the inspected stream.
            </div>
          ) : null}
          {anomalies.map((anomaly) => (
            <article
              key={anomaly.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{anomaly.title}</p>
                <p className="text-sm text-slate-500">{anomaly.detectedAt}</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {anomaly.confidenceShift}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {anomaly.explanation}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {anomaly.compareNote}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Compared peers
          </p>
          <p className="text-sm text-slate-400">
            {peerNotes.length} active comparisons
          </p>
        </div>
        <div className="mt-3 space-y-3">
          {peerNotes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
              Pin at least one additional stream to generate peer comparison
              notes in the inspector.
            </div>
          ) : null}
          {peerNotes.map((note) => (
            <article
              key={note.peerId}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium text-white">{note.peerName}</p>
                <p className="text-sm text-slate-400">{note.confidenceGap}</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">{note.shiftGap}</p>
              <p className="mt-2 text-sm text-slate-400">{note.summary}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Inspector reads
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {stream.readings.map((reading) => (
            <div
              key={reading.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-sm text-slate-400">{reading.label}</p>
              <p className="mt-2 text-xl font-medium text-white">
                {reading.value}
              </p>
              <p className={`mt-2 text-sm ${toneClasses[reading.tone]}`}>
                {reading.trend}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Marker trail
        </p>
        <div className="mt-3 space-y-3">
          {stream.markers.map((marker) => (
            <div
              key={`${marker.label}-${marker.time}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{marker.label}</p>
                <p className="text-sm text-slate-500">{marker.time}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{marker.detail}</p>
              <p className="mt-2 text-sm text-slate-400">
                {marker.confidenceNote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
