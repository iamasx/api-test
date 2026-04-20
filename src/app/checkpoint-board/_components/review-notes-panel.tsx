import type {
  ReviewCadenceItem,
  ReviewNote,
} from "../_data/checkpoint-board-data";
import styles from "../checkpoint-board.module.css";

type ReviewNotesPanelProps = {
  cadence: ReviewCadenceItem[];
  notes: ReviewNote[];
};

const toneBadgeClasses = {
  steady: styles.badgeToneSteady,
  watch: styles.badgeToneWatch,
  risk: styles.badgeToneRisk,
};

const toneCardClasses = {
  steady: styles.noteToneSteady,
  watch: styles.noteToneWatch,
  risk: styles.noteToneRisk,
};

export function ReviewNotesPanel({ cadence, notes }: ReviewNotesPanelProps) {
  return (
    <aside
      aria-labelledby="recent-review-notes"
      className={`${styles.surfaceCard} ${styles.notePanel} p-6 sm:p-7`}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Recent reviews
          </p>
          <h2
            id="recent-review-notes"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Recent review notes
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Keep reviewer context, note outcomes, and explicit next steps visible
            while the board moves through the remaining subtasks.
          </p>
        </div>

        <div aria-label="Review cadence" className={styles.cadenceGrid} role="list">
          {cadence.map((item) => (
            <article
              key={item.id}
              className={styles.cadenceCard}
              role="listitem"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Logged notes
            </p>
            <p className="text-sm text-slate-600">{notes.length} total</p>
          </div>

          <div aria-label="Review notes" className={styles.noteList} role="list">
            {notes.map((note) => (
              <article
                key={note.id}
                className={`${styles.noteCard} ${toneCardClasses[note.tone]}`}
                role="listitem"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      {note.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {note.reviewer} · {note.role}
                    </p>
                  </div>

                  <span
                    className={`${styles.badge} ${toneBadgeClasses[note.tone]}`}
                  >
                    {note.outcome}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-800">{note.loggedAt}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{note.summary}</p>

                <div className={`mt-4 ${styles.nextStepCard}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Next step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{note.nextStep}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
