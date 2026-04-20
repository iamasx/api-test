import type { ParcelHubLaneView } from "../_data/parcel-hub-data";
import { ParcelSummaryCard } from "./parcel-summary-card";

type ParcelLaneSectionProps = {
  lane: ParcelHubLaneView;
};

const healthToneMap: Record<ParcelHubLaneView["health"], string> = {
  Stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Watch: "border-amber-200 bg-amber-50 text-amber-800",
  Exception: "border-rose-200 bg-rose-50 text-rose-800",
};

export function ParcelLaneSection({ lane }: ParcelLaneSectionProps) {
  const headingId = `${lane.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
      role="region"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${healthToneMap[lane.health]}`}
            >
              {lane.health}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {lane.routeLabel}
            </span>
          </div>

          <h2
            id={headingId}
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {lane.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{lane.summary}</p>
        </div>

        <div className="min-w-56 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Coordinator
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {lane.coordinator}
          </p>
          <p className="mt-2 text-sm text-slate-600">{lane.dock}</p>
          <p className="mt-1 text-sm text-slate-600">{lane.departureWindow}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Service mix
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {lane.serviceMix}
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Package count
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {lane.packageCount} packages
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Delayed or exception
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {lane.delayedParcelCount} parcels
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Open exceptions
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {lane.exceptionCount} summaries
          </p>
        </div>
      </div>

      <ul aria-label={`${lane.name} parcels`} className="mt-6 space-y-4">
        {lane.parcels.map((parcel) => (
          <li key={parcel.id}>
            <ParcelSummaryCard parcel={parcel} />
          </li>
        ))}
      </ul>
    </section>
  );
}
