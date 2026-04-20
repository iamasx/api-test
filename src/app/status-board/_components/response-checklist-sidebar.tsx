import type {
  ResponseChecklistItem,
  ResponseSidebarNote,
} from "../_data/status-board-data";

type ResponseChecklistSidebarProps = {
  items: ResponseChecklistItem[];
  notes: ResponseSidebarNote[];
};

export function ResponseChecklistSidebar({
  items,
  notes,
}: ResponseChecklistSidebarProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const openCount = items.length - completedCount;

  return (
    <aside
      aria-labelledby="response-checklist-heading"
      className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:p-7"
    >
      <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Response sidebar
        </p>
        <h2
          id="response-checklist-heading"
          className="mt-4 text-3xl font-semibold tracking-tight"
        >
          Checklist before the next regional handoff.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          The sidebar turns active issues into a short operational checklist so
          the handoff stays concrete and easy to verify.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[1.15rem] bg-white/8 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Open actions
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{openCount}</p>
          </div>
          <div className="rounded-[1.15rem] bg-white/8 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Completed
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {completedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Active checklist
        </p>
        <div aria-label="Response checklist" className="mt-4 space-y-3" role="list">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4"
              role="listitem"
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className={`mt-1 h-5 w-5 rounded-full border ${
                    item.completed
                      ? "border-emerald-300 bg-emerald-300"
                      : "border-white/35 bg-transparent"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">{item.owner}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {item.dueBy}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Handoff notes
        </p>
        <dl className="mt-4 space-y-4">
          {notes.map((note) => (
            <div key={note.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {note.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-white">{note.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
