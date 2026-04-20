import type { SignalStream, StreamStatus } from "./mock-data";
import { getConfidenceShiftLabel } from "./signal-lab-model";

const statusClasses: Record<StreamStatus, string> = {
  stable: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  drifting: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

type StreamGridProps = {
  streams: SignalStream[];
  selectedStreamId: string | null;
  comparedIds: string[];
  mutedIds: string[];
  pausedIds: string[];
  onInspectStream: (streamId: string) => void;
  onToggleCompare: (streamId: string) => void;
};

export function StreamGrid({
  streams,
  selectedStreamId,
  comparedIds,
  mutedIds,
  pausedIds,
  onInspectStream,
  onToggleCompare,
}: StreamGridProps) {
  return (
    <section
      aria-label="Stream grid"
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Stream Cards
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Comparison candidates
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {comparedIds.length} pinned / {streams.length} visible
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {streams.map((stream) => {
          const isSelected = selectedStreamId === stream.id;
          const isCompared = comparedIds.includes(stream.id);
          const isMuted = mutedIds.includes(stream.id);
          const isPaused = pausedIds.includes(stream.id);
          const stats = [
            ["Throughput", stream.throughput],
            ["Sync window", stream.syncWindow],
            ["Confidence", `${stream.confidence}%`],
            ["Owner", stream.owner],
          ];

          return (
            <article
              key={stream.id}
              className={`rounded-[1.5rem] border p-5 transition ${
                isCompared
                  ? "border-cyan-300/40 bg-cyan-400/10 shadow-[0_18px_50px_rgba(34,211,238,0.14)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {stream.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {stream.channel}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] ${statusClasses[stream.status]}`}
                >
                  {stream.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                {stats.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-slate-500">{label}</p>
                    <p className="mt-1 text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Confidence
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {getConfidenceShiftLabel(stream, "2h")} / 2h
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {stream.confidenceStory}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
                {isSelected ? (
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white">
                    Inspecting
                  </span>
                ) : null}
                {isCompared ? (
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">
                    Pinned
                  </span>
                ) : null}
                {isPaused ? (
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-200">
                    Paused
                  </span>
                ) : null}
                {isMuted ? (
                  <span className="rounded-full border border-slate-400/30 bg-slate-400/10 px-3 py-1 text-slate-200">
                    Muted
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                  {stream.watchword}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  aria-label={`Inspect ${stream.name}`}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isSelected
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 text-slate-100 hover:border-white/20 hover:bg-white/5"
                  }`}
                  onClick={() => onInspectStream(stream.id)}
                  type="button"
                >
                  {isSelected ? "Inspecting" : "Inspect stream"}
                </button>
                <button
                  aria-label={`${isCompared ? "Remove" : "Pin"} ${stream.name} for comparison`}
                  aria-pressed={isCompared}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isCompared
                      ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
                      : "border-white/10 text-slate-100 hover:border-cyan-300/40 hover:bg-cyan-400/10"
                  }`}
                  onClick={() => onToggleCompare(stream.id)}
                  type="button"
                >
                  {isCompared ? "Pinned" : "Pin to compare"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
