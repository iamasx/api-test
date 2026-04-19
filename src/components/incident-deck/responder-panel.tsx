import type {
  IncidentRecord,
  ResponderRecord,
} from "@/app/incident-deck/mock-data";

type ResponderPanelProps = {
  incident: IncidentRecord | null;
  responders: ResponderRecord[];
  selectedResponder: ResponderRecord | null;
  onSelectResponder: (responderId: string) => void;
  onClearResponder: () => void;
};

export function ResponderPanel({
  incident,
  responders,
  selectedResponder,
  onSelectResponder,
  onClearResponder,
}: ResponderPanelProps) {
  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="border-b border-white/10 pb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
          Responder detail
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          {incident ? "Bridge roster" : "Waiting for incident"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {incident
            ? "Choose a responder to inspect ownership, shift status, and recovery notes."
            : "No responder roster is available until an incident lane is visible."}
        </p>
      </div>

      {incident ? (
        <div className="mt-4 space-y-4">
          <div className="grid gap-2">
            {responders.map((responder) => (
              <button
                className={`rounded-[1.25rem] border p-3 text-left transition ${
                  selectedResponder?.id === responder.id
                    ? "border-sky-300/40 bg-sky-400/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
                key={responder.id}
                onClick={() => onSelectResponder(responder.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{responder.name}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {responder.role} · {responder.team}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300">
                    {responder.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {selectedResponder ? (
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Focused responder
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {selectedResponder.name}
                  </h3>
                </div>
                <button
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                  onClick={onClearResponder}
                  type="button"
                >
                  Clear focus
                </button>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Zone
                  </p>
                  <p className="mt-2 font-medium text-white">
                    {selectedResponder.zone}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Assigned lane
                  </p>
                  <p className="mt-2 font-medium text-white">{incident.code}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                {selectedResponder.note}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedResponder.specialties.map((specialty) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                    key={specialty}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-slate-600 bg-slate-950/50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                No responder selected
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Pick a responder to inspect their current recovery lane.
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The selection stays local to this route and also narrows the
                response timeline to that person&apos;s handoff trail.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-[1.35rem] border border-dashed border-slate-600 bg-slate-950/50 p-6">
          <p className="text-sm leading-6 text-slate-300">
            Incident responders will appear here once the deck has an active
            incident in view.
          </p>
        </div>
      )}
    </aside>
  );
}
