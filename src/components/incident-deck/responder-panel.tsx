import type {
  IncidentRecord,
  IncidentStage,
  IncidentWorkflowStage,
  ResponderRecord,
} from "@/app/incident-deck/mock-data";
import type { ActionState, ChecklistState } from "@/app/incident-deck/mock-data";

const actionStateClasses: Record<ActionState, string> = {
  Queued: "border-white/10 bg-white/5 text-slate-200",
  "In progress": "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  Blocked: "border-rose-300/30 bg-rose-400/10 text-rose-100",
  "Ready to hand off": "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
  Done: "border-cyan-300/30 bg-cyan-400/10 text-cyan-100",
};

const checklistStateClasses: Record<ChecklistState, string> = {
  Ready: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  Pending: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  Blocked: "border-rose-300/30 bg-rose-400/10 text-rose-100",
};

type ResponderPanelProps = {
  incident: IncidentRecord | null;
  activeStage: IncidentStage | null;
  responders: ResponderRecord[];
  respondersById: Record<string, ResponderRecord>;
  selectedResponder: ResponderRecord | null;
  workflow: IncidentWorkflowStage | null;
  onSelectResponder: (responderId: string) => void;
  onClearResponder: () => void;
};

export function ResponderPanel({
  incident,
  activeStage,
  responders,
  respondersById,
  selectedResponder,
  workflow,
  onSelectResponder,
  onClearResponder,
}: ResponderPanelProps) {
  const outgoingOwner = workflow
    ? respondersById[workflow.handoff.outgoingOwnerId]
    : null;
  const incomingOwner = workflow
    ? respondersById[workflow.handoff.incomingOwnerId]
    : null;
  const primaryOwner = workflow
    ? respondersById[workflow.ownership.primaryOwnerId]
    : null;
  const coordinator = workflow
    ? respondersById[workflow.ownership.coordinatorId]
    : null;

  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="border-b border-white/10 pb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
          Ownership & handoff
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          {incident ? "Bridge roster" : "Waiting for incident"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {incident
            ? "Choose a responder to inspect ownership, action state, and the current handoff packet."
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

          {workflow && activeStage ? (
            <>
              <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Ownership snapshot
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {activeStage.label} ownership
                    </h3>
                  </div>
                  <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100">
                    {workflow.ownership.state}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Primary owner
                    </p>
                    <p className="mt-2 font-medium text-white">
                      {primaryOwner?.name ?? "Unassigned"}
                    </p>
                    <p className="mt-1 text-slate-400">{workflow.ownership.lane}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Coordinator
                    </p>
                    <p className="mt-2 font-medium text-white">
                      {coordinator?.name ?? "Unassigned"}
                    </p>
                    <p className="mt-1 text-slate-400">
                      Review {workflow.ownership.nextReview}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-200">
                  {workflow.ownership.summary}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Handoff brief
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {workflow.handoff.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100">
                    {workflow.handoff.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-200">
                  {workflow.handoff.summary}
                </p>

                <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Outgoing owner
                    </p>
                    <p className="mt-2 font-medium text-white">
                      {outgoingOwner?.name ?? "Unassigned"}
                    </p>
                    <p className="mt-1 text-slate-400">{workflow.handoff.lane}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Incoming owner
                    </p>
                    <p className="mt-2 font-medium text-white">
                      {incomingOwner?.name ?? "Unassigned"}
                    </p>
                    <p className="mt-1 text-slate-400">{workflow.handoff.eta}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Handoff risk
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {workflow.handoff.risk}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {workflow.handoff.checklist.map((item) => (
                    <div
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                      key={item.id}
                    >
                      <p className="text-sm text-slate-200">{item.label}</p>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${checklistStateClasses[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Action states
                </p>
                <div className="mt-4 space-y-3">
                  {workflow.actions.map((action) => (
                    <article
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                      key={action.id}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{action.title}</p>
                          <p className="mt-1 text-sm text-slate-400">
                            {respondersById[action.ownerId]?.name ?? "Unassigned"} ·{" "}
                            {action.lane}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${actionStateClasses[action.state]}`}
                        >
                          {action.state}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {action.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          ) : null}

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
                    Shift
                  </p>
                  <p className="mt-2 font-medium text-white">
                    {selectedResponder.shift}
                  </p>
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
