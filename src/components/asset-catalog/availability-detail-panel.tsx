import {
  assetAvailabilityStateCopy,
  getAssetCategoryById,
  type CatalogAsset,
} from "@/data/asset-catalog";

type AvailabilityDetailPanelProps = {
  item: CatalogAsset;
};

export function AvailabilityDetailPanel({
  item,
}: AvailabilityDetailPanelProps) {
  const category = getAssetCategoryById(item.categoryId);

  return (
    <aside
      aria-label="Selected asset availability details"
      className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.85)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Focused Asset
      </p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{item.name}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {category?.name ?? "Catalog"} • {item.assetCode}
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white">
          {item.state}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-300">{item.missionFit}</p>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          State Readout
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-200">
          {assetAvailabilityStateCopy[item.state]}
        </p>
      </div>

      <dl className="mt-6 grid gap-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Availability
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.summary}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Ready Units
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.readyUnits} ready • reserve floor{" "}
            {item.availability.reserveFloor}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Release Window
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.releaseWindow}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Next Transfer
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.nextTransfer}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Staging Location
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.stagingLocation}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Assigned Lead
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.assignedLead}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Supply Lane
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.supplyLane}
          </dd>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Last Audit
          </dt>
          <dd className="mt-2 text-sm font-medium text-white">
            {item.availability.lastAudit}
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-semibold text-white">Constraints</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {item.availability.constraints}
        </p>
      </div>
    </aside>
  );
}
