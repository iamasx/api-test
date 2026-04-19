import type { Metadata } from "next";
import Link from "next/link";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { bioParagraphs, interests, profileSummary, timelineEntries } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Background, timeline, and interests for the iamasx portfolio.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section
        aria-labelledby="about-title"
        className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
      >
        <article className="rounded-[2rem] border border-black/8 bg-white/70 p-8 shadow-[0_24px_70px_rgba(31,26,23,0.06)] backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
            About
          </p>
          <h1
            id="about-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            Building products that feel composed, even when the system behind them is not simple.
          </h1>
          <div className="mt-6 space-y-4 text-base leading-8 text-[var(--muted)]">
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Current Role</p>
            <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
              {profileSummary.role}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Working on collaborative product systems with a strong bias toward clarity, speed, and
              operational confidence.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Quick Facts</p>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
              <li className="rounded-2xl bg-white/70 px-4 py-3">B.S. Computer Science, UC Berkeley</li>
              <li className="rounded-2xl bg-white/70 px-4 py-3">Career built across startup, scale-up, and senior IC work</li>
              <li className="rounded-2xl bg-white/70 px-4 py-3">Best fit: realtime products, APIs, and dev tooling</li>
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Elsewhere</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              The home page also includes the live skills showcase and project work samples.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#skills"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              >
                View Skills
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Browse Work
              </Link>
            </div>
          </article>
        </aside>
      </section>

      <section aria-labelledby="timeline-title" className="rounded-[2rem] border border-black/8 bg-white/60 p-8 backdrop-blur">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
            Journey
          </p>
          <h2
            id="timeline-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            A chronological path from Berkeley to senior full stack architecture.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            The timeline is ordered from education through each career chapter, with a connected
            vertical rail to keep the progression easy to scan.
          </p>
        </div>

        <JourneyTimeline entries={timelineEntries} />
      </section>

      <section
        id="interests"
        aria-labelledby="interests-title"
        className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <aside className="rounded-[2rem] border border-black/8 bg-white/70 p-8 shadow-[0_24px_70px_rgba(31,26,23,0.05)] backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
            Personal Interests
          </p>
          <h2
            id="interests-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Creative habits outside software keep the work sharper.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            My non-work interests all share the same theme: rhythm, composition, and learning how
            small adjustments compound into a stronger result.
          </p>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2">
          {interests.map((interest) => (
            <article
              key={interest.title}
              className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6"
            >
              <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {interest.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{interest.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
