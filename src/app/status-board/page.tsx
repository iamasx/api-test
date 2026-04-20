import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Board",
  description:
    "A regional service health route for monitoring service posture and response readiness.",
};

export default function StatusBoardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
          Status Board
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Monitor regional service health without leaving the app shell.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          The full regional board, response checklist, and mock health signals
          will be assembled in follow-up subtasks.
        </p>
      </section>
    </main>
  );
}
