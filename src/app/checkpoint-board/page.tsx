import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkpoint Board",
  description: "Checkpoint board route scaffold for milestone groups, readiness summaries, and review notes.",
};

export default function CheckpointBoardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-12 sm:px-10 lg:px-12">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Checkpoint Board
        </p>
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          Back to overview
        </Link>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Checkpoint board route scaffold.
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            This placeholder route establishes the standalone page shell for the
            grouped milestone board that will be filled in through the remaining
            issue subtasks.
          </p>
        </div>
      </section>
    </main>
  );
}
