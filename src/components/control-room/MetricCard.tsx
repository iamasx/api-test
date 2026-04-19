import type { MetricSnapshot } from "./control-room-data";

const toneStyles = {
  good: "border-emerald-400/20 bg-emerald-400/8",
  watch: "border-amber-400/20 bg-amber-400/8",
  hot: "border-rose-400/20 bg-rose-400/8",
};

const toneBadgeStyles = {
  good: "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20",
  watch: "bg-amber-400/15 text-amber-100 ring-1 ring-amber-300/20",
  hot: "bg-rose-400/15 text-rose-100 ring-1 ring-rose-300/20",
};

type MetricCardProps = {
  metric: MetricSnapshot;
};

export function MetricCard({ metric }: Readonly<MetricCardProps>) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] ${toneStyles[metric.tone]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-200">{metric.label}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">
            {metric.supportLabel}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${toneBadgeStyles[metric.tone]}`}
        >
          {metric.stateLabel}
        </span>
      </div>

      <p className="mt-8 text-4xl font-semibold tracking-tight text-white">
        {metric.displayValue}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{metric.caption}</p>

      <div className="mt-5 rounded-xl border border-white/8 bg-slate-950/55 px-3 py-2 text-sm text-slate-200">
        {metric.deltaLabel}
      </div>
    </article>
  );
}
