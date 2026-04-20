import type { RegionalHealthGroup } from "../_data/status-board-data";
import { ServiceHealthCard } from "./service-health-card";
import { healthStateLabels, summaryStateStyles } from "./state-styles";

type RegionalHealthGroupProps = {
  group: RegionalHealthGroup;
};

export function RegionalHealthGroup({ group }: RegionalHealthGroupProps) {
  const headingId = `${group.id}-heading`;
  const styles = summaryStateStyles[group.status];

  return (
    <section
      aria-labelledby={headingId}
      data-state={group.status}
      className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {group.coverageWindow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2
              id={headingId}
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              {group.name}
            </h2>
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles.badge}`}
            >
              {healthStateLabels[group.status]}
            </span>
          </div>
          <p className="mt-4 text-base leading-7 text-slate-700">{group.summary}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[21rem]">
          <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Services
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {group.serviceCount}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-900">
              Warnings
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-amber-950">
              {group.warningCount}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-rose-200 bg-rose-50/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-900">
              Degraded
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-rose-950">
              {group.degradedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Regional services
          </p>
          <p className="text-sm text-slate-600">
            {group.services.length} services under review
          </p>
        </div>
        <ul
          aria-label={`${group.name} services`}
          className="mt-4 grid gap-4 xl:grid-cols-2"
          role="list"
        >
          {group.services.map((service) => (
            <ServiceHealthCard key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
