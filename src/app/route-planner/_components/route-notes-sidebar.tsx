import {
  notePriorityLabels,
  notePriorityStyles,
  type RouteNote,
} from "../_data/route-planner-data";
import styles from "../route-planner.module.css";

type RouteNotesSidebarProps = {
  notes: RouteNote[];
};

export function RouteNotesSidebar({ notes }: RouteNotesSidebarProps) {
  const highCount = notes.filter((note) => note.priority === "high").length;

  return (
    <aside
      aria-label="Route notes"
      className={`${styles.sidebarPanel} rounded-[1.9rem] border border-white/10 p-6`}
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Notes
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Route notes
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Shift-level observations and context from the planning team, pinned
            to the route so nothing falls through a handoff.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Total notes
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {notes.length}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              High priority
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {highCount}
            </p>
          </div>
        </div>

        <ul aria-label="Route notes list" className="space-y-3">
          {notes.map((note) => (
            <li key={note.id}>
              <article
                className={`${styles.decisionCard} rounded-[1.4rem] border border-white/10 px-4 py-4`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-52 space-y-1">
                    <p className="text-sm font-semibold text-white">
                      {note.title}
                    </p>
                    <p className="text-sm text-slate-300">{note.author}</p>
                  </div>
                  <span
                    className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${notePriorityStyles[note.priority]}`}
                  >
                    {notePriorityLabels[note.priority]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {note.body}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {note.timestamp}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
