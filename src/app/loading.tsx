export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel w-full max-w-md rounded-[2rem] border border-[var(--border)] px-8 py-10 text-center shadow-[var(--shadow)]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
          Loading
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
          Warming up the portfolio
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Preparing projects, recommendations, and contact details.
        </p>
        <div className="loading-dots mt-8 justify-center">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
