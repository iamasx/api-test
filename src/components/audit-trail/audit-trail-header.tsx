type AuditTrailHeaderProps = {
  totalChanges: number;
  reviewedCount: number;
  pendingCount: number;
  localFlagCount: number;
  activeReviewerCount: number;
};

export function AuditTrailHeader({
  totalChanges,
  reviewedCount,
  pendingCount,
  localFlagCount,
  activeReviewerCount,
}: AuditTrailHeaderProps) {
  const stats = [
    { label: "Change records", value: totalChanges, tone: "bg-slate-950 text-slate-50" }, { label: "Reviewed lanes", value: reviewedCount, tone: "bg-teal-100 text-teal-950" },
    { label: "Pending", value: pendingCount, tone: "bg-amber-100 text-amber-950" }, { label: "Local flags", value: localFlagCount, tone: "bg-rose-100 text-rose-950" },
  ];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(252,244,232,0.96)_52%,_rgba(237,247,245,0.94)_100%)] shadow-xl shadow-amber-100/60">
      <div className="grid gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:px-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
            Audit Trail
            <span className="rounded-full bg-slate-950 px-2 py-1 tracking-[0.18em] text-slate-50">{activeReviewerCount} reviewers</span>
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Change ledger with review filters, reviewer handoffs, and session-local flags.</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Everything on this route is mock and isolated. Filters and review flags live only inside this page and reset with the session.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((stat) => (
            <div className={`rounded-[1.5rem] px-5 py-4 shadow-sm ${stat.tone}`} key={stat.label}>
              <p className="text-sm opacity-75">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
