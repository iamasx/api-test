import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reserve Grid",
  description:
    "Shared reserve board for overlap-heavy corridor coverage, route swaps, and app-shell coordination.",
};

interface ReserveZone {
  id: string;
  label: string;
  focus: string;
  reserveShare: string;
  slackWindow: string;
  note: string;
}

interface ReserveCell {
  id: string;
  zoneId: string;
  slot: string;
  corridor: string;
  coverage: string;
  reserveWindow: string;
  status: "armed" | "swing" | "watch";
  unlock: string;
  note: string;
  linkedSurface: {
    href: string;
    label: string;
  };
}

interface ExchangeEntry {
  callSign: string;
  move: string;
  owner: string;
  window: string;
  note: string;
}

const reserveZones: ReserveZone[] = [
  {
    id: "delta",
    label: "Delta lattice",
    focus: "Protect the cross-dock corridors that absorb late route swaps.",
    reserveShare: "5 reserve cells",
    slackWindow: "22 minutes",
    note: "Delta keeps the fastest handoff buffer in the grid, so it is the default view for shared route-entry drills.",
  },
  {
    id: "north",
    label: "North relay",
    focus: "Stage secondary coverage for queue-heavy uplink corridors.",
    reserveShare: "4 reserve cells",
    slackWindow: "18 minutes",
    note: "North relay is tuned for short queue spikes and depends on a clean swap path into queue-monitor.",
  },
  {
    id: "quay",
    label: "Quay stretch",
    focus: "Balance parcel overflow without stealing capacity from the return spine.",
    reserveShare: "5 reserve cells",
    slackWindow: "27 minutes",
    note: "Quay stretch is the slowest to reset, but it has the broadest parcel coverage once the swap lands.",
  },
  {
    id: "east",
    label: "East hinge",
    focus: "Cover contingency transfers between route planning and exception review.",
    reserveShare: "4 reserve cells",
    slackWindow: "15 minutes",
    note: "East hinge is intentionally small and precise, useful when the shell needs one narrow reserve lane instead of a full reroute.",
  },
];

const reserveCells: ReserveCell[] = [
  {
    id: "delta-02",
    zoneId: "delta",
    slot: "Delta-02",
    corridor: "Cross-dock ladder",
    coverage: "Route-planner overflow",
    reserveWindow: "18:20-18:42",
    status: "armed",
    unlock: "Release after route planner confirms Bay-Central stock has cleared.",
    note: "Keeps the west ladder open for two delayed departures without collapsing the outbound rhythm.",
    linkedSurface: { href: "/route-planner", label: "Route planner" },
  },
  {
    id: "delta-05",
    zoneId: "delta",
    slot: "Delta-05",
    corridor: "Late merge shuttle",
    coverage: "Ops-center intervention",
    reserveWindow: "18:24-18:46",
    status: "watch",
    unlock: "Requires dispatch confirmation from the operations center alert queue.",
    note: "Hold this cell until the shift lead clears the current alert stack; otherwise the reserve swap outruns the active command notes.",
    linkedSurface: { href: "/operations-center", label: "Ops center" },
  },
  {
    id: "delta-07",
    zoneId: "delta",
    slot: "Delta-07",
    corridor: "Return splice",
    coverage: "Navigator shell continuity",
    reserveWindow: "18:31-18:53",
    status: "swing",
    unlock: "Use when the shared shell needs one extra return lane before the next corridor review.",
    note: "Most useful for preserving a clean app-shell story when multiple shared routes are active at once.",
    linkedSurface: { href: "/navigator-hub", label: "Navigator hub" },
  },
  {
    id: "north-01",
    zoneId: "north",
    slot: "North-01",
    corridor: "Inbound relay",
    coverage: "Queue-pressure absorption",
    reserveWindow: "18:16-18:34",
    status: "armed",
    unlock: "Open as soon as queue age crosses the eight-minute threshold.",
    note: "This cell exists to cut queue growth before the broader corridor plan needs to change.",
    linkedSurface: { href: "/queue-monitor", label: "Queue monitor" },
  },
  {
    id: "north-04",
    zoneId: "north",
    slot: "North-04",
    corridor: "Bridge spillover",
    coverage: "Status-board visibility",
    reserveWindow: "18:29-18:47",
    status: "swing",
    unlock: "Use when service health remains stable but operator load still needs a temporary spill lane.",
    note: "Pairs well with incident-free windows where the team can quietly borrow capacity.",
    linkedSurface: { href: "/status-board", label: "Status board" },
  },
  {
    id: "quay-03",
    zoneId: "quay",
    slot: "Quay-03",
    corridor: "Parcel shore lane",
    coverage: "Hub balancing reserve",
    reserveWindow: "18:22-18:49",
    status: "armed",
    unlock: "Enable when hub imbalance exceeds the live parcel target by twelve percent.",
    note: "The quickest path for moving excess parcel volume without reshaping the entire quay surface.",
    linkedSurface: { href: "/parcel-hub", label: "Parcel hub" },
  },
  {
    id: "quay-08",
    zoneId: "quay",
    slot: "Quay-08",
    corridor: "Dock return seam",
    coverage: "Command-log traceability",
    reserveWindow: "18:36-19:03",
    status: "watch",
    unlock: "Wait for the command log to capture the prior parcel reassignment.",
    note: "This swap is safe operationally, but the release drill wants the event trail recorded first.",
    linkedSurface: { href: "/command-log", label: "Command log" },
  },
  {
    id: "east-02",
    zoneId: "east",
    slot: "East-02",
    corridor: "Exception hinge",
    coverage: "Checkpoint spill lane",
    reserveWindow: "18:27-18:42",
    status: "armed",
    unlock: "Route as soon as checkpoint review holds at nominal for one full cycle.",
    note: "East hinge is the smallest reserve cell, which makes it ideal for targeted exception cleanup.",
    linkedSurface: { href: "/checkpoint-grid", label: "Checkpoint grid" },
  },
  {
    id: "east-04",
    zoneId: "east",
    slot: "East-04",
    corridor: "Transfer hinge",
    coverage: "Archive-safe overflow",
    reserveWindow: "18:41-18:56",
    status: "swing",
    unlock: "Use if the archive route must absorb one more inbound handoff without a homepage rewrite.",
    note: "Reserved for overlap drills where both the shell and a downstream route need temporary slack.",
    linkedSurface: { href: "/archive-browser", label: "Archive browser" },
  },
];

