import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dispatch Center",
  description:
    "Initial route shell for the dispatch center operational workspace.",
};

export default function DispatchCenterPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-950 bg-slate-950 px-6 py-8 text-white shadow-[0_40px_130px_rgba(15,23,42,0.18)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/72">
          Dispatch Center
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Stand up the route shell for assignment buckets and selected work.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-200/82 sm:text-lg">
              This first subtask creates the dedicated route and reserves the
              main regions for queue summaries, assignment buckets, and a detail
              panel before the richer mock data and components are wired in.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Route checkpoints
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
              <li>Dedicated `/dispatch-center` app route.</li>
              <li>Reserved space for pending work summaries.</li>
              <li>Visible container for selected assignment detail.</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="dispatch-center-shell-zones"
        className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
      >
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/88 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Pending work summary
            </p>
            <h2
              id="dispatch-center-shell-zones"
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
            >
              Queue summary placeholder
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Queue cards land here in the next subtask so release pressure and
              due-soon work stay visible above the board.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/88 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Assignment buckets
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Board placeholder
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Bucket sections and assignment cards will be added after the mock
              data model is in place.
            </p>
          </div>
        </div>

        <aside
          aria-label="Selected assignment detail"
          className="rounded-[2rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.18)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            Detail panel
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Selected assignment placeholder
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/74">
            The right rail is already present so the detailed assignment view can
            be layered in without changing the route structure.
          </p>
        </aside>
      </section>
    </main>
  );
}
