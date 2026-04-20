import type {
  CheckpointCadenceItem,
  ReviewNote,
} from "../_data/checkpoint-grid-data";
import styles from "../checkpoint-grid.module.css";

type ReviewNotesPanelProps = {
  cadence: CheckpointCadenceItem[];
  notes: ReviewNote[];
};

const toneClassNames = {
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Recent reviews
          </p>
          <h2
            id="recent-review-notes"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Recent review notes
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Keep the latest design, delivery, and QA feedback visible while the
            grid is still moving through the final route polish.
          </p>
        </div>

        <div className={styles.cadenceGrid} role="list" aria-label="Review cadence">
          {cadence.map((item) => (
            <article key={item.id} className={styles.cadenceCard} role="listitem">
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

          <div className={styles.noteList} role="list" aria-label="Review notes">
            {notes.map((note) => (
              <article
                key={note.id}
                className={`${styles.noteCard} ${toneClassNames[note.tone]}`}
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

                  <span className={`${styles.badge} ${toneClassNames[note.tone]}`}>
                    {note.outcome}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-800">{note.loggedAt}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{note.summary}</p>

                <div className={styles.divider} />

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Next step
                  </p>
                  <p className="text-sm leading-6 text-slate-700">{note.action}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
