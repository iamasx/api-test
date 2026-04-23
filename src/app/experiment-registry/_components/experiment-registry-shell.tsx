"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { ExperimentStatus, ExperimentView, RegistryView } from "../_lib/experiment-registry-data";
import { StatusBadge } from "./status-badge";
import { ResultsSummaryPanel } from "./results-summary-panel";
import { ExperimentFilterBar } from "./experiment-filter-bar";
import { ExperimentTimeline } from "./experiment-timeline";
import styles from "../experiment-registry.module.css";

const statusCardStyle: Record<ExperimentStatus, string> = {
  active: styles.statusActive,
  paused: styles.statusPaused,
  completed: styles.statusCompleted,
  draft: styles.statusDraft,
};

const statusDotColor: Record<ExperimentStatus, string> = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  completed: "bg-sky-500",
  draft: "bg-slate-400",
};

export function ExperimentRegistryShell({ view }: { view: RegistryView }) {
  const [selectedId, setSelectedId] = useState<string>(
    view.experiments[0]?.id ?? "",
  );
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperiments = useMemo(() => {
    let result = view.experiments;
    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.hypothesis.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.owner.name.toLowerCase().includes(q),
      );
    }
    return result;
  }, [view.experiments, statusFilter, searchQuery]);

  const selected = view.experiments.find((e) => e.id === selectedId) ?? view.experiments[0];

  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Hero */}
        <section className="rounded-[2rem] bg-white/86 p-8 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.hero.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {view.hero.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {view.hero.description}
            </p>
          </div>

          {/* Stats summary */}
          <div className="mt-8 flex flex-wrap gap-4">
            <StatCard label="Total" value={view.stats.total} variant="slate" />
            <StatCard label="Active" value={view.stats.active} variant="emerald" />
            <StatCard label="Completed" value={view.stats.completed} variant="sky" />
            <StatCard label="Paused" value={view.stats.paused} variant="amber" />
            <StatCard label="Draft" value={view.stats.draft} variant="slate" />
          </div>
        </section>

        {/* Filter bar */}
        <ExperimentFilterBar
          active={statusFilter}
          onFilter={setStatusFilter}
          query={searchQuery}
          onSearch={setSearchQuery}
        />

        {/* Registry + Results panel */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
          {/* Experiment list */}
          <section aria-labelledby="experiment-list-heading" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Registry
              </p>
              <h2
                id="experiment-list-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                {statusFilter === "all"
                  ? "All experiments"
                  : `${statusFilter.charAt(0).toUpperCase()}${statusFilter.slice(1)} experiments`}
                <span className="ml-2 text-lg font-normal text-slate-400">
                  ({filteredExperiments.length})
                </span>
              </h2>
            </div>

            {filteredExperiments.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-400">
                No experiments match your filters.
              </p>
            ) : (
              <div aria-label="Experiment entries" className="flex flex-col gap-4" role="list">
                {filteredExperiments.map((exp) => (
                  <ExperimentCard
                    key={exp.id}
                    experiment={exp}
                    isSelected={exp.id === selected?.id}
                    onSelect={() => setSelectedId(exp.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Results summary + timeline panel */}
          {selected && (
            <div className="space-y-6">
              <ResultsSummaryPanel experiment={selected} />
              <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-sm backdrop-blur sm:p-8">
                <ExperimentTimeline experiment={selected} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Internal helper components                                         */
/* ------------------------------------------------------------------ */

const variantClasses: Record<string, string> = {
  slate: "border-slate-200 bg-slate-50/80 text-slate-400",
  emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-500",
  sky: "border-sky-200 bg-sky-50/80 text-sky-500",
  amber: "border-amber-200 bg-amber-50/80 text-amber-500",
};

function StatCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: string;
}) {
  return (
    <div className={`rounded-xl border px-5 py-3 ${variantClasses[variant]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ExperimentCard({
  experiment,
  isSelected,
  onSelect,
}: {
  experiment: ExperimentView;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      role="listitem"
      className={`${styles.card} ${statusCardStyle[experiment.status]} cursor-pointer rounded-2xl border p-5 shadow-sm backdrop-blur transition hover:shadow-md ${
        isSelected ? "ring-2 ring-indigo-400" : ""
      }`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      tabIndex={0}
      aria-label={`Experiment: ${experiment.title}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            {experiment.title}
          </h3>
          <p className="text-sm leading-6 text-slate-500">
            {experiment.hypothesis}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${statusDotColor[experiment.status]}`} />
          <StatusBadge status={experiment.status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span>
          <span className="font-medium text-slate-700">{experiment.owner.name}</span>{" "}
          &middot; {experiment.owner.team}
        </span>
        <span>Started {experiment.startDate}</span>
        {experiment.endDate && <span>Ended {experiment.endDate}</span>}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {experiment.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
