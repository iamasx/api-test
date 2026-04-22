import type { ComparisonNote } from "../_data/scenario-explorer-data";
import styles from "../scenario-explorer.module.css";

const toneClass: Record<string, string> = {
  steady: styles.noteToneSteady,
  watch: styles.noteToneWatch,
  risk: styles.noteToneRisk,
};

export function ComparisonNoteCard({ note }: { note: ComparisonNote }) {
  return (
    <article className={`${styles.noteCard} ${toneClass[note.tone]} space-y-2`}>
      <h3 className="text-base font-semibold tracking-tight text-slate-950">
        {note.title}
      </h3>

      <p className="text-sm leading-6 text-slate-600">{note.body}</p>

      <p className="text-xs text-slate-400">
        Related scenarios:{" "}
        {note.relatedScenarios.map((id) => (
          <span
            key={id}
            className="mr-1.5 inline-block rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-500"
          >
            {id}
          </span>
        ))}
      </p>
    </article>
  );
}
