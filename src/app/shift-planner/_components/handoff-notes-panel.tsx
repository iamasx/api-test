import type { HandoffNote } from "../_data/shift-planner-data";
import styles from "../shift-planner.module.css";

type HandoffNotesPanelProps = {
  notes: HandoffNote[];
};

const statusClassNames = {
  confirmed: styles.toneConfirmed,
  watch: styles.toneWatch,
  pending: styles.tonePending,
};

const handoffCardToneClassNames = {
  confirmed: styles.handoffConfirmed,
  watch: styles.handoffWatch,
  pending: styles.handoffPending,
};

export function HandoffNotesPanel({ notes }: HandoffNotesPanelProps) {
  const confirmedNotes = notes.filter((note) => note.status === "confirmed").length;
  const watchNotes = notes.filter((note) => note.status === "watch").length;
  const pendingNotes = notes.filter((note) => note.status === "pending").length;

  return (
    <aside
      aria-labelledby="shift-planner-handoffs"
      className={`${styles.panelCard} rounded-[1.8rem] p-6`}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Handoff notes
          </p>
          <h2
            id="shift-planner-handoffs"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Shift handoff notes
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Preserve the staffing decisions that matter most when work moves
            between supervisors, lunch bridges, and the after-hours queue.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className={`${styles.warningStat} rounded-[1.3rem] px-4 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Confirmed
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {confirmedNotes}
            </p>
          </div>
          <div className={`${styles.warningStat} rounded-[1.3rem] px-4 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              On watch
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {watchNotes}
            </p>
          </div>
          <div className={`${styles.warningStat} rounded-[1.3rem] px-4 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Pending
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {pendingNotes}
            </p>
          </div>
        </div>

        <div className="space-y-4" role="list" aria-label="Shift handoff notes">
          {notes.map((note) => (
            <article
              key={note.id}
              className={`${styles.handoffCard} ${handoffCardToneClassNames[note.status]} rounded-[1.45rem] p-5`}
              role="listitem"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {note.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {note.owner} · {note.window}
                  </p>
                </div>

                <span
                  className={`${styles.toneBadge} ${statusClassNames[note.status]}`}
                >
                  {note.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {note.summary}
              </p>

              <div className={`${styles.infoBlock} mt-4 rounded-[1.2rem] px-4 py-4`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Blocking context
                </p>
                <ul
                  className={styles.bulletList}
                  aria-label={`${note.title} blockers`}
                >
                  {note.blockers.map((blocker) => (
                    <li key={blocker} className="text-sm leading-6 text-slate-700">
                      {blocker}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.infoBlock} mt-4 rounded-[1.2rem] px-4 py-4`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Next step
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {note.nextStep}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
