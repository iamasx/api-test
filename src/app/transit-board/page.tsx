import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transit Board",
  description:
    "Corridor summaries, movement cards, and delay highlights for transit operations.",
};

interface Corridor {
  id: string;
  name: string;
  direction: string;
  status: "flowing" | "congested" | "blocked";
  activeMovements: number;
  avgTransitMin: number;
  onTimeRate: string;
}

interface Movement {
  id: string;
  label: string;
  corridor: string;
  origin: string;
  destination: string;
  status: "in-transit" | "arrived" | "delayed" | "scheduled";
  departedAt: string;
  eta: string;
  cargoType: string;
}

interface DelayHighlight {
  id: string;
  movementId: string;
  corridor: string;
  reason: string;
  delayMin: number;
  severity: "low" | "moderate" | "high";
  reportedAt: string;
}

const corridors: Corridor[] = [
  { id: "COR-N1", name: "North Arterial", direction: "Northbound", status: "flowing", activeMovements: 12, avgTransitMin: 34, onTimeRate: "94%" },
  { id: "COR-E2", name: "East Connector", direction: "Eastbound", status: "congested", activeMovements: 8, avgTransitMin: 52, onTimeRate: "78%" },
  { id: "COR-S3", name: "South Bypass", direction: "Southbound", status: "flowing", activeMovements: 15, avgTransitMin: 28, onTimeRate: "91%" },
  { id: "COR-W4", name: "West Loop", direction: "Westbound", status: "blocked", activeMovements: 3, avgTransitMin: 87, onTimeRate: "42%" },
  { id: "COR-C5", name: "Central Trunk", direction: "Bidirectional", status: "flowing", activeMovements: 20, avgTransitMin: 19, onTimeRate: "97%" },
];

const movements: Movement[] = [
  { id: "MV-1001", label: "Express Freight Alpha", corridor: "North Arterial", origin: "Depot A", destination: "Terminal 7", status: "in-transit", departedAt: "2026-04-25T06:15:00Z", eta: "2026-04-25T06:49:00Z", cargoType: "Priority parcels" },
  { id: "MV-1002", label: "Bulk Transfer Bravo", corridor: "East Connector", origin: "Yard 3", destination: "Hub East", status: "delayed", departedAt: "2026-04-25T05:40:00Z", eta: "2026-04-25T07:12:00Z", cargoType: "Bulk materials" },
  { id: "MV-1003", label: "Shuttle Run Charlie", corridor: "South Bypass", origin: "Station 12", destination: "Depot C", status: "arrived", departedAt: "2026-04-25T04:50:00Z", eta: "2026-04-25T05:18:00Z", cargoType: "Equipment" },
  { id: "MV-1004", label: "Relief Convoy Delta", corridor: "West Loop", origin: "Base West", destination: "Junction 9", status: "delayed", departedAt: "2026-04-25T05:00:00Z", eta: "2026-04-25T07:47:00Z", cargoType: "Emergency supplies" },
  { id: "MV-1005", label: "Commuter Link Echo", corridor: "Central Trunk", origin: "Central Hub", destination: "Terminal 2", status: "in-transit", departedAt: "2026-04-25T06:30:00Z", eta: "2026-04-25T06:49:00Z", cargoType: "Passenger transfer" },
  { id: "MV-1006", label: "Night Haul Foxtrot", corridor: "North Arterial", origin: "Depot A", destination: "Warehouse N", status: "scheduled", departedAt: "2026-04-25T22:00:00Z", eta: "2026-04-25T22:38:00Z", cargoType: "Refrigerated goods" },
];

const delayHighlights: DelayHighlight[] = [
  { id: "DH-01", movementId: "MV-1002", corridor: "East Connector", reason: "Signal failure at junction EC-4 causing single-track operation", delayMin: 32, severity: "high", reportedAt: "2026-04-25T06:05:00Z" },
  { id: "DH-02", movementId: "MV-1004", corridor: "West Loop", reason: "Track obstruction reported between WL-2 and WL-3 segments", delayMin: 67, severity: "high", reportedAt: "2026-04-25T05:30:00Z" },
  { id: "DH-03", movementId: "MV-1001", corridor: "North Arterial", reason: "Minor schedule adjustment due to platform congestion at Terminal 7", delayMin: 8, severity: "low", reportedAt: "2026-04-25T06:40:00Z" },
  { id: "DH-04", movementId: "MV-1005", corridor: "Central Trunk", reason: "Holding pattern for cross-traffic clearance at Central Hub", delayMin: 14, severity: "moderate", reportedAt: "2026-04-25T06:35:00Z" },
];

