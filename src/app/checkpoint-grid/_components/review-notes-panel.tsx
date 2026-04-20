import type {
  CheckpointCadenceItem,
  ReviewNote,
} from "../_data/checkpoint-grid-data";

type ReviewNotesPanelProps = {
  cadence: CheckpointCadenceItem[];
  notes: ReviewNote[];
};

const toneClassNames = {
  steady: {
    accent: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  watch: {
    accent: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
  },
  risk: {
    accent: "bg-rose-500",
    badge: "border-rose-200 bg-rose-50 text-rose-700",
  },
};

export function ReviewNotesPanel({ cadence, notes }: ReviewNotesPanelProps) {
  return (
    <aside
      aria-labelledby="recent-review-notes"
      className="rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-7"
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

        <div className="grid gap-4" role="list" aria-label="Review cadence">
          {cadence.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.3rem] border border-slate-200 bg-slate-50 px-4 py-4"
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

          <div className="grid gap-4" role="list" aria-label="Review notes">
            {notes.map((note) => (
              <article
                key={note.id}
                className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5"
                role="listitem"
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-1.5 rounded-full ${toneClassNames[note.tone].accent}`}
                />
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
                    className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap ${toneClassNames[note.tone].badge}`}
                  >
                    {note.outcome}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-800">{note.loggedAt}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{note.summary}</p>

                <div className="my-5 h-px w-full bg-gradient-to-r from-slate-300/70 to-slate-300/10" />

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
