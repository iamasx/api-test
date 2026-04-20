import type { BundleRecommendation } from "@/app/asset-catalog/planner";

type BundleRecommendationsProps = {
  plannedAssetIds: string[];
  recommendations: BundleRecommendation[];
  resolveAssetName: (assetId: string) => string;
  onApplyBundle: (assetIds: string[], heroAssetId: string) => void;
  onInspectAsset: (assetId: string) => void;
};

const statusStyles = {
  "Ready to apply": "border-emerald-200 bg-emerald-50 text-emerald-900",
  "Needs one swap": "border-amber-200 bg-amber-50 text-amber-900",
  "Needs review": "border-rose-200 bg-rose-50 text-rose-900",
} as const;

export function BundleRecommendations({
  plannedAssetIds,
  recommendations,
  resolveAssetName,
  onApplyBundle,
  onInspectAsset,
}: BundleRecommendationsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Bundle Recommendations
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Apply a starter kit, then fine-tune the reservation draft.
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          {plannedAssetIds.length === 0
            ? "No assets in the draft yet."
            : `${plannedAssetIds.length} asset${
                plannedAssetIds.length === 1 ? "" : "s"
              } already staged in the draft.`}
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {recommendations.map((recommendation) => {
          const bundleAssetNames = recommendation.assetIds.map(resolveAssetName);

          return (
            <article
              key={recommendation.id}
              className="rounded-[1.55rem] border border-slate-200 bg-slate-50/90 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {recommendation.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {recommendation.summary}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                    statusStyles[recommendation.statusLabel]
                  }`}
                >
                  {recommendation.statusLabel}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {bundleAssetNames.map((assetName) => (
                  <span
                    key={`${recommendation.id}:${assetName}`}
                    className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {assetName}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">{recommendation.coverageLabel}</p>
                <p className="mt-2">{recommendation.reason}</p>
                <p className="mt-2 text-slate-600">{recommendation.caution}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  aria-label={`Apply bundle: ${recommendation.label}`}
                  className="rounded-full bg-cyan-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-900"
                  onClick={() =>
                    onApplyBundle(recommendation.assetIds, recommendation.heroAssetId)
                  }
                  type="button"
                >
                  Apply bundle
                </button>
                <button
                  aria-label={`Inspect hero asset: ${resolveAssetName(
                    recommendation.heroAssetId,
                  )}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                  onClick={() => onInspectAsset(recommendation.heroAssetId)}
                  type="button"
                >
                  Inspect hero asset
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
