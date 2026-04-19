import type { CSSProperties } from "react";
import Link from "next/link";
import { profileSummary, skillItems, timelineEntries } from "@/data/profile";

interface FloatingNote {
  readonly label: string;
  readonly top?: string;
  readonly right?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly delay: string;
}

const floatingNotes: readonly FloatingNote[] = [
  { label: "Realtime UX", top: "8%", left: "8%", delay: "0s" },
  { label: "API Design", top: "18%", right: "4%", delay: "0.9s" },
  { label: "Systems Thinking", bottom: "20%", left: "0%", delay: "1.8s" },
  { label: "Team Leadership", bottom: "10%", right: "12%", delay: "2.7s" },
];

export function HeroSection() {
  const typingStyle = {
    "--typing-width": `${profileSummary.name.length}ch`,
    "--typing-steps": profileSummary.name.length,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="hero-title"
      className="scroll-mt-24 rounded-[2rem] border border-black/8 bg-white/65 px-6 py-10 shadow-[0_30px_90px_rgba(31,26,23,0.08)] backdrop-blur md:px-10 md:py-12"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.32em] text-[var(--accent)]">
              Hello, I&apos;m
            </p>
            <h1
              id="hero-title"
              className="animate-fade-up text-5xl font-semibold tracking-tight text-[var(--foreground)] sm:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              <span className="typing-name" style={typingStyle}>
                {profileSummary.name}
              </span>
            </h1>
            <p
              className="animate-fade-up max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              {profileSummary.role} shaping collaborative products, reliable APIs, and developer
              workflows that scale with the team.
            </p>
            <p
              className="animate-fade-up max-w-2xl text-base leading-7 text-[var(--muted)]"
              style={{ animationDelay: "360ms" }}
            >
              {profileSummary.tagline}
            </p>
          </div>

          <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: "480ms" }}>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black"
            >
              View Work
            </Link>
            <a
              href={`mailto:${profileSummary.email}`}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Contact Me
            </a>
          </div>

          <div
            className="animate-fade-up grid gap-4 sm:grid-cols-3"
            style={{ animationDelay: "600ms" }}
          >
            <article className="rounded-3xl border border-black/8 bg-[var(--surface-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Experience</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">7+ years</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Shipping product and platform work across four chapters.
              </p>
            </article>

            <article className="rounded-3xl border border-black/8 bg-[var(--surface-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Education</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                {timelineEntries[0].organization}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Computer science foundation with a systems mindset.
              </p>
            </article>

            <article className="rounded-3xl border border-black/8 bg-[var(--surface-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Current Focus</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Realtime</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Building collaborative experiences with calm UX and dependable systems.
              </p>
            </article>
          </div>
        </div>

        <aside className="relative min-h-[24rem]">
          <div className="hero-orb animate-fade-up absolute inset-0" style={{ animationDelay: "240ms" }}>
            <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Floating Snapshot
                </p>
                <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm">
                  {profileSummary.availability}
                </div>
              </div>

              <div className="max-w-xs space-y-4">
                <div className="inline-flex rounded-full border border-black/8 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  {timelineEntries[timelineEntries.length - 1].organization}
                </div>
                <p className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                  Architecting real-time collaboration experiences.
                </p>
                <p className="text-base leading-7 text-[var(--muted)]">
                  Frontend depth, backend rigor, and a strong bias toward clear product systems.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {skillItems.slice(0, 4).map((skill) => (
                  <div
                    key={skill.category}
                    className="rounded-2xl border border-white/60 bg-white/78 p-4 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                      {skill.category}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                      {skill.proficiency}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {floatingNotes.map((note) => (
            <span
              key={note.label}
              className="floating-chip"
              style={
                {
                  top: note.top,
                  right: note.right,
                  bottom: note.bottom,
                  left: note.left,
                  animationDelay: note.delay,
                } as CSSProperties
              }
            >
              {note.label}
            </span>
          ))}
        </aside>
      </div>
    </section>
  );
}
