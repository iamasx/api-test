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
    <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="section-card rounded-[var(--section-radius)] bg-slate-950 text-white shadow-[0_40px_130px_rgba(15,23,42,0.32)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="section-label text-[var(--accent-amber)]">
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
            <h1 className="heading-tight max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
              Find the right crew for launches, fixes, and field follow-through.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              This route collects cross-functional groups, individual profile cards, and role-based highlights into one browseable directory powered by local mock data.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#spotlight"
                className="rounded-full bg-[var(--accent-amber)] px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
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
            <div className="rounded-[var(--card-radius)] border border-white/10 bg-white/6 p-5">
              <p className="section-label text-white/50">
                Team groups
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.totalGroups}</p>
            </div>
            <div className="rounded-[var(--card-radius)] border border-white/10 bg-white/6 p-5">
              <p className="section-label text-white/50">
                Profiles
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.totalMembers}</p>
            </div>
            <div className="rounded-[var(--card-radius)] border border-white/10 bg-white/6 p-5">
              <p className="section-label text-white/50">
                Time zones
              </p>
              <p className="mt-3 text-4xl font-semibold">{metrics.timezoneCount}</p>
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

      <section id="directory-groups" className="mt-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label text-slate-500">
              Grouped profiles
            </p>
            <h2 className="heading-tight mt-2 text-3xl text-slate-950 sm:text-4xl">
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
    </main>
  );
}
