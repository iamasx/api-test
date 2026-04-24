import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mission Console",
  description:
    "Shared-shell mission console for launch readiness windows, operator assignments, and live decision pressure.",
};

const consoleStats = [
  {
    label: "Decision horizon",
    value: "18 min",
    detail: "Command wants the branch recommendation locked before the relay handoff.",
  },
  {
    label: "Staged teams",
    value: "4 crews",
    detail: "Recovery, relay, thermal, and dock support are all held in pre-commit posture.",
  },
  {
    label: "Open watchpoints",
    value: "3",
    detail: "Thermal drift, relay confidence, and dock-clearance timing still need active coverage.",
  },
];

const launchWindows = [
  {
    name: "Window A",
    span: "05:40-06:05 UTC",
    posture: "Primary go branch",
    detail:
      "Weather is clean and relay capacity is within margin, but the dock chief needs one more clean check before commit.",
    tone: "stable",
  },
  {
    name: "Window B",
    span: "06:35-06:58 UTC",
    posture: "Watch branch",
    detail:
      "Safer thermal profile, but it consumes the reserve crew rotation and compresses downstream cargo sequencing.",
    tone: "watch",
  },
  {
    name: "Window C",
    span: "07:20-07:52 UTC",
    posture: "Recovery-only fallback",
    detail:
      "Best margin for dock recovery, but it breaks the planned uplink cadence and forces a customer-facing delay notice.",
    tone: "risk",
  },
] as const;

const commandStreams = [
  {
    title: "Flight readiness",
    owner: "N. Ibarra",
    summary:
      "Primary branch is green if the final relay confirmation lands before T-12.",
    items: [
      "Autopilot rollback rehearsal completed",
      "Dock-side abort path revalidated after the overnight sim",
      "Payload thermal buffer remains above minimum threshold",
    ],
  },
  {
    title: "Ground orchestration",
    owner: "R. Malik",
    summary:
      "Load teams are staged, but the reserve forklift lane is still borrowed by maintenance.",
    items: [
      "Cold-chain pallets moved into priority order",
      "Reserve dock crew can cover Window B without overtime",
      "West gate access remains under escort restrictions",
    ],
  },
  {
    title: "Communications",
    owner: "S. Okafor",
    summary:
      "Command channel is stable, but the customer update draft still depends on the final branch call.",
    items: [
      "Pager tree dry run finished at 04:58 UTC",
      "Public status note drafted for hold or fallback branches",
      "Regional leads subscribed to the command relay digest",
    ],
  },
];

const decisionRail = [
  {
    checkpoint: "T-18",
    title: "Lock the recommended branch",
    detail:
      "Flight and dock leads need a single branch so the console can collapse the non-primary call paths.",
  },
  {
    checkpoint: "T-14",
    title: "Confirm relay confidence",
    detail:
      "If confidence stays below threshold, command shifts to Window B without reopening cargo sequencing.",
  },
  {
    checkpoint: "T-09",
    title: "Publish operator handoff note",
    detail:
      "Every crew receives the same go, hold, or fallback language before the lift-cap sequence begins.",
  },
  {
    checkpoint: "T-04",
    title: "Freeze public-facing updates",
    detail:
      "External status copy moves from draft to live so the customer desk stops chasing command for wording.",
  },
];

const operatorAssignments = [
  {
    lane: "Recovery",
    owner: "M. Patel",
    state: "Stable",
    note: "Abort corridor is clean and reserve crew pickup time is under six minutes.",
  },
  {
    lane: "Relay",
    owner: "A. Svensson",
    state: "Watch",
    note: "One final validation cycle remains before the high-confidence uplink threshold is restored.",
  },
  {
    lane: "Dock",
    owner: "T. Nguyen",
    state: "Risk",
    note: "Lift-cap sequencing depends on the escort release clearing before T-10.",
  },
];

const escalationLog = [
  "04:46 UTC: Recovery lead reopened Window C only as a contingency branch after escort delays at west gate.",
  "05:02 UTC: Relay monitoring recovered packet loss, but confidence still needs a second clean interval.",
  "05:11 UTC: Customer desk drafted staggered status language for go and hold outcomes.",
  "05:19 UTC: Command requested a unified branch note so downstream teams stop planning against multiple windows.",
];

