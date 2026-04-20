import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operations Center",
  description: "Initial shell for the operations center dashboard route.",
};

export default function OperationsCenterPage() {
  return (
    <main className="flex min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8 lg:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">
            Operations Center
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Dashboard route shell
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            KPI cards, live alerts, and the recent activity feed will be added
            in follow-up commits on this branch.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              KPI zone
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Reserved for metric cards and performance indicators.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Alert zone
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Reserved for live operational alerts and intervention status.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Activity zone
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Reserved for the recent activity feed and shift timeline.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
