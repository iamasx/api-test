import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mission Planner",
  description:
    "Initial route shell for mission scenarios, readiness highlights, and staged checklist planning.",
};

const shellSections = [
  {
    title: "Scenario cards",
    description:
      "Mission scenario summaries will appear here with priority, timing, and lead ownership context.",
  },
  {
    title: "Readiness highlights",
    description:
      "Planner summaries will call out crew posture, equipment status, and launch window confidence.",
  },
  {
    title: "Staged checklist",
    description:
      "The staged plan will break preparation into ordered milestones with clear completion states.",
  },
];

export default function MissionPlannerPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.22),transparent_28%),linear-gradient(180deg,#0f172a_0%,#111827_52%,#172033_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_32px_120px_rgba(2,6,23,0.45)] backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/78">
                Mission Planner
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Planning shell for scenario routing, readiness calls, and staged execution.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This route establishes the standalone workspace for issue #92.
                The next subtasks will add mock planning data, reusable
                components, and tests without depending on any other page.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/40 hover:bg-white/12"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-3">
          {shellSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Planned module
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {section.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
