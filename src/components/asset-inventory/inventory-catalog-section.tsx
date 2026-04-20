import type { InventorySection } from "@/data/asset-inventory";

import { InventoryCard } from "./inventory-card";

type InventoryCatalogSectionProps = {
  section: InventorySection;
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
};

export function InventoryCatalogSection({
  section,
  selectedItemId,
  onSelectItem,
}: InventoryCatalogSectionProps) {
  return (
    <section
      aria-labelledby={`${section.id}-section-title`}
      className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <div
        className={`rounded-[1.5rem] border border-transparent bg-gradient-to-r px-5 py-5 ${section.accent}`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Catalog Section
            </p>
            <h2
              id={`${section.id}-section-title`}
              className="mt-2 text-2xl font-semibold text-slate-950"
            >
              {section.name}
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {section.items.length} items • {section.totalUnits} units tracked
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
          {section.description}
        </p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {section.items.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            selected={item.id === selectedItemId}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </section>
  );
}
