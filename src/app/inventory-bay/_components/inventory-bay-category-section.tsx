import {
  inventoryBayBands,
  type InventoryBaySection,
} from "../_data/inventory-bay-data";
import { InventoryBayCard } from "./inventory-bay-card";

type InventoryBayCategorySectionProps = {
  section: InventoryBaySection;
};

export function InventoryBayCategorySection({
  section,
}: InventoryBayCategorySectionProps) {
  const titleId = `${section.id}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.94))] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:p-7"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {section.bay}
          </p>
          <h2
            id={titleId}
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {section.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {section.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {section.items.length} SKUs
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {section.availableToPromise} ATP units
          </span>
          {inventoryBayBands
            .filter((band) => section.bandCounts[band.id] > 0)
            .map((band) => (
              <span
                key={band.id}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${band.badgeClassName}`}
              >
                {section.bandCounts[band.id]} {band.name}
              </span>
            ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {section.items.map((item) => {
          const band = inventoryBayBands.find((entry) => entry.id === item.bandId);

          if (!band) {
            return null;
          }

          return <InventoryBayCard key={item.id} item={item} band={band} />;
        })}
      </div>
    </section>
  );
}
