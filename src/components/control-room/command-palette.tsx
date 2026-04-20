"use client";

import { useDeferredValue, useEffect, useId, useRef, useState } from "react";

export type PaletteAction = {
  id: string;
  group: string;
  label: string;
  description: string;
  keywords?: string[];
  tone?: "default" | "warning" | "critical";
  onSelect: () => void;
};

type CommandPaletteProps = {
  actions: PaletteAction[];
  selectedAlertTitle: string | null;
  onClose: () => void;
};

function filterActions(actions: PaletteAction[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return actions;
  }

  return actions.filter((action) => {
    const searchBody = [
      action.group,
      action.label,
      action.description,
      ...(action.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return normalizedQuery
      .split(/\s+/)
      .every((term) => searchBody.includes(term));
  });
}

const toneClasses = {
  default:
    "border-white/8 bg-white/[0.04] text-slate-100 hover:border-white/15 hover:bg-white/[0.06]",
  warning:
    "border-amber-300/18 bg-amber-400/[0.08] text-amber-50 hover:border-amber-300/28 hover:bg-amber-400/[0.12]",
  critical:
    "border-rose-300/18 bg-rose-500/[0.08] text-rose-50 hover:border-rose-300/28 hover:bg-rose-500/[0.12]",
};

export function CommandPalette({
  actions,
  selectedAlertTitle,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const listId = useId();
  const filteredActions = filterActions(actions, deferredQuery);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const selectedIndex =
    filteredActions.length === 0
      ? -1
      : Math.min(activeIndex, filteredActions.length - 1);
  const activeAction =
    selectedIndex === -1 ? null : filteredActions[selectedIndex] ?? null;

  function executeAction(action: PaletteAction) {
    action.onSelect();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/72 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        aria-describedby={`${titleId}-description`}
        aria-labelledby={titleId}
        aria-modal="true"
        className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#04131a]/95 shadow-[0_32px_120px_rgba(0,0,0,0.5)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="border-b border-white/8 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
                Command Center
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white" id={titleId}>
                Control Room command palette
              </h2>
              <p
                className="mt-2 text-sm leading-6 text-slate-300"
                id={`${titleId}-description`}
              >
                Search quick actions, queue filters, desk controls, and alert
                drilldowns from one keyboard-first surface.
              </p>
            </div>
            <button
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
              onClick={onClose}
              type="button"
            >
              Esc
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-cyan-100">
              {actions.length} commands loaded
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              selected alert {selectedAlertTitle ?? "none"}
            </span>
          </div>

          <label className="mt-5 block">
            <span className="sr-only">Search commands</span>
            <input
              aria-activedescendant={
                activeAction ? `${listId}-${activeAction.id}` : undefined
              }
              aria-controls={listId}
              className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/45"
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  if (filteredActions.length === 0) {
                    return;
                  }

                  setActiveIndex((currentIndex) =>
                    Math.min(currentIndex, filteredActions.length - 1) >=
                    filteredActions.length - 1
                      ? 0
                      : Math.min(currentIndex, filteredActions.length - 1) + 1,
                  );
                }

                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  if (filteredActions.length === 0) {
                    return;
                  }

                  setActiveIndex((currentIndex) =>
                    Math.min(currentIndex, filteredActions.length - 1) <= 0
                      ? filteredActions.length - 1
                      : Math.min(currentIndex, filteredActions.length - 1) - 1,
                  );
                }

                if (event.key === "Enter") {
                  event.preventDefault();
                  if (activeAction) {
                    executeAction(activeAction);
                  }
                }

                if (event.key === "Escape") {
                  event.preventDefault();
                  onClose();
                }
              }}
              placeholder="Search commands, alerts, filters, or remediation shortcuts..."
              ref={inputRef}
              type="text"
              value={query}
            />
          </label>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
          {filteredActions.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-sm text-slate-400">
              No commands match your search.
            </div>
          ) : (
            <div aria-label="Command palette results" className="space-y-2" id={listId} role="listbox">
              {filteredActions.map((action, index) => {
                const isActive = index === selectedIndex;
                const tone = action.tone ?? "default";

                return (
                  <button
                    aria-selected={isActive}
                    className={`w-full rounded-[1.6rem] border px-4 py-4 text-left transition ${toneClasses[tone]} ${
                      isActive ? "shadow-[0_0_0_1px_rgba(103,232,249,0.25)]" : ""
                    }`}
                    id={`${listId}-${action.id}`}
                    key={action.id}
                    onClick={() => executeAction(action)}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    type="button"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          {action.group}
                        </p>
                        <h3 className="mt-2 text-base font-medium">{action.label}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {action.description}
                        </p>
                      </div>
                      {isActive ? (
                        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                          Enter to run
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-white/8 px-6 py-4 text-xs uppercase tracking-[0.22em] text-slate-500">
          Use arrow keys to move, Enter to execute, and Escape to dismiss.
        </div>
      </div>
    </div>
  );
}
