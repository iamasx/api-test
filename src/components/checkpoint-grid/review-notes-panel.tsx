import type { Checkpoint, ReviewNote } from "@/app/checkpoint-grid/mock-data";

type ReviewNotesPanelProps = {
  draftValue: string; hasVisibleCheckpoints: boolean; notes: ReviewNote[];
  onDraftChange: (value: string) => void; onSaveNote: () => void; selectedCheckpoint: Checkpoint | null;
};

export function ReviewNotesPanel({ draftValue, hasVisibleCheckpoints, notes, onDraftChange, onSaveNote, selectedCheckpoint }: ReviewNotesPanelProps) {
  if (!selectedCheckpoint) {
    return (
      <aside className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">Review notes</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">No checkpoint selected</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          {hasVisibleCheckpoints ? "Choose a checkpoint tile to inspect its notes and write a local review update." : "Reset the filters first, then pick a checkpoint tile to reopen the notes panel."}
        </p>
      </aside>
    );
  }
  const noteCount = notes.length;
  const saveDisabled = draftValue.trim().length === 0;
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">Review notes</p>
        <div>
          <h2 className="text-2xl font-semibold text-white">{selectedCheckpoint.title}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {selectedCheckpoint.owner} owns this checkpoint in the {selectedCheckpoint.band} lane.
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-white">Notes in lane</p>
          <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">{noteCount} saved</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">Local notes stay in this route session and are not shared with other pages.</p>
      </div>
      <div className="mt-5 space-y-3">
        {noteCount === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.03] px-4 py-6 text-sm leading-6 text-slate-300">No local review notes exist for this checkpoint yet. Add the first one below to capture the next handoff detail.</div>
        ) : (
          notes.map((note) => (
            <article className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4" key={note.id}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="font-medium text-white">{note.author}</p>
                <p className="text-slate-400">{note.timestamp}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{note.body}</p>
            </article>
          ))
        )}
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <label className="text-xs uppercase tracking-[0.24em] text-slate-400" htmlFor="checkpoint-note">Add local note</label>
        <textarea
          className="mt-3 min-h-32 w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/45"
          id="checkpoint-note"
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Capture a review note, risk, or owner reminder for this checkpoint."
          value={draftValue}
        />
        <button className="mt-4 rounded-full bg-sky-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300" disabled={saveDisabled} onClick={onSaveNote} type="button">
          Save local note
        </button>
      </div>
    </aside>
  );
}
