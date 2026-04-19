import type { MilestoneSummary } from "@/app/checkpoint-grid/mock-data";

type CheckpointGridHeaderProps = {
  activeCount: number; blockedCount: number; completionRatio: number; completeCount: number;
  summary: MilestoneSummary; totalCheckpoints: number; totalNotes: number;
};

export function CheckpointGridHeader({ activeCount, blockedCount, completionRatio, completeCount, summary, totalCheckpoints, totalNotes }: CheckpointGridHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-300">
            <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-sky-100">{summary.cycle}</span>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-amber-100">{summary.reviewDate}</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{summary.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{summary.summary}</p>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 lg:min-w-[260px]">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Completion ratio</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold text-white">{completionRatio}%</p>
              <p className="mt-1 text-sm text-slate-300">{summary.dueWindow}</p>
            </div>
            <div className="text-right text-sm text-slate-300">
              <p>{completeCount} complete</p>
              <p>{activeCount} active</p>
              <p>{blockedCount} blocked</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc_0%,#fbbf24_100%)]" style={{ width: `${completionRatio}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-300">{totalCheckpoints} checkpoints and {totalNotes} local review notes in this isolated route.</p>
        </div>
      </div>
    </header>
  );
}
