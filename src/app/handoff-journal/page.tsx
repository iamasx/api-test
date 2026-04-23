import type { Metadata } from "next";
import {
  handoffEntries,
  shiftRotations,
  getHandoffMetrics,
  type HandoffEntry,
} from "./data";

export const metadata: Metadata = {
  title: "Handoff Journal",
  description:
    "Shift-change handoff journal for tracking open items, blockers, and ownership transitions across operator rotations.",
};

const STATUS_COLORS: Record<HandoffEntry["status"], string> = {
  open: "bg-amber-100 text-amber-800 border-amber-300",
  resolved: "bg-green-100 text-green-800 border-green-300",
  escalated: "bg-red-100 text-red-800 border-red-300",
};

const STATUS_LABELS: Record<HandoffEntry["status"], string> = {
  open: "Open",
  resolved: "Resolved",
  escalated: "Escalated",
};

const PRIORITY_COLORS: Record<HandoffEntry["priority"], string> = {
  low: "text-slate-500",
  medium: "text-blue-600",
  high: "text-orange-600",
  critical: "text-red-600",
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function HandoffJournalPage() {
  const metrics = getHandoffMetrics(handoffEntries);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
          Issue 199 / Handoff Journal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Shift Handoff Journal
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Track open items, ownership transitions, and blockers across operator
          shift rotations. Each entry captures the outgoing and incoming
          operator, current status, and a summary of what needs attention.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Total
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {metrics.total}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
            Open
          </p>
          <p className="mt-1 text-2xl font-semibold text-amber-800">
            {metrics.byStatus.open}
          </p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
            Escalated
          </p>
          <p className="mt-1 text-2xl font-semibold text-red-800">
            {metrics.byStatus.escalated}
          </p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Resolved
          </p>
          <p className="mt-1 text-2xl font-semibold text-green-800">
            {metrics.byStatus.resolved}
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Journal Entries
          </h2>
          <p className="text-sm text-slate-500">
            {metrics.uniqueOperators} operators &middot; {metrics.total} entries
          </p>
        </div>

        <ul className="mt-6 space-y-4">
          {handoffEntries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-semibold text-slate-400">
                    {entry.id}
                  </span>
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[entry.status]}`}
                  >
                    {STATUS_LABELS[entry.status]}
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${PRIORITY_COLORS[entry.priority]}`}
                  >
                    {entry.priority}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {entry.summary}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>
                  {entry.fromOperator} &rarr; {entry.toOperator}
                </span>
                <span className="text-slate-300">|</span>
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Shift Rotations
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {shiftRotations.map((rotation) => (
            <div
              key={rotation.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">
                  {rotation.id}
                </span>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                  {rotation.shiftLabel}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {rotation.outgoing} &rarr; {rotation.incoming}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {rotation.entryCount} entries &middot;{" "}
                {formatTimestamp(rotation.startTime)} &ndash;{" "}
                {formatTimestamp(rotation.endTime)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Handoff Protocol
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">
              Step 1
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Outgoing operator logs all open items with current status and
              any blockers encountered during the shift.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">
              Step 2
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Incoming operator reviews each entry, confirms ownership
              transfer, and updates priority or escalation flags.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">
              Step 3
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Both operators sign off on the journal. Unresolved escalations
              are forwarded to the next rotation automatically.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
