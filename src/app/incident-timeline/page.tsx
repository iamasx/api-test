import type { Metadata } from "next";

const shellSections = [
  {
    title: "Incident summaries",
    description:
      "High-level cards will surface incident count, active responses, timeline coverage, and disruption length.",
  },
  {
    title: "Severity filters",
    description:
      "The review page will support visually distinct severity controls for narrowing the incident list.",
  },
  {
    title: "Timeline detail",
    description:
      "Selecting an incident will reveal a detailed response timeline and mock impact context on the same route.",
  },
];

export const metadata: Metadata = {
  title: "Incident Timeline Review",
  description:
    "Route shell for reviewing incident summaries, severity filters, and response timelines.",
};

export default function IncidentTimelinePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
            Review Workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Incident Timeline Review
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            This initial route shell establishes the page structure for issue
            #85. The next iteration will attach mock incidents, severity
            filters, and an interactive detail timeline inside this layout.
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
