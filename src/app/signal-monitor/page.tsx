import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal Monitor",
  description:
    "Monitoring route scaffold for live signals, anomaly summaries, and an inspector panel.",
};

const placeholderSections = [
  {
    title: "Live signal cards",
    description:
      "Stream cards will land here once the mock monitoring data model is in place.",
  },
  {
    title: "Anomaly summary",
    description:
      "Severity bands and anomaly rollups will be added in the next implementation step.",
  },
  {
    title: "Inspector panel",
    description:
      "A detail-focused operator panel will sit alongside the signal grid in the completed route.",
  },
];

export default function SignalMonitorPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:px-12 lg:py-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-700">
              Signal monitor
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Monitoring route scaffold for live streams and anomaly review.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                This shell reserves space for the signal grid, anomaly summaries,
                and an inspector-style detail panel described in issue 91.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Route status
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Scaffolded
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This is the minimal page shell required before the richer mock
              monitoring UI is layered in.
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-label="Signal monitor placeholder sections"
        className="grid gap-4 lg:grid-cols-3"
      >
        {placeholderSections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Reserved
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {section.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
