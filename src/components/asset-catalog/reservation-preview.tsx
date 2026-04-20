import type {
  AssetCatalogItem,
  AssetCategory,
  AssetForecast,
  CrewProfile,
  PlanningWindow,
  ReservationIntent,
  ReservationPreview as ReservationPreviewData,
} from "@/app/asset-catalog/mock-data";
import type {
  BundleRecommendation,
  PlannerConflict,
} from "@/app/asset-catalog/planner";

type ReservationPreviewProps = {
  asset: AssetCatalogItem | null;
  categoryLabel: string | null;
  checklist: string[];
  conflicts: PlannerConflict[];
  coveredCategories: AssetCategory[];
  crewProfile: CrewProfile;
  forecast: AssetForecast | null;
  intent: ReservationIntent;
  missingCategories: AssetCategory[];
  planAssets: AssetCatalogItem[];
  preview: ReservationPreviewData | null;
  recommendations: BundleRecommendation[];
  selectionHidden: boolean;
  window: PlanningWindow;
  resolveAssetName: (assetId: string) => string;
  onClearPlan: () => void;
  onClearSelection: () => void;
  onResetFilters: () => void;
};

const forecastCopy = {
  clear: "No blocking forecast signal in the active pickup window.",
  tight: "Demand is elevated, so keep alternates ready before confirming.",
  conflict: "The current window is likely to collide with another staged reservation.",
} as const;

const conflictStyles = {
  note: "border-slate-200 bg-slate-50 text-slate-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  blocking: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

export function ReservationPreview({
  asset,
  categoryLabel,
  checklist,
  conflicts,
  coveredCategories,
  crewProfile,
  forecast,
  intent,
  missingCategories,
  planAssets,
  preview,
  recommendations,
  selectionHidden,
  window,
  resolveAssetName,
  onClearPlan,
  onClearSelection,
  onResetFilters,
}: ReservationPreviewProps) {
  if (!asset && planAssets.length === 0) {
    const topRecommendation = recommendations[0];

    return (
      <aside className="rounded-[1.9rem] border border-dashed border-slate-300 bg-white/80 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Reservation Preview
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Start a draft by adding assets or applying a recommended bundle.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The planner will turn selected assets into a reservation preview with
          forecast warnings, missing coverage, and handoff notes.
        </p>
        {topRecommendation ? (
          <div className="mt-5 rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">
              Suggested Starter
            </p>
            <h3 className="mt-2 text-lg font-semibold text-cyan-950">
              {topRecommendation.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-cyan-900">
              {topRecommendation.summary}
            </p>
            <p className="mt-3 text-sm text-cyan-900">
              Hero asset:{" "}
              <span className="font-semibold">
                {resolveAssetName(topRecommendation.heroAssetId)}
              </span>
            </p>
          </div>
        ) : null}
      </aside>
    );
  }

  if (selectionHidden && asset) {
    return (
      <aside className="rounded-[1.9rem] border border-amber-200 bg-amber-50/90 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          Reservation Preview
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-amber-950">
          {asset.name} is outside the current filters.
        </h2>
        <p className="mt-3 text-sm leading-6 text-amber-900">
          The asset remains focused in the reservation draft, but the active search
          or availability filter removed it from the visible catalog.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-amber-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-900"
            onClick={onResetFilters}
            type="button"
          >
            Reset filters
          </button>
          <button
            className="rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-100"
            onClick={onClearSelection}
            type="button"
          >
            Clear focus
          </button>
        </div>
      </aside>
    );
  }

  const coverageLabel =
    coveredCategories.length > 0
      ? coveredCategories.map((category) => category.label).join(", ")
      : "No categories covered yet";
  const missingLabel =
    missingCategories.length > 0
      ? missingCategories.map((category) => category.label).join(", ")
      : "None";
  const topRecommendation = recommendations[0];

  return (
    <aside className="rounded-[1.9rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Reservation Preview
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            {asset ? asset.name : "Draft reservation"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {asset ? `${categoryLabel ?? asset.categoryId} - ${asset.zone}` : "No hero asset selected"}{" "}
            · {window.pickupLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {asset ? (
            <button
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              onClick={onClearSelection}
              type="button"
            >
              Clear focus
            </button>
          ) : null}
          {planAssets.length > 0 ? (
            <button
              className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-950 transition hover:border-cyan-300 hover:bg-cyan-100"
              onClick={onClearPlan}
              type="button"
            >
              Clear draft
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] bg-slate-950 px-4 py-4 text-slate-50">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">
            Planning Window
          </p>
          <p className="mt-2 text-xl font-semibold">{window.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{window.note}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Draft Settings
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {intent.label} · {crewProfile.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {intent.summary}
          </p>
        </div>
      </div>

      {forecast && asset ? (
        <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">Hero asset forecast</p>
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-800">
              {forecast.coverageLabel}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700">{forecast.note}</p>
          <p className="mt-2 text-sm text-slate-600">{forecastCopy[forecast.status]}</p>
        </div>
      ) : null}

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900">Draft assets</p>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {planAssets.length} selected
          </span>
        </div>
        {planAssets.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {planAssets.map((planAsset) => (
              <span
                key={planAsset.id}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {planAsset.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            No assets are locked into the draft yet. Focusing an asset gives the
            planner a starting point for recommendations.
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Covered Lanes
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-900">{coverageLabel}</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Missing Before Checkout
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-900">{missingLabel}</p>
        </div>
      </div>

      {conflicts.length > 0 ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">Conflicts and notes</p>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {conflicts.length} signal{conflicts.length === 1 ? "" : "s"}
            </span>
          </div>
          {conflicts.map((conflict) => (
            <div
              key={conflict.id}
              className={`rounded-[1.35rem] border px-4 py-4 ${conflictStyles[conflict.severity]}`}
            >
              <p className="text-sm font-semibold">{conflict.title}</p>
              <p className="mt-2 text-sm leading-6">{conflict.detail}</p>
              <p className="mt-2 text-sm">{conflict.resolution}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-900">
          <p className="text-sm font-semibold">No blocking conflicts in the current draft.</p>
          <p className="mt-2 text-sm leading-6">
            The selected assets align with the active reservation window and intent.
          </p>
        </div>
      )}

      {preview ? (
        <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Existing reservation on this asset
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {preview.project}
              </p>
              <p className="mt-1 text-sm text-slate-600">{preview.requester}</p>
            </div>
            <div className="rounded-full bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-900">
              {preview.pickupWindow}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Return window
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {preview.returnWindow}
              </p>
              <p className="mt-1 text-sm text-slate-600">{preview.handoffZone}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Attached signals
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {preview.conflicts.length > 0 ? (
                  preview.conflicts.map((conflict) => (
                    <li key={conflict}>- {conflict}</li>
                  ))
                ) : (
                  <li>- No active conflicts on the current reservation.</li>
                )}
              </ul>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-600">
            {preview.note}
          </p>
        </div>
      ) : null}

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900">Reservation checklist</p>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
            {checklist.length} items
          </span>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {checklist.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>

      {topRecommendation ? (
        <div className="mt-5 rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">
            Best Next Recommendation
          </p>
          <h3 className="mt-2 text-lg font-semibold text-cyan-950">
            {topRecommendation.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-cyan-900">
            {topRecommendation.reason}
          </p>
          <p className="mt-2 text-sm text-cyan-900">{topRecommendation.caution}</p>
          <p className="mt-3 text-sm text-cyan-900">
            Includes:{" "}
            <span className="font-medium">
              {topRecommendation.assetIds.map(resolveAssetName).join(", ")}
            </span>
          </p>
        </div>
      ) : null}
    </aside>
  );
}
