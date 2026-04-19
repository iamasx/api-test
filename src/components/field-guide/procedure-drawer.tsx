import type { Procedure } from "@/components/field-guide/field-guide-data";
import ProcedureChecklist from "@/components/field-guide/procedure-checklist";

type ProcedureDrawerProps = {
  procedure: Procedure | null;
  completedSteps: Record<string, boolean> | undefined;
  isOpen: boolean;
  onClose: () => void;
  onToggleStep: (procedureId: string, stepId: string) => void;
};

const statusClasses = {
  Ready: "bg-emerald-100 text-emerald-800",
  "In Review": "bg-amber-100 text-amber-800",
  Draft: "bg-slate-200 text-slate-700",
} as const;

export default function ProcedureDrawer({
  procedure,
  completedSteps,
  isOpen,
  onClose,
  onToggleStep,
}: ProcedureDrawerProps) {
  const mobileOpen = isOpen && procedure !== null;

  return (
    <>
      {mobileOpen ? (
        <button
          aria-label="Close active procedure"
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white px-4 py-6 shadow-2xl transition-transform md:static md:max-w-none md:rounded-[1.75rem] md:border md:px-6 md:shadow-lg ${
          mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
        data-testid="procedure-drawer"
      >
        {procedure ? (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-50">
                    {procedure.team}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {procedure.difficulty}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[procedure.status]}`}
                  >
                    {procedure.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Active procedure
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                    {procedure.title}
                  </h2>
                </div>
              </div>
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-7 text-slate-600">{procedure.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Duration</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {procedure.duration}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Cadence</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {procedure.cadence}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {procedure.location}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Last updated</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {procedure.lastUpdated}
                </p>
              </div>
            </div>
            <section className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Notes and tools
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {procedure.notes}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {procedure.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
            <ProcedureChecklist
              completedSteps={completedSteps}
              onToggleStep={onToggleStep}
              procedureId={procedure.id}
              steps={procedure.checklist}
            />
          </div>
        ) : (
          <div className="flex h-full min-h-80 items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="max-w-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Procedure drawer
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                Select a procedure to review the local checklist.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The detail panel stays within this route and keeps checklist
                progress only for the current browser session.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
