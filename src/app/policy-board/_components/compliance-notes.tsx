import type { ComplianceNote } from "../_data/policy-board-data";
import styles from "../policy-board.module.css";

const priorityLabels: Record<ComplianceNote["priority"], string> = {
  info: "Info",
  action: "Action",
  warning: "Warning",
};

const priorityBadgeStyles: Record<ComplianceNote["priority"], string> = {
  info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  action: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  warning: "border-amber-300/20 bg-amber-300/10 text-amber-50",
};

type ComplianceNotesProps = {
  notes: ComplianceNote[];
};

export function ComplianceNotes({ notes }: ComplianceNotesProps) {
  return (
    <section aria-label="Compliance notes" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Audit trail
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Compliance notes from reviewers
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Notes, action items, and warnings captured during the current review
          cycle. Each note is tied to a reviewer and timestamped.
        </p>
      </div>

      <div className="space-y-4" role="list" aria-label="Compliance notes list">
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
