import type { ParcelHubParcel } from "../_data/parcel-hub-data";
import styles from "../parcel-hub.module.css";

type ParcelSummaryCardProps = {
  parcel: ParcelHubParcel;
};

const statusToneMap: Record<ParcelHubParcel["status"], string> = {
  Manifested: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Queued: "border-slate-200 bg-slate-100 text-slate-700",
  Delayed: "border-amber-200 bg-amber-50 text-amber-800",
  Exception: "border-rose-200 bg-rose-50 text-rose-800",
};

export function ParcelSummaryCard({ parcel }: ParcelSummaryCardProps) {
  const titleId = `${parcel.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${styles.parcelCard}`}
      data-status={parcel.status}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusToneMap[parcel.status]}`}
            >
              {parcel.status}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {parcel.serviceLevel}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {parcel.trackingCode}
            </span>
          </div>

          <h3
            id={titleId}
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950"
          >
            {parcel.recipient}
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {parcel.destination}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Parcel owner
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {parcel.owner}
          </p>
          <p className="mt-2 text-sm text-slate-600">{parcel.checkpointLabel}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-700">{parcel.summary}</p>

      <dl className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Packages
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            {parcel.packageCount}
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Weight
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-950">
            {parcel.weightKg} kg
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Promise window
          </dt>
          <dd className="mt-2 text-sm font-semibold text-slate-950">
            {parcel.promiseWindow}
          </dd>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Exception value
          </dt>
          <dd className="mt-2 text-sm font-semibold text-slate-950">
            {parcel.exceptionValue}
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Next action
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-700">{parcel.nextAction}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {parcel.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
