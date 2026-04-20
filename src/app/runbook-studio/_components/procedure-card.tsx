import type { RunbookProcedure } from "../_data/runbook-studio-data";
import styles from "../runbook-studio.module.css";

type ProcedureCardProps = {
  procedure: RunbookProcedure;
};

function getRunbookStatusLabel(status: RunbookProcedure["status"]) {
  switch (status) {
    case "active":
      return "Active";
    case "approved":
      return "Approved";
    case "draft":
      return "Draft";
    default:
      return status;
  }
}

function getRunbookCardClass(status: RunbookProcedure["status"]) {
  switch (status) {
    case "active":
      return styles.runbookActive;
    case "approved":
      return styles.runbookApproved;
    case "draft":
      return styles.runbookDraft;
    default:
      return "";
  }
}

function getRunbookStatusBadgeClass(status: RunbookProcedure["status"]) {
  switch (status) {
    case "active":
      return styles.stateBadgeActive;
    case "approved":
      return styles.stateBadgeApproved;
    case "draft":
      return styles.stateBadgeDraft;
    default:
      return "";
  }
}

function getRevisionStateLabel(state: RunbookProcedure["revision"]["state"]) {
  switch (state) {
    case "published":
      return "Published";
    case "approval":
      return "Approval queue";
    case "editing":
      return "Editing";
    default:
      return state;
  }
}

function getRevisionStateClass(state: RunbookProcedure["revision"]["state"]) {
  switch (state) {
    case "published":
      return styles.revisionPublished;
    case "approval":
      return styles.revisionApproval;
    case "editing":
      return styles.revisionEditing;
    default:
      return "";
  }
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <article
      aria-labelledby={`${procedure.id}-title`}
      className={`${styles.procedureCard} ${getRunbookCardClass(procedure.status)} rounded-[1.6rem] border p-6`}
      data-runbook-status={procedure.status}
      role="listitem"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              <span
                className={`${styles.stateBadge} ${styles.neutralBadge} rounded-full border border-slate-300 px-2.5 py-1`}
              >
                {procedure.code}
              </span>
              <span
                className={`${styles.stateBadge} ${getRunbookStatusBadgeClass(procedure.status)} rounded-full border px-2.5 py-1`}
              >
                {getRunbookStatusLabel(procedure.status)}
              </span>
              <span
                className={`${styles.stateBadge} ${styles.neutralBadge} rounded-full border border-slate-300 px-2.5 py-1`}
              >
                {procedure.priority}
              </span>
            </div>
            <div>
              <h3
                id={`${procedure.id}-title`}
                className="text-2xl font-semibold tracking-tight text-slate-950"
              >
                {procedure.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                {procedure.summary}
              </p>
            </div>
          </div>

          <div
            className={`${styles.revisionCard} min-w-52 rounded-[1.25rem] border border-slate-200 px-4 py-4`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Revision
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">
              {procedure.revision.version}
            </p>
            <p className="mt-2">
              <span
                className={`${styles.revisionState} ${getRevisionStateClass(procedure.revision.state)}`}
              >
                {getRevisionStateLabel(procedure.revision.state)}
              </span>
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Edited by {procedure.revision.editor}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Reviewed by {procedure.revision.reviewer}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Updated {procedure.revision.updatedAt}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Objective
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {procedure.objective}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Revision notes
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {procedure.revision.summary}
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {procedure.revision.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 leading-6"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`${styles.detailPanel} rounded-[1.3rem] border border-slate-200 px-4 py-4`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Execution preview
              </p>
              <dl className="mt-3 grid gap-3 text-sm text-slate-600">
                <div>
                  <dt className="font-semibold text-slate-950">Owner</dt>
                  <dd className="mt-1">{procedure.owner}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">Target window</dt>
                  <dd className="mt-1">{procedure.execution.targetWindow}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">
                    Expected duration
                  </dt>
                  <dd className="mt-1">{procedure.execution.expectedDuration}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950">
                    Verification signal
                  </dt>
                  <dd className="mt-1">{procedure.execution.verification}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Dependencies
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                {procedure.dependencies.map((dependency) => (
                  <li
                    key={dependency}
                    className={`${styles.tagChip} rounded-full border border-slate-200 px-3 py-2`}
                  >
                    {dependency}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Outputs
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {procedure.execution.outputs.map((output) => (
                  <li
                    key={output}
                    className={`${styles.tagChip} rounded-2xl border border-slate-200 px-3 py-3 leading-6`}
                  >
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
