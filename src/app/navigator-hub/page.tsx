import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Navigator Hub",
  description:
    "Shared handoff route for corridor status, intervention rails, and overlap-friendly shell presentation.",
};

const corridorLanes = [
  { name: "North Bridge", status: "stable", handoff: "Queue merge confirmed", owner: "Lane Control", window: "18:20-18:40", note: "Inbound medical crates cleared the bridge split, so the return lane can stay on schedule." },
  { name: "Quay Spine", status: "watch", handoff: "Parcel reroute pending", owner: "Hub Dispatch", window: "18:28-18:52", note: "One express parcel cluster still needs reassignment before the dock window closes." },
  { name: "Relay Cutover", status: "watch", handoff: "Command review queued", owner: "Signal Desk", window: "18:34-19:05", note: "Operator notes show healthy throughput, but escalation logging is trailing by one checkpoint." },
  { name: "South Return", status: "stable", handoff: "Fleet handoff ready", owner: "Return Lead", window: "18:45-19:10", note: "The recovery lane is clear enough to absorb secondary load without breaking the outbound rhythm." },
];

const interventionRails = [
  { title: "Queue pressure rail", href: "/queue-monitor", action: "Open queue monitor", detail: "Check lane depth, queue age, and transfer readiness before committing a bridge switch." },
  { title: "Parcel balancing rail", href: "/parcel-hub", action: "Open parcel hub", detail: "Verify hub-to-hub volume and SLA risk before moving the quay spine off its current schedule." },
  { title: "Escalation rail", href: "/command-log", action: "Open command log", detail: "Review the active event stream when the navigator call needs to explain a reroute or pause." },
];

const cadenceSteps = [
  { time: "18:18", title: "Shared shell review", summary: "Confirm the landing page, global shell, and route nav all reflect the current navigator entry point." },
  { time: "18:26", title: "Queue and parcel cross-check", summary: "Compare queue depth against parcel hub volume before the quay spine shifts into the next window." },
  { time: "18:41", title: "Command trace update", summary: "Log the chosen intervention rail so downstream operators can reconstruct why the route changed." },
];

const overlapSignals = [
  "Landing page hero now points at Navigator Hub instead of a standalone archive-only entry.",
  "Global shell navigation and footer messaging include the new route to widen the merge surface.",
  "Shared visual tokens and shell cards are reused across the common app shell.",
];

const statusClasses: Record<string, string> = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
};

export default function NavigatorHubPage() {
  const stableCorridors = corridorLanes.filter((lane) => lane.status === "stable").length;
  const watchCorridors = corridorLanes.filter((lane) => lane.status === "watch").length;
  const handoffWindows = corridorLanes.map((lane) => lane.window).join(" / ");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="navigator-hub-orbit navigator-shell-card overflow-hidden rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_45%,#fff7ed_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="ops-badge">Navigator Hub</span>
              <span className="navigator-hub-badge">Shared shell route</span>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-4xl text-4xl text-slate-950 sm:text-5xl">
                Coordinate corridor handoffs, intervention rails, and shared
                entry points from one route.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Navigator Hub is intentionally wired into the same landing page,
                layout shell, and global presentation layer other routes depend
                on. It gives operators a single place to review corridor health,
                choose the next escalation rail, and keep shell-wide cues in
                sync during overlap-heavy releases.
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
                className="navigator-shell-link inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open ops center
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/216"
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
                  Stable corridors
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {stableCorridors}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Corridors ready to carry secondary load without a new
                  escalation branch.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Watch corridors
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {watchCorridors}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Active routes that still require queue, parcel, or command
                  confirmation before the next handoff.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Handoff windows
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                  {handoffWindows}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Planned windows keep the corridor review aligned with the
                  linked route dashboards.
                </p>
              </article>
            </div>
          </div>

          <aside className="navigator-shell-card rounded-[1.8rem] border border-slate-200/80 bg-white/78 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.1)]">
            <p className="section-label text-slate-500">Overlap signals</p>
            <ul className="mt-5 space-y-4">
              {overlapSignals.map((signal) => (
                <li
                  key={signal}
                  className="navigator-hub-note rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {signal}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="navigator-hub-section overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="relative grid gap-6 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="navigator-hub-kicker">Corridor handoff board</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Review each lane before choosing the next intervention rail.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Every lane card shows the active owner, the current handoff
              status, and the scheduling window the shell needs to keep visible
              during the release drill.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {corridorLanes.map((lane) => (
              <article
                key={lane.name}
                className="navigator-hub-track rounded-[1.6rem] border border-slate-200 bg-white/85 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      {lane.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{lane.owner}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${statusClasses[lane.status]}`}
                  >
                    {lane.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Current handoff
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {lane.handoff}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Window
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {lane.window}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {lane.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Intervention rails</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Cross-link into the adjacent route surfaces without leaving the
              navigator context.
            </h2>
          </div>

          <div className="mt-6 grid gap-4">
            {interventionRails.map((rail) => (
              <article
                key={rail.title}
                className="navigator-shell-card rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold text-slate-950">
                  {rail.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {rail.detail}
                </p>
                <Link
                  href={rail.href}
                  className="navigator-shell-link mt-4 inline-flex items-center text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
                >
                  {rail.action}
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(240,249,255,0.92),rgba(255,251,235,0.92))] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Cadence</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Keep the overlap release moving in a predictable rhythm.
            </h2>
          </div>

          <ol className="mt-6 space-y-4">
            {cadenceSteps.map((step) => (
              <li
                key={step.time}
                className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-700">
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
