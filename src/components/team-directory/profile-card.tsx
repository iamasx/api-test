import type { TeamMember } from "@/data/team-directory";

const availabilityStyles: Record<TeamMember["availability"], string> = {
  "Available now":
    "border-emerald-200 bg-emerald-100 text-emerald-900",
  "Heads down": "border-amber-200 bg-amber-100 text-amber-900",
  "Client workshop": "border-sky-200 bg-sky-100 text-sky-900",
  "On-call later": "border-rose-200 bg-rose-100 text-rose-900",
};

type ProfileCardProps = {
  member: TeamMember;
};

export function ProfileCard({ member }: ProfileCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{member.role}</p>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${availabilityStyles[member.availability]}`}
        >
          {member.availability}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{member.bio}</p>

      <dl className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-100/90 p-3">
          <dt className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            Location
          </dt>
          <dd className="mt-1 font-medium text-slate-900">{member.location}</dd>
        </div>
        <div className="rounded-2xl bg-slate-100/90 p-3">
          <dt className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            Time zone
          </dt>
          <dd className="mt-1 font-medium text-slate-900">{member.timezone}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
          Capacity
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{member.capacityNote}</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
          Skills
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
          Current focus
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {member.focus.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-100/80 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
          Role highlight
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{member.roleHighlight}</p>
      </div>
    </article>
  );
}
