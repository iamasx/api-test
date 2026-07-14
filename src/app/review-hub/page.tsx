import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Review Hub",
  description:
    "Shared landing-page overlap route for file-by-file review lanes, shell checks, and release cadence.",
};

type ReviewTrackStatus = "active" | "queued" | "ready";

const sharedFiles = [
  {
    path: "src/app/page.tsx",
    impact: "Homepage hero copy, primary CTA, and feature card now route into Review Hub.",
    risk: "High overlap",
    note: "This is the first file other landing-page issues are likely to touch when they replace the featured route.",
  },
  {
    path: "src/app/layout.tsx",
    impact: "Root navigation, shared eyebrow copy, and footer treatment all acknowledge the new review surface.",
    risk: "High overlap",
    note: "Any branch changing the app shell can collide here because the route list and shell messaging live together.",
  },
  {
    path: "src/app/globals.css",
    impact: "Theme accents, navigation chrome, and route-specific shell affordances shift to the review palette.",
    risk: "High overlap",
    note: "Global tokens and hover states are reused across the app, so palette changes widen the merge surface quickly.",
  },
  {
    path: "src/app/review-hub/page.tsx",
    impact: "Dedicated route content centralizes the overlap audit, release checks, and reviewer cadence.",
    risk: "New route",
    note: "This file stays isolated while the other shared files create the deliberate conflict pressure.",
  },
] as const;

const reviewTracks: Array<{
  title: string;
  status: ReviewTrackStatus;
  owner: string;
  window: string;
  summary: string;
  files: readonly string[];
}> = [
  {
    title: "Landing hero rewrite",
    status: "active",
    owner: "Homepage surface",
    window: "09:10-09:18",
    summary:
      "Replace the featured landing block so the common entry point now introduces Review Hub instead of the previous spotlight route.",
    files: ["src/app/page.tsx", "src/app/layout.tsx"],
  },
  {
    title: "Shared shell copy sweep",
    status: "active",
    owner: "App chrome",
    window: "09:18-09:28",
    summary:
      "Align the root nav, eyebrow, and footer so review-specific messaging shows up anywhere the shared shell is visible.",
    files: ["src/app/layout.tsx", "src/app/globals.css"],
  },
  {
    title: "Token and hover pass",
    status: "queued",
    owner: "Global styling",
    window: "09:28-09:37",
    summary:
      "Update the shared palette and route-shell utilities so the review route and landing hero read as one coordinated surface.",
    files: ["src/app/globals.css", "src/app/page.tsx"],
  },
  {
    title: "Review route audit",
    status: "ready",
    owner: "Route owner",
    window: "09:37-09:46",
    summary:
      "Capture the file-by-file overlap targets, the release checks, and the cadence reviewers should follow once adjacent PRs land.",
    files: ["src/app/review-hub/page.tsx"],
  },
];

const releaseChecks = [
  {
    title: "Confirm the homepage now points at Review Hub",
    detail:
      "The shared landing hero and CTA need to reference the new route directly so the conflict surface is visible from the first screen.",
  },
  {
    title: "Re-read the shared shell copy in one pass",
    detail:
      "Navigation, eyebrow text, and footer wording should shift together so reviewers are not reconciling mixed route names.",
  },
  {
    title: "Check the palette drift before merging",
    detail:
      "Body background, nav badge styling, and review-shell affordances should stay in the same family once the globals land.",
  },
  {
    title: "Leave a handoff note for the next overlapping PR",
    detail:
      "Document which shared file is most likely to conflict so the follow-up branch can rebase with context instead of guesswork.",
  },
] as const;

const reviewCadence = [
  {
    time: "09:10",
    title: "Landing pass",
    summary:
      "Review the homepage hero and primary CTA before any route-specific content is assessed.",
  },
  {
    time: "09:24",
    title: "Shell pass",
    summary:
      "Open the shared navigation and footer together so copy drift is caught in the same read-through.",
  },
  {
    time: "09:46",
    title: "Conflict note",
    summary:
      "Record which shared file changed last and flag the probable merge hotspot for the next PR.",
  },
] as const;

