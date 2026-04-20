import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Notebook",
  description:
    "A dedicated route for experiment logs, observations, and status summaries.",
};

const shellMilestones = [
  "Experiment entries will appear as individual notebook cards.",
  "Observation notes will be grouped by session and signal quality.",
  "Status callouts will summarize what is moving forward and what is blocked.",
];

export default function ResearchNotebookPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f2937_0%,#111827_45%,#030712_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/12 px-4 py-1 text-sm font-medium tracking-[0.18em] text-cyan-100 uppercase">
                Research notebook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Notebook shell for active experiments and operating notes
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This initial route establishes the notebook workspace. Subsequent
                commits will populate experiment data, observation sections, and
                status summaries inside this layout.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-slate-900"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-7">
            <h2 className="text-lg font-semibold text-slate-100">
              Planned notebook sections
            </h2>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
              {shellMilestones.map((milestone, index) => (
                <li
                  key={milestone}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-100">
                    {index + 1}
                  </span>
                  <span>{milestone}</span>
                </li>
              ))}
            </ol>
          </article>

          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-7">
            <h2 className="text-lg font-semibold text-slate-100">Route status</h2>
            <dl className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-300/10 p-4">
                <dt className="font-medium text-emerald-100">Availability</dt>
                <dd className="mt-1 leading-6">
                  The route is live at <code>/research-notebook</code>.
                </dd>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-300/10 p-4">
                <dt className="font-medium text-amber-100">Next step</dt>
                <dd className="mt-1 leading-6">
                  Add experiment records, summaries, and observation content.
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
