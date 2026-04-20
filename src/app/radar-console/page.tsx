import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Radar Console",
  description:
    "Initial radar-console route shell for sector scans, contact summaries, and signal inspection.",
};

const plannedSurfaces = [
  "Sector cards with posture, orbit coverage, and signal counts",
  "Contact summaries with ownership, channel, and response metadata",
  "Signal inspector detail keyed to the current priority selection",
];

export default function RadarConsolePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-12 sm:px-10 lg:px-12">
      <section className="w-full overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 px-8 py-10 text-slate-50 shadow-[0_28px_90px_rgba(15,23,42,0.32)] sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/78">
                Issue 147 / Radar Console
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Radar console route shell for sectors, contacts, and signal inspection.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This initial route establishes the standalone shell requested in
                issue #147. The next subtasks will fill the shell with mock
                sector cards, contact summaries, and a dedicated inspector
                panel.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
              >
                Back to route index
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/147"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-300/50 hover:text-emerald-100"
                rel="noreferrer"
                target="_blank"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <aside className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Planned surfaces
            </p>
            <ul className="mt-5 space-y-3">
              {plannedSurfaces.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/6 px-4 py-4 text-sm leading-6 text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
