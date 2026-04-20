import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scenario Board",
  description: "Minimal planning route scaffold for the scenario board surface.",
};

export default function ScenarioBoardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-10 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:px-10">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Scenario Board
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Scenario board route scaffold.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              This minimal shell establishes the dedicated route for the
              planning board before the scenario data, prompts, and outcome
              matrix are layered in.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to route index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
