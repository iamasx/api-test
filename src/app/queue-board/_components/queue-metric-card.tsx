import type { QueueBoardMetric } from "../_data/queue-board-data";

const metricToneClasses = {
  neutral: "border-slate-200 bg-white text-slate-950",
  alert: "border-amber-200 bg-amber-50/80 text-amber-950",
  critical: "border-rose-200 bg-rose-50/80 text-rose-950",
} satisfies Record<QueueBoardMetric["tone"], string>;

export function QueueMetricCard({ metric }: { metric: QueueBoardMetric }) {
  return (
    <article
      role="listitem"
      className={`flex h-full flex-col gap-4 rounded-[1.5rem] border p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${metricToneClasses[metric.tone]}`}
    >
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-current/65">
          {metric.label}
        </p>
        <p className="text-4xl font-semibold tracking-tight">{metric.value}</p>
      </div>

      <p className="text-sm leading-6 text-current/75">{metric.detail}</p>
    </article>
  );
}
