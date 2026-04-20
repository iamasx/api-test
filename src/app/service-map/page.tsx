import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Map",
  description:
    "Initial scaffold for a service map route with service clusters, dependency highlights, and inspector detail.",
};

export default function ServiceMapPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-10 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
          Service Map
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Service clusters, dependency health, and a focused inspector panel.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          This route is scaffolded for issue 123 and will be expanded with mock
          topology data, dependency highlights, and a route-local inspector.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to overview
          </Link>
        </div>
      </section>
    </main>
  );
}
