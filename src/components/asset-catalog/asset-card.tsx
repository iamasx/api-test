import type { AssetCatalogItem, ReservationPreview } from "@/app/asset-catalog/mock-data";

type AssetCardProps = {
  asset: AssetCatalogItem;
  categoryLabel: string;
  preview: ReservationPreview | null;
  selected: boolean;
  onSelect: () => void;
};

const availabilityStyles = {
  available: "border-emerald-200 bg-emerald-50 text-emerald-900",
  reserved: "border-amber-200 bg-amber-50 text-amber-900",
  hold: "border-rose-200 bg-rose-50 text-rose-900",
  maintenance: "border-slate-300 bg-slate-100 text-slate-800",
} as const;

export function AssetCard({ asset, categoryLabel, preview, selected, onSelect }: AssetCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 transition ${
        selected
          ? "border-cyan-700 bg-cyan-950 text-white shadow-[0_20px_70px_-42px_rgba(8,145,178,0.85)]"
          : "border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)] hover:-translate-y-0.5 hover:border-cyan-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${selected ? "border-white/20 bg-white/10 text-white" : availabilityStyles[asset.availability]}`}>
              {asset.availability}
            </span>
            <span className={`text-xs font-medium uppercase tracking-[0.2em] ${selected ? "text-cyan-100" : "text-slate-500"}`}>{categoryLabel}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{asset.name}</h2>
            <p className={`mt-1 text-sm leading-6 ${selected ? "text-cyan-50" : "text-slate-600"}`}>{asset.summary}</p>
          </div>
        </div>
        <div className={`rounded-2xl border px-3 py-2 text-right text-xs ${selected ? "border-white/15 bg-white/10 text-cyan-50" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
          <p>{asset.sku}</p>
          <p className="mt-1">{asset.zone}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className={`text-xs uppercase tracking-[0.2em] ${selected ? "text-cyan-100" : "text-slate-500"}`}>Kit Includes</p>
          <ul className={`mt-2 space-y-2 text-sm ${selected ? "text-cyan-50" : "text-slate-700"}`}>
            {asset.kit.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <div>
            <p className={`text-xs uppercase tracking-[0.2em] ${selected ? "text-cyan-100" : "text-slate-500"}`}>Next Window</p>
            <p className={`mt-2 text-sm ${selected ? "text-cyan-50" : "text-slate-700"}`}>{asset.nextWindow}</p>
          </div>
          <div>
            <p className={`text-xs uppercase tracking-[0.2em] ${selected ? "text-cyan-100" : "text-slate-500"}`}>Condition</p>
            <p className={`mt-2 text-sm ${selected ? "text-cyan-50" : "text-slate-700"}`}>{asset.condition}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {asset.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${selected ? "bg-white/10 text-cyan-50" : "bg-slate-100 text-slate-600"}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${selected ? "text-cyan-50" : "text-slate-600"}`}>
          {preview ? `Reservation preview: ${preview.project}` : "No reservation preview attached yet."}
        </p>
        <button
          aria-label={`${selected ? "Clear" : "Preview"} reservation: ${asset.name}`}
          aria-pressed={selected}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selected
              ? "bg-white text-cyan-950 hover:bg-cyan-50"
              : "bg-cyan-950 text-white hover:bg-cyan-900"
          }`}
          onClick={onSelect}
          type="button"
        >
          {selected ? "Clear preview" : "Preview reservation"}
        </button>
      </div>
    </article>
  );
}
