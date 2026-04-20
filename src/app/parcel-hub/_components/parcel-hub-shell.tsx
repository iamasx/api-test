import Link from "next/link";

import type { ParcelHubView } from "../_data/parcel-hub-data";
import { ExceptionDetailPanel } from "./exception-detail-panel";
import { ParcelLaneSection } from "./parcel-lane-section";

type ParcelHubShellProps = {
  view: ParcelHubView;
};

export function ParcelHubShell({ view }: ParcelHubShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef4f7_48%,#f8fafc_100%)] text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_110px_-42px_rgba(15,23,42,0.92)] sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Parcel Hub
            </p>
            <Link
              href="/"
              className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white/82 transition-colors hover:bg-white/8"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)]">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Monitor shipment lanes, parcel exceptions, and recovery moves from
                one parcel hub route.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                The parcel hub route keeps shipment lanes readable without a
                backend integration: each lane groups parcel summaries by release
                path, exception summaries show where promise risk is building, and
                the detail panel stays focused on the highest-pressure recovery
                action.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/74">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  {view.totalParcelCount} tracked parcels
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  {view.totalPackageCount} packages represented
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  {view.exceptions.length} exception summaries open
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Highlighted owner: {view.highlightedException.owner}
                </span>
              </div>
            </div>

            <div
              aria-label="Parcel hub metrics"
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
              role="list"
            >
              {view.metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
                  role="listitem"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/72">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="parcel-exception-summary" className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Exception summary
              </p>
              <h2
                id="parcel-exception-summary"
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
              >
                Open recovery work
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each summary card condenses the active issue, risk, and owner before
              you drill into the highlighted detail panel.
            </p>
          </div>

          <ul aria-label="Exception summaries" className="grid gap-4 lg:grid-cols-3">
            {view.exceptions.map((exception) => (
              <li key={exception.id}>
                <article className="rounded-[1.75rem] border border-slate-200 bg-white/88 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-72">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {exception.code}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                        {exception.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {exception.severity}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {exception.summary}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Lane
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">
                        {exception.lane.name}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Owner
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">
                        {exception.owner}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-600">
                    {exception.valueAtRisk}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_380px]">
          <section aria-labelledby="shipment-lanes-heading" className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Shipment lanes
                </p>
                <h2
                  id="shipment-lanes-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Lane-by-lane parcel flow
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Lane sections keep the route operationally useful by combining
                release context, parcel cards, and exception counts in the same
                scan path.
              </p>
            </div>

            {view.lanes.map((lane) => (
              <ParcelLaneSection key={lane.id} lane={lane} />
            ))}
          </section>

          <ExceptionDetailPanel exception={view.highlightedException} />
        </div>
      </main>
    </div>
  );
}
