import type { PlanningNote } from "../_data/capacity-planner-data";
import styles from "../capacity-planner.module.css";

const priorityLabels: Record<PlanningNote["priority"], string> = {
  info: "Info",
  action: "Action",
  warning: "Warning",
};

const priorityBadgeStyles: Record<PlanningNote["priority"], string> = {
  info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  action: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  warning: "border-amber-300/20 bg-amber-300/10 text-amber-50",
};

type PlanningNotesProps = {
  notes: PlanningNote[];
};

export function PlanningNotes({ notes }: PlanningNotesProps) {
  return (
    <section aria-label="Planning notes" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Review notes
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Planning notes from the team
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Notes, action items, and warnings captured during the current planning
          cycle. Each note is tied to a team member and timestamped.
        </p>
      </div>

      <div className="space-y-4" role="list" aria-label="Planning notes list">
        {notes.map((note) => (
          <article
            key={note.id}
            className={`${styles.noteCard} rounded-[1.5rem] border border-white/10 p-5`}
            role="listitem"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">{note.author}</p>
                <p className="text-xs text-slate-400">{note.timestamp}</p>
              </div>
              <span
                className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${priorityBadgeStyles[note.priority]}`}
              >
                {priorityLabels[note.priority]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
