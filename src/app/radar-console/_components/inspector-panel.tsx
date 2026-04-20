import Link from "next/link";

import type {
  RadarContact,
  RadarInspectorMetadata,
  RadarSector,
  RadarSignalPriority,
} from "../_data/radar-console-data";
import type { InspectorQueueItem } from "../_lib/radar-console";

type InspectorPanelProps = {
  metadata: RadarInspectorMetadata;
  selectedSignal: RadarSignalPriority;
  selectedSector: RadarSector;
  owners: RadarContact[];
  queue: InspectorQueueItem[];
  fallbackMessage?: string;
};

const priorityClasses: Record<RadarSignalPriority["priority"], string> = {
  "priority-1": "border-rose-400/35 bg-rose-400/10 text-rose-100",
  "priority-2": "border-amber-300/35 bg-amber-300/10 text-amber-100",
  "priority-3": "border-sky-300/35 bg-sky-300/10 text-sky-100",
};

export function InspectorPanel({
  metadata,
  selectedSignal,
  selectedSector,
  owners,
  queue,
  fallbackMessage,
}: InspectorPanelProps) {
  return (
    <aside
      className="rounded-[1.9rem] border border-white/10 bg-slate-950/92 p-6 text-slate-50 shadow-[0_26px_80px_rgba(2,6,23,0.28)]"
      aria-label="Signal inspector"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300/70">
            {metadata.eyebrow}
          </p>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              {metadata.title}
            </h2>
            <p className="text-sm leading-7 text-slate-300">
              {metadata.description}
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Signal priority queue
            </h3>
            {fallbackMessage ? (
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100">
                Fallback applied
              </span>
            ) : null}
          </div>

          <nav aria-label="Signal priority queue">
            <ul className="space-y-3">
              {queue.map((item) => (
                <li key={item.signal.id}>
                  <Link
                    href={item.href}
                    aria-current={item.isSelected ? "page" : undefined}
                    aria-label={
                      item.isSelected
                        ? `Viewing signal ${item.signal.title}`
                        : `Inspect signal ${item.signal.title}`
                    }
                    className={`block rounded-[1.3rem] border px-4 py-4 transition ${
                      item.isSelected
                        ? "border-emerald-300/45 bg-emerald-300/12"
                        : "border-white/8 bg-white/6 hover:border-white/16 hover:bg-white/9"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.signal.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {item.sector.name}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${priorityClasses[item.signal.priority]}`}
                      >
                        {item.signal.priority.replace("-", " ")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {item.signal.summary}
                    </p>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.signal.lastUpdate}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section
          className="space-y-5 rounded-[1.5rem] border border-white/8 bg-white/6 p-5"
          aria-labelledby="selected-signal-heading"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Selected signal
              </p>
              <h3
                id="selected-signal-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-white"
              >
                {selectedSignal.title}
              </h3>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${priorityClasses[selectedSignal.priority]}`}
            >
              {selectedSignal.priority.replace("-", " ")}
            </span>
          </div>

          {fallbackMessage ? (
            <p className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
              {fallbackMessage}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Sector
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {selectedSector.code} · {selectedSector.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {selectedSector.posture}
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Timing
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {selectedSignal.recommendedWindow}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {selectedSignal.confidence}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Summary
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {selectedSignal.summary}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {selectedSignal.narrative}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Action checklist
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                {selectedSignal.actionChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Owner contacts
                </p>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {owners.map((owner) => (
                    <li key={owner.id}>
                      {owner.name} · {owner.callSign}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Telemetry
                </p>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {selectedSignal.telemetry.map((item) => (
                    <li key={item.label}>
                      {item.label}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
