import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Telemetry Desk",
  description:
    "Scaffolded route shell for a telemetry review desk with trend and anomaly panels to follow.",
};

export default function TelemetryDeskPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.3)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/78">
            Telemetry Desk
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Route shell staged for trend panels, metric tiles, and anomaly review.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            This first pass establishes the dedicated route so the remaining metric data,
            comparison panels, and supporting summaries can land in follow-up subtasks.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              Back to route index
            </Link>
          </div>
        </header>
      </div>
    </main>
  );
}
