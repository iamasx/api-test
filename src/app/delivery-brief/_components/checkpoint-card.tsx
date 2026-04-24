import type { Checkpoint } from "../_data/delivery-brief-data";
import styles from "../delivery-brief.module.css";

const severityLabels: Record<Checkpoint["severity"], string> = {
  normal: "Normal",
  delayed: "Delayed",
  critical: "Critical",
};

const severityBadgeStyles: Record<Checkpoint["severity"], string> = {
  normal: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  delayed: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const severitySurfaceStyles: Record<Checkpoint["severity"], string> = {
  normal: styles.checkpointNormal,
  delayed: styles.checkpointDelayed,
  critical: styles.checkpointCritical,
};

type CheckpointCardProps = {
  checkpoint: Checkpoint;
};

export function CheckpointCard({ checkpoint }: CheckpointCardProps) {
  return (
    <article
      className={`${styles.checkpointCard} ${severitySurfaceStyles[checkpoint.severity]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {checkpoint.location}
          </h3>
          <p className="text-sm text-slate-300">{checkpoint.timestamp}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${severityBadgeStyles[checkpoint.severity]}`}
        >
          {severityLabels[checkpoint.severity]}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Carrier
        </p>
        <p className="mt-1 text-sm font-medium text-slate-100">
          {checkpoint.carrier}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {checkpoint.detail}
      </p>
    </article>
  );
}
