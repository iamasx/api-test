import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Archive Vault",
  description:
    "Initial route shell for browsing archive vault snapshots and detail views.",
};

export default function ArchiveVaultPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-14">
      <header className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Archive Vault
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Snapshot browser shell for preserved archive packages.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              This route will expand into grouped archive snapshots, metadata
              badges, and a comparison-ready detail panel.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to route index
          </Link>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Snapshot browser
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Grouped archive entries will render here
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Subtask 1 establishes the route shell and the two-column layout that
            later subtasks will fill with archive data, tags, badges, and
            detail content.
          </p>
        </article>

        <aside className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Detail panel
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Comparison-ready summary placeholder
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Later subtasks will populate this area with metadata labels,
            preservation notes, and snapshot comparison context.
          </p>
        </aside>
      </section>
    </main>
  );
}
