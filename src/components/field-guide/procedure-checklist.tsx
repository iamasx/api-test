import type { ProcedureStep } from "@/components/field-guide/field-guide-data";

type ProcedureChecklistProps = {
  procedureId: string;
  steps: readonly ProcedureStep[];
  completedSteps: Record<string, boolean> | undefined;
  onToggleStep: (procedureId: string, stepId: string) => void;
};

export default function ProcedureChecklist({
  procedureId,
  steps,
  completedSteps,
  onToggleStep,
}: ProcedureChecklistProps) {
  const completedCount = steps.filter((step) => completedSteps?.[step.id]).length;

  return (
    <section className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Checklist
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {completedCount} of {steps.length} steps complete
          </p>
        </div>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-sky-500 transition-[width]"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      </div>
      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => {
          const checked = completedSteps?.[step.id] ?? false;

          return (
            <li key={step.id}>
              <label className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <input
                  aria-label={step.label}
                  checked={checked}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  onChange={() => onToggleStep(procedureId, step.id)}
                  type="checkbox"
                />
                <span className="space-y-1">
                  <span className="block text-sm font-semibold text-slate-900">
                    {index + 1}. {step.label}
                  </span>
                  <span className="block text-sm leading-6 text-slate-600">
                    {step.detail}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
