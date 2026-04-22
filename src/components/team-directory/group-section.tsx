import { ProfileCard } from "@/components/team-directory/profile-card";
import type { TeamGroup } from "@/data/team-directory";

type GroupSectionProps = {
  group: TeamGroup;
};

export function GroupSection({ group }: GroupSectionProps) {
  const headingId = `${group.id}-heading`;
  const availableCount = group.members.filter(
    (m) => m.availability === "Available now",
  ).length;
  const headsDownCount = group.members.filter(
    (m) => m.availability === "Heads down",
  ).length;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
    >
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">
              {group.mission}
            </p>
            <h2
              id={headingId}
              className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            >
              {group.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              {group.summary}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-950 px-5 py-4 text-white">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">
                Coverage
              </p>
              <p className="mt-2 text-sm leading-6 text-white/85">{group.coverage}</p>
            </div>
            <div className="rounded-[24px] bg-[#ffe8c8] px-5 py-4 text-slate-950">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                Team rhythm
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-800">{group.rhythm}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
            {group.members.length} members
          </span>
          {availableCount > 0 && (
            <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
              {availableCount} available
            </span>
          )}
          {headsDownCount > 0 && (
            <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              {headsDownCount} heads down
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {group.roleHighlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-slate-700"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        {group.members.map((member) => (
          <ProfileCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
