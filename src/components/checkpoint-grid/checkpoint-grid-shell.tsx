"use client";

import { useState } from "react";

import { checkpointOwners, checkpoints, milestoneSummary, progressBands, reviewNotes, type CheckpointStatus, type ReviewNote } from "@/app/checkpoint-grid/mock-data";
import { CheckpointFilters } from "./checkpoint-filters";
import { CheckpointGridHeader } from "./checkpoint-grid-header";
import { CheckpointTile } from "./checkpoint-tile";
import { ProgressBandStrip } from "./progress-band-strip";
import { ReviewNotesPanel } from "./review-notes-panel";

const groupNotesByCheckpoint = (items: ReviewNote[]) =>
  items.reduce<Record<string, ReviewNote[]>>((groups, note) => ({ ...groups, [note.checkpointId]: [...(groups[note.checkpointId] ?? []), note] }), {});
const formatLocalTimestamp = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);

export function CheckpointGridShell() {
  const [selectedOwner, setSelectedOwner] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<CheckpointStatus | "all">("all");
  const [selectedCheckpointId, setSelectedCheckpointId] = useState<string | null>(checkpoints[1]?.id ?? null);
  const [notesByCheckpoint, setNotesByCheckpoint] = useState(() => groupNotesByCheckpoint(reviewNotes));
  const [draftsByCheckpoint, setDraftsByCheckpoint] = useState<Record<string, string>>({});

  const visibleCheckpoints = checkpoints.filter((checkpoint) =>
    (selectedOwner === "all" || checkpoint.owner === selectedOwner) &&
    (selectedStatus === "all" || checkpoint.status === selectedStatus),
  );
  const selectedCheckpoint = checkpoints.find((checkpoint) => checkpoint.id === selectedCheckpointId) ?? null;
  const activeCheckpoint = selectedCheckpoint && visibleCheckpoints.some((checkpoint) => checkpoint.id === selectedCheckpoint.id) ? selectedCheckpoint : null;
  const activeNotes = activeCheckpoint ? notesByCheckpoint[activeCheckpoint.id] ?? [] : [];
  const draftValue = activeCheckpoint ? draftsByCheckpoint[activeCheckpoint.id] ?? "" : "";
  const completionRatio = Math.round(checkpoints.reduce((sum, checkpoint) => sum + checkpoint.completion, 0) / checkpoints.length);
  const statusCounts = checkpoints.reduce(
    (counts, checkpoint) => ({ ...counts, [checkpoint.status]: counts[checkpoint.status] + 1 }),
    { complete: 0, active: 0, watch: 0, blocked: 0 },
  );
  const totalNotes = Object.values(notesByCheckpoint).reduce((sum, items) => sum + items.length, 0);

  function handleSaveNote() {
    if (!activeCheckpoint) return;
    const body = (draftsByCheckpoint[activeCheckpoint.id] ?? "").trim();
    if (!body) return;
    const nextNote: ReviewNote = {
      id: `local-${activeCheckpoint.id}-${Date.now()}`,
      checkpointId: activeCheckpoint.id,
      author: "Local reviewer",
      timestamp: formatLocalTimestamp(new Date()),
      body,
    };
    setNotesByCheckpoint((current) => ({ ...current, [activeCheckpoint.id]: [nextNote, ...(current[activeCheckpoint.id] ?? [])] }));
    setDraftsByCheckpoint((current) => ({ ...current, [activeCheckpoint.id]: "" }));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.22),transparent_28%),linear-gradient(180deg,#07111f_0%,#0b1324_48%,#050913_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CheckpointGridHeader
          activeCount={statusCounts.active}
          blockedCount={statusCounts.blocked}
          completionRatio={completionRatio}
          completeCount={statusCounts.complete}
          summary={milestoneSummary}
          totalCheckpoints={checkpoints.length}
          totalNotes={totalNotes}
        />
        <ProgressBandStrip bands={progressBands} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <CheckpointFilters
              onOwnerChange={setSelectedOwner}
              onReset={() => {
                setSelectedOwner("all");
                setSelectedStatus("all");
              }}
              onStatusChange={setSelectedStatus}
              owners={checkpointOwners}
              selectedOwner={selectedOwner}
              selectedStatus={selectedStatus}
              totalCount={checkpoints.length}
              visibleCount={visibleCheckpoints.length}
            />
            <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">Checkpoint tiles</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Filtered milestone lane</h2>
                </div>
                <p className="max-w-xl text-sm text-slate-300">
                  Select a tile to inspect notes. Selecting the same tile again clears the panel.
                </p>
              </div>
              {visibleCheckpoints.length === 0 ? (
                <div className="mt-6 rounded-[1.6rem] border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center">
                  <p className="text-sm uppercase tracking-[0.24em] text-amber-200/70">No matching checkpoints</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">These filters cleared the grid.</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
                    Reset the owner or status selection to bring tiles back into view and reopen notes.
                  </p>
                  <button className="mt-6 rounded-full bg-sky-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200" onClick={() => {
                    setSelectedOwner("all");
                    setSelectedStatus("all");
                  }} type="button">
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {visibleCheckpoints.map((checkpoint) => (
                    <CheckpointTile
                      checkpoint={checkpoint}
                      isSelected={checkpoint.id === activeCheckpoint?.id}
                      key={checkpoint.id}
                      onSelect={(checkpointId) => setSelectedCheckpointId((current) => current === checkpointId ? null : checkpointId)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
          <ReviewNotesPanel
            draftValue={draftValue}
            hasVisibleCheckpoints={visibleCheckpoints.length > 0}
            notes={activeNotes}
            onDraftChange={(value) => activeCheckpoint && setDraftsByCheckpoint((current) => ({ ...current, [activeCheckpoint.id]: value }))}
            onSaveNote={handleSaveNote}
            selectedCheckpoint={activeCheckpoint}
          />
        </div>
      </div>
    </main>
  );
}
