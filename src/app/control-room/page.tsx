import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control Room",
  description:
    "Initial route shell for the control-room dashboard with space for metrics, alerts, and operator activity.",
};

export default function ControlRoomPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Control Room
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Control operational drift before it spills into the network.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                This route shell reserves space for system metrics, active
                alerts, and an operator activity rail. The remaining subtasks
                will layer in mock data, reusable components, and the full
                dashboard layout.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Metrics
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder zone for route-specific KPI cards.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Alerts
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder zone for live alert sections and severity states.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Activity
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Placeholder zone for the operator activity rail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
