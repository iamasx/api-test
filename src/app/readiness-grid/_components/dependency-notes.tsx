import type { DependencyNote } from "../_data/readiness-grid-data";
import styles from "../readiness-grid.module.css";

const statusLabels: Record<DependencyNote["status"], string> = {
  resolved: "Resolved",
  pending: "Pending",
  "at-risk": "At risk",
};

const statusBadgeStyles: Record<DependencyNote["status"], string> = {
  resolved: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  pending: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  "at-risk": "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

type DependencyNotesProps = {
  notes: DependencyNote[];
};

export function DependencyNotes({ notes }: DependencyNotesProps) {
  return (
    <section aria-label="Dependency notes" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Dependencies
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Cross-workstream dependencies
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Key dependency links between workstreams. Each note captures the
          relationship and current resolution status.
        </p>
      </div>

      <div className="space-y-4" role="list" aria-label="Dependency notes list">
        {notes.map((dep) => (
          <article
            key={dep.id}
            className={`${styles.depCard} rounded-[1.5rem] border border-white/10 p-5`}
            role="listitem"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  {dep.source} &rarr; {dep.target}
                </p>
              </div>
              <span
                className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusBadgeStyles[dep.status]}`}
              >
                {statusLabels[dep.status]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{dep.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
