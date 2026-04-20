import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Browser",
  description: "Scaffold route for browsing archive snapshots.",
};

export default function ArchiveBrowserPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Archive browser
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Route scaffold for archived snapshot browsing
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          This initial scaffold reserves space for the snapshot list, metadata
          badges, and a detail panel that will be implemented in follow-up
          commits.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Snapshot list placeholder
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Snapshot cards and metadata badges will render here.
          </p>
        </section>

        <aside className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-950 p-6 text-slate-100">
          <h2 className="text-2xl font-semibold tracking-tight">
            Detail panel placeholder
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The selected archive entry will expand in this panel.
          </p>
        </aside>
      </div>
    </main>
  );
}
