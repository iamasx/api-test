import type { Metadata } from "next";

const shellSections = [
  {
    title: "Chronological event feed",
    description:
      "The main column will render command activity in timestamp order so operators can review the latest changes first.",
  },
  {
    title: "Tag-based grouping",
    description:
      "Event tags will surface repeatable patterns such as deploys, escalations, and handoffs without depending on any shared data source.",
  },
  {
    title: "Selected event detail",
    description:
      "A dedicated detail panel will expand the current event with owners, notes, and follow-up context on the same route.",
  },
];

export const metadata: Metadata = {
  title: "Command Log",
  description:
    "Route shell for reviewing chronological command events, tag groupings, and event detail.",
};

export default function CommandLogPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
            Event Review Surface
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Command Log
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            This first scaffold establishes the dedicated route for issue #106.
            The next subtasks will attach mock command events, tag-group
            summaries, and a focused event detail panel inside this layout.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {shellSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                Planned section
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