const toneClasses = {
  stable: "mission-chip mission-chip--stable",
  watch: "mission-chip mission-chip--watch",
  risk: "mission-chip mission-chip--risk",
} as const;

export default function MissionConsolePage() {
  return (
    <main className="mission-console-shell">
      <div aria-hidden className="mission-console-shell__glow" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:border-cyan-300/40 hover:bg-white/10"
          >
            <span aria-hidden="true">&larr;</span>
            Landing routes
          </Link>
          <Link
            href="/operations-center"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/16"
          >
            Shared shell overlap
          </Link>
        </div>

        <section className="mission-panel mission-panel--hero">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="mission-kicker">Issue 220 / Mission Console</p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Bring launch windows, crew posture, and shared-shell pressure
                  into one command surface.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                  This route intentionally overlaps the app shell: shared nav,
                  landing-page spotlight, and global styling all move with the
                  mission console so merge conflicts hit the common entry
                  points instead of staying isolated to a leaf route.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#launch-windows"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Review launch windows
                </a>
                <a
                  href="#decision-rail"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/22 hover:bg-white/12"
                >
                  Open decision rail
                </a>
                <a
                  href="https://github.com/iamasx/api-test/issues/220"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  Review issue scope
                </a>
              </div>
            </div>

            <aside className="mission-panel mission-panel--contrast">
              <div className="space-y-3">
                <p className="mission-kicker mission-kicker--muted">
                  Command posture
                </p>
                <p className="text-3xl font-semibold tracking-tight text-white">
                  Primary branch is viable, but the shell is optimized around a
                  fast fallback call.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                {consoleStats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {stat.detail}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mission-panel" id="launch-windows">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="mission-kicker mission-kicker--muted">
                Launch windows
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Stack the mission branches by timing, margin, and downstream
                cost.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              The console keeps all three windows visible so command can choose
              the least-damaging branch without losing track of dock, relay, or
              customer impact.
            </p>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {launchWindows.map((window) => (
              <article
                key={window.name}
                className="mission-panel mission-panel--window"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
                      {window.name}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      {window.span}
                    </p>
                  </div>
                  <span className={toneClasses[window.tone]}>
                    {window.posture}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  {window.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(320px,0.84fr)] xl:items-start">
          <section className="mission-panel">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="mission-kicker mission-kicker--muted">
                  Command streams
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Keep every crew in the same frame before the branch locks.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Each stream shows the owner, the posture summary, and the three
                facts most likely to move the recommendation.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {commandStreams.map((stream) => (
                <article
                  key={stream.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">
                        {stream.title}
                      </p>
                      <p className="text-xl font-semibold tracking-tight text-white">
                        {stream.summary}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-slate-300">
                      Owner: {stream.owner}
                    </p>
                  </div>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-200">
                    {stream.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/8 bg-slate-950/36 px-4 py-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <aside className="mission-panel" id="decision-rail">
            <div className="space-y-2">
              <p className="mission-kicker mission-kicker--muted">
                Decision rail
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Collapse the uncertainty before the final commit.
              </h2>
            </div>

            <ol className="mission-rail mt-6">
              {decisionRail.map((item) => (
                <li key={item.checkpoint} className="mission-rail__item">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/72">
                    {item.checkpoint}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <section className="mission-panel">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)]">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="mission-kicker mission-kicker--muted">
                  Operator lanes
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Hand each lane a clear owner, state, and reason to escalate.
                </h2>
              </div>

              <div className="grid gap-4">
                {operatorAssignments.map((assignment) => (
                  <article
                    key={assignment.lane}
                    className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                          {assignment.lane}
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                          {assignment.owner}
                        </p>
                      </div>
                      <span
                        className={
                          assignment.state === "Stable"
                            ? toneClasses.stable
                            : assignment.state === "Watch"
                              ? toneClasses.watch
                              : toneClasses.risk
                        }
                      >
                        {assignment.state}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-200">
                      {assignment.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="mission-panel mission-panel--contrast">
              <div className="space-y-2">
                <p className="mission-kicker mission-kicker--muted">
                  Escalation log
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  The console keeps the moving facts visible, not buried.
                </h2>
              </div>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-200">
                {escalationLog.map((entry) => (
                  <li
                    key={entry}
                    className="rounded-[1.35rem] border border-white/10 bg-slate-950/40 px-4 py-4"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
