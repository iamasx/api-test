import type { Ref } from "react";
import {
  operatorPostureOptions,
  type OperatorPosture,
} from "@/app/control-room/mock-data";

type QuickActionsProps = {
  actionLog: {
    id: string;
    label: string;
    source: string;
    timeLabel: string;
  }[];
  divertWorkers: boolean;
  freezeDeploys: boolean;
  isSpotlighted: boolean;
  lastAction: string;
  posture: OperatorPosture;
  samplingRate: number;
  silenceInfoAlerts: boolean;
  onRunDryFailover: () => void;
  onSetPosture: (posture: OperatorPosture) => void;
  onSetSamplingRate: (value: number) => void;
  onToggleDivertWorkers: () => void;
  onToggleFreezeDeploys: () => void;
  onToggleSilenceInfoAlerts: () => void;
  sectionRef?: Ref<HTMLElement>;
};

export function QuickActions({
  actionLog,
  divertWorkers,
  freezeDeploys,
  isSpotlighted,
  lastAction,
  posture,
  samplingRate,
  silenceInfoAlerts,
  onRunDryFailover,
  onSetPosture,
  onSetSamplingRate,
  onToggleDivertWorkers,
  onToggleFreezeDeploys,
  onToggleSilenceInfoAlerts,
  sectionRef,
}: QuickActionsProps) {
  return (
    <section
      aria-label="Quick actions"
      className={`rounded-[2rem] border bg-slate-950/65 p-6 backdrop-blur transition sm:p-8 ${
        isSpotlighted
          ? "border-cyan-300/45 shadow-[0_0_0_1px_rgba(103,232,249,0.15),0_18px_70px_rgba(34,211,238,0.18)]"
          : "border-white/10"
      }`}
      ref={sectionRef}
      tabIndex={-1}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Quick Actions
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Drill controls
          </h2>
        </div>
        <p className="max-w-lg text-sm text-slate-300">
          Command palette actions and alert remediation shortcuts stage changes
          into the same local control surface.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          aria-pressed={freezeDeploys}
          className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${
            freezeDeploys
              ? "border-amber-300/30 bg-amber-400/12 text-amber-100"
              : "border-white/10 bg-white/[0.04] text-slate-300"
          }`}
          onClick={onToggleFreezeDeploys}
          type="button"
        >
          Freeze deploy lane
        </button>
        <button
          aria-pressed={divertWorkers}
          className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${
            divertWorkers
              ? "border-emerald-300/25 bg-emerald-400/12 text-emerald-100"
              : "border-white/10 bg-white/[0.04] text-slate-300"
          }`}
          onClick={onToggleDivertWorkers}
          type="button"
        >
          Divert background workers
        </button>
      </div>

      <button
        aria-pressed={silenceInfoAlerts}
        className={`mt-4 w-full rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${
          silenceInfoAlerts
            ? "border-sky-300/25 bg-sky-400/12 text-sky-100"
            : "border-white/10 bg-white/[0.04] text-slate-300"
        }`}
        onClick={onToggleSilenceInfoAlerts}
        type="button"
      >
        Silence info alerts
      </button>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Incident posture
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {operatorPostureOptions.map((option) => {
            const isActive = posture === option;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm capitalize ${
                  isActive
                    ? "border-cyan-200 bg-cyan-200 text-slate-950"
                    : "border-white/10 bg-white/[0.04] text-slate-300"
                }`}
                key={option}
                onClick={() => onSetPosture(option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-6 block text-sm text-slate-300">
        Event sampling: <span className="text-white">{samplingRate}%</span>
        <input
          className="mt-3 w-full accent-cyan-300"
          max={100}
          min={10}
          onChange={(event) => onSetSamplingRate(Number(event.target.value))}
          type="range"
          value={samplingRate}
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950"
          onClick={onRunDryFailover}
          type="button"
        >
          Run dry failover
        </button>
        <button
          className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-200"
          onClick={onToggleSilenceInfoAlerts}
          type="button"
        >
          {silenceInfoAlerts ? "Resume info alerts" : "Silence info alerts"}
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            {freezeDeploys ? "deploys frozen" : "deploys open"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            {divertWorkers ? "workers diverted" : "workers normal"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            posture {posture}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
            {silenceInfoAlerts ? "info muted" : "info live"}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{lastAction}</p>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-slate-950/55 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Recent command log
          </p>
          <p className="text-xs text-slate-500">{actionLog.length} staged</p>
        </div>
        <ol className="mt-4 space-y-3">
          {actionLog.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-white/12 bg-white/[0.03] p-3 text-sm text-slate-400">
              No staged commands yet.
            </li>
          ) : (
            actionLog.map((entry) => (
              <li
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-3"
                key={entry.id}
              >
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <span>{entry.source}</span>
                  <span>{entry.timeLabel}</span>
                </div>
                <p className="mt-2 text-sm text-slate-200">{entry.label}</p>
              </li>
            ))
          )}
        </ol>
      </div>
    </section>
  );
}
