"use client";

import { startTransition, useState } from "react";

import {
  getDefaultFieldGuideProcedure,
  getFieldGuideCategoryOptions,
  getFieldGuideFocusAreaOptions,
  getFieldGuidePriorityOptions,
  type FieldGuideCategory,
  type FieldGuideProcedure,
  type ProcedurePriority,
} from "../_lib/field-guide-data";
import styles from "../field-guide.module.css";
import { ProcedureCard } from "./procedure-card";
import { ProcedureDetailPanel } from "./procedure-detail-panel";
import { ProcedureFilterBar } from "./procedure-filter-bar";

type FieldGuideShellProps = {
  categories: FieldGuideCategory[];
  procedures: FieldGuideProcedure[];
};

const shellHighlights = [
  {
    label: "Searchable Catalog",
    detail: "Procedure cards stay grouped beside the working detail panel.",
  },
  {
    label: "Checklist Ready",
    detail: "Execution checklists remain paired with the active procedure.",
  },
  {
    label: "Reference Detail",
    detail: "Reference notes stay visible without leaving the route context.",
  },
] as const;

function matchesProcedure(procedure: FieldGuideProcedure, query: string) {
  if (!query) {
    return true;
  }

  const searchableFields = [
    procedure.title,
    procedure.code,
    procedure.summary,
    procedure.objective,
    procedure.crew,
    procedure.sceneType,
    ...procedure.focusAreas,
    ...procedure.tags,
    ...procedure.triggerSignals,
    ...procedure.tools,
  ];

  return searchableFields.some((field) => field.toLowerCase().includes(query));
}

