import {
  getTeamStaffingTotals,
  type CrewTeam,
  type CrewCoverageTone,
} from "../_data/crew-roster-data";
import styles from "../crew-roster.module.css";

const toneClasses = {
  stable: "border-slate-200 bg-white",
  watch: "border-amber-200 bg-amber-50/40",
  thin: "border-rose-200 bg-rose-50/50",
} satisfies Record<CrewCoverageTone, string>;

function getTeamTone(gap: number): CrewCoverageTone {
  if (gap <= 0) {
    return "stable";
  }

  if (gap === 1) {
    return "watch";
  }

  return "thin";
}

export function CrewTeamCard({ team }: { team: CrewTeam }) {
  const totals = getTeamStaffingTotals(team);
  const tone = getTeamTone(totals.gap);

  return (
    <article
      aria-labelledby={`${team.id}-title`}
      className={`rounded-[1.6rem] border p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] ${styles.teamCard} ${toneClasses[tone]}`}
      data-tone={tone}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {team.callsign}
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {team.zone}
            </span>
          </div>
          <div>
            <h3
              id={`${team.id}-title`}
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              {team.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Lead: {team.lead}
            </p>
          </div>
        </div>

        <div
          className={`rounded-[1.15rem] border border-slate-200 bg-white/80 px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${styles.teamStatCard}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Staffing
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {totals.staffed}/{totals.target}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {totals.coveragePercent}% filled
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700">{team.objective}</p>

      <div
        className={`mt-5 rounded-[1.35rem] border border-dashed border-slate-200 bg-white/75 px-4 py-4 ${styles.staffingNote}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Staffing note
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{team.staffingNote}</p>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {team.roleSlots.map((slot) => (
          <div
            key={slot.id}
            className={`rounded-[1.25rem] border border-slate-200 bg-white/85 px-4 py-4 ${styles.roleSlot}`}
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {slot.title}
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {slot.staffed}/{slot.target}
            </dd>
            <p className="mt-2 text-sm leading-6 text-slate-600">{slot.note}</p>
          </div>
        ))}
      </dl>

      <ul aria-label={`${team.name} tags`} className="mt-5 flex flex-wrap gap-2">
        {team.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
