import type {
  Experiment,
  MilestoneTag,
  ObservationEntry,
  ObservationSection,
} from "@/app/lab-notebook/notebook-data";

type ObservationDrawerProps = {
  entries: ObservationEntry[];
  experiment: Experiment | null;
  expandedEntryId: string | null;
  milestoneTagsById: Record<string, MilestoneTag>;
  onExpandEntry: (entryId: string) => void;
  onSectionChange: (section: ObservationSection) => void;
  section: ObservationSection;
};

const sectionLabels: Record<ObservationSection, string> = {
  notes: "Notes",
  flags: "Flags",
  timeline: "Timeline",
};

const toneClasses = {
  amber: "border-amber-300/20 bg-amber-400/10 text-amber-100",
  emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  rose: "border-rose-300/20 bg-rose-400/10 text-rose-100",
  sky: "border-sky-300/20 bg-sky-400/10 text-sky-100",
};

export function ObservationDrawer({
  entries,
  experiment,
  expandedEntryId,
  milestoneTagsById,
  onExpandEntry,
  onSectionChange,
  section,
}: ObservationDrawerProps) {
  const sectionEntries = entries.filter((entry) => entry.section === section);
  const counts = {
    notes: entries.filter((entry) => entry.section === "notes").length,
    flags: entries.filter((entry) => entry.section === "flags").length,
    timeline: entries.filter((entry) => entry.section === "timeline").length,
  };

  return (
    <aside className="rounded-[2rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(12,10,9,0.96),rgba(41,37,36,0.97))] p-5 text-stone-100 shadow-[0_28px_90px_rgba(15,23,42,0.3)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/75">Observation drawer</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{experiment ? experiment.title : "Choose an experiment"}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            {experiment
              ? `${experiment.window}. Local sections switch between notebook notes, watch items, and milestone timing.`
              : "Select an experiment card to open the drawer. Until then, the notebook keeps this region in a local waiting state."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["notes", "flags", "timeline"] as ObservationSection[]).map((nextSection) => (
          <button
            className={`rounded-full px-4 py-2 text-sm transition ${
              nextSection === section
                ? "bg-stone-50 text-stone-950"
                : "border border-white/12 bg-white/5 text-stone-200 hover:bg-white/10"
            }`}
            key={nextSection}
            onClick={() => onSectionChange(nextSection)}
            type="button"
          >
            {sectionLabels[nextSection]} <span className="text-xs opacity-70">{counts[nextSection]}</span>
          </button>
        ))}
      </div>

      {!experiment ? (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.04] p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-400">Waiting on selection</p>
          <p className="mt-3 text-sm leading-6 text-stone-300">Pick any card from the notebook board to review note snippets, watch markers, and milestone timing without leaving this route.</p>
        </div>
      ) : sectionEntries.length === 0 ? (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.04] p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-400">Section clear</p>
          <h3 className="mt-3 text-xl font-semibold">No {sectionLabels[section].toLowerCase()} are parked for this experiment.</h3>
          <p className="mt-3 text-sm leading-6 text-stone-300">The drawer stays open, but this section is empty. Switch sections or return to another card if you want a fuller observation trail.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {sectionEntries.map((entry) => {
            const milestone = entry.milestoneId ? milestoneTagsById[entry.milestoneId] : undefined;
            const isExpanded = expandedEntryId === entry.id;

            return (
              <article className="rounded-[1.55rem] border border-white/10 bg-white/5 p-4" key={entry.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-300">{entry.capturedAt}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-300">{entry.recorder}</span>
                  {milestone ? (
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[milestone.tone]}`}>{milestone.label}</span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{entry.headline}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">{entry.snippet}</p>
                {isExpanded ? <p className="mt-3 text-sm leading-6 text-stone-200">{entry.detail}</p> : null}
                <button className="mt-4 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10" onClick={() => onExpandEntry(entry.id)} type="button">
                  {isExpanded ? "Hide detail" : "Expand detail"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </aside>
  );
}
