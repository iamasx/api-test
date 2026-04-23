import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Board",
  description:
    "Real-time service health dashboard with uptime indicators and incident history.",
};

interface ServiceEntry {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: string;
  lastIncident: string;
}

interface IncidentEntry {
  id: string;
  title: string;
  severity: "critical" | "major" | "minor";
  service: string;
  openedAt: string;
  resolvedAt: string | null;
}

const services: ServiceEntry[] = [
  { name: "API Gateway", status: "operational", uptime: "99.98%", lastIncident: "12 days ago" },
  { name: "Auth Service", status: "operational", uptime: "99.95%", lastIncident: "3 days ago" },
  { name: "Data Pipeline", status: "degraded", uptime: "98.72%", lastIncident: "2 hours ago" },
  { name: "Object Storage", status: "operational", uptime: "99.99%", lastIncident: "31 days ago" },
  { name: "Search Index", status: "outage", uptime: "97.40%", lastIncident: "Ongoing" },
  { name: "Notification Relay", status: "operational", uptime: "99.91%", lastIncident: "7 days ago" },
];

const recentIncidents: IncidentEntry[] = [
  {
    id: "INC-4021",
    title: "Search Index cluster unresponsive after shard rebalance",
    severity: "critical",
    service: "Search Index",
    openedAt: "2026-04-23T08:14:00Z",
    resolvedAt: null,
  },
  {
    id: "INC-4020",
    title: "Data Pipeline throughput drop during upstream schema migration",
    severity: "major",
    service: "Data Pipeline",
    openedAt: "2026-04-23T06:30:00Z",
    resolvedAt: null,
  },
  {
    id: "INC-4019",
    title: "Auth Service elevated 401 rate from expired token cache",
    severity: "minor",
    service: "Auth Service",
    openedAt: "2026-04-20T14:05:00Z",
    resolvedAt: "2026-04-20T15:22:00Z",
  },
  {
    id: "INC-4018",
    title: "API Gateway intermittent 502s on /v2/batch endpoint",
    severity: "major",
    service: "API Gateway",
    openedAt: "2026-04-11T09:48:00Z",
    resolvedAt: "2026-04-11T11:03:00Z",
  },
];

const statusColor: Record<ServiceEntry["status"], string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
};

const statusLabel: Record<ServiceEntry["status"], string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

const severityStyle: Record<IncidentEntry["severity"], string> = {
  critical:
    "border-red-200 bg-red-50 text-red-700",
  major:
    "border-amber-200 bg-amber-50 text-amber-700",
  minor:
    "border-slate-200 bg-slate-50 text-slate-600",
};

export default function StatusBoardPage() {
  const operational = services.filter((s) => s.status === "operational").length;
  const total = services.length;

  return (
    <main className="status-board mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <header className="space-y-3">
        <p className="section-label text-[var(--status-accent)]">
          Status Board
        </p>
        <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
          Service health overview and incident timeline.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Monitor uptime across critical services, review recent incidents, and
          track resolution progress from a single view.
        </p>
      </header>

      {/* ── Summary bar ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="status-summary-card rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Services</p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">{total}</p>
        </div>
        <div className="status-summary-card rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Operational</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-700">{operational}/{total}</p>
        </div>
        <div className="status-summary-card rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Open Incidents</p>
          <p className="mt-1 text-2xl font-semibold text-red-700">
            {recentIncidents.filter((i) => !i.resolvedAt).length}
          </p>
        </div>
      </div>

      {/* ── Service health grid ── */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Service Health</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="status-service-card flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/75 px-4 py-4"
            >
              <span
                className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${statusColor[svc.status]}`}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{svc.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {statusLabel[svc.status]} &middot; {svc.uptime} uptime
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Last incident: {svc.lastIncident}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Incident timeline ── */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Recent Incidents</p>
        <ul className="mt-5 space-y-3">
          {recentIncidents.map((inc) => (
            <li
              key={inc.id}
              className={`rounded-2xl border px-5 py-4 ${severityStyle[inc.severity]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{inc.id}</span>
                <span className="rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide">
                  {inc.severity}
                </span>
                {!inc.resolvedAt && (
                  <span className="ml-auto text-[0.625rem] font-semibold uppercase tracking-wide text-red-600">
                    Open
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug">{inc.title}</p>
              <p className="mt-1 text-xs opacity-70">
                {inc.service} &middot; Opened {inc.openedAt.slice(0, 10)}
                {inc.resolvedAt && ` · Resolved ${inc.resolvedAt.slice(0, 10)}`}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
