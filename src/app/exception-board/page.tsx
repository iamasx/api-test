import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exception Board",
  description:
    "Exception board route for grouped exception cases, resolution hints, and follow-up tracking.",
};

export default function ExceptionBoardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f7f3ea] via-[#f2efe8] to-[#e8edf3]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <section className="rounded-[2rem] border border-slate-200/20 bg-white/80 p-8 shadow-lg sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Exception Board
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Grouped exceptions, clear next steps
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              All open exception cases organized by type, with resolution hints
              and follow-up actions to keep the team moving.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
