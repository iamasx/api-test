import type { Metadata } from "next";
import Link from "next/link";

import {
  manifestDiscrepancies,
  manifestGroups,
  manifestRoomOverview,
  packageSummaries,
} from "./_data/manifest-room-data";

export const metadata: Metadata = {
  title: "Manifest Room",
  description:
    "Grouped manifests, package summaries, and a compact discrepancy panel for dispatch review.",
};

const manifestStatusStyles = {
  sealed: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
  review: "border-amber-300/30 bg-amber-300/12 text-amber-100",
  holding: "border-rose-300/30 bg-rose-300/12 text-rose-100",
} as const;

const discrepancySeverityStyles = {
  critical: "border-rose-300/30 bg-rose-300/10 text-rose-100",
  watch: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  resolved: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
} as const;

export default function ManifestRoomPage() {
  const manifestCount = manifestGroups.reduce((count, group) => count + group.manifests.length, 0);
  const packageLineCount = manifestGroups.reduce(
    (count, group) => count + group.manifests.reduce((sum, manifest) => sum + manifest.packages.length, 0),
    0,
  );
  const criticalCount = manifestDiscrepancies.filter((item) => item.severity === "critical").length;
  const watchCount = manifestDiscrepancies.filter((item) => item.severity === "watch").length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_30%),linear-gradient(180deg,#111827_0%,#172033_52%,#0f172a_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_52%)]" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,248,235,0.1),rgba(15,23,42,0.18))] p-8 shadow-[0_32px_120px_rgba(2,6,23,0.42)] backdrop-blur sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-100/80">{manifestRoomOverview.eyebrow}</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">{manifestRoomOverview.title}</h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">{manifestRoomOverview.description}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#manifest-groups" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">{manifestRoomOverview.primaryAction}</a>
                <a href="#manifest-discrepancies" className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:bg-white/12">{manifestRoomOverview.secondaryAction}</a>
                <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-slate-900/60">Back to route index</Link>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.72),rgba(8,12,24,0.94))] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Dispatch pulse</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-cyan-300/16 bg-cyan-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/75">Manifest groups</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{manifestGroups.length}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{manifestCount} manifests staged across the next dispatch wave.</p>
                </div>
                <div className="rounded-[1.4rem] border border-amber-300/16 bg-amber-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/75">Package lines</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{packageLineCount}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Enough detail to reconcile staging without leaving the route.</p>
                </div>
                <div className="rounded-[1.4rem] border border-rose-300/16 bg-rose-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100/75">Critical exceptions</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{criticalCount}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Hold these before the cross-border relay closes.</p>
                </div>
                <div className="rounded-[1.4rem] border border-emerald-300/16 bg-emerald-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100/75">Watch queue</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{watchCount}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">Follow-up items that can still clear without delaying release.</p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section aria-labelledby="package-summaries-heading" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Package summaries</p>
              <h2 id="package-summaries-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Summaries sized for a pre-dispatch scan</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">These rollups give the shift lead a compact view of manifested, staged, and exception volume before they inspect group-level detail.</p>
          </div>

          <div aria-label="Package summaries" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" role="list">
            {packageSummaries.map((summary) => (
              <article key={summary.id} className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur" role="listitem">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{summary.label}</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                  <p><span className="font-semibold text-white">Manifested:</span> {summary.manifested}</p>
                  <p><span className="font-semibold text-white">Staged:</span> {summary.staged}</p>
                  <p><span className="font-semibold text-white">Discrepancy:</span> {summary.discrepancy}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{summary.note}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] xl:items-start">
          <section id="manifest-groups" aria-labelledby="manifest-groups-heading" className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Grouped manifests</p>
                <h2 id="manifest-groups-heading" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Work the dispatch wave by grouped manifest lanes</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">Every group exposes the dock, cutoff, and manifest-level package mix so the room can clear release work in order.</p>
            </div>

            {manifestGroups.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-heading`} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.74),rgba(8,12,24,0.92))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.26)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{group.label}</p>
                    <div>
                      <h3 id={`${group.id}-heading`} className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{group.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{group.description}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-slate-200">
                    <p><span className="font-semibold text-white">Dock:</span> {group.dock}</p>
                    <p><span className="font-semibold text-white">Cutoff:</span> {group.cutoff}</p>
                  </div>
                </div>

                <div aria-label={`${group.title} manifests`} className="mt-6 grid gap-4 lg:grid-cols-2" role="list">
                  {group.manifests.map((manifest) => (
                    <article key={manifest.id} className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5" role="listitem">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{manifest.id}</p>
                          <h4 className="mt-2 text-xl font-semibold text-white">{manifest.carrier}</h4>
                          <p className="mt-1 text-sm text-slate-300">{manifest.lane} · Departs {manifest.departure}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${manifestStatusStyles[manifest.status]}`}>{manifest.status}</span>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {manifest.packages.map((item) => (
                          <li key={item.label} className="rounded-[1.1rem] border border-white/8 bg-slate-950/30 px-4 py-3 text-sm leading-6 text-slate-200">
                            <p className="font-semibold text-white">{item.label}</p>
                            <p>{item.count}</p>
                            <p className="text-slate-300">{item.staging}</p>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <aside
            id="manifest-discrepancies"
            aria-label="Manifest discrepancy panel"
            className="xl:sticky xl:top-6"
          >
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.88),rgba(8,12,24,0.98))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.3)]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Discrepancy panel</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">Compact follow-up queue</h2>
                <p className="text-sm leading-7 text-slate-300">Keep seal, relabel, and temperature issues visible beside the grouped manifests.</p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-[1.25rem] border border-rose-300/16 bg-rose-300/10 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100/75">Critical</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{criticalCount}</p>
                </div>
                <div className="rounded-[1.25rem] border border-amber-300/16 bg-amber-300/10 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/75">Watch</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{watchCount}</p>
                </div>
                <div className="rounded-[1.25rem] border border-emerald-300/16 bg-emerald-300/10 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100/75">Resolved</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{manifestDiscrepancies.length - criticalCount - watchCount}</p>
                </div>
              </div>

              <div aria-label="Manifest discrepancies" className="mt-6 space-y-3" role="list">
                {manifestDiscrepancies.map((item) => (
                  <article key={item.id} className={`rounded-[1.4rem] border p-4 ${discrepancySeverityStyles[item.severity]}`} role="listitem">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">{item.manifestId}</p>
                        <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
                      </div>
                      <span className="rounded-full border border-current/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">{item.severity}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-100">{item.packageLabel}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.detail}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-100">{item.action}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Owner · {item.owner}</p>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
