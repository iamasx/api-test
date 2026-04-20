import {
  fieldGuidePriorityStyles,
  getFieldGuideCategoryById,
  type FieldGuideProcedure,
  type ProcedureChecklistItem,
} from "../_lib/field-guide-data";

type ProcedureDetailPanelProps = {
  procedure: FieldGuideProcedure;
};

const checklistTypeStyles: Record<
  ProcedureChecklistItem["type"],
  string
> = {
  Required: "border-rose-200 bg-rose-50 text-rose-700",
  "Verify on site": "border-amber-200 bg-amber-50 text-amber-700",
  Recommended: "border-sky-200 bg-sky-50 text-sky-700",
};

export function ProcedureDetailPanel({
  procedure,
}: ProcedureDetailPanelProps) {
  const category = getFieldGuideCategoryById(procedure.categoryId);
  const priorityStyle = fieldGuidePriorityStyles[procedure.priority];

  return (
    <aside
      aria-label="Selected procedure details"
      className="rounded-[2rem] border border-slate-900/90 bg-slate-950 p-6 text-white shadow-[0_32px_110px_-45px_rgba(15,23,42,0.92)] xl:sticky xl:top-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Selected Procedure
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {procedure.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {category?.name ?? "Field Guide"} • {procedure.code} • reviewed{" "}
            {procedure.lastReviewed}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${priorityStyle.dot}`} />
          {procedure.priority}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-300">
        {procedure.objective}
      </p>

      <dl className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Crew
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {procedure.crew}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Scene Type
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {procedure.sceneType}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Estimated Window
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {procedure.estimatedWindow}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trigger Signals
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {procedure.triggerSignals.length} conditions
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          Trigger Signals
        </h3>
        <ul className="mt-4 space-y-3">
          {procedure.triggerSignals.map((signal) => (
            <li
              key={signal}
              className="rounded-[1.1rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-300"
            >
              {signal}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          Procedure Steps
        </h3>
        <ol className="mt-4 space-y-4">
          {procedure.steps.map((step, index) => (
            <li
              key={step.id}
              className="rounded-[1.2rem] border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {step.detail}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {step.owner} • {step.duration}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          Crew Checklist
        </h3>
        <ul className="mt-4 space-y-3">
          {procedure.checklist.map((item) => (
            <li
              key={item.id}
              className="rounded-[1.2rem] border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {item.label}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.detail}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${checklistTypeStyles[item.type]}`}
                >
                  {item.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          Reference Notes
        </h3>
        <dl className="mt-4 space-y-3">
          {procedure.references.map((reference) => (
            <div
              key={reference.id}
              className="rounded-[1.2rem] border border-white/8 bg-white/[0.04] px-4 py-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {reference.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-200">
                {reference.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Tools
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {procedure.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-slate-100"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
