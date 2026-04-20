import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inventory Bay",
  description:
    "Initial shell for the inventory bay route that will expand with stock bands and restock guidance.",
};

export default function InventoryBayPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_46%,#ecfeff_100%)] p-8 shadow-[0_24px_90px_rgba(15,23,42,0.1)] sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
            Inventory Bay
          </p>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>

        <div className="mt-8 max-w-4xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Inventory bay route scaffold for stock bands, category sections, and next restock moves.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            This initial shell establishes the dedicated route for the upcoming
            inventory workflow. The next subtasks will add mock stock data,
            grouped category sections, recommendation content, and route tests.
          </p>
        </div>
      </section>
    </main>
  );
}
