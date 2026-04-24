import type { Reservation, ReservationStatus } from "../_data/reserve-bay-data";
import styles from "../reserve-bay.module.css";

const statusToneClasses: Record<ReservationStatus, string> = {
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  expired: "border-slate-200 bg-slate-100 text-slate-600",
};

const statusLabel: Record<ReservationStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  expired: "Expired",
};

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <article
      role="listitem"
      className={`${styles.surfaceCard} ${styles.reservationCard} p-5 sm:p-6`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${statusToneClasses[reservation.status]}`}
            >
              {statusLabel[reservation.status]}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Bay {reservation.bayCode}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">
              {reservation.carrier}
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {reservation.notes}
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {reservation.windowStart}–{reservation.windowEnd}
        </p>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Trailer
          </p>
          <p className="mt-2 font-medium">{reservation.trailerId}</p>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Load type
          </p>
          <p className="mt-2 font-medium">{reservation.loadType}</p>
        </div>
      </div>
    </article>
  );
}
