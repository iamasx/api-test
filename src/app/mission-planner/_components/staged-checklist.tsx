import type {
  MissionStage,
  StageStatus,
  TaskStatus,
} from "../_data/mission-planner-data";

const stageStatusStyles: Record<StageStatus, string> = {
  complete: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
  active: "border-sky-300/25 bg-sky-300/10 text-sky-50",
  queued: "border-slate-300/18 bg-slate-200/8 text-slate-100",
};

const stageStatusLabels: Record<StageStatus, string> = {
  complete: "Complete",
  active: "Active",
  queued: "Queued",
};

const taskStatusStyles: Record<TaskStatus, string> = {
  done: "border-emerald-300/22 bg-emerald-300/10 text-emerald-50",
  watch: "border-amber-300/22 bg-amber-300/10 text-amber-50",
  pending: "border-slate-300/18 bg-slate-200/8 text-slate-100",
};

const taskStatusLabels: Record<TaskStatus, string> = {
  done: "Done",
  watch: "Watch",
  pending: "Pending",
};

type StagedChecklistProps = {
  stages: MissionStage[];
};

export function StagedChecklist({ stages }: StagedChecklistProps) {
  return (
    <section aria-labelledby="mission-stage-checklist" className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
            Staged checklist
          </p>
          <h2
            id="mission-stage-checklist"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Walk the crew through the mission in sequence
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Each stage preserves timing, ownership, and task status so the route
          reads like an actual execution plan rather than a static memo.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3" role="list" aria-label="Mission stages">
        {stages.map((stage) => (
          <article
            key={stage.id}
            className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_24px_60px_rgba(2,6,23,0.26)]"
            role="listitem"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-300">{stage.window}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {stage.name}
                </h3>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${stageStatusStyles[stage.status]}`}
              >
                {stageStatusLabels[stage.status]}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">{stage.focus}</p>

            <ul className="mt-5 space-y-3">
              {stage.tasks.map((task) => (
                <li
                  key={task.id}
                  className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{task.label}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {task.owner}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${taskStatusStyles[task.status]}`}
                    >
                      {taskStatusLabels[task.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{task.note}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
