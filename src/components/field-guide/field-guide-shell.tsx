"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  playbookStatuses,
  procedureDifficulties,
  procedureStatuses,
  procedures,
  procedureTags,
  procedureTeams,
  rehearsalStatuses,
  savedPlaybooks,
  type PlaybookStatus,
  type SavedPlaybook,
} from "@/components/field-guide/field-guide-data";
import GuideFilters from "@/components/field-guide/guide-filters";
import GuideSearch from "@/components/field-guide/guide-search";
import PlaybookCard from "@/components/field-guide/playbook-card";
import PlaybookEditor from "@/components/field-guide/playbook-editor";
import PlaybookReviewPanel from "@/components/field-guide/playbook-review-panel";
import ProcedureCard from "@/components/field-guide/procedure-card";
import ProcedureDrawer from "@/components/field-guide/procedure-drawer";
import {
  advanceVersion,
  buildDraftPlaybook,
  clonePlaybook,
  createEmptyStep,
  createPlaybookId,
  getDefaultDraftPlaybook,
  getProcedureById,
  getSourceProcedure,
  parseCommaSeparatedList,
  parseLineSeparatedList,
} from "@/components/field-guide/field-guide-utils";

type ChecklistState = Record<string, Record<string, boolean>>;

type SurfaceMode = "library" | "authoring";

type ReviewSelection =
  | {
      id: string;
      kind: "playbook" | "procedure";
    }
  | null;

const SAVED_TIMESTAMP = "April 20, 2026 09:00 UTC";
const PUBLISHED_TIMESTAMP = "April 20, 2026 12:00 UTC";
const DISPLAY_DATE = "April 20, 2026";

function matchesQuery(query: string, values: string[]) {
  if (query.length === 0) {
    return true;
  }

  return values.some((value) => value.toLowerCase().includes(query));
}

