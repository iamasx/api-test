import Link from "next/link";

import { ContactSummary } from "./contact-summary";
import { InspectorPanel } from "./inspector-panel";
import { SectorCard } from "./sector-card";
import type { RadarConsoleView } from "../_lib/radar-console";

type RadarConsoleShellProps = {
  view: RadarConsoleView;
};

export function RadarConsoleShell({ view }: RadarConsoleShellProps) {
  return (
    <main className="px-6 py-10 text-slate-50 sm:px-10 lg:px-12 lg:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2.2rem] border border-slate-950/10 bg-slate-950 px-8 py-8 shadow-[0_28px_90px_rgba(15,23,42,0.32)] sm:px-10 sm:py-10 lg:px-12">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] xl:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/78">
                  {view.overview.eyebrow}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                  {view.overview.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  {view.overview.description}
                </p>
              </div>

              <div
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                role="list"
                aria-label="Radar console summary"
              >
                {view.summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4"
                    role="listitem"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {card.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {card.detail}
                    </p>
                  </div>
                ))}
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
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-300/45 hover:text-emerald-100"
                  rel="noreferrer"
                  target="_blank"
                >
                  Review issue scope
                </a>
              </div>
            </div>

            <aside className="grid gap-4 rounded-[1.7rem] border border-white/10 bg-white/6 p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Mission
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {view.overview.missionLabel}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {view.overview.syncLabel}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-white/8 bg-slate-900/70 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Directive
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {view.overview.directive}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-white/8 bg-slate-900/70 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Priority legend
                </p>
                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                  {view.inspector.metadata.legend.map((item) => (
                    <li key={item.id}>
                      {item.label} · {item.summary}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(340px,0.72fr)] xl:items-start">
          <div className="space-y-8">
            <section className="space-y-5" aria-labelledby="radar-sectors-heading">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Sector sweep
                  </p>
                  <h2
                    id="radar-sectors-heading"
                    className="text-3xl font-semibold tracking-tight text-slate-950"
                  >
                    Sector cards
                  </h2>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-slate-600">
                  Each sector card keeps the sweep window, orbit, active signals,
                  and assigned contacts visible in one place so the route reads
                  like an operational console instead of a generic grid.
                </p>
              </div>

              <div role="list" aria-label="Radar sectors" className="grid gap-5">
                {view.sectorCards.map((item) => (
                  <SectorCard
                    key={item.sector.id}
                    sector={item.sector}
                    contacts={item.contacts}
                    signals={item.signals}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-5" aria-labelledby="radar-contacts-heading">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Contact posture
                  </p>
                  <h2
                    id="radar-contacts-heading"
                    className="text-3xl font-semibold tracking-tight text-slate-950"
                  >
                    Contact summaries
                  </h2>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-slate-600">
                  Contact summaries tie sector ownership to response windows and
                  active priorities so a reader can understand who carries each
                  signal without opening another route.
                </p>
              </div>

              <div
                role="list"
                aria-label="Radar contact summaries"
                className="grid gap-4 xl:grid-cols-2"
              >
                {view.contactSummaries.map((item) => (
                  <ContactSummary
                    key={item.contact.id}
                    contact={item.contact}
                    sectors={item.sectors}
                    assignedSignals={item.assignedSignals}
                  />
                ))}
              </div>
            </section>
          </div>

          <InspectorPanel
            metadata={view.inspector.metadata}
            selectedSignal={view.inspector.selectedSignal}
            selectedSector={view.inspector.selectedSector}
            owners={view.inspector.owners}
            queue={view.inspector.queue}
            fallbackMessage={view.inspector.fallbackMessage}
          />
        </div>
      </div>
    </main>
  );
}
