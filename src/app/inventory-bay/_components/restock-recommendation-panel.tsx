import {
  getAvailableToPromise,
  inventoryBayPriorityStyles,
  type InventoryBayRecommendationView,
} from "../_data/inventory-bay-data";

type RestockRecommendationPanelProps = {
  recommendations: InventoryBayRecommendationView[];
};

export function RestockRecommendationPanel({
  recommendations,
}: RestockRecommendationPanelProps) {
  const leadRecommendation = recommendations[0];
  const immediateCount = recommendations.filter(
    (recommendation) => recommendation.priority === "Immediate",
  ).length;
  const totalUnitsAtRisk = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.item.unitsOnHand,
    0,
  );

  return (
    <aside
      aria-label="Restock recommendations"
      className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.22)] sm:p-7 xl:sticky xl:top-6 xl:self-start"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Recommendation panel
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Restock recommendations
          </h2>
        </div>
        <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {recommendations.length} actions
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/72">
        Recommendations stay visible beside the category sections so the bay team
        can connect stock pressure to the exact replenishment move or transfer.
      </p>

      {leadRecommendation ? (
        <div className="mt-6 rounded-[1.75rem] border border-cyan-400/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.7))] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Lead move
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {leadRecommendation.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/78">
            {leadRecommendation.action}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72">
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5">
              {leadRecommendation.category.name}
            </span>
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5">
              {leadRecommendation.band.name}
            </span>
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5">
              {leadRecommendation.dueBy}
            </span>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Immediate actions
          </p>
          <p className="mt-2 text-3xl font-semibold">{immediateCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Units tied to actions
          </p>
          <p className="mt-2 text-3xl font-semibold">{totalUnitsAtRisk}</p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Recommendation queue
        </p>
        <ul aria-label="Recommendation queue" className="mt-4 space-y-3">
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-72">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${inventoryBayPriorityStyles[recommendation.priority]}`}
                      >
                        {recommendation.priority}
                      </span>
                      <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                        {recommendation.category.name}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {recommendation.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {getAvailableToPromise(recommendation.item)} ATP
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-white/76">
                  {recommendation.summary}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  {recommendation.action}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      Item
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {recommendation.item.name}
                    </p>
                    <p className="mt-1 text-sm text-white/66">
                      {recommendation.item.nextDelivery}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      Owner and due
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {recommendation.owner}
                    </p>
                    <p className="mt-1 text-sm text-white/66">
                      {recommendation.dueBy}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
