import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkpoint Grid",
  description:
    "Minimal scaffold for the checkpoint-grid planning route.",
};

export default function CheckpointGridPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Checkpoint Grid
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Checkpoint Grid route scaffold
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          This route is staged as a dedicated checkpoint planning surface and
          will be expanded in follow-up subtasks with milestone tiles, progress
          summaries, and review notes.
        </p>
      </section>
    </main>
  );
}
