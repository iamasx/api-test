"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  getDefaultFieldGuideProcedure,
  getFieldGuideCategoryOptions,
  type FieldGuideCategory,
  type FieldGuideProcedure,
} from "../_lib/field-guide-data";
import { ProcedureCard } from "./procedure-card";
import { ProcedureDetailPanel } from "./procedure-detail-panel";
import { ProcedureFilterBar } from "./procedure-filter-bar";

type FieldGuideShellProps = {
  categories: FieldGuideCategory[];
  procedures: FieldGuideProcedure[];
};

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
  const [searchValue, setSearchValue] = useState("");
  const [selectedProcedureId, setSelectedProcedureId] = useState(
    defaultProcedure?.id ?? "",
  );
  const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());

  const categoryOptions = getFieldGuideCategoryOptions(procedures, categories);
  const visibleProcedures = procedures.filter((procedure) => {
    const matchesCategory =
      activeCategoryId === "all" || procedure.categoryId === activeCategoryId;

    return matchesCategory && matchesProcedure(procedure, deferredSearchValue);
  });
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

  function handleCategoryChange(categoryId: string) {
    startTransition(() => {
      setActiveCategoryId(categoryId);
    });
  }

  function handleSearchChange(value: string) {
    startTransition(() => {
      setSearchValue(value);
    });
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fcf8ef_0%,#f3f7f4_40%,#eef4fb_100%)] text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_36px_110px_-48px_rgba(15,23,42,0.9)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.95fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">
                Field Guide
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
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
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Procedures
                </p>
                <p className="mt-3 text-3xl font-semibold">{procedures.length}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Mock response playbooks
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
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
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
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

        <ProcedureFilterBar
          options={categoryOptions}
          activeCategoryId={activeCategoryId}
          searchValue={searchValue}
          resultCount={visibleProcedures.length}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_420px]">
          <section
            aria-labelledby="field-guide-procedures"
            className="space-y-5"
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

            {visibleProcedures.length > 0 ? (
              <div className="grid gap-4">
                {visibleProcedures.map((procedure) => (
                  <ProcedureCard
                    key={procedure.id}
                    procedure={procedure}
                    selected={procedure.id === selectedProcedure?.id}
                    onSelect={setSelectedProcedureId}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center shadow-[0_20px_60px_-44px_rgba(15,23,42,0.55)]">
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
              </div>
            )}
          </section>

          {selectedProcedure && visibleProcedures.length > 0 ? (
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
