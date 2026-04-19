import type { BacklogItem, EscalationLevel, EscalationLevelId, QueueSummary } from "./queue-monitor-data";

type LocalEscalationState = {
  addToDigest: boolean; holdRelease: boolean; level: EscalationLevelId; notifyFloor: boolean; reviewed: boolean;
};

type QueueDetailPanelProps = {
  escalationLevels: EscalationLevel[]; itemState: LocalEscalationState | null; queueEscalations: number; queueItemsVisible: number;
  selectedItem: BacklogItem | null; selectedQueue: QueueSummary | null; onEscalationLevelChange: (level: EscalationLevelId) => void;
  onToggle: (key: keyof Omit<LocalEscalationState, "level">) => void;
};

const levelToneClasses = {
  calm: "border-slate-300/20 bg-slate-300/10 text-slate-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  hot: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const toggleLabels: { hint: string; key: keyof Omit<LocalEscalationState, "level">; label: string }[] = [
  { key: "holdRelease", label: "Hold release", hint: "Keep this item parked in the queue preview." },
  { key: "notifyFloor", label: "Notify floor", hint: "Bring operations into the next sweep." },
  { key: "addToDigest", label: "Digest flag", hint: "Include the item in the manager digest." },
  { key: "reviewed", label: "Reviewed", hint: "Mark the local preview as checked." },
];

export function QueueDetailPanel({
  escalationLevels,
  itemState,
  queueEscalations,
  queueItemsVisible,
  selectedItem,
  selectedQueue,
  onEscalationLevelChange,
  onToggle,
}: QueueDetailPanelProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(28,25,23,0.94))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.42)] sm:p-6">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Queue preview</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{selectedQueue ? selectedQueue.label : "Choose a queue"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{selectedQueue ? `${selectedQueue.region} is owned by ${selectedQueue.owner}. ${queueItemsVisible} filtered items are visible with ${queueEscalations} local escalations applied.` : "Pick a queue column to inspect backlog details and adjust local escalation controls."}</p>
        {selectedQueue ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Oldest</p><p className="mt-2 text-xl font-semibold text-white">{selectedQueue.oldestMinutes} min</p></div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Intake</p><p className="mt-2 text-xl font-semibold text-white">{selectedQueue.intakePerHour}/hr</p></div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cleared</p><p className="mt-2 text-xl font-semibold text-white">{selectedQueue.clearedPerHour}/hr</p></div>
          </div>
        ) : null}
      </div>

      {selectedItem && itemState ? (
        <div className="mt-5 space-y-5">
          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{selectedItem.caseRef}</span>
              <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-100">{selectedItem.ageMinutes} min open</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{selectedItem.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{selectedItem.customer} · {selectedItem.segment}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{selectedItem.detail}</p>
            <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Next action</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{selectedItem.nextAction}</p>
              <p className="mt-3 text-sm text-slate-400">Owner: {selectedItem.owner}</p>
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Escalation level</p>
            <div className="mt-4 space-y-3">
              {escalationLevels.map((level) => (
                <button className={`flex w-full items-start justify-between gap-4 rounded-[1.3rem] border p-4 text-left transition ${itemState.level === level.id ? "border-orange-200/40 bg-orange-200/10" : `${levelToneClasses[level.tone]} hover:bg-white/10`}`} key={level.id} onClick={() => onEscalationLevelChange(level.id)} type="button">
                  <div><p className="font-medium text-white">{level.label}</p><p className="mt-1 text-sm text-slate-300">{level.note}</p></div>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-400">{itemState.level === level.id ? "Selected" : "Available"}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Local controls</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {toggleLabels.map((toggle) => (
                <button className={`rounded-[1.2rem] border p-4 text-left transition ${itemState[toggle.key] ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-50" : "border-white/10 bg-slate-950/45 text-slate-200 hover:bg-white/10"}`} key={toggle.key} onClick={() => onToggle(toggle.key)} type="button">
                  <p className="font-medium">{toggle.label}</p>
                  <p className="mt-1 text-sm opacity-80">{toggle.hint}</p>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">These toggles only update this route-local preview state. They do not affect any shared queue or page outside `/queue-monitor`.</p>
          </section>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Nothing selected</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{selectedQueue ? "This queue has no items in the current filter view." : "Select a queue column to inspect the backlog."}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{selectedQueue ? "Change the aging filter or choose another queue to reopen the detail preview." : "The detail panel will show item context and escalation controls once a backlog card is selected."}</p>
        </div>
      )}
    </aside>
  );
}
