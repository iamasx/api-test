import type { Metadata } from "next";
import Link from "next/link";

import { CarryForwardPanel } from "./_components/carry-forward-panel";
import { HandoffEntryCard } from "./_components/handoff-entry-card";
import {
  carryForwardNotes,
  handoffEntries,
  handoffJournalOverview,
  handoffJournalStats,
} from "./_data/handoff-journal-data";
import styles from "./handoff-journal.module.css";

export const metadata: Metadata = {
  title: "Handoff Journal",
  description:
    "Standalone route for shift handoff summaries, action bullets, and compact carry-forward notes.",
};

export default function HandoffJournalPage() {
  return (
    <main className={styles.shell}>
      <div
        className={`${styles.shellFrame} mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14`}
      >
        <section
          className={`${styles.surfacePanel} ${styles.heroPanel} rounded-[2rem] p-8 sm:p-10`}
        >
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>{handoffJournalOverview.eyebrow}</p>
              <div className="space-y-5">
                <h1 className={styles.heroTitle}>{handoffJournalOverview.title}</h1>
                <p className={styles.heroDescription}>
                  {handoffJournalOverview.description}
                </p>
              </div>

              <div className={styles.heroActionRow}>
                {handoffJournalOverview.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className={
                      action.href === "#handoff-entries"
                        ? styles.primaryAction
                        : styles.secondaryAction
                    }
                  >
                    {action.label}
                  </a>
                ))}
                <Link className={styles.homeLink} href="/">
                  Back to route index
                </Link>
              </div>
            </div>

            <aside className={styles.heroAside}>
              <div className={styles.heroAsideCard}>
                <p className={styles.heroAsideLabel}>Active window</p>
                <p className={styles.heroAsideValue}>
                  {handoffJournalOverview.activeWindow}
                </p>
                <p className={styles.heroAsideDetail}>
                  Close the journal with explicit owners before the next crew
                  fully takes the floor.
                </p>
              </div>
              <div className={styles.heroAsideCard}>
                <p className={styles.heroAsideLabel}>Next sync</p>
                <p className={styles.heroAsideValue}>
                  {handoffJournalOverview.nextSync}
                </p>
                <p className={styles.heroAsideDetail}>
                  Carry-forward notes are trimmed to the unresolved items only.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          aria-label="Handoff journal continuity stats"
          className={styles.statGrid}
          role="list"
        >
          {handoffJournalStats.map((stat) => (
            <article key={stat.id} className={styles.statCard} role="listitem">
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statDetail}>{stat.detail}</p>
            </article>
          ))}
        </section>

        <div className={styles.mainGrid}>
          <section
            aria-labelledby="handoff-entries-title"
            className={styles.entriesSection}
            id="handoff-entries"
          >
            <div className={styles.panelHeading}>
              <p className={styles.panelEyebrow}>Shift handoffs</p>
              <h2 id="handoff-entries-title" className={styles.panelTitle}>
                Multiple entries, each with the summary and next actions intact
              </h2>
              <p className={styles.panelDescription}>
                Every card records what changed, why it matters, and what the
                incoming shift should do next without opening another route.
              </p>
            </div>

            <div
              aria-label="Shift handoff entries"
              className={styles.entryGrid}
              role="list"
            >
              {handoffEntries.map((entry) => (
                <HandoffEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>

          <CarryForwardPanel notes={carryForwardNotes} />
        </div>
      </div>
    </main>
  );
}
