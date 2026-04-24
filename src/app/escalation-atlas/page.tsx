import type { Metadata } from "next";
import Link from "next/link";

import { getEscalationAtlasView } from "./_data/escalation-atlas-data";

export const metadata: Metadata = {
  title: "Escalation Atlas",
  description: "Mock escalation route with lane summaries, owner posture, and compact follow-up tracking.",
};

const severityStyles = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  critical: "border-rose-200 bg-rose-50 text-rose-700",
} as const;

export default function EscalationAtlasPage() {
  const view = getEscalationAtlasView();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.14),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#fdfdf8_48%,#f8fafc_100%)] px-6 py-10 text-slate-950 sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white/90 shadow-[0_28px_110px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 xl:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] xl:items-start xl:px-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">{view.hero.eyebrow}</p>
                <p className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Lane-first mock route</p>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{view.hero.title}</h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{view.hero.description}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#escalation-lanes" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Review escalation lanes</a>
                <a href="#owner-summaries" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">Open owner summaries</a>
                <Link href="/" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">Back to route index</Link>
              </div>
            </div>

            <aside aria-label="Escalation atlas pulse" className="rounded-[1.8rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/80">Shift posture</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {view.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.25rem] bg-white/10 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{metric.label}</p>
                    <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/72">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="escalation-lanes" aria-labelledby="atlas-lanes" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Active lanes</p>
              <h2 id="atlas-lanes" className="text-3xl font-semibold tracking-tight">Escalation lanes</h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">Each lane keeps its own summary, live cards, and owner coverage so the route stays readable on desktop and mobile.</p>
          </div>

          <div className="grid gap-5">
            {view.lanes.map((lane) => (
              <section key={lane.id} aria-labelledby={`${lane.id}-heading`} className="rounded-[1.9rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{lane.serviceWindow}</p>
                    <h3 id={`${lane.id}-heading`} className="text-2xl font-semibold tracking-tight">{lane.title}</h3>
                    <p className="max-w-3xl text-sm leading-7 text-slate-600">{lane.summary}</p>
                  </div>
                  <div className="space-y-2 text-sm leading-7 text-slate-600">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                      <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">{lane.itemCount} active</span>
                      <span className="rounded-full bg-rose-50 px-3 py-2 text-rose-700">{lane.criticalCount} critical</span>
                    </div>
                    <p>Owners on point: {lane.ownerNames.join(", ")}.</p>
                  </div>
                </div>

                <div aria-label={`${lane.title} escalations`} className="mt-5 grid gap-4 xl:grid-cols-2" role="list">
                  {lane.items.map((item) => (
                    <article key={item.id} className="rounded-[1.4rem] border border-slate-200 bg-slate-50/85 p-5" role="listitem">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${severityStyles[item.severity]}`}>{item.severity}</span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.service}</span>
                      </div>
                      <h4 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-600"><span className="font-semibold text-slate-900">Account:</span> {item.account} <span className="ml-3 font-semibold text-slate-900">Opened:</span> {item.openedAt}</p>
                      <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                        <p><span className="font-semibold text-slate-900">Blocker:</span> {item.blocker}</p>
                        <p><span className="font-semibold text-slate-900">Next action:</span> {item.nextAction}</p>
                        <p><span className="font-semibold text-slate-900">Window:</span> {item.eta}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section id="owner-summaries" aria-labelledby="atlas-owners" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Named ownership</p>
              <h2 id="atlas-owners" className="text-3xl font-semibold tracking-tight">Owner summaries</h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">Owner cards stay compact: shift coverage, active load, and the next handoff are all visible without opening a detail panel.</p>
          </div>

          <div aria-label="Escalation owner summaries" className="grid gap-4 lg:grid-cols-3" role="list">
            {view.ownerSummaries.map((owner) => (
              <article key={owner.id} className="rounded-[1.6rem] border border-slate-200 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]" role="listitem">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{owner.role}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{owner.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{owner.shift}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">{owner.activeCount} active</span>
                  <span className="rounded-full bg-rose-50 px-3 py-2 text-rose-700">{owner.criticalCount} critical</span>
                </div>
                <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                  <p>{owner.focus}</p>
                  <p><span className="font-semibold text-slate-900">Lane mix:</span> {owner.laneTitles.join(", ")}</p>
                  <p><span className="font-semibold text-slate-900">Handoff:</span> {owner.handoff}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="atlas-follow-up" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Written next steps</p>
              <h2 id="atlas-follow-up" className="text-3xl font-semibold tracking-tight">Compact follow-up queue</h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">Follow-ups stay short and specific so the next operator can see the action, owner, and reason without opening another route.</p>
          </div>

          <div aria-label="Compact follow-up queue" className="rounded-[1.9rem] border border-slate-200 bg-white/92 shadow-[0_18px_50px_rgba(15,23,42,0.06)]" role="list">
            {view.followUps.map((item, index) => (
              <article key={item.id} className={`grid gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)] sm:items-start ${index > 0 ? "border-t border-slate-200" : ""}`} role="listitem">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.ownerName}</p>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.action}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.reason}</p>
                </div>
                <div className="space-y-2 rounded-[1.2rem] border border-slate-200 bg-slate-50/85 px-4 py-4 text-sm leading-7 text-slate-600">
                  <p><span className="font-semibold text-slate-900">Due:</span> {item.dueWindow}</p>
                  <p><span className="font-semibold text-slate-900">Related escalation:</span> {item.escalationTitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
