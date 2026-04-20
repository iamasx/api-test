import {
  assetAvailabilityStateStyles,
  getAssetCategoryById,
  type CatalogAsset,
} from "@/data/asset-catalog";

type AssetCardProps = {
  item: CatalogAsset;
  selected: boolean;
  onSelect: (assetId: string) => void;
};

export function AssetCard({ item, selected, onSelect }: AssetCardProps) {
  const category = getAssetCategoryById(item.categoryId);
  const stateStyle = assetAvailabilityStateStyles[item.state];

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full rounded-[1.75rem] border p-5 text-left transition ${
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.75)]"
          : "border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {category?.shortLabel ?? "Catalog"} • {item.assetCode}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            selected ? stateStyle.selectedBadge : stateStyle.badge
          }`}
        >
          <span
            className={`mr-2 inline-flex h-2 w-2 rounded-full ${
              selected ? "bg-current/90" : stateStyle.dot
            }`}
          />
          {item.state}
        </span>
      </div>

      <p
        className={`mt-3 text-sm leading-6 ${
          selected ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {item.description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-2xl border px-4 py-3 ${
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.03]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Availability
          </dt>
          <dd className="mt-2 text-sm font-medium">{item.availability.summary}</dd>
        </div>
        <div
          className={`rounded-2xl border px-4 py-3 ${
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.03]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Release Window
          </dt>
          <dd className="mt-2 text-sm font-medium">
            {item.availability.releaseWindow}
          </dd>
        </div>
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-2xl border px-4 py-3 ${
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.03]"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Readiness
          </p>
          <p className="mt-2 text-sm font-medium">
            {item.availability.readyUnits} ready units • reserve floor{" "}
            {item.availability.reserveFloor}
          </p>
        </div>
        <div
          className={`rounded-2xl border px-4 py-3 ${
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.03]"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Assigned Lead
          </p>
          <p className="mt-2 text-sm font-medium">
            {item.availability.assignedLead}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              selected
                ? "border-white/12 bg-white/8 text-slate-100"
                : "border-slate-200 bg-slate-100 text-slate-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
