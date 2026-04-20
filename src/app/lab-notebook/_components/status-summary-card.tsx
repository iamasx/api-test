import type { NotebookSummaryMetric } from "../_data/lab-notebook-data";

const toneClasses: Record<NotebookSummaryMetric["tone"], string> = {
  stable: "border-emerald-300/35 bg-emerald-300/14 text-emerald-950",
  watch: "border-amber-300/45 bg-amber-300/18 text-amber-950",
  blocked: "border-rose-300/40 bg-rose-300/16 text-rose-950",
};

export function StatusSummaryCard({
  metric,
}: {
  metric: NotebookSummaryMetric;
}) {
  return (
    <article
      className={`flex h-full flex-col justify-between gap-4 rounded-[1.55rem] border p-5 shadow-[0_14px_50px_rgba(68,42,22,0.08)] backdrop-blur-sm ${toneClasses[metric.tone]}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-75">
        {metric.label}
      </p>
      <p className="text-4xl font-semibold tracking-tight">{metric.value}</p>
      <p className="text-sm leading-7 opacity-80">{metric.detail}</p>
    </article>
  );
}
