import Link from "next/link";

const launchChecks = [
  "Five mock archive snapshots with visible preservation metadata",
  "A route-driven detail panel keyed off the snapshot query string",
  "Render-state coverage for default, targeted, and fallback selections",
];

const notebookHighlights = [
  "Dedicated shell for experiment logs and operator observations",
  "Status panels reserved for active, blocked, and next-step summaries",
  "Notebook route is now staged independently from the archive workflows",
];

const inventoryRouteHighlights = [
  "Cross-linked inventory bays with active delivery route segments",
  "Real-time stock metrics, low-stock alerts, and restock order tracking",
  "Warehouse supply snapshots integrated directly into route planning views",
];

const fieldGuideHighlights = [
  "Grouped procedure cards with searchable categories, priorities, and focus areas",
  "Checklist previews on the catalog side before opening the detail panel",
  "Reference-ready procedure detail for active response handoffs",
];

const opsCenterHighlights = [
  "Live KPI cards with progress bars for on-time departures, fleet use, and exception backlog",
  "Prioritized alert queue with severity badges, owner attribution, and playbook guidance",
  "Chronological activity feed tracking automated reroutes and shift-lead decisions",
  "Shift posture summary with immediate-focus and coverage notes for the command desk",
];

const registryHighlights = [
  "Filterable experiment cards with status badges and owner attribution",
  "Timeline visualization showing experiment lifecycle from hypothesis to completion",
  "Search across titles, hypotheses, tags, and owner names in real time",
  "Compact results panel with baseline-vs-current metric comparisons",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Issue 90 / Archive Route
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Controlled conflict drill B landing page headline.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                The new archive browser route focuses on quick inspection:
                snapshot cards on the left, full metadata detail on the right,
                and server-rendered selection via the query string.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/archive-browser"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-amber-50 transition hover:bg-slate-800"
              >
                Open archive browser
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/90"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Delivery checks
            </p>
            <ul className="mt-5 space-y-4">
              {launchChecks.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Issue 88 / Research Notebook
            </p>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Open the notebook shell for experiments, observations, and
                status summaries.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The research notebook now has its own route shell, separate from
                the archive workflows, so the remaining data model and notebook
                UI can ship incrementally on the same PR.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/research-notebook"
                className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-sky-50 transition hover:bg-sky-800"
              >
                Open research notebook
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/88"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Notebook staging
            </p>
            <ul className="mt-5 space-y-4">
              {notebookHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
              Issue 142 / Field Guide
            </p>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Open the field guide route for searchable procedures, grouped
                checklists, and reference detail.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The field guide route stages mock response procedures with
                searchable controls, grouped catalog sections, and a sticky
                reference panel so operators can keep execution detail close to
                the active selection.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/field-guide"
                className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-teal-50 transition hover:bg-teal-800"
              >
                Open field guide
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/142"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Field guide staging
            </p>
            <ul className="mt-5 space-y-4">
              {fieldGuideHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Issue 186 / Operations Center
            </p>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Monitor live network health, dispatch risk, and intervention
                velocity from a single dashboard.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The operations center consolidates KPI snapshots, live alert
                queues, and shift activity into a command-desk view designed for
                operators keeping critical lanes in sync.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/operations-center"
                className="inline-flex items-center justify-center rounded-full bg-cyan-700 px-6 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-800"
              >
                Open operations center
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/186"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Dashboard capabilities
            </p>
            <ul className="mt-5 space-y-4">
              {opsCenterHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="route-entry-link overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Issue 188 / Inventory &amp; Route Integration
            </p>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Cross-linked inventory bays and delivery route planning in one
                shared surface.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The inventory bay and route planner now share integration panels
                that connect stock levels to active delivery segments, enabling
                rapid restock decisions without switching contexts.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/inventory-bay"
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-800"
              >
                Open inventory bay
              </Link>
              <Link
                href="/route-planner"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open route planner
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/188"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Integration highlights
            </p>
            <ul className="mt-5 space-y-4">
              {inventoryRouteHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-700">
              Issue 190 / Experiment Registry
            </p>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Browse, filter, and track every experiment from hypothesis
                through results.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The experiment registry now includes status-based filtering,
                full-text search, a timeline visualization for each experiment,
                and an expanded dataset of nine mock experiments across four
                status categories.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/experiment-registry"
                className="inline-flex items-center justify-center rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-indigo-50 transition hover:bg-indigo-800"
              >
                Open experiment registry
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/190"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Registry features
            </p>
            <ul className="mt-5 space-y-4">
              {registryHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
