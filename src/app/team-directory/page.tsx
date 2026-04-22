import type { Metadata } from "next";
import Link from "next/link";
import { GroupSection } from "@/components/team-directory/group-section";
import { SpotlightPanel } from "@/components/team-directory/spotlight-panel";
import {
  getDirectoryMetrics,
  getFeaturedMember,
  getRoleHighlights,
  teamGroups,
} from "@/data/team-directory";

export const metadata: Metadata = {
  title: "Team Directory",
  description:
    "Grouped team profiles, availability states, and featured role highlights for a mock cross-functional directory.",
};

export default function TeamDirectoryPage() {
  const metrics = getDirectoryMetrics(teamGroups);
  const featuredMember = getFeaturedMember(teamGroups);
  const roleHighlights = getRoleHighlights(teamGroups);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,201,113,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.1),transparent_28%)] px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="transition-colors hover:text-slate-900">Home</Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-slate-900">Team Directory</span>
      </nav>

      <section className="rounded-[36px] bg-slate-950 p-8 text-white shadow-[0_40px_130px_rgba(15,23,42,0.32)] sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#ffc971]">
            Team Directory
          </p>
          <Link
            href="/"
            className="rounded-full border border-white/14 px-4 py-2 text-sm font-medium text-white/82 transition-colors hover:bg-white/8"
          >
            Back to overview
          </Link>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Find the right crew for launches, fixes, and field follow-through.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              This route collects cross-functional groups, individual profile cards, and role-based highlights into one browseable directory powered by local mock data.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#spotlight"
                className="rounded-full bg-[#ffc971] px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                Jump to spotlight
              </a>
              <a
                href="#directory-groups"
                className="rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white/82 transition-colors hover:bg-white/8"
              >
                Browse groups
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
                Team groups
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.totalGroups}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
                Profiles
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.totalMembers}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
                Time zones
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.timezoneCount}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-emerald-500/12 p-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-200/70">
                Available now
              </p>
              <p className="mt-3 text-4xl font-semibold text-emerald-300">{metrics.availableNow}</p>
            </div>
          </div>
        </div>
      </section>

      <div id="spotlight" className="mt-10">
        <SpotlightPanel
          member={featuredMember}
          availableNow={metrics.availableNow}
          topSkills={metrics.topSkills}
          timezoneCount={metrics.timezoneCount}
          roleHighlights={roleHighlights}
        />
      </div>

      <section className="mt-10 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <p className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">
          Directory at a glance
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Coverage across {metrics.totalGroups} groups and {metrics.timezoneCount} time zones
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamGroups.map((group) => {
            const available = group.members.filter(
              (m) => m.availability === "Available now",
            ).length;
            return (
              <div
                key={group.id}
                className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4"
              >
                <p className="text-sm font-semibold text-slate-950">{group.name}</p>
                <p className="mt-1 text-xs text-slate-500">{group.mission}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl font-semibold text-slate-950">
                    {group.members.length}
                  </span>
                  <span className="text-sm text-slate-500">members</span>
                  {available > 0 && (
                    <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      {available} free
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="directory-groups" className="mt-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">
              Grouped profiles
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Browse the squads behind the work
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-700">
            Every group includes role context, geographic coverage, availability notes, and the work each person is focused on right now.
          </p>
        </div>

        <div className="space-y-8">
          {teamGroups.map((group) => (
            <GroupSection key={group.id} group={group} />
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
