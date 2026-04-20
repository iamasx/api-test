import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Incident Deck",
  description:
    "Initial route shell for the incident deck view that will stage incidents, response timing, and ownership posture.",
};

export default function IncidentDeckPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Incident Deck
          </p>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>

        <div className="mt-8 max-w-4xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Active incidents, response timing, and ownership posture will land
            here on one dedicated route.
          </h1>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            This is the initial shell for issue 141. The next subtasks add mock
            incident data, route-local components, responsive styling, and test
            coverage without depending on any other route.
          </p>
        </div>
      </section>

      <section
        id="active-incident-cards"
        className="rounded-[1.75rem] border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Active incident cards
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Route-local mock incidents will render here once the operational data
          model is added.
        </p>
      </section>

      <section
        id="incident-response-timeline"
        className="rounded-[1.75rem] border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Response timeline
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          The response chronology and escalation notes will be composed into
          this section in the next implementation steps.
        </p>
      </section>

      <section
        id="incident-ownership-summary"
        className="rounded-[1.75rem] border border-slate-200 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Ownership summary
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Ownership cells, queue posture, and handoff guidance will be added as
          route-scoped components.
        </p>
      </section>
    </main>
  );
}
