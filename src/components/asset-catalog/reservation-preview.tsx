import type { AssetCatalogItem, ReservationPreview as ReservationPreviewData } from "@/app/asset-catalog/mock-data";

type ReservationPreviewProps = {
  asset: AssetCatalogItem | null;
  categoryLabel: string | null;
  preview: ReservationPreviewData | null;
  selectionHidden: boolean;
  onClearSelection: () => void;
  onResetFilters: () => void;
};

const availabilityCopy = {
  available: "Ready to be staged immediately.",
  reserved: "Already assigned to an upcoming checkout.",
  hold: "Blocked until the current hold condition is cleared.",
  maintenance: "Unavailable while service work is in progress.",
} as const;

export function ReservationPreview({
  asset,
  categoryLabel,
  preview,
  selectionHidden,
  onClearSelection,
  onResetFilters,
}: ReservationPreviewProps) {
  if (!asset) {
    return (
      <aside className="rounded-[1.9rem] border border-dashed border-slate-300 bg-white/80 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Reservation Preview</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">Select an asset to inspect its handoff plan.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The side panel stays empty until you choose a card from the catalog. Selection and preview copy stay local to this route.
        </p>
      </aside>
    );
  }

  if (selectionHidden) {
    return (
      <aside className="rounded-[1.9rem] border border-amber-200 bg-amber-50/90 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Reservation Preview</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-amber-950">{asset.name} is outside the current filters.</h2>
        <p className="mt-3 text-sm leading-6 text-amber-900">
          The asset is still selected, but the active search or availability filter removed it from the visible catalog.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-amber-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-900"
            onClick={onResetFilters}
            type="button"
          >
            Reset filters
          </button>
          <button
            className="rounded-full border border-amber-300 px-4 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-100"
            onClick={onClearSelection}
            type="button"
          >
            Clear selection
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="rounded-[1.9rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Reservation Preview</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{asset.name}</h2>
          <p className="mt-2 text-sm text-slate-600">{categoryLabel ?? asset.categoryId} - {asset.zone}</p>
        </div>
        <button
          className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          onClick={onClearSelection}
          type="button"
        >
          Deselect
        </button>
      </div>

      <div className="mt-5 rounded-[1.5rem] bg-slate-950 px-4 py-4 text-slate-50">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Availability</p>
        <p className="mt-2 text-xl font-semibold capitalize">{asset.availability}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{availabilityCopy[asset.availability]}</p>
      </div>

      {preview ? (
        <div className="mt-5 space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Requester</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{preview.requester}</p>
              <p className="mt-1 text-sm text-slate-600">{preview.project}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Handoff</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{preview.pickupWindow}</p>
              <p className="mt-1 text-sm text-slate-600">{preview.handoffZone}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Return window</p>
              <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-800">{preview.returnWindow}</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {preview.checklist.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-600">{preview.note}</p>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
          <p className="text-sm font-semibold text-slate-900">No reservation is attached to this asset yet.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {asset.nextWindow} This panel stays local and can represent either an empty scheduling slate or a simple ready-to-book handoff.
          </p>
        </div>
      )}
    </aside>
  );
}
