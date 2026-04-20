import type { NotebookStatus } from "@/app/lab-notebook/notebook-data";

type LabNotebookHeaderProps = {
  activeCount: number;
  comparedRunCount: number;
  flaggedCount: number;
  lastEntrySummary: string;
  notebookStatus: NotebookStatus;
  selectedExperimentTitle: string | null;
  selectedTemplateLabel: string;
  visibleCount: number;
};

export function LabNotebookHeader({
  activeCount,
  comparedRunCount,
  flaggedCount,
  lastEntrySummary,
  notebookStatus,
  selectedExperimentTitle,
  selectedTemplateLabel,
  visibleCount,
}: LabNotebookHeaderProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.8fr)]">
      <article className="rounded-[2rem] border border-stone-900/10 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,243,199,0.86))] p-6 shadow-[0_28px_90px_rgba(120,53,15,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Lab Notebook Route</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-emerald-700/15 bg-emerald-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">{notebookStatus.label}</span>
          <span className="rounded-full border border-stone-900/10 bg-white/65 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{notebookStatus.phase}</span>
          <span className="rounded-full border border-stone-900/10 bg-white/65 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{selectedTemplateLabel}</span>
        </div>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">Template-aware experiment boards with local multi-run review.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-700">Templates, board lanes, comparison runs, and review helpers all stay local to this route so the notebook can model a fuller research workflow without touching shared app state.</p>
        <div className="mt-5 rounded-[1.4rem] border border-stone-900/10 bg-white/65 p-4 text-sm text-stone-700">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Current focus</p>
          <p className="mt-2 leading-6">{selectedExperimentTitle ?? "Pick a card or create a draft from a template to focus the notebook."}</p>
        </div>
      </article>
      <article className="rounded-[2rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(41,37,36,0.94))] p-6 text-stone-100 shadow-[0_28px_90px_rgba(15,23,42,0.28)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/75">{notebookStatus.syncLabel}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Last-entry summary</h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">{lastEntrySummary}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-4">
            <p className="text-2xl font-semibold">{visibleCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">Visible cards</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-4">
            <p className="text-2xl font-semibold">{activeCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">Active bench</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-4">
            <p className="text-2xl font-semibold">{flaggedCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">Watch notes</p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-3 py-4">
            <p className="text-2xl font-semibold">{comparedRunCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">Runs in compare</p>
          </div>
        </div>
      </article>
    </section>
  );
}
