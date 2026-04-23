import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Board",
  description:
    "Real-time service health dashboard with uptime indicators and incident history.",
};

export default function StatusBoardPage() {
  return (
    <main className="status-board mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <header className="space-y-3">
        <p className="section-label text-[var(--status-accent)]">
          Status Board
        </p>
        <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
          Service health overview and incident timeline.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Monitor uptime across critical services, review recent incidents, and
          track resolution progress from a single view.
        </p>
      </header>

      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">System Status</p>
        <p className="mt-4 text-base text-slate-600">
          Service health indicators will appear here once mock data is loaded.
        </p>
      </section>
    </main>
  );
}
