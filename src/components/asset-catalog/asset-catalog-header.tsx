type AssetCatalogHeaderProps = {
  bundleReadyCount: number;
  draftAssets: number;
  forecastAlerts: number;
  readyAssets: number;
  syncLabel: string;
  totalAssets: number;
  windowLabel: string;
};

export function AssetCatalogHeader({
  bundleReadyCount,
  draftAssets,
  forecastAlerts,
  readyAssets,
  syncLabel,
  totalAssets,
  windowLabel,
}: AssetCatalogHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="bg-[linear-gradient(135deg,rgba(14,116,144,0.14),rgba(251,191,36,0.14),rgba(255,255,255,0.9))] px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700">
              Asset Catalog Planner
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Plan reservations with forecast pressure, bundle suggestions, and
                a draft handoff preview.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Build a route-local reservation draft instead of only browsing
                inventory. Every bundle, forecast warning, and preview change stays
                isolated inside the asset catalog experience.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-2 text-sm font-medium text-cyan-900">
              {syncLabel}
            </div>
            <div className="rounded-full border border-amber-200 bg-amber-50/80 px-4 py-2 text-sm font-medium text-amber-900">
              Planning against {windowLabel}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-3 border-t border-slate-200/70 px-5 py-5 sm:grid-cols-2 sm:px-7 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Catalog
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{totalAssets}</p>
          <p className="mt-1 text-sm text-slate-600">
            Mock assets available to the planner.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
            Draft Plan
          </p>
          <p className="mt-2 text-2xl font-semibold text-cyan-950">{draftAssets}</p>
          <p className="mt-1 text-sm text-cyan-900">
            Assets currently staged in the reservation.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
            Ready Now
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-950">
            {readyAssets}
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            Clear for immediate pickup or bundle use.
          </p>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-violet-700">
            Ready Bundles
          </p>
          <p className="mt-2 text-2xl font-semibold text-violet-950">
            {bundleReadyCount}
          </p>
          <p className="mt-1 text-sm text-violet-900">
            Recommendation paths with no blocking conflicts.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
            Forecast Alerts
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-950">
            {forecastAlerts}
          </p>
          <p className="mt-1 text-sm text-amber-900">
            Assets under pressure in the active pickup window.
          </p>
        </div>
      </div>
    </section>
  );
}
