import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shift Planner",
  description: "Review shift coverage, staffing warnings, and handoff notes on a dedicated route.",
};

export default function ShiftPlannerPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Shift Planner
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Coverage matrices, open-shift warnings, and handoff notes in one route.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              This scaffold establishes the standalone staffing route before the
              route-local data, matrix sections, and tests land in follow-up
              commits.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to route index
          </Link>
        </div>
      </section>
    </main>
  );
}
