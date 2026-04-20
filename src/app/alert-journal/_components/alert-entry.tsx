import Link from "next/link";

import type { AlertJournalEntry as AlertJournalEntryRecord } from "../_lib/alert-journal-data";

type AlertEntryProps = {
  alert: AlertJournalEntryRecord;
  isSelected?: boolean;
};

const severityClassNames = {
  Critical: "border-rose-300 bg-rose-50 text-rose-800",
  High: "border-amber-300 bg-amber-50 text-amber-800",
  Moderate: "border-sky-300 bg-sky-50 text-sky-800",
  Low: "border-emerald-300 bg-emerald-50 text-emerald-800",
} satisfies Record<AlertJournalEntryRecord["severity"], string>;

const resolutionClassNames = {
  Resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Monitoring: "border-sky-200 bg-sky-50 text-sky-800",
  "Mitigation active": "border-amber-200 bg-amber-50 text-amber-800",
  "Follow-up queued": "border-slate-200 bg-slate-100 text-slate-700",
} satisfies Record<AlertJournalEntryRecord["resolution"]["status"], string>;

export function AlertEntry({ alert, isSelected = false }: AlertEntryProps) {
  return (
    <li role="listitem">
      <Link
        href={`/alert-journal?alert=${alert.id}`}
        aria-current={isSelected ? "page" : undefined}
        aria-label={
          isSelected
            ? `Viewing resolution for ${alert.title}`
            : `Open resolution for ${alert.title}`
        }
        className={`block rounded-[1.5rem] border px-5 py-5 transition ${
          isSelected
            ? "border-slate-950 bg-slate-950 text-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
            : "border-slate-200/80 bg-white/92 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                isSelected
                  ? "border-white/20 bg-white/10 text-white"
                  : severityClassNames[alert.severity]
              }`}
            >
              {alert.severity}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                isSelected
                  ? "border-white/16 bg-white/8 text-white/78"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              {alert.service}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                isSelected
                  ? "border-white/16 bg-white/8 text-white/78"
                  : resolutionClassNames[alert.resolution.status]
              }`}
            >
              {alert.resolution.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {alert.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isSelected ? "text-white/72" : "text-slate-600"
                  }`}
                >
                  {alert.summary}
                </p>
              </div>
              <div
                className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                  isSelected
                    ? "border-white/14 bg-white/8 text-white/72"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <p className="font-semibold">{alert.occurredLabel}</p>
                <p>{alert.durationLabel}</p>
              </div>
            </div>

            <p
              className={`text-sm leading-6 ${
                isSelected ? "text-white/76" : "text-slate-700"
              }`}
            >
              {alert.impact}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)]">
            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                  isSelected ? "text-white/60" : "text-slate-500"
                }`}
              >
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {alert.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isSelected
                        ? "bg-white/10 text-white/84"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                  isSelected ? "text-white/60" : "text-slate-500"
                }`}
              >
                Responders
              </p>
              <p
                className={`mt-3 text-sm leading-6 ${
                  isSelected ? "text-white/78" : "text-slate-600"
                }`}
              >
                {alert.responders.join(" · ")}
              </p>
              <p
                className={`mt-2 text-sm leading-6 ${
                  isSelected ? "text-white/58" : "text-slate-500"
                }`}
              >
                {alert.environment}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
