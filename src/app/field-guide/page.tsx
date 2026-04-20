import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Field Guide",
  description:
    "Initial route shell for the field guide experience with procedures, checklists, and reference content.",
};

export default function FieldGuidePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 px-6 py-12 sm:px-10 lg:px-12">
      <section className="w-full rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Issue 104 / Field Guide
          </p>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Field guide route scaffold
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            This route shell is in place so the procedures, checklist data,
            search controls, and reference detail experience can land in
            follow-up commits on the same PR.
          </p>
        </div>
      </section>
    </main>
  );
}
