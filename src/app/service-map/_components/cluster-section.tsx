import type { ServiceMapClusterView } from "../_data/service-map-data";

type ClusterSectionProps = {
  cluster: ServiceMapClusterView;
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
};

const healthBadgeClasses = {
  healthy: "border-emerald-300/50 bg-emerald-100 text-emerald-900",
  observing: "border-sky-300/50 bg-sky-100 text-sky-900",
  degraded: "border-amber-300/60 bg-amber-100 text-amber-950",
  critical: "border-rose-300/60 bg-rose-100 text-rose-950",
};

export function ClusterSection({
  cluster,
  selectedServiceId,
  onSelectService,
}: ClusterSectionProps) {
  return (
    <section
      aria-labelledby={`${cluster.id}-heading`}
      className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.45)]"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {cluster.region}
          </p>
          <h2
            id={`${cluster.id}-heading`}
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {cluster.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{cluster.summary}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div
            className={`rounded-[1.25rem] border px-4 py-3 ${healthBadgeClasses[cluster.status]}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
              Cluster health
            </p>
            <p className="mt-2 text-lg font-semibold capitalize">{cluster.status}</p>
            <p className="mt-2 text-sm leading-6">{cluster.focusArea}</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Coverage window
            </p>
            <p className="mt-2 font-medium text-slate-900">{cluster.coverageWindow}</p>
            <p className="mt-2 text-slate-600">{cluster.changeBudget}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Owner
          </p>
          <p className="mt-2 text-base font-semibold text-slate-950">{cluster.owner}</p>
          <p className="mt-2 text-sm text-slate-600">{cluster.mission}</p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Healthy
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {cluster.healthCounts.healthy}
          </p>
          <p className="text-sm text-slate-600">services fully within target</p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Watch
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {cluster.healthCounts.observing}
          </p>
          <p className="text-sm text-slate-600">services with visible drift</p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Pressure
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {cluster.healthCounts.degraded + cluster.healthCounts.critical}
          </p>
          <p className="text-sm text-slate-600">services needing intervention</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {cluster.nodes.map((node) => {
          const selected = node.id === selectedServiceId;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelectService(node.id)}
              className={`rounded-[1.6rem] border px-5 py-5 text-left transition ${
                selected
                  ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.92)]"
                  : "border-slate-200 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-current/60">
                    {node.serviceType}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    {node.name}
                  </h3>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    selected
                      ? "border-white/15 bg-white/10 text-white"
                      : healthBadgeClasses[node.health]
                  }`}
                >
                  {node.health}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-current/74">{node.summary}</p>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-current/10 bg-current/5 px-4 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/56">
                    Traffic
                  </dt>
                  <dd className="mt-2 text-base font-semibold">{node.requestRate}</dd>
                </div>
                <div className="rounded-2xl border border-current/10 bg-current/5 px-4 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/56">
                    P95 latency
                  </dt>
                  <dd className="mt-2 text-base font-semibold">{node.p95Latency}</dd>
                </div>
                <div className="rounded-2xl border border-current/10 bg-current/5 px-4 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/56">
                    Error rate
                  </dt>
                  <dd className="mt-2 text-base font-semibold">{node.errorRate}</dd>
                </div>
                <div className="rounded-2xl border border-current/10 bg-current/5 px-4 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/56">
                    Saturation
                  </dt>
                  <dd className="mt-2 text-base font-semibold">{node.saturation}</dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>
    </section>
  );
}
