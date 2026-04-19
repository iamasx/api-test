import type { MatrixFilter, Outcome } from "@/app/scenario-board/scenario-board-data";

type OutcomeMatrixProps = {
  assumptionsActive: number;
  filter: MatrixFilter;
  onFilterChange: (filter: MatrixFilter) => void;
  outcomes: Outcome[];
};

const quadrants = [
  { direction: "downside", likelihood: "likely", title: "Likely downside", tone: "border-rose-300/20 bg-rose-400/10" },
  { direction: "upside", likelihood: "likely", title: "Likely upside", tone: "border-emerald-300/20 bg-emerald-400/10" },
  { direction: "downside", likelihood: "unlikely", title: "Unlikely downside", tone: "border-amber-300/20 bg-amber-400/10" },
  { direction: "upside", likelihood: "unlikely", title: "Unlikely upside", tone: "border-sky-300/20 bg-sky-400/10" },
] as const;

export function OutcomeMatrix({
  assumptionsActive,
  filter,
  onFilterChange,
  outcomes,
}: OutcomeMatrixProps) {
  return (
    <section aria-label="Outcome matrix" className="space-y-5 rounded-[2rem] border border-white/10 bg-stone-950/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Outcome matrix</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">Model likely and edge-case board outcomes.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "downside"] as MatrixFilter[]).map((option) => (
            <button
              aria-pressed={filter === option}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === option ? "bg-stone-100 text-stone-950" : "bg-white/5 text-stone-300 hover:bg-white/10"
              }`}
              key={option}
              onClick={() => onFilterChange(option)}
              type="button"
            >
              {option === "all" ? "All paths" : "Downside only"}
            </button>
          ))}
        </div>
      </div>

      {outcomes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {quadrants.map((quadrant) => {
            const quadrantOutcomes = outcomes.filter(
              (outcome) => outcome.direction === quadrant.direction && outcome.likelihood === quadrant.likelihood,
            );

            return (
              <div className={`rounded-[1.5rem] border p-5 ${quadrant.tone}`} key={quadrant.title}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-stone-50">{quadrant.title}</h3>
                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-200">
                    {quadrantOutcomes.length}
                  </span>
                </div>
                {quadrantOutcomes.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {quadrantOutcomes.map((outcome) => (
                      <article className="rounded-2xl border border-black/10 bg-black/20 p-4" key={outcome.id}>
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="text-sm font-semibold text-stone-50">{outcome.title}</h4>
                          <span className="text-xs uppercase tracking-[0.2em] text-stone-300">Score {outcome.score}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-stone-300">{outcome.detail}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone-400">{outcome.owner}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-stone-300">No outcomes land in this quadrant under the current board filter.</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">Matrix empty</p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-50">
            {assumptionsActive === 0 ? "Re-enable at least one assumption to rebuild the matrix." : "No outcomes match the current board filters."}
          </h3>
          <p className="mt-3 text-sm leading-6 text-stone-300">The route keeps this state local, so clearing assumptions or narrowing the matrix only affects this board.</p>
        </div>
      )}
    </section>
  );
}
