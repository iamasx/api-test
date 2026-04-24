import type { DecisionNoteSection } from "../_data/review-console-data";

type DecisionNotesPanelProps = {
  sections: DecisionNoteSection[];
};

const outcomeClassNames = {
  Approved: "bg-teal-100 text-teal-800",
  "Follow-up": "bg-amber-100 text-amber-800",
  Blocked: "bg-rose-100 text-rose-800",
};

export function DecisionNotesPanel({ sections }: DecisionNotesPanelProps) {
  return (
    <aside
      id="decision-notes"
      aria-labelledby="decision-notes-heading"
      className="self-start rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Decision notes
          </p>
          <h2
            id="decision-notes-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Decision notes grouped by outcome
          </h2>
          <p className="text-sm leading-7 text-slate-600">
            Keep settled calls and open follow-up visible in the same rail so
            handoff decisions stay readable during the final review pass.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="rounded-[1.25rem] border border-slate-200 bg-white/75 p-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {section.label}
                  </p>
                  <h3
                    id={`${section.id}-heading`}
                    className="mt-2 text-xl font-semibold tracking-tight text-slate-950"
                  >
                    {section.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500">{section.notes.length} notes</p>
              </div>

              <div className="mt-4 grid gap-3" role="list" aria-label={section.title}>
                {section.notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-[1.1rem] border border-slate-200 bg-white p-4"
                    role="listitem"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-slate-950">{note.title}</h4>
                        <p className="mt-2 text-sm text-slate-600">
                          {note.author} · {note.loggedAt}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] ${outcomeClassNames[note.outcome]}`}
                      >
                        {note.outcome}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{note.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
}
