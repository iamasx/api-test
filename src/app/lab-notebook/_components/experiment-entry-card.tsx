import type { ExperimentEntry } from "../_data/lab-notebook-data";

const statusClasses: Record<ExperimentEntry["status"], string> = {
  Stable: "border-emerald-300/40 bg-emerald-300/14 text-emerald-950",
  Watch: "border-amber-300/50 bg-amber-300/18 text-amber-950",
  Blocked: "border-rose-300/45 bg-rose-300/16 text-rose-950",
};

export function ExperimentEntryCard({
  entry,
  observationCount,
  observationHref,
}: {
  entry: ExperimentEntry;
  observationCount: number;
  observationHref?: string;
}) {
  return (
    <article className="rounded-[1.7rem] border border-stone-900/10 bg-[rgba(255,251,247,0.94)] p-6 shadow-[0_18px_60px_rgba(68,42,22,0.08)] backdrop-blur-sm">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-stone-900/10 bg-stone-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-700">
                {entry.codename}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${statusClasses[entry.status]}`}
              >
                {entry.status}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
                {entry.title}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                {entry.objective}
              </p>
            </div>
          </div>

          <dl className="grid gap-3 rounded-[1.4rem] border border-stone-900/8 bg-stone-100/80 p-4 text-sm text-stone-700 sm:grid-cols-2 xl:min-w-[19rem] xl:grid-cols-1">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Lead
              </dt>
              <dd className="mt-1 font-medium text-stone-950">{entry.lead}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Facility
              </dt>
              <dd className="mt-1 font-medium text-stone-950">{entry.facility}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Window
              </dt>
              <dd className="mt-1 font-medium text-stone-950">{entry.timeWindow}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Stage
              </dt>
              <dd className="mt-1 font-medium text-stone-950">{entry.stage}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(14rem,0.8fr)]">
          <div className="rounded-[1.35rem] border border-stone-900/8 bg-stone-50/85 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Current read
            </p>
            <p className="mt-3 text-base leading-7 text-stone-700 sm:text-[1.02rem]">
              {entry.signal}
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-[0.96rem]">
              {entry.summary}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.35rem] border border-stone-900/8 bg-white/70 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Risk level
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-950">
                {entry.riskLevel}
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-stone-900/8 bg-white/70 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Tags
              </p>
              <ul className="mt-3 flex flex-wrap gap-2" role="list">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-stone-50"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.35rem] border border-stone-900/8 bg-white/70 p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Linked notes
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {observationCount} linked observation panel
                {observationCount === 1 ? "" : "s"} in this notebook.
              </p>

              {observationHref ? (
                <a
                  aria-label={`Open linked observations for ${entry.codename}`}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-stone-50 transition hover:bg-stone-800"
                  href={observationHref}
                >
                  Open linked observations
                </a>
              ) : (
                <p className="mt-3 text-sm font-medium text-stone-500">
                  Observation notes will appear here when a panel is added.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
