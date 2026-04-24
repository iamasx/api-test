import type { AssignmentEntry } from "../_data/intake-desk-data";
import styles from "../intake-desk.module.css";

const statusLabels: Record<AssignmentEntry["status"], string> = {
  unassigned: "Unassigned",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusBadgeStyles: Record<AssignmentEntry["status"], string> = {
  unassigned: "border-slate-300/20 bg-slate-300/10 text-slate-50",
  "in-progress": "border-amber-300/20 bg-amber-300/10 text-amber-50",
  completed: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
};

type AssignmentPanelProps = {
  entries: AssignmentEntry[];
};

export function AssignmentPanel({ entries }: AssignmentPanelProps) {
  return (
    <section aria-label="Assignment summary" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Assignments
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Assignment summary
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Current assignment status for triaged requests. Track who owns each
          item and its progress toward completion.
        </p>
      </div>

      <div
        className={`${styles.assignmentPanel} rounded-[1.5rem] border border-white/10 p-5`}
      >
        <div className="space-y-3" role="list" aria-label="Assignment entries">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className={`${styles.assignmentRow} rounded-2xl border border-white/8 px-5 py-4`}
              role="listitem"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    {entry.requestTitle}
                  </p>
                  <p className="text-xs text-slate-400">{entry.assignee}</p>
                </div>
                <span
                  className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusBadgeStyles[entry.status]}`}
                >
                  {statusLabels[entry.status]}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Due: {entry.dueDate}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
