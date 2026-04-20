import type {
  AlertJournalDay,
  AlertJournalEntry,
} from "../_lib/alert-journal-data";
import { AlertEntry } from "./alert-entry";

type AlertDayGroupProps = {
  day: AlertJournalDay;
  alerts: AlertJournalEntry[];
  selectedAlertId?: string;
};

export function AlertDayGroup({
  day,
  alerts,
  selectedAlertId,
}: AlertDayGroupProps) {
  return (
    <section
      aria-labelledby={`alert-day-${day.id}`}
      className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
            {day.shiftLabel}
          </p>
          <h2
            id={`alert-day-${day.id}`}
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            {day.label}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          {day.summary}
        </p>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white/78 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-900">
            {alerts.length} alerts recorded
          </p>
          <p className="text-sm leading-6 text-slate-500">
            Severity, tags, and active resolution posture stay visible on every
            entry card.
          </p>
        </div>

        <ul aria-label={`${day.label} alerts`} className="mt-5 grid gap-4">
          {alerts.map((alert) => (
            <AlertEntry
              key={alert.id}
              alert={alert}
              isSelected={alert.id === selectedAlertId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
