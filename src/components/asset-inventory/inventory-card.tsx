import {
  getInventoryCategoryById,
  inventoryStatusStyles,
  type InventoryItem,
} from "@/data/asset-inventory";

type InventoryCardProps = {
  item: InventoryItem;
  selected: boolean;
  onSelect: (itemId: string) => void;
};

export function InventoryCard({
  item,
  selected,
  onSelect,
}: InventoryCardProps) {
  const category = getInventoryCategoryById(item.categoryId);
  const statusStyle = inventoryStatusStyles[item.status];

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full rounded-[1.75rem] border p-5 text-left transition ${
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.75)]"
          : "border-slate-200 bg-white/90 text-slate-950 hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.22em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {category?.name ?? "Uncategorized"}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
            selected
              ? "border-white/20 bg-white/8 text-white"
              : statusStyle.badge
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              selected ? "bg-white" : statusStyle.dot
            }`}
          />
          {item.status}
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
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.04]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Status
          </dt>
          <dd className="mt-2 text-sm font-medium">{item.status}</dd>
        </div>
        <div
          className={`rounded-2xl border px-4 py-3 ${
            selected ? "border-white/10 bg-white/8" : "border-black/5 bg-black/[0.04]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Availability
          </dt>
          <dd className="mt-2 text-sm font-medium">{item.availability}</dd>
        </div>
      </dl>
    </button>
  );
}
