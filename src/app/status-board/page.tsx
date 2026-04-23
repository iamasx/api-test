import type { Metadata } from "next";
import Link from "next/link";

import { HealthSummary } from "./_components/health-summary";
import { ServiceCard } from "./_components/service-card";
import { UptimeBar } from "./_components/uptime-bar";
import { getStatusBoardView } from "./_data/status-board-data";

export const metadata: Metadata = {
  title: "Status Board",
  description: "Service health dashboard with live status, latency metrics, and incident timeline.",
};

export default function StatusBoardPage() {
  const { services, incidents, summary } = getStatusBoardView();

  return (
    <main className="min-h-screen bg-[#f0f4f8]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Header */}
        <section className="rounded-[2rem] bg-white/90 p-8 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Service Health
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Status Board
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Real-time service health overview with latency metrics, uptime tracking, and active incident notes.
            </p>
          </div>

          {/* Summary counters */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Services</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.total}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Healthy</p>
              <p className="mt-1 text-2xl font-semibold text-emerald-700">{summary.healthy}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Degraded</p>
              <p className="mt-1 text-2xl font-semibold text-amber-700">{summary.degraded}</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Down</p>
              <p className="mt-1 text-2xl font-semibold text-rose-700">{summary.down}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Avg Latency</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.avgLatency}ms</p>
            </div>
          </div>
        </section>

        {/* Health summary banner */}
        <HealthSummary summary={summary} />

        {/* Service grid */}
        <section>
          <h2 className="mb-5 text-lg font-semibold text-slate-800">All Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((svc) => (
              <ServiceCard key={svc.id} item={svc} />
            ))}
          </div>
        </section>

        {/* Uptime overview */}
        <UptimeBar items={services} />

        {/* Incident timeline */}
        <section className="rounded-[2rem] bg-white/90 p-8 shadow-sm sm:p-10">
          <h2 className="text-lg font-semibold text-slate-800">Active Incidents</h2>
          <div className="mt-6 space-y-4">
            {incidents.map((note) => {
              const severityStyles: Record<string, string> = {
                critical: "border-rose-200 bg-rose-50/60 text-rose-700",
                warning: "border-amber-200 bg-amber-50/60 text-amber-700",
                info: "border-sky-200 bg-sky-50/60 text-sky-700",
              };
              return (
                <div
                  key={note.id}
                  className={`rounded-xl border p-4 ${severityStyles[note.severity] ?? "border-slate-200 bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                      {note.severity}
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date(note.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6">{note.message}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
