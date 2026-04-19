import type { HandoffStatus, PlannerShiftId } from "@/app/shift-planner/shift-planner-data";

type ShiftFilter = PlannerShiftId | "all";

type EditableNote = {
  id: string;
  title: string;
  shiftId: PlannerShiftId;
  ownerName: string;
  status: HandoffStatus;
  body: string;
};

type HandoffNotesPanelProps = {
  notes: EditableNote[];
  onBodyChange: (noteId: string, body: string) => void;
  onToggleStatus: (noteId: string) => void;
  selectedDayLabel: string;
  selectedShiftId: ShiftFilter;
};

const shiftLabels: Record<PlannerShiftId, string> = {
  dawn: "Dawn",
  swing: "Swing",
  night: "Night",
};

export function HandoffNotesPanel({
  notes,
  onBodyChange,
  onToggleStatus,
  selectedDayLabel,
  selectedShiftId,
}: HandoffNotesPanelProps) {
  const readyCount = notes.filter((note) => note.status === "ready").length;

  return (
    <aside className="rounded-[1.9rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_20px_60px_rgba(2,8,23,0.28)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Hand-off Notes</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Local notes for {selectedDayLabel}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Drafts stay in local state only. Toggle readiness when a note is fit for the next shift.
          </p>
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Readiness</p>
          <p className="mt-2 text-2xl font-semibold text-white">{readyCount}/{notes.length}</p>
        </div>
      </div>
      {notes.length > 0 ? (
        <div className="mt-5 space-y-4">
          {notes.map((note) => (
            <article className="rounded-[1.55rem] border border-white/10 bg-white/5 p-4" key={note.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-200/70">{shiftLabels[note.shiftId]}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{note.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">Owned by {note.ownerName}</p>
                </div>
                <button
                  className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    note.status === "ready"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                      : "border-amber-300/30 bg-amber-300/10 text-amber-50"
                  }`}
                  onClick={() => onToggleStatus(note.id)}
                  type="button"
                >
                  {note.status === "ready" ? "Ready to hand off" : "Needs review"}
                </button>
              </div>
              <textarea
                className="mt-4 min-h-28 w-full rounded-[1.2rem] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-300/50"
                onChange={(event) => onBodyChange(note.id, event.target.value)}
                placeholder="Leave a local hand-off note"
                value={note.body}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                Draft saved in memory for this route only.
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.55rem] border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">No notes</p>
          <h3 className="mt-3 text-xl font-semibold text-white">No hand-off notes match this shift filter.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {selectedShiftId === "all"
              ? "Switch to another day to review seeded notes."
              : "Change the shift filter back to all shifts to reopen the local note queue."}
          </p>
        </div>
      )}
    </aside>
  );
}
