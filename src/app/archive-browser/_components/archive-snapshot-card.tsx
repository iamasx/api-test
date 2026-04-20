import Link from "next/link";

import { ArchiveMetadataBadge } from "./archive-metadata-badge";
import type { ArchiveSnapshot } from "../_lib/archive-data";

const numberFormatter = new Intl.NumberFormat("en-US");

type ArchiveSnapshotCardProps = {
  snapshot: ArchiveSnapshot;
  isSelected: boolean;
};

export function ArchiveSnapshotCard({
  snapshot,
  isSelected,
}: ArchiveSnapshotCardProps) {
  return (
    <article
      aria-labelledby={`${snapshot.id}-title`}
      className={`rounded-[1.6rem] border p-5 transition ${
        isSelected
          ? "border-slate-950 bg-slate-950 text-amber-50 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
          : "border-slate-200 bg-[var(--surface-strong)] text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.07)]"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                isSelected ? "text-amber-200/80" : "text-slate-500"
              }`}
            >
              Sealed {snapshot.archivedLabel}
            </p>
            <h3
              id={`${snapshot.id}-title`}
              className="mt-2 text-2xl font-semibold tracking-tight"
            >
              {snapshot.title}
            </h3>
          </div>

          <Link
            href={`/archive-browser?snapshot=${snapshot.id}`}
            aria-current={isSelected ? "page" : undefined}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
              isSelected
                ? "bg-amber-100 text-slate-950 hover:bg-amber-200"
                : "bg-slate-950 text-amber-50 hover:bg-slate-800"
            }`}
          >
            {isSelected ? "Viewing detail" : "Inspect detail"}
          </Link>
        </div>

        <p
          className={`max-w-3xl text-sm leading-7 ${
            isSelected ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {snapshot.summary}
        </p>

        <div
          className={`grid gap-3 rounded-[1.25rem] border p-4 sm:grid-cols-3 ${
            isSelected
              ? "border-white/12 bg-white/6"
              : "border-slate-200/80 bg-white/60"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Source
            </p>
            <p className="mt-1 text-sm font-medium">{snapshot.source}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Records
            </p>
            <p className="mt-1 text-sm font-medium">
              {numberFormatter.format(snapshot.assetCount)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Footprint
            </p>
            <p className="mt-1 text-sm font-medium">
              {snapshot.storageFootprintLabel}
            </p>
          </div>
        </div>

        <p
          className={`text-sm ${
            isSelected ? "text-slate-300" : "text-slate-600"
          }`}
        >
          <span className="font-semibold">Capture window:</span>{" "}
          {snapshot.timeline}
        </p>

        <ul className="flex flex-wrap gap-2">
          {snapshot.metadataBadges.map((badge) => (
            <ArchiveMetadataBadge
              key={`${snapshot.id}-${badge.label}`}
              badge={badge}
            />
          ))}
        </ul>
      </div>
    </article>
  );
}
