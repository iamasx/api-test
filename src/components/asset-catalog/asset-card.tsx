import type {
  AssetCatalogItem,
  AssetForecast,
  ReservationPreview,
} from "@/app/asset-catalog/mock-data";

type AssetCardProps = {
  asset: AssetCatalogItem;
  bundleHint: string | null;
  categoryLabel: string;
  forecast: AssetForecast | null;
  focused: boolean;
  planned: boolean;
  preview: ReservationPreview | null;
  onFocus: () => void;
  onTogglePlan: () => void;
};

const availabilityStyles = {
  available: "border-emerald-200 bg-emerald-50 text-emerald-900",
  reserved: "border-amber-200 bg-amber-50 text-amber-900",
  hold: "border-rose-200 bg-rose-50 text-rose-900",
  maintenance: "border-slate-300 bg-slate-100 text-slate-800",
} as const;

const forecastStyles = {
  clear: "border-emerald-200 bg-emerald-50 text-emerald-900",
  tight: "border-amber-200 bg-amber-50 text-amber-900",
  conflict: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

export function AssetCard({
  asset,
  bundleHint,
  categoryLabel,
  forecast,
  focused,
  planned,
  preview,
  onFocus,
  onTogglePlan,
}: AssetCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 transition ${
        focused
          ? "border-cyan-700 bg-cyan-950 text-white shadow-[0_20px_70px_-42px_rgba(8,145,178,0.85)]"
          : planned
            ? "border-cyan-200 bg-cyan-50/80 text-slate-900 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.28)]"
            : "border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)] hover:-translate-y-0.5 hover:border-cyan-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                focused
                  ? "border-white/20 bg-white/10 text-white"
                  : availabilityStyles[asset.availability]
              }`}
            >
              {asset.availability}
            </span>
            {forecast ? (
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                  focused
                    ? "border-white/20 bg-white/10 text-white"
                    : forecastStyles[forecast.status]
                }`}
              >
                {forecast.coverageLabel}
              </span>
            ) : null}
            <span
              className={`text-xs font-medium uppercase tracking-[0.2em] ${
                focused ? "text-cyan-100" : "text-slate-500"
              }`}
            >
              {categoryLabel}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{asset.name}</h2>
            <p
              className={`mt-1 text-sm leading-6 ${
                focused ? "text-cyan-50" : planned ? "text-slate-700" : "text-slate-600"
              }`}
            >
              {asset.summary}
            </p>
          </div>
        </div>
        <div
          className={`rounded-2xl border px-3 py-2 text-right text-xs ${
            focused
              ? "border-white/15 bg-white/10 text-cyan-50"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <p>{asset.sku}</p>
          <p className="mt-1">{asset.zone}</p>
          <p className="mt-2">{asset.prepLead} prep</p>
        </div>
      </div>

      {bundleHint ? (
        <div
          className={`mt-4 rounded-2xl px-3 py-3 text-sm ${
            focused
              ? "bg-white/10 text-cyan-50"
              : "border border-cyan-200 bg-cyan-50 text-cyan-900"
          }`}
        >
          Top bundle fit: <span className="font-semibold">{bundleHint}</span>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.2em] ${
              focused ? "text-cyan-100" : "text-slate-500"
            }`}
          >
            Kit Includes
          </p>
          <ul
            className={`mt-2 space-y-2 text-sm ${
              focused ? "text-cyan-50" : "text-slate-700"
            }`}
          >
            {asset.kit.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] ${
                focused ? "text-cyan-100" : "text-slate-500"
              }`}
            >
              Planning Notes
            </p>
            <p
              className={`mt-2 text-sm ${
                focused ? "text-cyan-50" : "text-slate-700"
              }`}
            >
              {forecast?.note ?? asset.nextWindow}
            </p>
          </div>
          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] ${
                focused ? "text-cyan-100" : "text-slate-500"
              }`}
            >
              Crew Fit
            </p>
            <p
              className={`mt-2 text-sm ${
                focused ? "text-cyan-50" : "text-slate-700"
              }`}
            >
              {asset.crewFit}
            </p>
          </div>
          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] ${
                focused ? "text-cyan-100" : "text-slate-500"
              }`}
            >
              Condition
            </p>
            <p
              className={`mt-2 text-sm ${
                focused ? "text-cyan-50" : "text-slate-700"
              }`}
            >
              {asset.condition}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {asset.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              focused
                ? "bg-white/10 text-cyan-50"
                : planned
                  ? "bg-white text-slate-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`text-sm ${
            focused ? "text-cyan-50" : planned ? "text-slate-700" : "text-slate-600"
          }`}
        >
          {preview
            ? `Reservation preview: ${preview.project}`
            : planned
              ? "Added to the reservation draft."
              : "Not yet attached to the active reservation draft."}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            aria-label={`${focused ? "Hide" : "Inspect"} asset: ${asset.name}`}
            aria-pressed={focused}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              focused
                ? "bg-white text-cyan-950 hover:bg-cyan-50"
                : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
            }`}
            onClick={onFocus}
            type="button"
          >
            {focused ? "Hide details" : "Inspect"}
          </button>
          <button
            aria-label={`${planned ? "Remove from" : "Add to"} reservation: ${
              asset.name
            }`}
            aria-pressed={planned}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              focused
                ? "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                : "bg-cyan-950 text-white hover:bg-cyan-900"
            }`}
            onClick={onTogglePlan}
            type="button"
          >
            {planned ? "Remove from draft" : "Add to reservation"}
          </button>
        </div>
      </div>
    </article>
  );
}
