import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capacity Board",
  description:
    "Shared capacity route for pod load, overflow coverage, and overlap-heavy shell updates.",
};

const capacityPods = [
  {
    name: "North Intake",
    status: "critical",
    occupancy: 94,
    coverage: "11 analysts for 12 planned stations",
    buffer: "1 flex analyst left",
    focus: "Same-day medical intake",
    window: "07:10-08:00",
    note: "Navigator handoffs are landing early, so this pod is carrying the heaviest overlap load.",
    route: "/navigator-hub",
    action: "Open navigator hub",
  },
  {
    name: "Relay Triage",
    status: "watch",
    occupancy: 86,
    coverage: "8 coordinators with 2 shared backups",
    buffer: "Escalation desk available",
    focus: "Priority escalations and route exceptions",
    window: "07:25-08:15",
    note: "Command-review traffic is trending above plan, but the escalation desk can still absorb another burst.",
    route: "/command-log",
    action: "Open command log",
  },
  {
    name: "South Dispatch",
    status: "stable",
    occupancy: 72,
    coverage: "10 dispatchers across 3 lanes",
    buffer: "2 surge slots open",
    focus: "Final assignment and launch approvals",
    window: "07:40-08:20",
    note: "Dispatch is the healthiest pod and can take redirected work if intake crosses the hard redline.",
    route: "/operations-center",
    action: "Open ops center",
  },
  {
    name: "Dock Recovery",
    status: "watch",
    occupancy: 81,
    coverage: "7 operators plus 1 floating supervisor",
    buffer: "Supervisor can cover dock lane B",
    focus: "Late-arrival recovery and rebalancing",
    window: "07:55-08:35",
    note: "Recovery stays viable, but only if parcel volume remains close to the current hub forecast.",
    route: "/parcel-hub",
    action: "Open parcel hub",
  },
] as const;

const linkedSurfaces = [
  {
    title: "Navigator handoff rail",
    href: "/navigator-hub",
    action: "Open navigator hub",
    detail:
      "Confirm which corridors are pushing extra load into intake before shifting more headcount.",
  },
  {
    title: "Operational posture rail",
    href: "/operations-center",
    action: "Open ops center",
    detail:
      "Compare redline pods against the active alert queue so capacity changes match the broader shift posture.",
  },
  {
    title: "Parcel balancing rail",
    href: "/parcel-hub",
    action: "Open parcel hub",
    detail:
      "Validate hub volume before the recovery pod absorbs another late-arrival cluster.",
  },
] as const;

const releaseChecks = [
  {
    time: "07:12",
    title: "Landing and nav alignment",
    summary:
      "Make sure the shared shell points operators to the new capacity board before the first morning surge.",
  },
  {
    time: "07:28",
    title: "Redline threshold review",
    summary:
      "If two pods stay above eighty-five percent, route the overflow briefing through navigator and dispatch together.",
  },
  {
    time: "07:46",
    title: "Recovery fallback decision",
    summary:
      "Use parcel and command surfaces to decide whether dock recovery keeps the shared supervisor or yields it to triage.",
  },
] as const;

const overlapSignals = [
  "The capacity board intentionally overlaps the landing page hero instead of shipping as an isolated route card.",
  "Shared shell navigation and footer copy now advertise the route alongside existing common entry points.",
  "Global tokens, shell accents, and shared route treatments were adjusted so the conflict surface reaches beyond one page.",
];

const statusClasses: Record<string, string> = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
  critical: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function CapacityBoardPage() {
  const redlinePods = capacityPods.filter((pod) => pod.occupancy >= 85).length;
  const surgeSlots = capacityPods.filter((pod) => pod.status === "stable").length;
  const averageOccupancy = Math.round(
    capacityPods.reduce((total, pod) => total + pod.occupancy, 0) /
      capacityPods.length,
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="capacity-shell-card overflow-hidden rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#fff7ed_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="capacity-board-chip">Capacity Board</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Shared overlap route
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-4xl text-4xl text-slate-950 sm:text-5xl">
                Stage team load, overflow coverage, and redline thresholds from
                one capacity board.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Capacity Board is wired directly into the same shared files as
                the landing page and app shell. It gives release operators a
                single place to read pod occupancy, choose the safest overflow
                target, and keep overlap-heavy changes visible across the common
                interface.
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
                href="/operations-center"
                className="capacity-board-link inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open ops center
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/218"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-[1.4rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Redline pods
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {redlinePods}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Pods already at or above the threshold for shared overflow
                  intervention.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Average load
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {averageOccupancy}%
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Occupancy across the four active pods in the current release
                  window.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Available fallback
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {surgeSlots}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Stable pods that can still absorb secondary work before the
                  next overlap check.
                </p>
              </article>
            </div>
          </div>

          <aside className="capacity-board-panel rounded-[1.8rem] border border-slate-200/80 bg-white/82 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.1)]">
            <p className="section-label text-slate-500">Overlap signals</p>
            <ul className="mt-5 space-y-4">
              {overlapSignals.map((signal) => (
                <li
                  key={signal}
                  className="capacity-board-note rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="section-label text-[var(--capacity-ink)]">
                Pod capacity board
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Review the live pod mix before shifting people into the next
                shared release window.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Each card keeps occupancy, coverage, and the recommended linked
              route together so the same release call can decide load balancing
              and follow-up context.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {capacityPods.map((pod) => (
              <article
                key={pod.name}
                className="capacity-board-track rounded-[1.6rem] border border-slate-200 bg-white/88 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      {pod.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{pod.focus}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${statusClasses[pod.status]}`}
                  >
                    {pod.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Coverage
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {pod.coverage}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Buffer
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {pod.buffer}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <span>Occupancy</span>
                    <span>{pod.occupancy}%</span>
                  </div>
                  <div className="capacity-board-meter" aria-hidden="true">
                    <div
                      className="capacity-board-meter__fill"
                      style={{ width: `${pod.occupancy}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <p className="text-sm leading-7 text-slate-600">{pod.note}</p>
                  <div className="rounded-[1rem] border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm font-semibold text-slate-700">
                    {pod.window}
                  </div>
                </div>

                <Link
                  href={pod.route}
                  className="capacity-board-link mt-5 inline-flex items-center text-sm font-semibold text-[var(--capacity-ink)] transition hover:text-blue-800"
                >
                  {pod.action}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Linked surfaces</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Follow the adjacent route rails before committing a capacity
              change.
            </h2>
          </div>

          <div className="mt-6 grid gap-4">
            {linkedSurfaces.map((surface) => (
              <article
                key={surface.title}
                className="capacity-board-track rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold text-slate-950">
                  {surface.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {surface.detail}
                </p>
                <Link
                  href={surface.href}
                  className="capacity-board-link mt-4 inline-flex items-center text-sm font-semibold text-[var(--capacity-ink)] transition hover:text-blue-800"
                >
                  {surface.action}
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(239,246,255,0.92),rgba(255,251,235,0.92))] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Release checks</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Keep the capacity release moving in a predictable cadence.
            </h2>
          </div>

          <ol className="mt-6 space-y-4">
            {releaseChecks.map((step) => (
              <li
                key={step.time}
                className="rounded-[1.4rem] border border-white/70 bg-white/82 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--capacity-ink)]">
                  {step.time}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.summary}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
