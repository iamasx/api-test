import type {
  DutyRotationEntry,
  DutyRotationPriority,
} from "../_data/crew-roster-data";

const priorityClasses = {
  Primary: "border-sky-200 bg-sky-50 text-sky-950",
  Support: "border-amber-200 bg-amber-50 text-amber-950",
  Reserve: "border-violet-200 bg-violet-50 text-violet-950",
} satisfies Record<DutyRotationPriority, string>;

export function DutyRotationPanel({
  entries,
}: {
  entries: DutyRotationEntry[];
}) {
  const spotlight = entries[0];

  return (
    <section
      aria-labelledby="duty-rotation-title"
      className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] sm:p-7"
    >
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
              Duty rotation
            </p>
            <p className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Highlighted handoff
            </p>
          </div>

          <div>
            <h2
              id="duty-rotation-title"
              className="text-3xl font-semibold tracking-tight"
            >
              Keep the next command window visible before the handoff starts.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
              The rotation panel calls out who owns the next watch segment, where
              they are posted, and which backup roles stay warm if coverage shifts.
            </p>
          </div>

          {spotlight ? (
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${priorityClasses[spotlight.priority]}`}
                >
                  {spotlight.priority}
                </span>
                <span className="text-sm font-medium text-white/72">
                  {spotlight.window}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {spotlight.assignment}
              </h3>
              <p className="mt-2 text-lg text-white/86">
                {spotlight.crew} · {spotlight.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {spotlight.detail}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {spotlight.location}
              </p>
            </article>
          ) : null}
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {entry.window}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {entry.assignment}
                  </h3>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${priorityClasses[entry.priority]}`}
                >
                  {entry.priority}
                </span>
              </div>

              <p className="mt-3 text-sm font-medium text-white/80">
                {entry.crew} · {entry.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">{entry.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
