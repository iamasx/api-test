"use client";

import { startTransition, useState } from "react";
import {
  plannerRoles,
  plannerShifts,
  plannerTeamMembers,
  shiftPlannerDays,
  type HandoffStatus,
  type PlannerDay,
  type PlannerRoleId,
  type PlannerShiftId,
} from "@/app/shift-planner/shift-planner-data";
import { CoverageMatrix } from "./coverage-matrix";
import { HandoffNotesPanel } from "./handoff-notes-panel";
import { ShiftPlannerFilters } from "./shift-planner-filters";
import { ShiftPlannerHeader } from "./shift-planner-header";

type RoleFilter = PlannerRoleId | "all";
type ShiftFilter = PlannerShiftId | "all";
type NoteDrafts = Record<string, { body: string; status: HandoffStatus }>;

const memberDirectory = Object.fromEntries(
  plannerTeamMembers.map((member) => [member.id, member]),
);

function createNoteDrafts(days: PlannerDay[]) {
  return Object.fromEntries(
    days.flatMap((day) =>
      day.handoffNotes.map((note) => [
        note.id,
        { body: note.body, status: note.status },
      ]),
    ),
  ) as NoteDrafts;
}

export function ShiftPlannerWorkspace() {
  const [selectedDayId, setSelectedDayId] = useState(shiftPlannerDays[0]?.id ?? "");
  const [selectedRoleId, setSelectedRoleId] = useState<RoleFilter>("all");
  const [selectedShiftId, setSelectedShiftId] = useState<ShiftFilter>("all");
  const [noteDrafts, setNoteDrafts] = useState(() => createNoteDrafts(shiftPlannerDays));

  const selectedDay =
    shiftPlannerDays.find((day) => day.id === selectedDayId) ?? shiftPlannerDays[0];
  const visibleShifts =
    selectedShiftId === "all"
      ? plannerShifts
      : plannerShifts.filter((shift) => shift.id === selectedShiftId);
  const visibleRows = selectedDay.coverage.filter(
    (row) => selectedRoleId === "all" || row.roleId === selectedRoleId,
  );
  const visibleBlockCount = visibleRows.reduce(
    (count, row) =>
      count +
      row.assignments.filter(
        (assignment) =>
          selectedShiftId === "all" || assignment.shiftId === selectedShiftId,
      ).length,
    0,
  );
  const coverageTotals = selectedDay.coverage.flatMap((row) => row.assignments).reduce(
    (counts, assignment) => ({ ...counts, [assignment.tone]: counts[assignment.tone] + 1 }),
    { ready: 0, watch: 0, gap: 0 },
  );
  const dayReadyNotes = selectedDay.handoffNotes.filter(
    (note) => noteDrafts[note.id]?.status === "ready",
  ).length;
  const visibleNotes = selectedDay.handoffNotes
    .filter((note) => selectedShiftId === "all" || note.shiftId === selectedShiftId)
    .map((note) => ({
      ...note,
      body: noteDrafts[note.id]?.body ?? note.body,
      status: noteDrafts[note.id]?.status ?? note.status,
      ownerName: memberDirectory[note.ownerId]?.name ?? note.ownerId,
    }));
  const hasActiveFilters = selectedRoleId !== "all" || selectedShiftId !== "all";

  const handleNoteChange = (noteId: string, body: string) => {
    startTransition(() => {
      setNoteDrafts((current) => ({
        ...current,
        [noteId]: { ...current[noteId], body },
      }));
    });
  };

  const handleToggleStatus = (noteId: string) => {
    startTransition(() => {
      setNoteDrafts((current) => ({
        ...current,
        [noteId]: {
          ...current[noteId],
          status: current[noteId]?.status === "ready" ? "pending" : "ready",
        },
      }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,#03121c_0%,#08111d_55%,#020617_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ShiftPlannerHeader
          days={shiftPlannerDays}
          gapCount={coverageTotals.gap}
          onSelectDay={(dayId) => startTransition(() => setSelectedDayId(dayId))}
          readyCount={coverageTotals.ready}
          readyNotes={dayReadyNotes}
          selectedDayId={selectedDay.id}
          staffing={selectedDay.staffing}
          totalNotes={selectedDay.handoffNotes.length}
          watchCount={coverageTotals.watch}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.9fr)]">
          <section className="space-y-6">
            <ShiftPlannerFilters
              blockCount={visibleBlockCount}
              hasActiveFilters={hasActiveFilters}
              onClear={() =>
                startTransition(() => {
                  setSelectedRoleId("all");
                  setSelectedShiftId("all");
                })
              }
              onRoleChange={(roleId) => startTransition(() => setSelectedRoleId(roleId))}
              onShiftChange={(shiftId) => startTransition(() => setSelectedShiftId(shiftId))}
              roleCount={visibleRows.length}
              roles={plannerRoles}
              selectedRoleId={selectedRoleId}
              selectedShiftId={selectedShiftId}
              shifts={plannerShifts}
            />
            <CoverageMatrix
              memberDirectory={memberDirectory}
              rows={visibleRows}
              selectedDayLabel={selectedDay.dateLabel}
              selectedShiftId={selectedShiftId}
              shifts={visibleShifts}
            />
          </section>
          <HandoffNotesPanel
            notes={visibleNotes}
            onBodyChange={handleNoteChange}
            onToggleStatus={handleToggleStatus}
            selectedDayLabel={selectedDay.dateLabel}
            selectedShiftId={selectedShiftId}
          />
        </div>
      </div>
    </main>
  );
}