const corridorStatusColor: Record<Corridor["status"], string> = {
  flowing: "bg-emerald-500",
  congested: "bg-amber-500",
  blocked: "bg-red-500",
};

const corridorStatusLabel: Record<Corridor["status"], string> = {
  flowing: "Flowing",
  congested: "Congested",
  blocked: "Blocked",
};

const movementStatusStyle: Record<Movement["status"], string> = {
  "in-transit": "border-sky-200 bg-sky-50 text-sky-700",
  arrived: "border-emerald-200 bg-emerald-50 text-emerald-700",
  delayed: "border-red-200 bg-red-50 text-red-700",
  scheduled: "border-slate-200 bg-slate-50 text-slate-600",
};

const delaySeverityStyle: Record<DelayHighlight["severity"], string> = {
  low: "border-slate-200 bg-slate-50 text-slate-600",
  moderate: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-red-200 bg-red-50 text-red-700",
};

export default function TransitBoardPage() {
  const totalMovements = movements.length;
  const inTransit = movements.filter((m) => m.status === "in-transit").length;
  const delayed = movements.filter((m) => m.status === "delayed").length;
  const flowingCorridors = corridors.filter((c) => c.status === "flowing").length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="section-label text-[var(--ops-accent)]">
            Transit Board
          </p>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>
        <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
          Corridor movements, schedules, and delay tracking at a glance.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Monitor active corridors, track individual movements across the
          network, and review delay highlights for operational triage.
        </p>
      </header>

      {/* Summary bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Corridors</p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">{corridors.length}</p>
        </div>
        <div className="rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Flowing</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-700">{flowingCorridors}/{corridors.length}</p>
        </div>
        <div className="rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">In Transit</p>
          <p className="mt-1 text-2xl font-semibold text-sky-700">{inTransit}</p>
        </div>
        <div className="rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
          <p className="section-label text-slate-500">Delayed</p>
          <p className="mt-1 text-2xl font-semibold text-red-700">{delayed}</p>
        </div>
      </div>

      {/* Corridor summaries */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Corridor Summaries</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {corridors.map((cor) => (
            <div
              key={cor.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/75 px-4 py-4"
            >
              <span
                className={`mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${corridorStatusColor[cor.status]}`}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{cor.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {corridorStatusLabel[cor.status]} &middot; {cor.direction}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {cor.activeMovements} active &middot; avg {cor.avgTransitMin}m &middot; {cor.onTimeRate} on-time
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movement cards */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Movements</p>
        <p className="mt-1 text-sm text-slate-500">{totalMovements} tracked movements across all corridors</p>
        <ul className="mt-5 space-y-3">
          {movements.map((mv) => (
            <li
              key={mv.id}
              className={`rounded-2xl border px-5 py-4 ${movementStatusStyle[mv.status]}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold">{mv.id}</span>
                <span className="rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide">
                  {mv.status}
                </span>
                <span className="ml-auto text-xs font-medium opacity-70">{mv.corridor}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug">{mv.label}</p>
              <p className="mt-1 text-xs opacity-70">
                {mv.origin} → {mv.destination} &middot; {mv.cargoType}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Delay highlights */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Delay Highlights</p>
        <p className="mt-1 text-sm text-slate-500">{delayHighlights.length} active delay reports</p>
        <ul className="mt-5 space-y-3">
          {delayHighlights.map((dh) => (
            <li
              key={dh.id}
              className={`rounded-2xl border px-5 py-4 ${delaySeverityStyle[dh.severity]}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold">{dh.movementId}</span>
                <span className="rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide">
                  {dh.severity}
                </span>
                <span className="ml-auto text-xs font-semibold">+{dh.delayMin} min</span>
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug">{dh.reason}</p>
              <p className="mt-1 text-xs opacity-70">
                {dh.corridor} &middot; Reported {dh.reportedAt.slice(11, 16)} UTC
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
