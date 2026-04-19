import type { ProgressBand } from "@/app/checkpoint-grid/mock-data";

type ProgressBandStripProps = { bands: ProgressBand[] };

export function ProgressBandStrip({ bands }: ProgressBandStripProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">Progress bands</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Milestone lane coverage</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">Each band summarizes how many checkpoint tiles are finished before the next review handoff.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {bands.map((band) => {
          const ratio = Math.round((band.completed / band.total) * 100);
          return (
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5" key={band.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{band.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{band.completed}/{band.total}</p>
                </div>
                <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-100">{ratio}%</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc_0%,#f59e0b_100%)]" style={{ width: `${ratio}%` }} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{band.focus}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