export function FieldGuideShell({
  categories,
  procedures,
}: FieldGuideShellProps) {
  const defaultProcedure = getDefaultFieldGuideProcedure(procedures);
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [activePriority, setActivePriority] = useState<ProcedurePriority | "all">(
    "all",
  );
  const [activeFocusArea, setActiveFocusArea] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [selectedProcedureId, setSelectedProcedureId] = useState(
    defaultProcedure?.id ?? "",
  );
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const categoryOptions = getFieldGuideCategoryOptions(procedures, categories);
  const priorityOptions = getFieldGuidePriorityOptions(procedures);
  const focusAreaOptions = getFieldGuideFocusAreaOptions(procedures);
  const visibleProcedures = procedures.filter((procedure) => {
    const matchesCategory =
      activeCategoryId === "all" || procedure.categoryId === activeCategoryId;
    const matchesPriority =
      activePriority === "all" || procedure.priority === activePriority;
    const matchesFocusArea =
      activeFocusArea === "all" ||
      procedure.focusAreas.includes(activeFocusArea);

    return (
      matchesCategory &&
      matchesPriority &&
      matchesFocusArea &&
      matchesProcedure(procedure, normalizedSearchValue)
    );
  });
  const groupedVisibleProcedures = categories
    .map((category) => ({
      category,
      procedures: visibleProcedures.filter(
        (procedure) => procedure.categoryId === category.id,
      ),
    }))
    .filter((group) => group.procedures.length > 0);
  const selectedProcedure =
    visibleProcedures.find((procedure) => procedure.id === selectedProcedureId) ??
    visibleProcedures[0] ??
    procedures.find((procedure) => procedure.id === selectedProcedureId) ??
    defaultProcedure;

  const criticalProcedures = procedures.filter(
    (procedure) => procedure.priority === "Critical",
  ).length;
  const checklistItems = procedures.reduce(
    (count, procedure) => count + procedure.checklist.length,
    0,
  );
  const referenceNotes = procedures.reduce(
    (count, procedure) => count + procedure.references.length,
    0,
  );
  const activeFilterLabels = [
    searchValue.trim() ? `Query: ${searchValue.trim()}` : null,
    activeCategoryId !== "all"
      ? categoryOptions.find((option) => option.id === activeCategoryId)?.name
      : null,
    activePriority !== "all" ? `Priority: ${activePriority}` : null,
    activeFocusArea !== "all" ? `Focus: ${activeFocusArea}` : null,
  ].filter(Boolean);
  const canReset =
    activeCategoryId !== "all" ||
    activePriority !== "all" ||
    activeFocusArea !== "all" ||
    searchValue.length > 0;

  function handleCategoryChange(categoryId: string) {
    startTransition(() => {
      setActiveCategoryId(categoryId);
    });
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
  }

  function handlePriorityChange(priority: ProcedurePriority | "all") {
    startTransition(() => {
      setActivePriority(priority);
    });
  }

  function handleFocusAreaChange(focusArea: string) {
    startTransition(() => {
      setActiveFocusArea(focusArea);
    });
  }

  function handleProcedureSelect(procedureId: string) {
    startTransition(() => {
      setSelectedProcedureId(procedureId);
    });
  }

  function handleResetFilters() {
    startTransition(() => {
      setActiveCategoryId("all");
      setActivePriority("all");
      setActiveFocusArea("all");
      setSearchValue("");
    });
  }

  return (
    <div className={`${styles.shell} text-slate-950`}>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section
          aria-labelledby="field-guide-title"
          className={`${styles.heroPanel} rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_36px_110px_-48px_rgba(15,23,42,0.9)] sm:px-8 lg:px-10`}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.95fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">
                Field Guide
              </p>
              <h1
                id="field-guide-title"
                className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Search procedures, run the checklist, and keep reference detail
                close to the active response.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This route stages isolated mock procedures for power recovery,
                safety sweeps, signal checks, and restart coordination. The
                guide is organized for quick scanning on the left and focused
                execution detail on the right.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                  Search across tools, signals, and tags
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                  Procedure detail stays anchored to the active selection
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                  Checklist and reference notes are bundled with each playbook
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Procedures
                </p>
                <p className="mt-3 text-3xl font-semibold">{procedures.length}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Mock response playbooks
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Critical
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {criticalProcedures}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Highest-priority procedures
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Checklist Items
                </p>
                <p className="mt-3 text-3xl font-semibold">{checklistItems}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Action checks across {referenceNotes} reference notes
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Field guide route highlights"
          className="grid gap-4 md:grid-cols-3"
        >
          {shellHighlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-[1.7rem] border border-slate-200/80 bg-white/82 px-5 py-5 shadow-[0_18px_70px_-48px_rgba(15,23,42,0.35)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {highlight.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {highlight.detail}
              </p>
            </div>
          ))}
        </section>

        <ProcedureFilterBar
          options={categoryOptions}
          priorityOptions={priorityOptions}
          focusAreaOptions={focusAreaOptions}
          activeCategoryId={activeCategoryId}
          activePriority={activePriority}
          activeFocusArea={activeFocusArea}
          searchValue={searchValue}
          resultCount={visibleProcedures.length}
          canReset={canReset}
          onCategoryChange={handleCategoryChange}
          onPriorityChange={handlePriorityChange}
          onFocusAreaChange={handleFocusAreaChange}
          onSearchChange={handleSearchChange}
          onReset={handleResetFilters}
        />

        <section
          aria-label="Field guide workspace summary"
          className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]"
        >
          <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/78 px-5 py-5 shadow-[0_18px_70px_-48px_rgba(15,23,42,0.38)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Active Filters
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilterLabels.length > 0 ? (
                activeFilterLabels.map((filterLabel) => (
                  <span
                    key={filterLabel}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    {filterLabel}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
                  All procedures visible
                </span>
              )}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {groupedVisibleProcedures.length} procedure group
              {groupedVisibleProcedures.length === 1 ? "" : "s"} in view with{" "}
              {visibleProcedures.length} active procedure
              {visibleProcedures.length === 1 ? "" : "s"} ready for review.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-slate-200/80 bg-slate-950 px-5 py-5 text-white shadow-[0_24px_80px_-50px_rgba(15,23,42,0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Selected Focus
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              {selectedProcedure?.title ?? "No visible procedure"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {selectedProcedure
                ? `${selectedProcedure.code} • ${selectedProcedure.focusAreas.join(" • ")}`
                : "Adjust the filters or search term to restore a procedure and re-open the detail panel."}
            </p>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_420px]">
          <section
            aria-labelledby="field-guide-procedures"
            className={`${styles.catalogColumn} space-y-5`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Procedure Catalog
                </p>
                <h2
                  id="field-guide-procedures"
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Active response procedures
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Select any procedure card to move its checklist, step sequence,
                and reference notes into the detail panel.
              </p>
            </div>

            {groupedVisibleProcedures.length > 0 ? (
              <div className="grid gap-6">
                {groupedVisibleProcedures.map((group) => (
                  <section
                    key={group.category.id}
                    aria-labelledby={`field-guide-group-${group.category.id}`}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-3 rounded-[1.6rem] border border-slate-200/75 bg-white/72 px-5 py-4 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.38)] sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Procedure Group
                        </p>
                        <h3
                          id={`field-guide-group-${group.category.id}`}
                          className="mt-2 text-xl font-semibold tracking-tight text-slate-950"
                        >
                          {group.category.name}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                          {group.category.description}
                        </p>
                      </div>
                      <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                        {group.procedures.length} procedure
                        {group.procedures.length === 1 ? "" : "s"}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {group.procedures.map((procedure) => (
                        <ProcedureCard
                          key={procedure.id}
                          procedure={procedure}
                          selected={procedure.id === selectedProcedure?.id}
                          onSelect={handleProcedureSelect}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div
                className={`${styles.emptyState} rounded-[2rem] border border-dashed border-slate-300 px-6 py-10 text-center shadow-[0_20px_60px_-44px_rgba(15,23,42,0.55)]`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  No matching procedures
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  Adjust the current search or filter
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Try a broader search term or switch back to all procedures to
                  restore the full guide list.
                </p>
                {canReset ? (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Show all procedures
                  </button>
                ) : null}
              </div>
            )}
          </section>

          {selectedProcedure && groupedVisibleProcedures.length > 0 ? (
            <ProcedureDetailPanel procedure={selectedProcedure} />
          ) : (
            <aside className="rounded-[2rem] border border-slate-200/80 bg-white/78 p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Detail Panel
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                No procedure selected
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Once the list has a visible procedure, its execution checklist
                and reference detail will appear here.
              </p>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
