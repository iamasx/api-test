"use client";

import type { ExperimentView } from "../_lib/experiment-registry-data";

interface TimelineEvent {
  label: string;
  date: string;
  status: "past" | "current" | "future";
}

function buildTimeline(experiment: ExperimentView): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  events.push({
    label: "Hypothesis defined",
    date: experiment.startDate,
    status: "past",
  });

  if (experiment.status === "draft") {
    events.push({
      label: "Awaiting approval",
      date: "—",
      status: "current",
    });
    events.push({ label: "Execution", date: "—", status: "future" });
    events.push({ label: "Analysis", date: "—", status: "future" });
    return events;
  }

  events.push({
    label: "Execution started",
    date: experiment.startDate,
    status: experiment.status === "active" ? "current" : "past",
  });

  if (experiment.status === "paused") {
    events.push({
      label: "Paused",
      date: "—",
      status: "current",
    });
    events.push({ label: "Analysis", date: "—", status: "future" });
    return events;
  }

  if (experiment.status === "active") {
    events.push({ label: "Analysis", date: "—", status: "future" });
    return events;
  }

  // completed
  events.push({
    label: "Results collected",
    date: experiment.endDate ?? "—",
    status: "past",
  });
  events.push({
    label: "Completed",
    date: experiment.endDate ?? "—",
    status: "past",
  });

  return events;
}

const statusDot: Record<TimelineEvent["status"], string> = {
  past: "bg-slate-400",
  current: "bg-indigo-500 ring-4 ring-indigo-100",
  future: "border-2 border-slate-300 bg-white",
};

const statusText: Record<TimelineEvent["status"], string> = {
  past: "text-slate-500",
  current: "text-indigo-700 font-semibold",
  future: "text-slate-400",
};

export function ExperimentTimeline({
  experiment,
}: {
  experiment: ExperimentView;
}) {
  const events = buildTimeline(experiment);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Timeline
      </p>
      <ol className="relative ml-3 border-l border-slate-200 pl-6">
        {events.map((event, idx) => (
          <li key={idx} className="relative pb-5 last:pb-0">
            <span
              className={`absolute -left-[1.56rem] top-1 h-3 w-3 rounded-full ${statusDot[event.status]}`}
            />
            <p className={`text-sm leading-5 ${statusText[event.status]}`}>
              {event.label}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{event.date}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
