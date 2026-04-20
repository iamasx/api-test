import type { Metadata } from "next";

import {
  savedPlaybooks,
  procedures,
  procedureTags,
} from "@/components/field-guide/field-guide-data";
import FieldGuideShell from "@/components/field-guide/field-guide-shell";

export const metadata: Metadata = {
  title: "Field Guide | API Test",
  description:
    "Author, review, and rehearse mock procedures with saved playbooks and local draft state.",
};

export default function FieldGuidePage() {
  const draftCount = savedPlaybooks.filter(
    (playbook) => playbook.status !== "Published",
  ).length;

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
                Draft, review, and rehearse saved playbooks beside the source
                procedures they come from.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Review isolated mock procedures, author custom playbooks with
                draft metadata, and preview rehearsal steps without leaving this
                route.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-3xl bg-slate-950 px-5 py-4 text-slate-50">
                <p className="text-sm text-slate-300">Procedures</p>
                <p className="mt-2 text-3xl font-semibold">{procedures.length}</p>
              </div>
              <div className="rounded-3xl bg-sky-100 px-5 py-4 text-sky-950">
                <p className="text-sm text-sky-700">Saved playbooks</p>
                <p className="mt-2 text-3xl font-semibold">
                  {savedPlaybooks.length}
                </p>
              </div>
              <div className="rounded-3xl bg-amber-100 px-5 py-4 text-amber-950">
                <p className="text-sm text-amber-700">Draft-ready tags</p>
                <p className="mt-2 text-lg font-semibold">
                  {draftCount} active drafts · {procedureTags.length} tags
                </p>
              </div>
            </div>
          </div>
        </section>
        <FieldGuideShell />
      </div>
    </main>
  );
}
