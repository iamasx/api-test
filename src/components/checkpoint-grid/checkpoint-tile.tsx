import type { Checkpoint } from "@/app/checkpoint-grid/mock-data";

const statusClasses = {
  complete: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
  active: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  blocked: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

type CheckpointTileProps = { checkpoint: Checkpoint; isSelected: boolean; onSelect: (checkpointId: string) => void };

export function CheckpointTile({ checkpoint, isSelected, onSelect }: CheckpointTileProps) {
  return (
    <button className={`rounded-[1.6rem] border p-5 text-left transition ${isSelected ? "border-sky-300/45 bg-sky-300/10 shadow-[0_18px_40px_rgba(14,165,233,0.12)]" : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"}`} onClick={() => onSelect(checkpoint.id)} type="button">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{checkpoint.band}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{checkpoint.title}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${statusClasses[checkpoint.status]}`}>{checkpoint.status}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{checkpoint.summary}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <p>
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Owner</span>
          {checkpoint.owner}
        </p>
        <p>
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Due</span>
          {checkpoint.dueLabel}
        </p>
        <p>
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Dependency</span>
          {checkpoint.dependency}
        </p>
        <p>
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Next step</span>
          {checkpoint.nextStep}
        </p>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-400">Completion</span>
          <span className="font-medium text-white">{checkpoint.completion}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc_0%,#f59e0b_100%)]" style={{ width: `${checkpoint.completion}%` }} />
        </div>
      </div>
    </button>
  );
}
