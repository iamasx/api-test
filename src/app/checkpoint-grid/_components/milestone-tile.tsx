import type { CheckpointMilestone } from "../_data/checkpoint-grid-data";

type MilestoneTileProps = {
  milestone: CheckpointMilestone;
};

const toneClassNames = {
  steady: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    card: "border-emerald-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,253,245,0.9))]",
    accent: "bg-emerald-500",
  },
  watch: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    card: "border-amber-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,247,237,0.9))]",
    accent: "bg-amber-500",
  },
  risk: {
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    card: "border-rose-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,241,242,0.9))]",
    accent: "bg-rose-500",
  },
};

export function MilestoneTile({ milestone }: MilestoneTileProps) {
  const tone = toneClassNames[milestone.tone];

  return (
    <article
      className={`relative overflow-hidden rounded-[1.85rem] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${tone.card}`}
      role="listitem"
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 rounded-full ${tone.accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {milestone.phase}
          </p>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {milestone.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">{milestone.summary}</p>
          </div>
        </div>

        <span
          className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap ${tone.badge}`}
        >
          {milestone.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/72 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.owner}</p>
        </div>
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/72 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Review window
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.window}</p>
        </div>
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/72 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Progress
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.completion}% complete</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Deliverables
          </p>
          <ul
            className="mt-3 grid gap-3 text-sm leading-6 text-slate-600"
            aria-label={`${milestone.title} deliverables`}
          >
            {milestone.deliverables.map((deliverable) => (
              <li key={deliverable}>
                <span className="relative block pl-4">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.72rem] h-1.5 w-1.5 rounded-full bg-slate-400"
                  />
                  {deliverable}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Dependencies
          </p>
          <ul
            className="mt-3 grid gap-3 text-sm leading-6 text-slate-600"
            aria-label={`${milestone.title} dependencies`}
          >
            {milestone.dependencies.map((dependency) => (
              <li key={dependency}>
                <span className="relative block pl-4">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.72rem] h-1.5 w-1.5 rounded-full bg-slate-400"
                  />
                  {dependency}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-gradient-to-r from-slate-300/70 to-slate-300/10" />

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Next review
        </p>
        <p className="text-sm leading-6 text-slate-700">{milestone.nextReview}</p>
      </div>
    </article>
  );
}
