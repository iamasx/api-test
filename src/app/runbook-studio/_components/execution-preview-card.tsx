import type { ExecutionPreview } from "../_data/runbook-studio-data";

type ExecutionPreviewCardProps = {
  preview: ExecutionPreview;
};

function getPreviewStateLabel(state: ExecutionPreview["state"]) {
  switch (state) {
    case "active":
      return "Active preview";
    case "ready":
      return "Ready preview";
    case "watch":
      return "Watch preview";
    default:
      return state;
  }
}

export function ExecutionPreviewCard({
  preview,
}: ExecutionPreviewCardProps) {
  return (
    <article
      aria-labelledby={`${preview.id}-title`}
      className="rounded-[1.75rem] border border-slate-300/70 bg-white/88 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)]"
      data-preview-state={preview.state}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {preview.label}
          </p>
          <div>
            <h3
              id={`${preview.id}-title`}
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              {preview.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              {preview.summary}
            </p>
          </div>
        </div>

        <div className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          {getPreviewStateLabel(preview.state)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/90 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Preview metadata
          </p>
          <dl className="mt-4 grid gap-3 text-sm text-slate-600">
            <div>
              <dt className="font-semibold text-slate-950">Window</dt>
              <dd className="mt-1">{preview.window}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Operator</dt>
              <dd className="mt-1">{preview.operator}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Duration</dt>
              <dd className="mt-1">{preview.duration}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Success signals
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {preview.signals.map((signal) => (
                <li
                  key={signal}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-3 leading-6"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Dry-run steps
            </p>
            <ol className="mt-3 grid gap-3">
              {preview.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step {index + 1} · {step.timing}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {step.label}
                  </p>
                  <p className="mt-1 font-medium text-slate-700">{step.owner}</p>
                  <p className="mt-2 leading-6">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Expected outputs
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
              {preview.outputs.map((output) => (
                <li
                  key={output}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
