type AssetCatalogHeaderProps = {
  syncLabel: string;
  totalAssets: number;
  readyAssets: number;
  reservedAssets: number;
  attentionAssets: number;
};

export function AssetCatalogHeader({
  syncLabel,
  totalAssets,
  readyAssets,
  reservedAssets,
  attentionAssets,
}: AssetCatalogHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="bg-[linear-gradient(135deg,rgba(14,116,144,0.14),rgba(251,191,36,0.14),rgba(255,255,255,0.9))] px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700">Asset Catalog</p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Searchable checkout board for cameras, audio, lighting, and support gear.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Everything on this route is feature-local: mock inventory, availability logic, selection state, and reservation previews stay inside the asset catalog.
              </p>
            </div>
          </div>
          <div className="rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-2 text-sm font-medium text-cyan-900">
            {syncLabel}
          </div>
        </div>
      </div>
      <div className="grid gap-3 border-t border-slate-200/70 px-5 py-5 sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Catalog</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{totalAssets}</p>
          <p className="mt-1 text-sm text-slate-600">Mock assets in this isolated route.</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Ready Now</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-950">{readyAssets}</p>
          <p className="mt-1 text-sm text-emerald-800">Clear for immediate checkout.</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Reserved</p>
          <p className="mt-2 text-2xl font-semibold text-amber-950">{reservedAssets}</p>
          <p className="mt-1 text-sm text-amber-800">Already tied to a handoff window.</p>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-rose-700">Needs Attention</p>
          <p className="mt-2 text-2xl font-semibold text-rose-950">{attentionAssets}</p>
          <p className="mt-1 text-sm text-rose-800">Items on hold or in maintenance.</p>
        </div>
      </div>
    </section>
  );
}
