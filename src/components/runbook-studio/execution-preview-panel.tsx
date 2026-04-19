import {
  executionStages,
  type Procedure,
  type StageId,
} from "./runbook-studio-data";

const stageClasses = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-900",
  watch: "border-amber-200 bg-amber-50 text-amber-900",
  blocked: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

type ChecklistState = Record<string, boolean>;

type ExecutionPreviewPanelProps = {
  procedure: Procedure | null;
  hiddenStageIds: StageId[];
  completedSteps: ChecklistState | undefined;
  onToggleStage: (stageId: StageId) => void;
  onToggleStep: (procedureId: string, stepId: string) => void;
};

export default function ExecutionPreviewPanel({
  procedure,
  hiddenStageIds,
  completedSteps,
  onToggleStage,
  onToggleStep,
}: ExecutionPreviewPanelProps) {
  if (!procedure) {
    return (
      <aside className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Preview</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">No procedure is visible for the current section filter.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Reopen a section or return to all cards to restore the execution preview.</p>
      </aside>
    );
  }

  const hiddenStageSet = new Set(hiddenStageIds);
  const visibleStages = executionStages.filter((stage) => !hiddenStageSet.has(stage.id));
  const visibleStepCount = procedure.steps.filter((step) => !hiddenStageSet.has(step.stageId)).length;
  const completedCount = procedure.steps.filter((step) => completedSteps?.[step.id] && !hiddenStageSet.has(step.stageId)).length;

  return (
    <aside className="rounded-[2rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Execution Preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{procedure.title}</h2>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
            {procedure.section}
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{procedure.preview.summary}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-950 px-4 py-3 text-slate-50">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Visible stages</p>
            <p className="mt-2 text-2xl font-semibold">{visibleStages.length}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-950">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Checklist</p>
            <p className="mt-2 text-2xl font-semibold">{completedCount}/{visibleStepCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Stage visibility</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {executionStages.map((stage) => {
            const isHidden = hiddenStageSet.has(stage.id);
            return (
              <button
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${isHidden ? "border-slate-200 bg-white text-slate-500" : "border-slate-950 bg-slate-950 text-white"}`}
                key={stage.id}
                onClick={() => onToggleStage(stage.id)}
                type="button"
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleStages.length === 0 ? (
        <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Zero stages visible</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Turn at least one stage back on to rebuild the preview and checklist.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visibleStages.map((stage) => {
            const detail = procedure.stages.find((item) => item.id === stage.id);
            const stageSteps = procedure.steps.filter((item) => item.stageId === stage.id);
            if (!detail) {
              return null;
            }
            return (
              <section className="rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4" key={stage.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{stage.label}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{detail.title}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${stageClasses[detail.status]}`}>
                    {detail.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{detail.detail}</p>
                <div className="mt-4 space-y-2">
                  {stageSteps.map((step) => {
                    const isComplete = Boolean(completedSteps?.[step.id]);
                    return (
                      <button
                        className={`flex w-full gap-3 rounded-2xl border px-3 py-3 text-left transition ${isComplete ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                        key={step.id}
                        onClick={() => onToggleStep(procedure.id, step.id)}
                        type="button"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${isComplete ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-slate-400"}`}
                        >
                          {isComplete ? "✓" : ""}
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-slate-900">{step.label}</span>
                          <span className="mt-1 block text-sm leading-5 text-slate-600">{step.note}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <div className="mt-6 rounded-[1.6rem] bg-slate-950 p-5 text-slate-50">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Preview outputs</p>
        <div className="mt-4 space-y-2">
          {procedure.preview.outputs.map((output) => (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200" key={output}>
              {output}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
