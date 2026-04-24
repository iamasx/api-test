import type { ComparisonNote } from "../_data/priority-lab-data";
import styles from "../priority-lab.module.css";

const verdictLabels: Record<ComparisonNote["verdict"], string> = {
  promote: "Promote",
  hold: "Hold",
  demote: "Demote",
};

const verdictBadgeStyles: Record<ComparisonNote["verdict"], string> = {
  promote: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  hold: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  demote: "border-amber-300/20 bg-amber-300/10 text-amber-50",
};

type ComparisonNotesProps = {
  notes: ComparisonNote[];
};

export function ComparisonNotes({ notes }: ComparisonNotesProps) {
  return (
    <section aria-label="Comparison notes" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Trade-off log
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Comparison notes from the team
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Recorded rationale from prioritization sessions. Each note captures
          why an item was promoted, held, or demoted relative to its neighbors.
        </p>
      </div>

      <div className="space-y-4" role="list" aria-label="Comparison notes list">
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
                className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${verdictBadgeStyles[note.verdict]}`}
              >
                {verdictLabels[note.verdict]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
