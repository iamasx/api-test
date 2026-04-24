import type { Metadata } from "next";
import Link from "next/link";

import { AllocationSummary } from "./_components/allocation-summary";
import { AvailabilitySnapshotCard } from "./_components/availability-snapshot";
import { ReservationCard } from "./_components/reservation-card";
import {
  reserveBayAllocations,
  reserveBayAvailability,
  reserveBayReservations,
  reserveBaySummary,
  type AvailabilityLevel,
} from "./_data/reserve-bay-data";
import styles from "./reserve-bay.module.css";

export const metadata: Metadata = {
  title: "Reserve Bay",
  description:
    "Dock reservation cards, real-time availability snapshots, and a compact bay allocation summary.",
};

const levelToneClasses: Record<AvailabilityLevel, string> = {
  high: "border-emerald-300/30 bg-emerald-300/15 text-emerald-50",
  moderate: "border-amber-300/30 bg-amber-300/15 text-amber-50",
  low: "border-rose-300/30 bg-rose-300/15 text-rose-50",
};

export default function ReserveBayPage() {
  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/60 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            <span aria-hidden="true">&larr;</span> Home
          </Link>
          <span className="ops-badge">Dock management</span>
        </div>

        <section className={`${styles.surfaceCard} ${styles.heroPanel} p-6 sm:p-8 lg:p-10`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.95fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/75">
                  {reserveBaySummary.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    {reserveBaySummary.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-100/78 sm:text-lg">
                    {reserveBaySummary.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {reserveBaySummary.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`inline-flex min-w-[11rem] flex-col rounded-2xl border px-4 py-3 ${levelToneClasses[stat.tone]}`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                      {stat.label}
                    </span>
                    <span className="mt-2 text-2xl font-semibold text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className={`${styles.surfaceCard} rounded-[1.5rem] bg-white/12 p-5 sm:p-6`}>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                    Current shift
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Morning dock operations
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-100/78">
                  <p>Shift A · Dock supervisor on call</p>
                  <p>Updated 5 minutes ago</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Immediate focus
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Clear Zone A congestion before the 09:00 inbound surge window opens.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Overflow note
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Zone C flex bays are available for spillover if inbound volume exceeds forecast.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="reserve-bay-availability" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Zone overview
              </p>
              <h2
                id="reserve-bay-availability"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Availability snapshot
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Real-time bay occupancy across all facility zones with peak window indicators.
            </p>
          </div>

          <div
            aria-label="Availability zones"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            role="list"
          >
            {reserveBayAvailability.map((snapshot) => (
              <AvailabilitySnapshotCard key={snapshot.id} snapshot={snapshot} />
            ))}
          </div>
        </section>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)]"
          data-testid="reserve-bay-panels"
        >
          <section aria-labelledby="reserve-bay-reservations" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Dock schedule
                </p>
                <h2
                  id="reserve-bay-reservations"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Reservations
                </h2>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Active and upcoming bay reservations ordered by time window.
              </p>
            </div>
            <ul aria-label="Reservations" className="space-y-4">
              {reserveBayReservations.map((reservation) => (
                <li key={reservation.id}>
                  <ReservationCard reservation={reservation} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="reserve-bay-allocation" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Capacity planning
              </p>
              <h2
                id="reserve-bay-allocation"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Allocation summary
              </h2>
            </div>
            <AllocationSummary allocations={reserveBayAllocations} />
          </section>
        </div>
      </div>
    </main>
  );
}
