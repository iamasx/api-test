import type {
  IncidentStage,
  IncidentStageId,
  IncidentRecord,
  IncidentSeverity,
  ResponderRecord,
  SeverityLevel,
} from "@/app/incident-deck/mock-data";
import {
  countActiveEscalations,
  getIncidentWorkflowStage,
} from "@/app/incident-deck/mock-data";

type IncidentStackProps = {
  incidents: IncidentRecord[];
  activeIncidentId: string | null;
  selectedResponderId: string | null;
  respondersById: Record<string, ResponderRecord>;
  severityLookup: Record<IncidentSeverity, SeverityLevel>;
  stageLookup: Record<IncidentStageId, IncidentStage>;
  stageState: Record<string, IncidentStageId>;
  onSelectIncident: (incidentId: string) => void;
  onFocusResponder: (incidentId: string, responderId: string) => void;
  onResetFilters: () => void;
};

export function IncidentStack({
  incidents,
  activeIncidentId,
  selectedResponderId,
  respondersById,
  severityLookup,
  stageLookup,
  stageState,
  onSelectIncident,
  onFocusResponder,
  onResetFilters,
}: IncidentStackProps) {
  return (
    <section className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            Active incident stack
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Select a lane to review the response plan.
          </h2>
        </div>
      </div>

      {incidents.length > 0 ? (
        <div className="space-y-4">
          {incidents.map((incident) => {
            const severity = severityLookup[incident.severity];
            const stageId = stageState[incident.id] ?? incident.initialStageId;
            const stage = stageLookup[stageId];
            const workflow = getIncidentWorkflowStage(incident, stageId);
            const isActive = incident.id === activeIncidentId;
            const activeEscalationCount = countActiveEscalations(incident, stageId);

            return (
              <article
                className={`rounded-[1.5rem] border p-5 transition ${
                  isActive
                    ? "border-sky-400/50 bg-sky-400/10 shadow-lg shadow-sky-950/20"
                    : "border-white/10 bg-white/5"
                }`}
                key={incident.id}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                        {incident.code} · {incident.service}
                      </p>
                      <button
                        className="text-left text-xl font-semibold text-white transition hover:text-sky-200"
                        onClick={() => onSelectIncident(incident.id)}
                        type="button"
                      >
                        {incident.title}
                      </button>
                      <p className="max-w-2xl text-sm leading-6 text-slate-300">
                        {incident.summary}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${severity.badgeClass}`}
                      >
                        {severity.label}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ring-1 ${stage.surfaceClass}`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Owner
                      </p>
                      <p className="mt-2 font-medium text-white">
                        {respondersById[workflow.ownership.primaryOwnerId]?.name ??
                          incident.lead}
                      </p>
                      <p className="mt-1 text-slate-400">
                        {workflow.ownership.state}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Impact
                      </p>
                      <p className="mt-2 font-medium text-white">
                        {incident.affectedUsers}
                      </p>
                      <p className="mt-1 text-slate-400">{incident.region}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Stage review
                      </p>
                      <p className="mt-2 font-medium text-white">
                        {workflow.ownership.nextReview}
                      </p>
                      <p className="mt-1 text-slate-400">{stage.shortLabel}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Escalation lanes
                      </p>
                      <p className="mt-2 font-medium text-white">
                        {activeEscalationCount}
                      </p>
                      <p className="mt-1 text-slate-400">{incident.openedAt}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Active task
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {workflow.activeTask}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {workflow.stageFocus}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {incident.responderIds.map((responderId) => {
                      const responder = respondersById[responderId];
                      if (!responder) return null;

                      const isFocused =
                        isActive && selectedResponderId === responder.id;

                      return (
                        <button
                          className={`rounded-full border px-3 py-2 text-sm transition ${
                            isFocused
                              ? "border-sky-300/50 bg-sky-400/15 text-sky-100"
                              : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                          }`}
                          key={responder.id}
                          onClick={() => onFocusResponder(incident.id, responder.id)}
                          type="button"
                        >
                          {responder.name} · {responder.role}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-slate-600 bg-slate-950/50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            No active lane
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            No incidents match the current severity filter.
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Reset the deck to reopen every active incident and restore the
            response timeline.
          </p>
          <button
            className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
            onClick={onResetFilters}
            type="button"
          >
            Show all active incidents
          </button>
        </div>
      )}
    </section>
  );
}
