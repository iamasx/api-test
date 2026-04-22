import type { Metadata } from "next";

import styles from "./scenario-explorer.module.css";

export const metadata: Metadata = {
  title: "Scenario Explorer",
  description:
    "Scenario explorer route for scenario summaries, comparison notes, and recommendation guidance.",
};

export default function ScenarioExplorerPage() {
  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <section
          className={`${styles.surfaceCard} ${styles.heroPanel} rounded-[2rem] p-8 sm:p-10`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Route Shell
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Scenario Explorer
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            This route is scaffolded and ready for scenario summaries,
            comparisons, and recommendation guidance.
          </p>
        </section>
      </div>
    </main>
  );
}
