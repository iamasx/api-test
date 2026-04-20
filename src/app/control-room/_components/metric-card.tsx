import type {
  ControlRoomMetric,
  MetricStatus,
} from "../_data/control-room-data";

const statusBadgeClasses: Record<MetricStatus, string> = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  attention: "border-amber-200 bg-amber-50 text-amber-800",
  critical: "border-rose-200 bg-rose-50 text-rose-800",
};

const progressFillClasses: Record<MetricStatus, string> = {
  stable: "bg-emerald-500",
  attention: "bg-amber-500",
  critical: "bg-rose-500",
};

export function MetricCard({ metric }: { metric: ControlRoomMetric }) {
  return (
    <article
      role="listitem"
      className="flex h-full flex-col gap-5 rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {metric.label}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-slate-950">
            {metric.value}
          </p>
        </div>

        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeClasses[metric.status]}`}
        >
          {metric.delta}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-600">{metric.context}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{metric.focus}</span>
          <span>{metric.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <span
            className={`block h-full rounded-full ${progressFillClasses[metric.status]}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
