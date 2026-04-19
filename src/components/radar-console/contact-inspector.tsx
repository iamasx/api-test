import type { ContactCard, InspectorDetail } from "@/app/radar-console/mock-data";

type ContactInspectorProps = {
  activeAlertIds: string[];
  activeNoteIds: string[];
  contact: ContactCard | null;
  detail: InspectorDetail | null;
  onClearSelection: () => void;
  onToggleAlert: (alertId: string) => void;
  onToggleNote: (noteId: string) => void;
};

export function ContactInspector({
  activeAlertIds,
  activeNoteIds,
  contact,
  detail,
  onClearSelection,
  onToggleAlert,
  onToggleNote,
}: ContactInspectorProps) {
  return (
    <aside
      aria-label="Contact inspector"
      className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/78 p-5 text-slate-100 backdrop-blur"
    >
      {!contact || !detail ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-white/15 bg-black/15 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Inspector idle</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">No track selected</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Choose a contact card to open the local inspector, then use the chips below to stage alert and note changes for this session.</p>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Inspector</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{contact.callsign}</h2>
              <p className="mt-1 text-sm text-slate-300">{detail.mission}</p>
            </div>
            <button
              type="button"
              onClick={onClearSelection}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-200/30 hover:text-white"
            >
              Clear
            </button>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-black/15 p-4">
            <p className="text-sm leading-6 text-slate-300">{detail.snapshot}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 px-3 py-3"><span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Origin</span>{detail.origin}</div>
              <div className="rounded-2xl bg-white/5 px-3 py-3"><span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Confidence</span>{detail.confidence}</div>
              <div className="rounded-2xl bg-white/5 px-3 py-3"><span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Handoff</span>{detail.handoffWindow}</div>
            </div>
          </div>

          <section className="mt-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Local alert toggles</p>
            <div className="mt-3 space-y-3">
              {detail.alertToggles.map((toggle) => {
                const isActive = activeAlertIds.includes(toggle.id);

                return (
                  <button
                    key={toggle.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${isActive ? "Disable" : "Enable"} ${toggle.label}`}
                    onClick={() => onToggleAlert(toggle.id)}
                    className={`w-full rounded-[1.35rem] border px-4 py-3 text-left transition ${isActive ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/5 text-slate-100 hover:border-cyan-200/25"}`}
                  >
                    <span className="block text-sm font-semibold text-white">{toggle.label}</span>
                    <span className="mt-1 block text-sm text-current/80">{toggle.description}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Note chips</p>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Local only</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {detail.noteChips.map((note) => {
                const isActive = activeNoteIds.includes(note);

                return (
                  <button
                    key={note}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Toggle note ${note}`}
                    onClick={() => onToggleNote(note)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition ${isActive ? "border-amber-300/35 bg-amber-300/12 text-amber-100" : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-200/25 hover:text-white"}`}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
