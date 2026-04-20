import type {
  IncidentRecord,
  IncidentStage,
  IncidentWorkflowStage,
  ResponderRecord,
  TimelineEntry,
} from "@/app/incident-deck/mock-data";

type ResponseTimelineProps = {
  incident: IncidentRecord | null;
  activeStage: IncidentStage | null;
  workflow: IncidentWorkflowStage | null;
  entries: TimelineEntry[];
  hasResponderFocus: boolean;
  respondersById: Record<string, ResponderRecord>;
  selectedResponder: ResponderRecord | null;
  onSelectResponder: (responderId: string) => void;
  onClearResponder: () => void;
};

export function ResponseTimeline({
  incident,
  activeStage,
  workflow,
  entries,
  hasResponderFocus,
  respondersById,
  selectedResponder,
  onSelectResponder,
  onClearResponder,
}: ResponseTimelineProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Response timeline
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {incident ? `${incident.code} recovery log` : "Timeline waiting"}
            </h2>
          </div>
          {selectedResponder ? (
            <button
              className="rounded-full border border-sky-300/40 bg-sky-400/10 px-3 py-2 text-sm text-sky-100 transition hover:bg-sky-400/15"
              onClick={onClearResponder}
              type="button"
            >
              Focused on {selectedResponder.name} · clear
            </button>
          ) : null}
        </div>
        {incident && activeStage && workflow ? (
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Current stage
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {activeStage.label}
                </h3>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ring-1 ${activeStage.surfaceClass}`}
              >
                {workflow.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {workflow.activeTask}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {workflow.handoff.summary}
            </p>
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-300">
            Select an incident lane to inspect the response sequence and latest
            handoff notes.
          </p>
        )}
      </div>

      {incident ? (
        entries.length > 0 ? (
          <div className="mt-4 space-y-4">
            {entries.map((entry) => (
              <article
                className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
                key={entry.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                      {entry.kind}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                      {entry.stageId}
                    </span>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p>{entry.at}</p>
                    <p>{entry.channel}</p>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {entry.detail}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.responderIds.map((responderId) => {
                    const responder = respondersById[responderId];
                    if (!responder) return null;

                    return (
                      <button
                        className={`rounded-full border px-3 py-2 text-sm transition ${
                          selectedResponder?.id === responder.id
                            ? "border-sky-300/50 bg-sky-400/15 text-sky-100"
                            : "border-white/10 bg-slate-950/50 text-slate-200 hover:bg-white/10"
                        }`}
                        key={responder.id}
                        onClick={() => onSelectResponder(responder.id)}
                        type="button"
                      >
                        {responder.name}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-[1.35rem] border border-dashed border-slate-600 bg-slate-950/50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Empty timeline
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              No timeline entries match the current responder focus.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {hasResponderFocus
                ? "Clear the responder filter to bring back every recovery event for the selected incident."
                : "Advance the staged workflow to reveal later escalation and handoff entries."}
            </p>
            {hasResponderFocus ? (
              <button
                className="mt-5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                onClick={onClearResponder}
                type="button"
              >
                Show full timeline
              </button>
            ) : null}
          </div>
        )
      ) : (
        <div className="mt-4 rounded-[1.35rem] border border-dashed border-slate-600 bg-slate-950/50 p-6">
          <p className="text-sm leading-6 text-slate-300">
            The response timeline will appear here once an incident is visible in
            the current deck.
          </p>
        </div>
      )}
    </section>
  );
}
