import type { MetricCard } from "@/app/control-room/mock-data";

const toneClasses = {
  healthy: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

type MetricsGridProps = {
  metrics: MetricCard[];
};

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Metrics Grid
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Eight live mock signals
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">
          Signals rotate on manual refresh to simulate a busy operations desk
          without leaving the route.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            key={metric.id}
          >
            <div
              className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em] ${toneClasses[metric.state]}`}
            >
              {metric.state}
            </div>
            <h3 className="mt-4 text-sm uppercase tracking-[0.16em] text-slate-300">
              {metric.label}
            </h3>
            <p className="mt-3 text-3xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-cyan-100">{metric.delta}</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {metric.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
