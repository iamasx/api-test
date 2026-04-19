type RunbookStudioHeaderProps = {
  procedureCount: number;
  stageCount: number;
  attentionCount: number;
};

export default function RunbookStudioHeader({
  procedureCount,
  stageCount,
  attentionCount,
}: RunbookStudioHeaderProps) {
  const panels = [
    { label: "Procedure cards", value: procedureCount, detail: "Feature-local mock drafts" },
    { label: "Execution stages", value: stageCount, detail: "Mapped into the preview rail" },
    { label: "Needs validation", value: attentionCount, detail: "Cards with watch or blocked markers" },
  ];

  return (
    <header className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Runbook Studio</p>
            <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
              Draft Sync
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Procedure cards, stage gates, and a live execution preview in one isolated route.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            All data and interactions stay local: section filtering, validation review, stage visibility,
            and step completion never leave this route.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {panels.map((panel) => (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3" key={panel.label}>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{panel.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">{panel.value}</p>
              <p className="mt-1 text-sm text-slate-600">{panel.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
