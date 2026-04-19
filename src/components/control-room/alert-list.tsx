import type { AlertItem } from "@/app/control-room/mock-data";

const severityClasses = {
  info: "border-sky-300/20 bg-sky-400/10 text-sky-100",
  warning: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

type AlertListProps = {
  alerts: AlertItem[];
};

export function AlertList({ alerts }: AlertListProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Alerts
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Priority queue
          </h2>
        </div>
        <p className="text-sm text-slate-400">{alerts.length} active items</p>
      </div>
      <ol className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <li
            className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4"
            key={alert.id}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${severityClasses[alert.severity]}`}
              >
                {alert.severity}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {alert.ageLabel}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">{alert.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{alert.detail}</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
              <p>
                <span className="text-slate-200">Owner:</span> {alert.owner}
              </p>
              <p>
                <span className="text-slate-200">Impact:</span> {alert.impact}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
