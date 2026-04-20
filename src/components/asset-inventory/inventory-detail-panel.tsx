import {
  getInventoryCategoryById,
  inventoryStatusStyles,
  type InventoryItem,
} from "@/data/asset-inventory";

type InventoryDetailPanelProps = {
  item: InventoryItem;
};

export function InventoryDetailPanel({ item }: InventoryDetailPanelProps) {
  const category = getInventoryCategoryById(item.categoryId);
  const statusStyle = inventoryStatusStyles[item.status];

  return (
    <aside
      aria-label="Selected inventory item details"
      className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.85)] xl:sticky xl:top-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Selected Asset
      </p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{item.name}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {category?.name ?? "Inventory"} • SKU {item.sku}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`} />
          {item.status}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-300">{item.description}</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Availability
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Available Units
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availableUnits}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Location
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">{item.location}</dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Owner
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">{item.owner}</dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Last Checked
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.lastChecked}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Service Window
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.serviceWindow}
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold text-white">Operational Notes</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{item.notes}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Tags
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
