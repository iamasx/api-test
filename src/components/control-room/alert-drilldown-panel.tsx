import type { Ref } from "react";
import type {
  AlertItem,
  AlertRemediationAction,
  MetricCard,
} from "@/app/control-room/mock-data";

const severityClasses = {
  info: "border-sky-300/20 bg-sky-400/10 text-sky-100",
  warning: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

const remediationToneClasses = {
  default:
    "border-white/10 bg-white/[0.04] text-slate-100 hover:border-white/20 hover:text-white",
  warning:
    "border-amber-300/20 bg-amber-400/[0.08] text-amber-50 hover:border-amber-300/28",
  critical:
    "border-rose-300/20 bg-rose-500/[0.08] text-rose-50 hover:border-rose-300/28",
};

const timelinePhaseClasses = {
  detect: "border-sky-300/18 bg-sky-400/[0.08] text-sky-100",
  stabilize: "border-cyan-300/18 bg-cyan-400/[0.08] text-cyan-100",
  mitigate: "border-amber-300/18 bg-amber-400/[0.08] text-amber-100",
  handoff: "border-emerald-300/18 bg-emerald-400/[0.08] text-emerald-100",
};

type AlertDrilldownPanelProps = {
  alert: AlertItem | null;
  isInfoSilenced: boolean;
  isSpotlighted: boolean;
  relatedMetrics: MetricCard[];
  stagedActionIds: string[];
  onRunRemediation: (action: AlertRemediationAction) => void;
  sectionRef?: Ref<HTMLElement>;
};

export function AlertDrilldownPanel({
  alert,
  isInfoSilenced,
  isSpotlighted,
  relatedMetrics,
  stagedActionIds,
  onRunRemediation,
  sectionRef,
}: AlertDrilldownPanelProps) {
  return (
    <section
      aria-label="Alert drilldown"
      className={`rounded-[2rem] border bg-slate-950/65 p-6 backdrop-blur transition sm:p-8 ${
        isSpotlighted
          ? "border-cyan-300/45 shadow-[0_0_0_1px_rgba(103,232,249,0.15),0_18px_70px_rgba(34,211,238,0.18)]"
          : "border-white/10"
      }`}
      ref={sectionRef}
      tabIndex={-1}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Alert Drilldown
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Incident context
          </h2>
        </div>
        {alert ? (
          <p className="text-sm text-slate-400">Runbook: {alert.runbook}</p>
        ) : null}
      </div>

      {!alert ? (
        <div className="mt-6 rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
          Select an alert from the queue or command palette to review context,
          related signals, and staged remediation shortcuts.
        </div>
      ) : (
        <>
          <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${severityClasses[alert.severity]}`}
                >
                  {alert.severity}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                  posture {alert.recommendedPosture}
                </span>
                {isInfoSilenced && alert.severity === "info" ? (
                  <span className="rounded-full border border-slate-400/20 bg-slate-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-200">
                    muted locally
                  </span>
                ) : null}
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {alert.ageLabel}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-white">{alert.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{alert.summary}</p>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Service
                </p>
                <p className="mt-2 text-slate-100">{alert.service}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Region
                </p>
                <p className="mt-2 text-slate-100">{alert.region}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Owner
                </p>
                <p className="mt-2 text-slate-100">{alert.owner}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Impact
                </p>
                <p className="mt-2 text-slate-100">{alert.impact}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.3rem] border border-white/8 bg-slate-950/55 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Current status
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{alert.status}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {alert.tags.map((tag) => (
                <span
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
            <div className="space-y-6">
              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Timeline context
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      Recent context chain
                    </h4>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {alert.timeline.length} events
                  </p>
                </div>

                <ol className="mt-5 space-y-3">
                  {alert.timeline.map((entry) => (
                    <li
                      className="rounded-[1.4rem] border border-white/8 bg-slate-950/55 p-4"
                      key={entry.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${timelinePhaseClasses[entry.phase]}`}
                        >
                          {entry.phase}
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          {entry.ageLabel}
                        </span>
                      </div>
                      <h5 className="mt-3 text-base font-medium text-white">
                        {entry.title}
                      </h5>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {entry.detail}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {entry.actor}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Remediation shortcuts
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      Operator shortcuts
                    </h4>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {alert.remediationActions.length} actions
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {alert.remediationActions.map((action) => {
                    const isStaged = stagedActionIds.includes(action.id);

                    return (
                      <button
                        className={`rounded-[1.4rem] border p-4 text-left transition ${remediationToneClasses[action.tone]}`}
                        key={action.id}
                        onClick={() => onRunRemediation(action)}
                        type="button"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-base font-medium">{action.label}</p>
                          {isStaged ? (
                            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                              staged
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {action.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Related signals
                </p>
                <h4 className="mt-2 text-lg font-semibold text-white">
                  Metrics in play
                </h4>
                <div className="mt-5 space-y-3">
                  {relatedMetrics.map((metric) => (
                    <div
                      className="rounded-[1.3rem] border border-white/8 bg-slate-950/55 p-4"
                      key={metric.id}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-cyan-100">{metric.delta}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Detail
                </p>
                <h4 className="mt-2 text-lg font-semibold text-white">
                  Operator note
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{alert.detail}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
