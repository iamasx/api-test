import type {
  PlaybookStepPhase,
  SavedPlaybook,
} from "@/components/field-guide/field-guide-data";

type RehearsalPreviewProps = {
  playbook: SavedPlaybook;
};

const phaseOrder: PlaybookStepPhase[] = ["Brief", "Execute", "Verify"];

function getPhaseSteps(playbook: SavedPlaybook, phase: PlaybookStepPhase) {
  return playbook.steps.filter((step) => step.phase === phase);
}

export default function RehearsalPreview({ playbook }: RehearsalPreviewProps) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Rehearsal preview
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Preview the authored flow in stage order before it is saved or
            published for the wider team.
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Total steps
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {playbook.steps.length}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {phaseOrder.map((phase) => {
          const steps = getPhaseSteps(playbook, phase);

          if (steps.length === 0) {
            return null;
          }

          return (
            <section
              className="rounded-3xl border border-slate-200 bg-white p-4"
              key={phase}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    {phase}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    {steps.length} step{steps.length === 1 ? "" : "s"}
                  </h3>
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-50">
                  {steps.map((step) => step.duration).join(" + ")}
                </span>
              </div>
              <ol className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <li
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    key={step.id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-950">
                        {index + 1}. {step.label}
                      </p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                        {step.owner}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.detail}
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Expected signal
                        </dt>
                        <dd className="mt-2">{step.expectedSignal}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Moderator tip
                        </dt>
                        <dd className="mt-2">{step.rehearsalTip}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}
