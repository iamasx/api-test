import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass-panel soft-grid grid w-full gap-10 overflow-hidden rounded-[2.25rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)] md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            404
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
            This route never made it into the final build.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
            The page you asked for does not exist. Head back to the portfolio overview or
            jump straight to the project archive.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white"
            >
              Return home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/75 px-5 py-3 text-sm font-medium text-[var(--ink)]"
            >
              View projects
            </Link>
          </div>
        </div>

        <div className="relative min-h-72 rounded-[1.75rem] border border-[rgba(20,32,51,0.08)] bg-[linear-gradient(180deg,rgba(15,118,110,0.18),rgba(255,255,255,0.9))] p-6">
          <div className="absolute inset-x-6 top-6 h-12 rounded-2xl border border-white/70 bg-white/70 backdrop-blur" />
          <div className="absolute left-1/2 top-24 h-28 w-28 -translate-x-1/2 rounded-full border border-white/70 bg-white/80 shadow-[0_18px_40px_rgba(20,32,51,0.12)]" />
          <div className="absolute bottom-8 left-6 right-6 rounded-[1.5rem] border border-white/70 bg-white/80 p-5 backdrop-blur">
            <div className="h-3 w-16 rounded-full bg-[rgba(15,118,110,0.25)]" />
            <div className="mt-4 h-3 w-full rounded-full bg-[rgba(20,32,51,0.08)]" />
            <div className="mt-3 h-3 w-2/3 rounded-full bg-[rgba(20,32,51,0.08)]" />
            <div className="mt-6 h-24 rounded-[1rem] border border-dashed border-[rgba(20,32,51,0.12)] bg-[rgba(255,255,255,0.65)]" />
          </div>
        </div>
      </div>
    </main>
  );
}
