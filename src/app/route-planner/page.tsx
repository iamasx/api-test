import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Route Planner",
  description:
    "Initial route shell for reviewing route segments, constraints, and planning decisions.",
};

export default function RoutePlannerPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f172a_0%,#172554_42%,#020617_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-2xl shadow-slate-950/45 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-cyan-300/35 bg-cyan-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">
                Route planner
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Plan route segments before dispatch locks the final path
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This initial shell establishes the dedicated route for segment
                planning. Subsequent commits will add mock route data,
                constraint summaries, and the decision sidebar.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:bg-slate-900"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-7">
            <h2 className="text-lg font-semibold text-slate-100">
              First delivery slice
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              The route is live with its own shell and heading. The next
              implementation steps will introduce grouped route segments, timing
              signals, and route-level decision support.
            </p>
          </article>

          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-7">
            <h2 className="text-lg font-semibold text-slate-100">
              Planned next additions
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              <li className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                Segment cards with timing and constraint states
              </li>
              <li className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                Summary banners for route-level status counts
              </li>
              <li className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                Decision rail for hold, reroute, and escalation calls
              </li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