const exchangeLedger: ExchangeEntry[] = [
  {
    callSign: "RG-14",
    move: "Delta-02 to Quay-03",
    owner: "Shift routing",
    window: "18:26",
    note: "Creates enough reserve depth to absorb one delayed parcel wave without rewriting the main route sequence.",
  },
  {
    callSign: "RG-21",
    move: "North-01 to East-02",
    owner: "Queue command",
    window: "18:33",
    note: "Used when queue age eases but checkpoint review still needs a narrow spill lane.",
  },
  {
    callSign: "RG-29",
    move: "Delta-07 to East-04",
    owner: "Shell operator",
    window: "18:41",
    note: "Preserves the shared route entry while archive traffic spikes through the return seam.",
  },
];

const overlapChecklist = [
  "Landing page hero now points at Reserve Grid instead of the previous shared-route entry.",
  "Primary nav, shell metadata, and footer copy all include Reserve Grid to widen the merge surface.",
  "Global presentation tokens add a reserve accent layer that touches every route while this issue is active.",
];

const cadenceSteps = [
  {
    title: "Pick the active reserve zone",
    detail: "The selected query-string zone keeps the reserve board focused without splitting the route into separate pages.",
  },
  {
    title: "Validate the swap surface",
    detail: "Each cell links into the adjacent route that must agree before the reserve slot can unlock.",
  },
  {
    title: "Log the exchange",
    detail: "The ledger keeps the overlap drill explainable when multiple shared routes race through the same shell files.",
  },
];

const statusClasses: Record<ReserveCell["status"], string> = {
  armed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  swing: "border-cyan-200 bg-cyan-50 text-cyan-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
};

type ReserveGridSearchParams = Promise<{
  zone?: string | string[] | undefined;
}>;

