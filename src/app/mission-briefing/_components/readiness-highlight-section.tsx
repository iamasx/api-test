import type {
  BriefingStat,
  ReadinessHighlight,
  ReadinessHighlightTone,
} from "../_data/mission-briefing-data";

const toneBadgeStyles: Record<ReadinessHighlightTone, string> = {
  ready: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
  watch: "border-amber-300/30 bg-amber-300/12 text-amber-100",
  risk: "border-rose-300/30 bg-rose-300/12 text-rose-100",
};

const toneSurfaceStyles: Record<ReadinessHighlightTone, string> = {
  ready:
    "border-emerald-300/14 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(8,15,27,0.9))]",
  watch:
    "border-amber-300/14 bg-[linear-gradient(180deg,rgba(245,158,11,0.14),rgba(8,15,27,0.9))]",
  risk:
    "border-rose-300/14 bg-[linear-gradient(180deg,rgba(244,63,94,0.14),rgba(8,15,27,0.9))]",
};

const toneLabels: Record<ReadinessHighlightTone, string> = {
  ready: "Ready",
  watch: "Watch",
  risk: "Risk",
};

type ReadinessHighlightSectionProps = {
  highlights: ReadinessHighlight[];
  stats: BriefingStat[];
};

export function ReadinessHighlightSection({
  highlights,
  stats,
}: ReadinessHighlightSectionProps) {
  return (
    <section
      aria-label="Mission readiness highlights"
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.9),rgba(7,12,24,0.96))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.28)]"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
            Readiness highlights
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Track where the plan is solid and where it can still break
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-300">
          These highlights keep the crew, weather, network, and recovery status
          visible at the same altitude as the scenario review.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.16))] px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
          </article>
        ))}
      </div>

      <div aria-label="Readiness track list" className="mt-6 grid gap-4 xl:grid-cols-2">
        {highlights.map((highlight) => (
          <article
            key={highlight.id}
            className={`rounded-[1.6rem] border px-4 py-4 ${toneSurfaceStyles[highlight.tone]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{highlight.label}</p>
                <p className="mt-1 text-base font-medium text-slate-100">
                  {highlight.value}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${toneBadgeStyles[highlight.tone]}`}
              >
                {toneLabels[highlight.tone]}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">{highlight.note}</p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Owner
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-100">
                  {highlight.owner}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Next check
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-100">
                  {highlight.nextCheck}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
