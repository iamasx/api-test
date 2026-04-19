import type { AlertItem } from "./control-room-data";

const severityStyles = {
  info: "border-sky-400/20 bg-sky-400/8",
  warning: "border-amber-400/20 bg-amber-400/8",
  critical: "border-rose-400/25 bg-rose-400/10",
};

const severityBadgeStyles = {
  info: "bg-sky-400/15 text-sky-100",
  warning: "bg-amber-400/15 text-amber-100",
  critical: "bg-rose-400/15 text-rose-100",
};

type AlertListProps = {
  alerts: AlertItem[];
};

export function AlertList({ alerts }: Readonly<AlertListProps>) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 shadow-[0_22px_80px_rgba(2,6,23,0.34)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            Alert Rail
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Live rehearsal alerts</h2>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
          {alerts.length} active
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`rounded-2xl border p-4 ${severityStyles[alert.severity]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${severityBadgeStyles[alert.severity]}`}
                >
                  {alert.severity}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">{alert.title}</h3>
              </div>
              <span className="text-xs text-slate-400">{alert.raisedAtLabel}</span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-200">{alert.message}</p>
            <dl className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">Service</dt>
                <dd className="mt-1">{alert.service}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">Owner</dt>
                <dd className="mt-1">{alert.owner}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