const statusClasses: Record<ReviewTrackStatus, string> = {
  active: "border-rose-200 bg-rose-50 text-rose-800",
  queued: "border-amber-200 bg-amber-50 text-amber-800",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export default function ReviewHubPage() {
  const activeTracks = reviewTracks.filter((track) => track.status === "active").length;
  const cadenceWindow = `${reviewCadence[0].time}-${reviewCadence[reviewCadence.length - 1].time}`;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="review-hub-orbit review-shell-card overflow-hidden rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(135deg,#fff1f2_0%,#ffffff_44%,#fff7ed_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="ops-badge">Review Hub</span>
              <span className="review-hub-badge">Landing overlap route</span>
            </div>

            <div className="space-y-4">
              <h1 className="heading-tight max-w-4xl text-4xl text-slate-950 sm:text-5xl">
                Stage the shared landing-page overlap before the next merge
                lands.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Review Hub is the deliberate conflict surface for issue 217. It
                inventories the shared files, lines up the review lanes, and
                keeps the app-shell edits tied to one route so overlapping PRs
                have a clear place to compare before rebasing.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to overview
              </Link>
              <Link
                href="/navigator-hub"
                className="review-shell-link inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open navigator hub
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/217"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Shared files
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {sharedFiles.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Direct overlap targets across the landing page, app shell, and
                  globals.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Active lanes
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {activeTracks}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review lanes still moving while the shared files remain open.
                </p>
              </article>
              <article className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Cadence window
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {cadenceWindow}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Planned handoff window for the overlap audit before PR
                  routing.
                </p>
              </article>
            </div>
          </div>

          <aside className="review-shell-card rounded-[1.8rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.1)]">
            <p className="section-label text-slate-500">Shared files in play</p>
            <ul
              className="mt-5 space-y-4"
              role="list"
              aria-label="shared file overlap targets"
            >
              {sharedFiles.map((file) => (
                <li
                  key={file.path}
                  className="review-hub-note rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <code className="text-[0.72rem] font-semibold text-slate-950">
                      {file.path}
                    </code>
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-rose-700">
                      {file.risk}
                    </span>
                  </div>
                  <p className="mt-3 font-medium text-slate-900">{file.impact}</p>
                  <p className="mt-2 text-slate-500">{file.note}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="review-hub-section overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="relative grid gap-6 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="review-hub-kicker">Review lanes</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Walk the shared edits in the same order reviewers will see them.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Each lane calls out the owner, active window, and the exact files
              the review pass is supposed to touch before the route goes up for
              merge.
            </p>
          </div>

          <div
            className="grid gap-4 lg:grid-cols-2"
            role="list"
            aria-label="review handoff lanes"
          >
            {reviewTracks.map((track) => (
              <article
                key={track.title}
                role="listitem"
                className="review-hub-track rounded-[1.6rem] border border-slate-200 bg-white/85 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {track.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{track.owner}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${statusClasses[track.status]}`}
                  >
                    {track.status}
                  </span>
                </div>

                <div className="mt-5 rounded-[1.2rem] border border-slate-200 bg-slate-50/90 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Window
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {track.window}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {track.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${track.title} files`}>
                  {track.files.map((file) => (
                    <li key={file} className="review-hub-chip">
                      {file}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Release checks</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Clear the shared shell before review routing starts.
            </h2>
          </div>

          <ol
            className="mt-6 space-y-4"
            role="list"
            aria-label="review release checks"
          >
            {releaseChecks.map((check) => (
              <li
                key={check.title}
                className="review-hub-check rounded-[1.5rem] border border-slate-200 bg-white/85 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <p className="text-base font-semibold text-slate-950">
                  {check.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {check.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,241,242,0.92),rgba(255,247,237,0.92))] p-6 shadow-[0_20px_90px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="space-y-2">
            <p className="section-label text-slate-500">Cadence</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Keep the overlap audit moving on a timed cadence.
            </h2>
          </div>

          <ol className="mt-6 space-y-4">
            {reviewCadence.map((step) => (
              <li
                key={step.time}
                className="rounded-[1.4rem] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-700">
                  {step.time}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.summary}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
