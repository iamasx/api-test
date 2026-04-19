type ParcelHubHeaderProps = { delayedParcels: number; openExceptions: number; resolvedExceptions: number; syncLabel: string; totalLanes: number; watchLanes: number };

export function ParcelHubHeader({
  delayedParcels,
  openExceptions,
  resolvedExceptions,
  syncLabel,
  totalLanes,
  watchLanes,
}: ParcelHubHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(24,24,27,0.88))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.42)] sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Parcel Hub</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Lane health, grouped parcels, and exception handling in one isolated route.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            Review outbound lanes, spot delay concentration by parcel group, and mark exception work as resolved without touching shared app state.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:w-[23rem]">
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-50">
            <p className="text-sm text-amber-100/80">Active lanes</p>
            <p className="mt-2 text-3xl font-semibold">{totalLanes}</p>
            <p className="mt-1 text-sm text-amber-100/80">{watchLanes} in delay watch</p>
          </div>
          <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-4 text-rose-50">
            <p className="text-sm text-rose-100/80">Delayed parcels</p>
            <p className="mt-2 text-3xl font-semibold">{delayedParcels}</p>
            <p className="mt-1 text-sm text-rose-100/80">{openExceptions} open exceptions</p>
          </div>
          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-50 sm:col-span-2">
            <p className="text-sm text-emerald-100/80">Resolution markers</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><p className="text-2xl font-semibold">{resolvedExceptions} resolved locally</p><p className="text-sm text-emerald-100/80">{syncLabel}</p></div>
          </div>
        </div>
      </div>
    </header>
  );
}