function EmptyState({
  body,
  eyebrow,
  title,
}: {
  body: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-lg shadow-slate-200/40">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

export default function FieldGuideShell() {
  const [surfaceMode, setSurfaceMode] = useState<SurfaceMode>("library");
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPlaybookStatus, setSelectedPlaybookStatus] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [reviewSelection, setReviewSelection] = useState<ReviewSelection>(
    savedPlaybooks[0]
      ? { id: savedPlaybooks[0].id, kind: "playbook" }
      : procedures[0]
        ? { id: procedures[0].id, kind: "procedure" }
        : null,
  );
  const [checklistState, setChecklistState] = useState<ChecklistState>({});
  const [savedPlaybookState, setSavedPlaybookState] = useState<SavedPlaybook[]>(
    () => savedPlaybooks.map((playbook) => clonePlaybook(playbook)),
  );
  const [draftPlaybook, setDraftPlaybook] = useState<SavedPlaybook>(() =>
    getDefaultDraftPlaybook(),
  );

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredProcedures = procedures.filter((procedure) => {
    const queryMatch = matchesQuery(normalizedQuery, [
      procedure.title,
      procedure.summary,
      procedure.notes,
      ...procedure.tags,
      ...procedure.tools,
      ...procedure.checklist.map((step) => step.label),
    ]);
    const teamMatch =
      selectedTeam === "all" || procedure.team === selectedTeam;
    const difficultyMatch =
      selectedDifficulty === "all" || procedure.difficulty === selectedDifficulty;
    const statusMatch =
      selectedStatus === "all" || procedure.status === selectedStatus;
    const tagMatch =
      selectedTag === "all" || procedure.tags.includes(selectedTag);

    return (
      queryMatch &&
      teamMatch &&
      difficultyMatch &&
      statusMatch &&
      tagMatch
    );
  });

  const filteredPlaybooks = savedPlaybookState.filter((playbook) => {
    const sourceProcedure = getSourceProcedure(playbook);
    const queryMatch = matchesQuery(normalizedQuery, [
      playbook.title,
      playbook.summary,
      playbook.objective,
      playbook.audience,
      playbook.rehearsalFocus,
      playbook.notes,
      playbook.metadata.owner,
      ...playbook.metadata.reviewers,
      ...playbook.tags,
      ...playbook.tools,
      ...playbook.steps.map((step) => step.label),
      ...playbook.steps.map((step) => step.detail),
      sourceProcedure?.title ?? "",
    ]);
    const teamMatch =
      selectedTeam === "all" || playbook.team === selectedTeam;
    const difficultyMatch =
      selectedDifficulty === "all" || playbook.difficulty === selectedDifficulty;
    const statusMatch =
      selectedPlaybookStatus === "all" || playbook.status === selectedPlaybookStatus;
    const tagMatch =
      selectedTag === "all" || playbook.tags.includes(selectedTag);

    return queryMatch && teamMatch && difficultyMatch && statusMatch && tagMatch;
  });

  const hasActiveFilters =
    query.length > 0 ||
    selectedTeam !== "all" ||
    selectedDifficulty !== "all" ||
    selectedStatus !== "all" ||
    selectedPlaybookStatus !== "all" ||
    selectedTag !== "all";

  const defaultSelection: ReviewSelection = filteredPlaybooks[0]
    ? { id: filteredPlaybooks[0].id, kind: "playbook" }
    : filteredProcedures[0]
      ? { id: filteredProcedures[0].id, kind: "procedure" }
      : null;

  const reviewSelectionStillVisible =
    reviewSelection?.kind === "playbook"
      ? filteredPlaybooks.some((playbook) => playbook.id === reviewSelection.id)
      : filteredProcedures.some(
          (procedure) => procedure.id === reviewSelection?.id,
        );

  const resolvedSelection =
    reviewSelection && reviewSelectionStillVisible
      ? reviewSelection
      : defaultSelection;

  const activePlaybook =
    resolvedSelection?.kind === "playbook"
      ? filteredPlaybooks.find(
          (playbook) => playbook.id === resolvedSelection.id,
        ) ?? null
      : null;

  const activeProcedure =
    resolvedSelection?.kind === "procedure"
      ? filteredProcedures.find(
          (procedure) => procedure.id === resolvedSelection.id,
        ) ?? null
      : null;

  const draftSourceProcedure = getProcedureById(draftPlaybook.sourceProcedureId);
  const draftQueueCount = savedPlaybookState.filter(
    (playbook) => playbook.status !== "Published",
  ).length;
  const publishedCount = savedPlaybookState.filter(
    (playbook) => playbook.status === "Published",
  ).length;

  const handleToggleStep = (procedureId: string, stepId: string) => {
    startTransition(() => {
      setChecklistState((currentState) => ({
        ...currentState,
        [procedureId]: {
          ...currentState[procedureId],
          [stepId]: !currentState[procedureId]?.[stepId],
        },
      }));
    });
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedTeam("all");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
    setSelectedPlaybookStatus("all");
    setSelectedTag("all");
  };

  const handleLoadDraftFromProcedure = (procedureId: string) => {
    const procedure = getProcedureById(procedureId);

    if (!procedure) {
      return;
    }

    startTransition(() => {
      setDraftPlaybook(buildDraftPlaybook(procedure));
    });
  };

  const handleLoadSavedPlaybook = (playbookId: string) => {
    const playbook =
      savedPlaybookState.find((entry) => entry.id === playbookId) ?? null;

    if (!playbook) {
      return;
    }

    startTransition(() => {
      setSurfaceMode("authoring");
      setDraftPlaybook(clonePlaybook(playbook));
      setReviewSelection({ id: playbook.id, kind: "playbook" });
    });
  };

  const handlePersistDraft = (nextStatus: PlaybookStatus) => {
    const sourceProcedure =
      getProcedureById(draftPlaybook.sourceProcedureId) ?? procedures[0];

    if (!sourceProcedure) {
      return;
    }

    const existingIds = savedPlaybookState.map((playbook) => playbook.id);
    const resolvedId = createPlaybookId(
      draftPlaybook.title,
      existingIds,
      draftPlaybook.id.startsWith("draft-") ? undefined : draftPlaybook.id,
    );

    const persistedPlaybook: SavedPlaybook = {
      ...clonePlaybook(draftPlaybook),
      id: resolvedId,
      sourceProcedureId: sourceProcedure.id,
      team: sourceProcedure.team,
      difficulty: sourceProcedure.difficulty,
      status: nextStatus,
      rehearsalStatus:
        nextStatus === "Published"
          ? "Ready to Rehearse"
          : draftPlaybook.rehearsalStatus,
      lastUpdated: DISPLAY_DATE,
      metadata: {
        ...draftPlaybook.metadata,
        version: advanceVersion(draftPlaybook.metadata.version, nextStatus),
        lastSaved:
          nextStatus === "Published" ? PUBLISHED_TIMESTAMP : SAVED_TIMESTAMP,
        publishWindow:
          nextStatus === "Published"
            ? PUBLISHED_TIMESTAMP
            : draftPlaybook.metadata.publishWindow,
      },
    };

    setSavedPlaybookState((currentPlaybooks) => {
      if (currentPlaybooks.some((playbook) => playbook.id === resolvedId)) {
        return currentPlaybooks.map((playbook) =>
          playbook.id === resolvedId ? persistedPlaybook : playbook,
        );
      }

      return [persistedPlaybook, ...currentPlaybooks];
    });

    startTransition(() => {
      setDraftPlaybook(clonePlaybook(persistedPlaybook));
      setReviewSelection({ id: persistedPlaybook.id, kind: "playbook" });

      if (nextStatus === "Published") {
        setSurfaceMode("library");
      }
    });
  };

  const visibleProcedureCount = filteredProcedures.length;
  const visiblePlaybookCount = filteredPlaybooks.length;
  const searchSummary = `Showing ${visibleProcedureCount} of ${procedures.length} procedures and ${visiblePlaybookCount} of ${savedPlaybookState.length} saved playbooks`;
  const helperText =
    "Search checks summaries, notes, reviewer names, and authored step content while all filters stay entirely client-side.";

  return (
    <section className="space-y-6">
      <section className="rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Field guide modes
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Move between review and authoring without leaving the route
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              The library keeps published guidance visible while the authoring
              studio supports local draft edits, reviewer metadata, and live
              rehearsal previews.
            </p>
          </div>
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              aria-pressed={surfaceMode === "library"}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                surfaceMode === "library"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
              onClick={() => startTransition(() => setSurfaceMode("library"))}
              type="button"
            >
              Field library
            </button>
            <button
              aria-pressed={surfaceMode === "authoring"}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                surfaceMode === "authoring"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
              onClick={() => startTransition(() => setSurfaceMode("authoring"))}
              type="button"
            >
              Authoring studio
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-950 px-5 py-4 text-slate-50">
            <p className="text-sm text-slate-300">Saved playbooks</p>
            <p className="mt-2 text-3xl font-semibold">{savedPlaybookState.length}</p>
          </div>
          <div className="rounded-3xl bg-amber-100 px-5 py-4 text-amber-950">
            <p className="text-sm text-amber-700">Draft queue</p>
            <p className="mt-2 text-3xl font-semibold">{draftQueueCount}</p>
          </div>
          <div className="rounded-3xl bg-sky-100 px-5 py-4 text-sky-950">
            <p className="text-sm text-sky-700">Published</p>
            <p className="mt-2 text-3xl font-semibold">{publishedCount}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
        <div className="space-y-5">
          <GuideSearch
            helperText={helperText}
            onQueryChange={setQuery}
            query={query}
            resultSummary={searchSummary}
          />
          <GuideFilters
            difficulties={procedureDifficulties}
            hasActiveFilters={hasActiveFilters}
            onClear={handleClearFilters}
            onDifficultyChange={setSelectedDifficulty}
            onPlaybookStatusChange={setSelectedPlaybookStatus}
            onStatusChange={setSelectedStatus}
            onTagChange={setSelectedTag}
            onTeamChange={setSelectedTeam}
            playbookStatuses={playbookStatuses}
            selectedDifficulty={selectedDifficulty}
            selectedPlaybookStatus={selectedPlaybookStatus}
            selectedStatus={selectedStatus}
            selectedTag={selectedTag}
            selectedTeam={selectedTeam}
            statuses={procedureStatuses}
            tags={procedureTags}
            teams={procedureTeams}
          />

          {surfaceMode === "library" ? (
            <>
              {filteredPlaybooks.length === 0 && filteredProcedures.length === 0 ? (
                <EmptyState
                  body="Clear one or more filters to reopen the saved playbook queue and the procedure template library."
                  eyebrow="No results"
                  title="No procedures or playbooks match the current search."
                />
              ) : null}

              {filteredPlaybooks.length > 0 ? (
                <section className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Saved playbooks
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Review draft and published playbooks without leaving the
                        field guide route.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {filteredPlaybooks.map((playbook) => (
                      <PlaybookCard
                        isSelected={resolvedSelection?.id === playbook.id}
                        key={playbook.id}
                        onSelect={(playbookId) =>
                          startTransition(() =>
                            setReviewSelection({
                              id: playbookId,
                              kind: "playbook",
                            }),
                          )
                        }
                        playbook={playbook}
                        sourceTitle={
                          getSourceProcedure(playbook)?.title ?? "Custom flow"
                        }
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              {filteredProcedures.length > 0 ? (
                <section className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Procedure templates
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use the existing procedures as source material for new
                      playbooks or continue using the checklist view.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredProcedures.map((procedure) => {
                      const completedCount = procedure.checklist.filter(
                        (step) => checklistState[procedure.id]?.[step.id],
                      ).length;

                      return (
                        <ProcedureCard
                          completedCount={completedCount}
                          isSelected={resolvedSelection?.id === procedure.id}
                          key={procedure.id}
                          onSelect={(procedureId) =>
                            startTransition(() =>
                              setReviewSelection({
                                id: procedureId,
                                kind: "procedure",
                              }),
                            )
                          }
                          procedure={procedure}
                        />
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <PlaybookEditor
              draftPlaybook={draftPlaybook}
              onAddStep={() =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  steps: [
                    ...currentPlaybook.steps,
                    createEmptyStep(currentPlaybook.steps.length),
                  ],
                }))
              }
              onCheckpointsChange={(value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  checkpoints: parseLineSeparatedList(value),
                }))
              }
              onCreateNew={() => handleLoadDraftFromProcedure(procedures[0]?.id ?? "")}
              onListChange={(field, value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  [field]: parseCommaSeparatedList(value),
                }))
              }
              onMetadataFieldChange={(field, value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  metadata: {
                    ...currentPlaybook.metadata,
                    [field]: value,
                  },
                }))
              }
              onPublishPlaybook={() => handlePersistDraft("Published")}
              onRehearsalStatusChange={(status) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  rehearsalStatus: status,
                }))
              }
              onReviewersChange={(value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  metadata: {
                    ...currentPlaybook.metadata,
                    reviewers: parseCommaSeparatedList(value),
                  },
                }))
              }
              onSaveDraft={() =>
                handlePersistDraft(
                  draftPlaybook.status === "Published"
                    ? "In Review"
                    : draftPlaybook.status,
                )
              }
              onSelectProcedure={handleLoadDraftFromProcedure}
              onStatusChange={(status) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  status,
                }))
              }
              onStepFieldChange={(stepId, field, value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  steps: currentPlaybook.steps.map((step) =>
                    step.id === stepId ? { ...step, [field]: value } : step,
                  ),
                }))
              }
              onStepRemove={(stepId) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  steps:
                    currentPlaybook.steps.length > 1
                      ? currentPlaybook.steps.filter((step) => step.id !== stepId)
                      : currentPlaybook.steps,
                }))
              }
              onTextFieldChange={(field, value) =>
                setDraftPlaybook((currentPlaybook) => ({
                  ...currentPlaybook,
                  [field]: value,
                }))
              }
              procedures={procedures}
              rehearsalStatuses={rehearsalStatuses}
              statuses={playbookStatuses}
            />
          )}
        </div>

        <div className="space-y-6">
          {surfaceMode === "library" ? (
            activePlaybook ? (
              <PlaybookReviewPanel
                playbook={activePlaybook}
                sourceProcedure={getSourceProcedure(activePlaybook)}
              />
            ) : activeProcedure ? (
              <ProcedureDrawer
                completedSteps={checklistState[activeProcedure.id]}
                isOpen
                onClose={() =>
                  startTransition(() =>
                    setReviewSelection(
                      filteredPlaybooks[0]
                        ? { id: filteredPlaybooks[0].id, kind: "playbook" }
                        : null,
                    ),
                  )
                }
                onToggleStep={handleToggleStep}
                procedure={activeProcedure}
              />
            ) : (
              <EmptyState
                body="Clear the filters or switch to authoring mode to start a new playbook draft."
                eyebrow="Review panel"
                title="Nothing is currently available to review."
              />
            )
          ) : (
            <>
              <section className="rounded-[1.75rem] border border-slate-200/70 bg-white/95 p-5 shadow-lg shadow-slate-200/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Saved queue
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Load an existing draft or published playbook into the
                      editor without leaving authoring mode.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-50">
                    {filteredPlaybooks.length} visible
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {filteredPlaybooks.length > 0 ? (
                    filteredPlaybooks.map((playbook) => (
                      <button
                        aria-label={`Load playbook: ${playbook.title}`}
                        className={`w-full rounded-3xl border p-4 text-left transition ${
                          draftPlaybook.id === playbook.id
                            ? "border-sky-300 bg-sky-50"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                        }`}
                        key={playbook.id}
                        onClick={() => handleLoadSavedPlaybook(playbook.id)}
                        type="button"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-950">
                              {playbook.title}
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                              {playbook.status} · {playbook.metadata.version}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                            {playbook.metadata.lastSaved}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm leading-6 text-slate-600">
                      No saved playbooks match the current filters. Clear the
                      filters or save the current draft to refill the queue.
                    </p>
                  )}
                </div>
              </section>
              <PlaybookReviewPanel
                description="Live preview of the in-progress draft, including source context, metadata, and the rehearsal flow that will be saved next."
                heading="Draft review"
                playbook={draftPlaybook}
                sourceProcedure={draftSourceProcedure}
              />
            </>
          )}
        </div>
      </section>
    </section>
  );
}
