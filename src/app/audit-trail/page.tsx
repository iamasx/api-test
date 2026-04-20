import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Trail",
  description:
    "Initial route shell for reviewing audit history, review flags, and reviewer activity.",
};

export default function AuditTrailPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Audit trail
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Dedicated route shell for recent changes, review flags, and reviewer context.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                This first pass establishes the standalone route for issue
                #126. Follow-up commits on this branch will layer in mock audit
                data, timeline content, reviewer metadata, responsive styling,
                and tests.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <section className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Timeline
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder space for audit entries and change history.
              </p>
            </section>
            <section className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Review Flags
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder space for open flags, escalations, and release
                gates.
              </p>
            </section>
            <section className="rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Reviewers
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder space for reviewer coverage, ownership, and
                metadata.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
