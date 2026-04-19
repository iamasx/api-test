import type { Metadata } from "next";

import {
  procedures,
  procedureTags,
} from "@/components/field-guide/field-guide-data";
import FieldGuideShell from "@/components/field-guide/field-guide-shell";

export const metadata: Metadata = {
  title: "Field Guide | API Test",
  description: "Search and review mock procedures with local checklist state.",
};

export default function FieldGuidePage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur">
          <div className="grid gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:px-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
                Field Guide
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Searchable mock procedures for field drills and rapid-response
                rehearsals.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Review isolated mock runbooks, narrow them by team or readiness,
                and walk through each checklist without leaving this route.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-3xl bg-slate-950 px-5 py-4 text-slate-50">
                <p className="text-sm text-slate-300">Procedures</p>
                <p className="mt-2 text-3xl font-semibold">{procedures.length}</p>
              </div>
              <div className="rounded-3xl bg-sky-100 px-5 py-4 text-sky-950">
                <p className="text-sm text-sky-700">Local tags</p>
                <p className="mt-2 text-3xl font-semibold">
                  {procedureTags.length}
                </p>
              </div>
              <div className="rounded-3xl bg-amber-100 px-5 py-4 text-amber-950">
                <p className="text-sm text-amber-700">Checklist mode</p>
                <p className="mt-2 text-lg font-semibold">Session-local only</p>
              </div>
            </div>
          </div>
        </section>
        <FieldGuideShell />
      </div>
    </main>
  );
}
