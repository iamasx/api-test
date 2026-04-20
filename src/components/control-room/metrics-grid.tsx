import type { Ref } from "react";
import type { MetricCard } from "@/app/control-room/mock-data";

const toneClasses = {
  healthy: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
  warning: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

type MetricsGridProps = {
  activeMetricIds: string[];
  isSpotlighted: boolean;
  metrics: MetricCard[];
  sectionRef?: Ref<HTMLElement>;
};

export function MetricsGrid({
  activeMetricIds,
  isSpotlighted,
  metrics,
  sectionRef,
}: MetricsGridProps) {
  return (
    <section
      aria-label="Metrics grid"
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
            Metrics Grid
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Eight live mock signals
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">
          Signals rotate on manual refresh to simulate a busy operations desk.
          Selected alert drilldowns highlight related metrics without leaving
          the route.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => {
          const isRelated = activeMetricIds.includes(metric.id);

          return (
            <article
              className={`rounded-[1.6rem] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition ${
                isRelated
                  ? "border-cyan-300/35 bg-cyan-400/[0.08]"
                  : "border-white/8 bg-white/[0.04]"
              }`}
              key={metric.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em] ${toneClasses[metric.state]}`}
                >
                  {metric.state}
                </div>
                {isRelated ? (
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                    drilldown signal
                  </span>
                ) : null}
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
          );
        })}
      </div>
    </section>
  );
}
