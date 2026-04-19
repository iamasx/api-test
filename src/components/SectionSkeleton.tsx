interface SectionSkeletonProps {
  readonly eyebrow: string;
  readonly title: string;
}

export function SectionSkeleton({ eyebrow, title }: SectionSkeletonProps) {
  return (
    <div className="glass-panel soft-grid overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)]">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        {title}
      </h2>
      <div className="mt-8 space-y-3">
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-[rgba(20,32,51,0.08)]" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-[rgba(20,32,51,0.08)]" />
        <div className="h-32 animate-pulse rounded-[1.5rem] bg-[rgba(20,32,51,0.06)]" />
      </div>
    </div>
  );
}
