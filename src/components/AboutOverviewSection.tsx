import Link from "next/link";
import { bioParagraphs } from "@/data/profile";

export function AboutOverviewSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-overview-title"
      className="scroll-mt-24 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <article className="rounded-[2rem] border border-black/8 bg-white/70 p-8 shadow-[0_24px_70px_rgba(31,26,23,0.06)] backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">About</p>
        <h2
          id="about-overview-title"
          className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Product-minded engineering with a systems backbone.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-8 text-[var(--muted)]">
          <p>{bioParagraphs[0]}</p>
          <p>{bioParagraphs[1]}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-strong)]"
          >
            Read Full Story
          </Link>
          <Link
            href="/#skills"
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Explore Skill Stack
          </Link>
        </div>
      </article>

      <aside className="grid gap-4">
        <article className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Approach</p>
          <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
            Strong interfaces start with clear contracts.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            I treat product decisions, API design, and operational discipline as the same
            conversation instead of separate phases.
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">What I Optimize</p>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
            <li className="rounded-2xl bg-white/70 px-4 py-3">Realtime collaboration without UI chaos</li>
            <li className="rounded-2xl bg-white/70 px-4 py-3">Scalable services with honest operational habits</li>
            <li className="rounded-2xl bg-white/70 px-4 py-3">Developer workflows that keep teams shipping</li>
          </ul>
        </article>
      </aside>
    </section>
  );
}
