import type { ExperimentTemplate } from "@/app/lab-notebook/notebook-data";

type TemplateGalleryProps = {
  countsByTemplateId: Record<string, number>;
  onCreateFromTemplate: (templateId: string) => void;
  onSelectTemplate: (templateId: string | null) => void;
  selectedTemplateId: string | null;
  templates: ExperimentTemplate[];
};

export function TemplateGallery({
  countsByTemplateId,
  onCreateFromTemplate,
  onSelectTemplate,
  selectedTemplateId,
  templates,
}: TemplateGalleryProps) {
  return (
    <section className="rounded-[2rem] border border-stone-900/10 bg-white/80 p-5 shadow-[0_22px_80px_rgba(120,53,15,0.12)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Experiment templates</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">Select an existing template or create a fresh notebook board from one.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">Template cards keep the planning notes, compare guidance, and review prompts close to the board so teams can move from setup to outcome review inside one route.</p>
        </div>
        <button
          className={`rounded-full px-4 py-2 text-sm transition ${
            selectedTemplateId === null
              ? "bg-stone-950 text-stone-50"
              : "border border-stone-900/10 bg-stone-100/80 text-stone-700 hover:bg-stone-200/80"
          }`}
          onClick={() => onSelectTemplate(null)}
          type="button"
        >
          Show all templates
        </button>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {templates.map((template) => {
          const isSelected = selectedTemplateId === template.id;

          return (
            <article
              className={`rounded-[1.85rem] border p-5 transition ${
                isSelected
                  ? "border-stone-950 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,249,195,0.8))] shadow-[0_22px_80px_rgba(120,53,15,0.16)]"
                  : "border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.88))] hover:border-stone-900/20"
              }`}
              key={template.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{template.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">{template.name}</h3>
                </div>
                <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                  {countsByTemplateId[template.id] ?? 0} boards
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-stone-700">{template.summary}</p>

              <div className="mt-4 grid gap-3">
                <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Objective</p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{template.objective}</p>
                </div>
                <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Comparison hint</p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{template.compareHint}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                  {template.cadence}
                </span>
                <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                  {template.checkpointMilestoneIds.length} checkpoints
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-stone-700">
                {template.boardNotes.map((note) => (
                  <p className="rounded-[1.15rem] border border-stone-900/10 bg-white/60 px-3 py-3 leading-6" key={note}>
                    {note}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  aria-label={`Select template: ${template.name}`}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isSelected
                      ? "bg-stone-950 text-stone-50"
                      : "border border-stone-900/10 bg-white/70 text-stone-700 hover:bg-stone-100"
                  }`}
                  onClick={() => onSelectTemplate(template.id)}
                  type="button"
                >
                  {isSelected ? "Template selected" : "Select template"}
                </button>
                <button
                  aria-label={`Create notebook from template: ${template.name}`}
                  className="rounded-full border border-stone-900/10 bg-stone-100/80 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-200/80"
                  onClick={() => onCreateFromTemplate(template.id)}
                  type="button"
                >
                  Create notebook board
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
