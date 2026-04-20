import type {
  RouteConstraint,
  RouteSegment,
} from "../_data/route-planner-data";
import styles from "../route-planner.module.css";

const segmentStatusLabels: Record<RouteSegment["status"], string> = {
  "on-time": "On time",
  delayed: "Delayed",
  blocked: "Blocked",
};

const segmentStatusStyles: Record<RouteSegment["status"], string> = {
  "on-time": "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  delayed: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  blocked: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const segmentSurfaceStyles: Record<RouteSegment["status"], string> = {
  "on-time": styles.segmentOnTime,
  delayed: styles.segmentDelayed,
  blocked: styles.segmentBlocked,
};

const constraintToneStyles: Record<RouteConstraint["tone"], string> = {
  clear: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

type SegmentCardProps = {
  segment: RouteSegment;
  constraints: RouteConstraint[];
};

export function SegmentCard({ segment, constraints }: SegmentCardProps) {
  return (
    <article
      className={`${styles.segmentCard} ${segmentSurfaceStyles[segment.status]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {segment.stage}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {segment.lane}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${segmentStatusStyles[segment.status]}`}
          >
            {segmentStatusLabels[segment.status]}
          </span>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            {segment.mode}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            ETA window
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            {segment.etaWindow}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Owner
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            {segment.owner}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{segment.summary}</p>
      <p className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200">
        {segment.riskNote}
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)]">
        <div className="rounded-2xl border border-white/8 bg-slate-900/70 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Active checkpoint
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {segment.checkpoint.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {segment.checkpoint.detail}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-slate-900/70 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Attached constraints
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {constraints.map((constraint) => (
              <span
                key={constraint.id}
                className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${constraintToneStyles[constraint.tone]}`}
              >
                {constraint.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
