import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Queue Monitor",
  description:
    "Real-time queue depth monitoring with throughput metrics and parcel-hub cross-links.",
};

const queueLanes = [
  {
    id: "inbound",
    label: "Inbound",
    depth: 142,
    throughput: "38/min",
    status: "healthy" as const,
    trend: "+4%",
  },
  {
    id: "sorting",
    label: "Sorting",
    depth: 87,
    throughput: "31/min",
    status: "warning" as const,
    trend: "-2%",
  },
  {
    id: "dispatch",
    label: "Dispatch",
    depth: 56,
    throughput: "29/min",
    status: "healthy" as const,
    trend: "+1%",
  },
  {
    id: "returns",
    label: "Returns",
    depth: 23,
    throughput: "12/min",
    status: "critical" as const,
    trend: "-11%",
  },
  {
    id: "held",
    label: "Held / Review",
    depth: 9,
    throughput: "3/min",
    status: "warning" as const,
    trend: "+7%",
  },
];

const parcelCrossLinks = [
  { parcelId: "PCL-4401", lane: "Sorting", hub: "West Hub", eta: "14:32" },
  { parcelId: "PCL-4402", lane: "Dispatch", hub: "Central Hub", eta: "14:45" },
  { parcelId: "PCL-4403", lane: "Returns", hub: "East Hub", eta: "15:10" },
  { parcelId: "PCL-4404", lane: "Inbound", hub: "West Hub", eta: "13:58" },
];

const statusColor: Record<string, string> = {
  healthy: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  critical: "bg-red-100 text-red-800 border-red-200",
};

export default function QueueMonitorPage() {
  const totalDepth = queueLanes.reduce((sum, l) => sum + l.depth, 0);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      {/* Hero */}
      <section className="queue-monitor-hero overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#fefce8_0%,#ffffff_42%,#ecfdf5_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="ops-badge">Live Monitoring</span>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Queue telemetry
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
                Monitor queue depth, throughput, and lane health in real time.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                The queue monitor tracks parcel volume across five operational
                lanes, surfacing bottlenecks and cross-linking items to their
                assigned parcel hub for end-to-end visibility.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to overview
              </Link>
              <Link
                href="/parcel-hub"
                className="queue-parcel-link inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open parcel hub
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="section-label text-slate-500">Queue snapshot</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {totalDepth} items
            </p>
            <p className="mt-1 text-sm text-slate-500">
              across {queueLanes.length} active lanes
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Avg throughput
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-950">
                  22.6 items/min
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Cross-hub parcels
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-950">
                  {parcelCrossLinks.length} tracked
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Lane cards */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="section-label text-slate-500">Lane overview</p>
          <h2 className="heading-tight text-3xl text-slate-950">
            Active queue lanes
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {queueLanes.map((lane) => (
            <div
              key={lane.id}
              className="queue-lane-card rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">
                  {lane.label}
                </h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide ${statusColor[lane.status]}`}
                >
                  {lane.status}
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                {lane.depth}
              </p>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                <span>{lane.throughput}</span>
                <span className="text-xs font-medium text-slate-400">
                  {lane.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parcel cross-links */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="section-label text-slate-500">
            Parcel hub cross-references
          </p>
          <h2 className="heading-tight text-3xl text-slate-950">
            Tracked parcels
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Parcel ID
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Lane
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">Hub</th>
                <th className="px-4 py-3 font-semibold text-slate-600">ETA</th>
              </tr>
            </thead>
            <tbody>
              {parcelCrossLinks.map((p) => (
                <tr
                  key={p.parcelId}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {p.parcelId}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.lane}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <Link
                      href="/parcel-hub"
                      className="text-[var(--ops-accent)] underline-offset-2 hover:underline"
                    >
                      {p.hub}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