export default async function ReserveGridPage({
  searchParams,
}: {
  searchParams?: ReserveGridSearchParams;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const zoneParam = Array.isArray(resolvedSearchParams.zone)
    ? resolvedSearchParams.zone[0]
    : resolvedSearchParams.zone;
  const activeZone =
    reserveZones.find((zone) => zone.id === zoneParam) ?? reserveZones[0];
  const activeCells = reserveCells.filter((cell) => cell.zoneId === activeZone.id);
  const readyCells = activeCells.filter((cell) => cell.status !== "watch").length;
  const linkedSurfaces = new Set(activeCells.map((cell) => cell.linkedSurface.label)).size;

  return (
    <main className="reserve-grid-shell mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <section className="reserve-grid-hero overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[linear-gradient(135deg,#f0fdfa_0%,#ffffff_48%,#fff7ed_100%)] shadow-[0_32px_110px_rgba(15,23,42,0.11)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="reserve-grid-badge">Issue 219</span>
              <span className="reserve-grid-pulse">Shared route overlap</span>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-4xl text-4xl text-slate-950 sm:text-5xl lg:text-6xl">
                Reserve the spare lanes, track the swap windows, and keep the
                shared route entry stable.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Reserve Grid is a deliberate overlap surface: one page for
                reserve cells, route swaps, and shell coordination that also
                edits the landing page, layout, and global styling all other
                routes depend on.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/route-planner"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open route planner
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to overview
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/219"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="reserve-grid-panel rounded-[1.45rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Active zone
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {activeZone.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {activeZone.slackWindow} of reserve slack available.
                </p>
              </article>
              <article className="reserve-grid-panel rounded-[1.45rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Ready cells
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {readyCells}/{activeCells.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Cells that can unlock without waiting on another route.
                </p>
              </article>
              <article className="reserve-grid-panel rounded-[1.45rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Linked surfaces
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {linkedSurfaces}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Shared routes touched by the current reserve selection.
                </p>
              </article>
            </div>
          </div>

          <aside className="reserve-grid-panel rounded-[1.9rem] border border-slate-200/80 bg-white/82 p-6 shadow-[0_24px_74px_rgba(15,23,42,0.1)]">
            <p className="section-label text-slate-500">Conflict checklist</p>
            <ul className="mt-5 space-y-4">
              {overlapChecklist.map((item) => (
                <li
                  key={item}
                  className="reserve-grid-signal rounded-[1.35rem] border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="section-label text-[var(--reserve-ink)]">Zone selection</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Pick the reserve zone that should own the next overlap window.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            The active zone is controlled with `searchParams`, which keeps the
            route public and shareable while still giving the reserve board a
            clear focus state.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="reserve-grid-zone-list" role="list" aria-label="Reserve zones">
            {reserveZones.map((zone) => {
              const isActive = zone.id === activeZone.id;

              return (
                <Link
                  key={zone.id}
                  href={`/reserve-grid?zone=${zone.id}`}
                  className={`reserve-grid-zone-tab ${isActive ? "reserve-grid-zone-tab--active" : ""}`}
                >
                  <span className="text-sm font-semibold text-slate-950">{zone.label}</span>
                  <span className="mt-1 text-xs text-slate-500">{zone.reserveShare}</span>
                </Link>
              );
            })}
          </div>

          <div className="reserve-grid-panel w-full rounded-[1.4rem] border border-slate-200 bg-white/85 p-5 xl:max-w-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Active zone brief
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {activeZone.focus}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{activeZone.note}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Reserve cells</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Live cells for {activeZone.label}
            </h2>
          </div>

          <ul className="mt-6 grid gap-4" role="list" aria-label={`${activeZone.label} reserve cells`}>
            {activeCells.map((cell) => (
              <li key={cell.id} className="list-none">
                <article className="reserve-grid-slot reserve-grid-slot--active rounded-[1.55rem] border border-slate-200 bg-white/88 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{cell.slot}</p>
                      <p className="mt-1 text-sm text-slate-500">{cell.corridor}</p>
                    </div>
                    <span
                      className={`reserve-grid-status rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${statusClasses[cell.status]}`}
                    >
                      {cell.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Coverage
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {cell.coverage}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Reserve window
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {cell.reserveWindow}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {cell.note}
                  </p>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
                    Unlock condition: {cell.unlock}
                  </p>

                  <Link
                    href={cell.linkedSurface.href}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--reserve-accent)] transition hover:text-[var(--reserve-ink)]"
                  >
                    Open {cell.linkedSurface.label}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(240,253,250,0.92),rgba(255,251,235,0.92))] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="space-y-2">
              <p className="section-label text-slate-500">Cadence</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Keep the overlap release legible.
              </h2>
            </div>

            <ol className="mt-6 space-y-4">
              {cadenceSteps.map((step) => (
                <li
                  key={step.title}
                  className="reserve-grid-panel rounded-[1.35rem] border border-white/70 bg-white/82 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
                >
                  <p className="text-sm font-semibold text-slate-950">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="space-y-2">
              <p className="section-label text-slate-500">Exchange ledger</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Record the reserve swaps that make the shared shell believable.
              </h2>
            </div>

            <ul className="mt-6 space-y-4">
              {exchangeLedger.map((entry) => (
                <li
                  key={entry.callSign}
                  className="reserve-grid-ledger rounded-[1.35rem] border border-slate-200 bg-white/88 px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">
                      {entry.callSign}
                    </p>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--reserve-ink)]">
                      {entry.window}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {entry.move}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {entry.note}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {entry.owner}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
