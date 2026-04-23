import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handoff Journal",
  description:
    "Shift-change handoff journal for tracking open items, blockers, and ownership transitions across operator rotations.",
};

type HandoffEntry = {
  id: string;
  timestamp: string;
  fromOperator: string;
  toOperator: string;
  status: "open" | "resolved" | "escalated";
  summary: string;
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

export default function HandoffJournalPage() {
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

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Journal Entries
          </h2>
          <p className="text-sm text-slate-500">
            No entries loaded &mdash; data module pending
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12">
          <div className="rounded-full bg-orange-100 p-3">
            <svg
              className="h-6 w-6 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Handoff entries will appear here once the data module is connected.
          </p>
          <p className="text-xs text-slate-400">
            Status legend:{" "}
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <span
                key={key}
                className={`ml-1 inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[key as HandoffEntry["status"]]}`}
              >
                {label}
              </span>
            ))}
          </p>
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
