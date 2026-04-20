import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Browser",
  description:
    "Inspect archived entries through snapshot cards, metadata sections, and a dedicated detail view.",
};

export default function ArchiveBrowserPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] px-6 py-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Archive browser
        </p>
        <div className="mt-4 max-w-3xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Archived entry browser scaffold
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            This route starts as a minimal shell. Snapshot cards, archive
            metadata, and the active detail view will be layered in separate
            subtasks so each stage of the issue stays visible in git history.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <section
          aria-labelledby="archive-browser-snapshot-list-title"
          className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/70 px-6 py-7"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Snapshot list
          </p>
          <h2
            id="archive-browser-snapshot-list-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
          >
            Snapshot cards will render here
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            The next subtasks will add mock archive entries, visible metadata,
            and linked selection states for each archived snapshot.
          </p>
        </section>

        <section
          aria-labelledby="archive-browser-detail-title"
          className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-950 px-6 py-7 text-slate-100"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
            Detail view
          </p>
          <h2
            id="archive-browser-detail-title"
            className="mt-3 text-2xl font-semibold tracking-tight"
          >
            Archive detail panel placeholder
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Metadata sections, preservation notes, and the currently selected
            archive snapshot will appear in this panel after the route
            structure is fully composed.
          </p>
        </section>
      </div>
    </main>
  );
}
