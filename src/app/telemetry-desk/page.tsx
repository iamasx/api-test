import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telemetry Desk",
  description:
    "Live telemetry streams, signal health monitors, and ingestion pipeline status for archive-driven teams.",
};

const signalSources = [
  {
    id: "src-1",
    name: "Ingest Pipeline Alpha",
    status: "healthy" as const,
    throughput: "12.4k events/s",
    latency: "23ms p99",
    uptime: "99.97%",
  },
  {
    id: "src-2",
    name: "Archive Replay Stream",
    status: "degraded" as const,
    throughput: "3.1k events/s",
    latency: "142ms p99",
    uptime: "98.2%",
  },
  {
    id: "src-3",
    name: "Field Sensor Network",
    status: "healthy" as const,
    throughput: "8.7k events/s",
    latency: "34ms p99",
    uptime: "99.91%",
  },
  {
    id: "src-4",
    name: "Experiment Telemetry Bus",
    status: "down" as const,
    throughput: "0 events/s",
    latency: "—",
    uptime: "91.4%",
  },
];

const recentAlerts = [
  {
    id: "alert-1",
    severity: "critical",
    message: "Experiment Telemetry Bus unresponsive for 12m",
    timestamp: "2026-04-23T05:48:00Z",
  },
  {
    id: "alert-2",
    severity: "warning",
    message: "Archive Replay latency exceeding 100ms p99 threshold",
    timestamp: "2026-04-23T05:32:00Z",
  },
  {
    id: "alert-3",
    severity: "info",
    message: "Ingest Pipeline Alpha scaled to 3 replicas",
    timestamp: "2026-04-23T05:10:00Z",
  },
];

function statusColor(status: "healthy" | "degraded" | "down") {
  switch (status) {
    case "healthy":
      return "bg-emerald-500";
    case "degraded":
      return "bg-amber-500";
    case "down":
      return "bg-red-500";
  }
}

function severityBadge(severity: string) {
  switch (severity) {
    case "critical":
      return "border-red-300 bg-red-50 text-red-700";
    case "warning":
      return "border-amber-300 bg-amber-50 text-amber-700";
    default:
      return "border-sky-300 bg-sky-50 text-sky-700";
  }
}

export default function TelemetryDeskPage() {
  const healthyCount = signalSources.filter(
    (s) => s.status === "healthy"
  ).length;
  const degradedCount = signalSources.filter(
    (s) => s.status === "degraded"
  ).length;
  const downCount = signalSources.filter((s) => s.status === "down").length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-[var(--section-gap)] px-6 py-12 sm:px-10 lg:px-12">
      {/* Hero */}
      <section className="telemetry-hero section-card border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="space-y-4">
          <p className="section-label text-[var(--telemetry-accent)]">
            Telemetry Desk
          </p>
          <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
            Signal health, ingestion throughput, and pipeline status at a glance.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            The telemetry desk consolidates live signal sources, latency
            monitors, and alert feeds into a single operational view for
            teams managing archive ingestion pipelines.
          </p>
        </div>

        {/* KPI row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[var(--card-radius)] border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="section-label text-emerald-600">Healthy</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-700">
              {healthyCount}
            </p>
          </div>
          <div className="rounded-[var(--card-radius)] border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="section-label text-amber-600">Degraded</p>
            <p className="mt-1 text-3xl font-semibold text-amber-700">
              {degradedCount}
            </p>
          </div>
          <div className="rounded-[var(--card-radius)] border border-red-200 bg-red-50 px-5 py-4">
            <p className="section-label text-red-600">Down</p>
            <p className="mt-1 text-3xl font-semibold text-red-700">
              {downCount}
            </p>
          </div>
        </div>
      </section>

      {/* Signal sources */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <p className="section-label text-slate-500">Signal Sources</p>
        <div className="mt-6 space-y-4">
          {signalSources.map((source) => (
            <div
              key={source.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/75 px-5 py-4"
            >
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${statusColor(source.status)}`}
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{source.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {source.throughput} · {source.latency} · Uptime{" "}
                  {source.uptime}
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {source.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent alerts */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <p className="section-label text-slate-500">Recent Alerts</p>
        <div className="mt-6 space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/75 px-5 py-4"
            >
              <span
                className={`mt-0.5 inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${severityBadge(alert.severity)}`}
              >
                {alert.severity}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700">{alert.message}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
