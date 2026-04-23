import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parcel Hub",
  description:
    "Regional parcel hub dashboard with volume tracking, queue monitor integration, and SLA metrics.",
};

const hubs = [
  {
    id: "west",
    name: "West Hub",
    region: "Pacific Northwest",
    parcelsInTransit: 1284,
    parcelsDelivered: 4390,
    slaCompliance: 96.2,
    activeQueues: 3,
    status: "operational" as const,
  },
  {
    id: "central",
    name: "Central Hub",
    region: "Midwest",
    parcelsInTransit: 2107,
    parcelsDelivered: 6812,
    slaCompliance: 94.8,
    activeQueues: 4,
    status: "operational" as const,
  },
  {
    id: "east",
    name: "East Hub",
    region: "Northeast Corridor",
    parcelsInTransit: 1893,
    parcelsDelivered: 5641,
    slaCompliance: 91.3,
    activeQueues: 5,
    status: "degraded" as const,
  },
  {
    id: "south",
    name: "South Hub",
    region: "Gulf States",
    parcelsInTransit: 978,
    parcelsDelivered: 3205,
    slaCompliance: 97.1,
    activeQueues: 2,
    status: "operational" as const,
  },
];

const recentTransfers = [
  {
    id: "TRF-801",
    from: "West Hub",
    to: "Central Hub",
    count: 48,
    priority: "standard",
  },
  {
    id: "TRF-802",
    from: "East Hub",
    to: "South Hub",
    count: 23,
    priority: "express",
  },
  {
    id: "TRF-803",
    from: "Central Hub",
    to: "West Hub",
    count: 61,
    priority: "standard",
  },
  {
    id: "TRF-804",
    from: "South Hub",
    to: "East Hub",
    count: 15,
    priority: "express",
  },
  {
    id: "TRF-805",
    from: "West Hub",
    to: "East Hub",
    count: 34,
    priority: "standard",
  },
];

const hubStatusColor: Record<string, string> = {
  operational: "bg-emerald-100 text-emerald-800 border-emerald-200",
  degraded: "bg-amber-100 text-amber-800 border-amber-200",
  offline: "bg-red-100 text-red-800 border-red-200",
};

export default function ParcelHubPage() {
  const totalInTransit = hubs.reduce((s, h) => s + h.parcelsInTransit, 0);
  const totalDelivered = hubs.reduce((s, h) => s + h.parcelsDelivered, 0);
  const avgSla = (
    hubs.reduce((s, h) => s + h.slaCompliance, 0) / hubs.length
  ).toFixed(1);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      {/* Hero */}
      <section className="parcel-hub-hero overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_42%,#fefce8_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="ops-badge">Hub Network</span>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Parcel logistics
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
                Track parcel volume, SLA compliance, and hub-to-hub transfers.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                The parcel hub dashboard consolidates regional volume snapshots,
                inter-hub transfer activity, and live queue monitor
                cross-references so dispatchers can balance load across the
                network.
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
                href="/queue-monitor"
                className="queue-parcel-link inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open queue monitor
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="section-label text-slate-500">Network snapshot</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  In transit
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {totalInTransit.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Delivered today
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {totalDelivered.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Avg SLA compliance
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {avgSla}%
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Hub cards */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="section-label text-slate-500">Regional hubs</p>
          <h2 className="heading-tight text-3xl text-slate-950">
            Hub status overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="parcel-hub-card rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">
                  {hub.name}
                </h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide ${hubStatusColor[hub.status]}`}
                >
                  {hub.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{hub.region}</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xl font-semibold text-slate-950">
                    {hub.parcelsInTransit.toLocaleString()}
                  </p>
                  <p className="text-[0.6875rem] text-slate-500">In transit</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-950">
                    {hub.slaCompliance}%
                  </p>
                  <p className="text-[0.6875rem] text-slate-500">SLA</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-950">
                    {hub.activeQueues}
                  </p>
                  <p className="text-[0.6875rem] text-slate-500">
                    <Link
                      href="/queue-monitor"
                      className="text-[var(--ops-accent)] underline-offset-2 hover:underline"
                    >
                      Queues
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transfers */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="section-label text-slate-500">Inter-hub activity</p>
          <h2 className="heading-tight text-3xl text-slate-950">
            Recent transfers
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Transfer
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  From
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">To</th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Parcels
                </th>
                <th className="px-4 py-3 font-semibold text-slate-600">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransfers.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {t.id}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.from}</td>
                  <td className="px-4 py-3 text-slate-600">{t.to}</td>
                  <td className="px-4 py-3 text-slate-600">{t.count}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold uppercase ${
                        t.priority === "express"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
