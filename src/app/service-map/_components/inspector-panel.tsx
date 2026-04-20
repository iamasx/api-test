import type { ServiceMapInspectorView } from "../_data/service-map-data";

type InspectorPanelProps = {
  view: ServiceMapInspectorView;
};

const healthBadgeClasses = {
  healthy: "border-emerald-300/50 bg-emerald-100 text-emerald-950",
  observing: "border-sky-300/50 bg-sky-100 text-sky-950",
  degraded: "border-amber-300/60 bg-amber-100 text-amber-950",
  critical: "border-rose-300/60 bg-rose-100 text-rose-950",
};

const highlightToneClasses = {
  stable: "text-emerald-800",
  watch: "text-sky-800",
  elevated: "text-amber-900",
  severe: "text-rose-900",
};

export function InspectorPanel({ view }: InspectorPanelProps) {
  return (
    <aside
      aria-label="Selected service inspector"
      className="rounded-[2rem] border border-slate-200/80 bg-[rgba(9,19,37,0.96)] p-6 text-white shadow-[0_28px_100px_-48px_rgba(15,23,42,1)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Inspector
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {view.service.name}
          </h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${healthBadgeClasses[view.service.health]}`}
        >
          {view.service.health}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{view.service.summary}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Runtime
          </p>
          <p className="mt-2 text-base font-semibold text-white">{view.service.runtime}</p>
          <p className="mt-2 text-sm text-slate-300">{view.service.endpoint}</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Ownership
          </p>
          <p className="mt-2 text-base font-semibold text-white">{view.service.owner}</p>
          <p className="mt-2 text-sm text-slate-300">On-call: {view.service.onCall}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cluster
          </p>
          <p className="mt-2 text-base font-semibold text-white">{view.cluster.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{view.cluster.focusArea}</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Signals
          </p>
          <p className="mt-2 text-base font-semibold text-white">{view.service.requestRate}</p>
          <p className="mt-2 text-sm text-slate-300">
            {view.service.p95Latency} p95 / {view.service.errorRate} errors /{" "}
            {view.service.saturation} saturation
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Dependency posture
        </p>
        <div className="mt-3 space-y-3">
          {view.upstreamHighlights.length > 0 ? (
            view.upstreamHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">
                    {highlight.dependencyName}
                  </p>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${highlightToneClasses[highlight.status]}`}
                  >
                    {highlight.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.note}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[1.25rem] border border-dashed border-white/14 px-4 py-4 text-sm leading-6 text-slate-300">
              No active dependency highlights are attached to this service right now.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Notes and tags
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">{view.service.note}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {view.service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Downstream consumers
        </p>
        <div className="mt-3 space-y-3">
          {view.downstreamServices.length > 0 ? (
            view.downstreamServices.map((service) => (
              <div
                key={service.id}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-sm font-semibold text-white">{service.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{service.summary}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[1.25rem] border border-dashed border-white/14 px-4 py-4 text-sm leading-6 text-slate-300">
              No route-local downstream services are directly mapped from this node.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
