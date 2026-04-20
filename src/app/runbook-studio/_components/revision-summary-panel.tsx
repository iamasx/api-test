import type { RevisionSummary } from "../_data/runbook-studio-data";

type RevisionSummaryPanelProps = {
  summary: RevisionSummary;
};

export function RevisionSummaryPanel({
  summary,
}: RevisionSummaryPanelProps) {
  return (
    <aside
      aria-label="Runbook revision summary"
      className="rounded-[1.9rem] border border-slate-300/70 bg-slate-950 p-6 text-slate-50 shadow-[0_24px_90px_rgba(15,23,42,0.16)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        {summary.label}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {summary.title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        {summary.description}
      </p>

      <div className="mt-6 grid gap-3">
        {summary.metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {metric.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Changed areas
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {summary.changedAreas.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3 leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Next reviews
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {summary.nextReviews.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3 leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Release notes
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {summary.releaseNotes.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3 leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
