import {
  planningWindows,
  type AssetCatalogItem,
  type PlanningWindowId,
} from "@/app/asset-catalog/mock-data";
import { getAssetForecast } from "@/app/asset-catalog/planner";

type ForecastBoardProps = {
  activeWindowId: PlanningWindowId;
  assets: AssetCatalogItem[];
  focusedAssetId: string | null;
  onInspectAsset: (assetId: string) => void;
};

const forecastStyles = {
  clear: "border-emerald-200 bg-emerald-50 text-emerald-900",
  tight: "border-amber-200 bg-amber-50 text-amber-900",
  conflict: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

export function ForecastBoard({
  activeWindowId,
  assets,
  focusedAssetId,
  onInspectAsset,
}: ForecastBoardProps) {
  if (assets.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/85 p-6 text-center shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Forecast Board
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Add an asset to the draft to compare upcoming pickup pressure.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The forecast board becomes more useful once at least one asset is under
          consideration for the reservation.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Forecast Board
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Compare availability pressure before locking the pickup window.
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          Active planning window:{" "}
          <span className="font-semibold text-slate-900">
            {planningWindows.find((window) => window.id === activeWindowId)?.label}
          </span>
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {assets.map((asset) => {
          const activeForecast = getAssetForecast(asset.id, activeWindowId);
          const isFocused = focusedAssetId === asset.id;

          return (
            <article
              key={asset.id}
              className={`rounded-[1.55rem] border p-4 transition ${
                isFocused
                  ? "border-cyan-700 bg-cyan-950 text-white shadow-[0_16px_45px_-28px_rgba(8,145,178,0.85)]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{asset.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        isFocused ? "bg-white/10 text-cyan-50" : "bg-white text-slate-600"
                      }`}
                    >
                      {asset.zone}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      isFocused ? "text-cyan-50" : "text-slate-600"
                    }`}
                  >
                    {asset.summary}
                  </p>
                </div>
                <button
                  aria-label={`Inspect forecast asset: ${asset.name}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isFocused
                      ? "bg-white text-cyan-950 hover:bg-cyan-50"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                  }`}
                  onClick={() => onInspectAsset(asset.id)}
                  type="button"
                >
                  {isFocused ? "Focused in planner" : "Focus in planner"}
                </button>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-4">
                {planningWindows.map((window) => {
                  const forecast = getAssetForecast(asset.id, window.id);

                  if (!forecast) {
                    return null;
                  }

                  return (
                    <div
                      key={`${asset.id}:${window.id}`}
                      className={`rounded-2xl border px-3 py-3 ${
                        isFocused ? "border-white/15 bg-white/10" : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className={`text-xs uppercase tracking-[0.2em] ${
                            isFocused ? "text-cyan-100" : "text-slate-500"
                          }`}
                        >
                          {window.label}
                        </p>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            isFocused
                              ? "border-white/15 bg-white/10 text-white"
                              : forecastStyles[forecast.status]
                          }`}
                        >
                          {forecast.coverageLabel}
                        </span>
                      </div>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          isFocused ? "text-cyan-50" : "text-slate-600"
                        }`}
                      >
                        {forecast.note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {activeForecast ? (
                <p
                  className={`mt-4 rounded-2xl px-3 py-3 text-sm leading-6 ${
                    isFocused
                      ? "bg-white/10 text-cyan-50"
                      : "bg-slate-900 text-slate-100"
                  }`}
                >
                  Active window note: {activeForecast.note}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
