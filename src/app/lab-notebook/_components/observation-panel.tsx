import type { ObservationPanel as ObservationPanelData } from "../_data/lab-notebook-data";

export function ObservationPanel({
  panel,
  entryLabel,
}: {
  panel: ObservationPanelData;
  entryLabel: string;
}) {
  return (
    <article
      className="scroll-mt-8 rounded-[1.65rem] border border-stone-900/10 bg-[rgba(81,52,36,0.96)] p-6 text-amber-50 shadow-[0_18px_70px_rgba(43,24,13,0.28)]"
      id={panel.id}
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-50">
              {panel.window}
            </span>
            <span className="rounded-full border border-sky-200/18 bg-sky-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100">
              {panel.signalGrade}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {panel.title}
            </h3>
            <p className="text-sm leading-7 text-amber-50/78 sm:text-base">
              {panel.focus}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-amber-50/78 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50/60">
                Recorder
              </p>
              <p className="mt-2 font-medium text-white">{panel.recorder}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50/60">
                Linked entry
              </p>
              <p className="mt-2 font-medium text-white">{entryLabel}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(15rem,0.88fr)] xl:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-50/60">
              Observation notes
            </p>
            <ul className="mt-4 space-y-3" role="list">
              {panel.notes.map((note) => (
                <li
                  key={note}
                  className="rounded-2xl border border-white/8 bg-white/6 px-4 py-4 text-sm leading-7 text-amber-50/88"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 xl:sticky xl:top-6">
            <div className="rounded-[1.35rem] border border-amber-200/16 bg-amber-200/10 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50/62">
                Anomaly
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-50/88">
                {panel.anomaly}
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-emerald-200/16 bg-emerald-200/10 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-50/76">
                Next check
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-50/88">
                {panel.nextCheck}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
