import type {
  EscalationLaneStatus,
  IncidentRecord,
  IncidentStage,
  IncidentStageId,
  IncidentWorkflowStage,
  ResponderRecord,
} from "@/app/incident-deck/mock-data";
import { isIncidentStageComplete } from "@/app/incident-deck/mock-data";

const laneStatusClasses: Record<EscalationLaneStatus, string> = {
  Standby: "border-white/10 bg-white/5 text-slate-200",
  Warming: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  Engaged: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  Handoff: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
  Watch: "border-cyan-300/30 bg-cyan-400/10 text-cyan-100",
};

type WorkflowStageBoardProps = {
  incident: IncidentRecord | null;
  currentStageId: IncidentStageId | null;
  stages: IncidentStage[];
  workflow: IncidentWorkflowStage | null;
  respondersById: Record<string, ResponderRecord>;
  onAdvanceStage: () => void;
  onRewindStage: () => void;
  onSelectStage: (stageId: IncidentStageId) => void;
};

export function WorkflowStageBoard({
  incident,
  currentStageId,
  stages,
  workflow,
  respondersById,
  onAdvanceStage,
  onRewindStage,
  onSelectStage,
}: WorkflowStageBoardProps) {
  if (!incident || !currentStageId || !workflow) {
    return (
      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
          Triage workflow
        </p>
        <div className="mt-4 rounded-[1.35rem] border border-dashed border-slate-600 bg-slate-950/50 p-6">
          <p className="text-sm leading-6 text-slate-300">
            Select an incident lane to inspect staged triage, escalation coverage,
            and the current handoff packet.
          </p>
        </div>
      </section>
    );
  }

  const currentStage =
    stages.find((stage) => stage.id === currentStageId) ?? stages[0];
  const currentStageIndex = stages.findIndex((stage) => stage.id === currentStageId);
  const previousStage =
    currentStageIndex > 0 ? stages[currentStageIndex - 1] : null;
  const nextStage =
    currentStageIndex < stages.length - 1 ? stages[currentStageIndex + 1] : null;
  const primaryOwner = respondersById[workflow.ownership.primaryOwnerId];
  const coordinator = respondersById[workflow.ownership.coordinatorId];

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Triage workflow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {incident.code} staged response
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={previousStage === null}
              onClick={onRewindStage}
              type="button"
            >
              {previousStage ? `Back to ${previousStage.label}` : "At first stage"}
            </button>
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={nextStage === null}
              onClick={onAdvanceStage}
              type="button"
            >
              {nextStage ? `Advance to ${nextStage.label}` : "At final stage"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => {
            const isCurrent = stage.id === currentStageId;
            const isComplete = isIncidentStageComplete(stage.id, currentStageId);

            return (
              <button
                aria-pressed={isCurrent}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isCurrent
                    ? stage.surfaceClass
                    : isComplete
                      ? "border-white/15 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                type="button"
              >
                {stage.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Current stage
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {currentStage.label}
                </h3>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ring-1 ${currentStage.surfaceClass}`}
              >
                {workflow.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {currentStage.summary}
            </p>
            <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Stage focus
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {workflow.stageFocus}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">
                Active task
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {workflow.activeTask}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Primary owner
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {primaryOwner?.name ?? "Unassigned"}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {primaryOwner?.role ?? "No role"}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Coordinator
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {coordinator?.name ?? "Unassigned"}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {workflow.ownership.lane}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-fuchsia-300/20 bg-fuchsia-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-100/80">
                Ownership state
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {workflow.ownership.state}
              </p>
              <p className="mt-1 text-sm text-fuchsia-100/80">
                Review {workflow.ownership.nextReview}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Escalation lanes
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {workflow.ownership.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {workflow.lanes.map((lane) => (
            <article
              className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
              key={lane.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{lane.label}</p>
                  <p className="mt-1 text-sm text-slate-300">{lane.team}</p>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${laneStatusClasses[lane.status]}`}
                >
                  {lane.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {lane.summary}
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Coverage
                  </p>
                  <p className="mt-2 text-white">{lane.coverage}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Next check
                  </p>
                  <p className="mt-2 text-white">{lane.nextCheck}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
