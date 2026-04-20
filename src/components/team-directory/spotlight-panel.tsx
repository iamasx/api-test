import type { RoleHighlight, TeamMember } from "@/data/team-directory";

type SpotlightPanelProps = {
  member: TeamMember;
  availableNow: number;
  topSkills: string[];
  timezoneCount: number;
  roleHighlights: RoleHighlight[];
};

export function SpotlightPanel({
  member,
  availableNow,
  topSkills,
  timezoneCount,
  roleHighlights,
}: SpotlightPanelProps) {
  return (
    <section
      aria-labelledby="spotlight-heading"
      className="grid gap-6 rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_36px_100px_rgba(15,23,42,0.28)] sm:p-8 xl:grid-cols-[1.4fr_0.9fr]"
    >
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
        <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#ffc971]">
          Featured profile
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="spotlight-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Spotlight: {member.name}
            </h2>
            <p className="mt-2 text-base font-medium text-white/75">{member.role}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/78">
              {member.bio}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/55">
                Status
              </p>
              <p className="mt-2 text-sm font-medium">{member.availability}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/55">
                Base
              </p>
              <p className="mt-2 text-sm font-medium">
                {member.location} / {member.timezone}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/55">
                Capacity
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {member.capacityNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
              Why this profile stands out
            </p>
            <p className="mt-3 text-sm leading-7 text-white/78">
              {member.roleHighlight}
            </p>

            <p className="mt-6 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
              Current focus
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/80">
              {member.focus.map((item) => (
                <li key={item} className="rounded-2xl bg-white/8 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
              Core strengths
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/85"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#1f2937] px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/50">
                  Available now
                </p>
                <p className="mt-2 text-3xl font-semibold">{availableNow}</p>
              </div>
              <div className="rounded-2xl bg-[#1f2937] px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/50">
                  Time zones
                </p>
                <p className="mt-2 text-3xl font-semibold">{timezoneCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#ffc971]">
            Role highlights
          </p>
          <div className="mt-4 space-y-4">
            {roleHighlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-white/10 bg-white/7 px-4 py-4"
              >
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm font-semibold text-white">{highlight.label}</p>
                  <p className="text-2xl font-semibold text-[#ffc971]">{highlight.value}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#ffe8c8] p-6 text-slate-950">
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">
            Shared strengths
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            The tags below surface the skills that show up most often across the directory.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-300 bg-white/75 px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
