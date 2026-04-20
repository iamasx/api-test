import Link from "next/link";

import type { SignalStream } from "../_lib/signal-monitor-data";

type SignalStreamCardProps = {
  signal: SignalStream;
  href?: string;
  isActive?: boolean;
};

const statusLabelClasses: Record<SignalStream["status"], string> = {
  tracking: "border-emerald-300/70 bg-emerald-100 text-emerald-800",
  watch: "border-amber-300/70 bg-amber-100 text-amber-800",
  degraded: "border-rose-300/70 bg-rose-100 text-rose-800",
  offline: "border-slate-300/70 bg-slate-200 text-slate-800",
};

const typeLabelClasses: Record<SignalStream["type"], string> = {
  telemetry: "bg-cyan-100 text-cyan-800",
  network: "bg-sky-100 text-sky-800",
  environmental: "bg-emerald-100 text-emerald-800",
  security: "bg-violet-100 text-violet-800",
};

export function SignalStreamCard({
  signal,
  href,
  isActive = false,
}: SignalStreamCardProps) {
  const content = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusLabelClasses[signal.status]}`}
            >
              {signal.status}
            </span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${typeLabelClasses[signal.type]}`}
            >
              {signal.type}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {signal.name}
            </h3>
            <p className="text-sm font-medium text-slate-500">{signal.region}</p>
          </div>
        </div>

        <div className="min-w-[9rem] rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Active anomalies
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {signal.anomalyCount}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">{signal.summary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Throughput
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {signal.throughput}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Drift marker
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{signal.drift}</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {signal.headlineStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200/70 bg-white/65 px-4 py-3"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </dt>
            <dd className="mt-2 text-base font-semibold text-slate-950">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Cadence
          </p>
          <p className="text-sm font-medium text-slate-700">{signal.cadence}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Refreshed
          </p>
          <p className="text-sm font-medium text-slate-700">{signal.refreshedAt}</p>
        </div>
      </div>
    </>
  );

  if (!href) {
    return (
      <article
        className={`rounded-[1.75rem] border p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ${
          isActive
            ? "border-slate-900 bg-white"
            : "border-slate-200/80 bg-white/80"
        }`}
      >
        {content}
      </article>
    );
  }

  return (
    <article
      className={`rounded-[1.75rem] border p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ${
        isActive
          ? "border-slate-900 bg-white"
          : "border-slate-200/80 bg-white/80"
      }`}
    >
      <Link
        aria-label={isActive ? `Inspect ${signal.name} selected` : `Inspect ${signal.name}`}
        aria-current={isActive ? "page" : undefined}
        className="block focus:outline-none"
        href={href}
      >
        {content}
      </Link>
    </article>
  );
}
