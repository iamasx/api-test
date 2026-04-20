import type { ServiceHealthItem } from "../_data/status-board-data";
import { healthStateLabels, serviceStateStyles } from "./state-styles";

type ServiceHealthCardProps = {
  service: ServiceHealthItem;
};

export function ServiceHealthCard({ service }: ServiceHealthCardProps) {
  const styles = serviceStateStyles[service.status];

  return (
    <li
      data-state={service.status}
      className={`rounded-[1.5rem] border p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] ${styles.panel}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {service.category}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {service.name}
          </h3>
          <p className="text-sm text-slate-600">{service.owner}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${styles.accent}`} />
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles.badge}`}
          >
            {healthStateLabels[service.status]}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">{service.summary}</p>

      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Uptime
          </dt>
          <dd className="mt-2 text-base font-semibold text-slate-950">
            {service.uptime}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Latency
          </dt>
          <dd className="mt-2 text-base font-semibold text-slate-950">
            {service.latency}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Incidents
          </dt>
          <dd className="mt-2 text-base font-semibold text-slate-950">
            {service.incidents}
          </dd>
        </div>
      </dl>

      <p className="mt-5 rounded-[1rem] bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100">
        {service.nextUpdate}
      </p>
    </li>
  );
}
