import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parcel Hub",
  description:
    "Scaffolded parcel hub route for shipment lanes, parcel summaries, and exception detail work.",
};

export default function ParcelHubPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:px-12 lg:py-14">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Issue 146 / Parcel Hub
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Parcel hub route scaffold for shipment lanes and exception detail.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                This initial shell reserves the route for the lane data, parcel
                summaries, exception presentation, and test coverage that follow
                in the next subtasks.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to overview
              </Link>
              <a
                href="#parcel-hub-next"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                View planned sections
              </a>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Planned sections
            </p>
            <ul id="parcel-hub-next" className="mt-5 space-y-4">
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600">
                Mock shipment lanes with route-specific owner and status data
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600">
                Parcel summary cards with lane placement and exception states
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600">
                Focused exception detail presentation and render coverage
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
