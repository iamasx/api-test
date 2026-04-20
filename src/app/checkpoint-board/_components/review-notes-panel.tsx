import type {
  ReviewCadenceItem,
  ReviewNote,
} from "../_data/checkpoint-board-data";

type ReviewNotesPanelProps = {
  cadence: ReviewCadenceItem[];
  notes: ReviewNote[];
};

const toneBadgeClasses = {
  steady: "border-emerald-200 bg-emerald-50 text-emerald-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
  risk: "border-rose-200 bg-rose-50 text-rose-800",
};

export function ReviewNotesPanel({ cadence, notes }: ReviewNotesPanelProps) {
  return (
    <aside
      aria-labelledby="recent-review-notes"
      className="rounded-[1.85rem] border border-slate-200 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-7"
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

        <div aria-label="Review cadence" className="grid gap-3" role="list">
          {cadence.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
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

          <div aria-label="Review notes" className="grid gap-4" role="list">
            {notes.map((note) => (
              <article
                key={note.id}
                className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4"
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
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneBadgeClasses[note.tone]}`}
                  >
                    {note.outcome}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-800">{note.loggedAt}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{note.summary}</p>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
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
