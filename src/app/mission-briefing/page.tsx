import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mission Briefing",
  description:
    "Initial shell for the mission briefing route that will host scenario cards, readiness highlights, and decision support.",
};

export default function MissionBriefingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-1 flex-col justify-center gap-6 px-6 py-16 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-8 py-12 shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
          Mission Briefing
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Mission briefing route shell
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          This route is now scaffolded and ready for the scenario cards,
          readiness highlights, and decision support work that follows.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to route index
          </Link>
        </div>
      </div>
    </main>
  );
}
