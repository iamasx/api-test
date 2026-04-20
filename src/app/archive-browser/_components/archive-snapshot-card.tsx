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
      className={`rounded-[1.75rem] border p-5 ${
        isSelected
          ? "border-slate-900 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                isSelected ? "text-amber-200/80" : "text-slate-500"
              }`}
            >
              {snapshot.label}
            </p>
            <h3
              id={`${snapshot.id}-title`}
              className="text-2xl font-semibold tracking-tight"
            >
              {snapshot.title}
            </h3>
            <p
              className={`text-sm ${
                isSelected ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Sealed {snapshot.archivedLabel}
            </p>
          </div>

          <Link
            href={`/archive-browser?snapshot=${snapshot.id}`}
            aria-current={isSelected ? "page" : undefined}
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              isSelected
                ? "bg-amber-100 text-slate-950"
                : "bg-slate-950 text-amber-50"
            }`}
          >
            {isSelected ? "Viewing detail" : "Open detail"}
          </Link>
        </div>

        <p
          className={`text-sm leading-7 ${
            isSelected ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {snapshot.summary}
        </p>

        <div
          className={`grid gap-3 rounded-[1.25rem] border p-4 sm:grid-cols-3 ${
            isSelected
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
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
              Assets
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

        <div className="flex flex-wrap gap-2">
          {snapshot.tags.map((tag) => (
            <span
              key={`${snapshot.id}-${tag}`}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isSelected
                  ? "bg-white/10 text-slate-100"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`rounded-[1.25rem] border p-4 ${
            isSelected
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Status
          </p>
          <p className="mt-2 text-sm font-medium">{snapshot.status}</p>
          <p
            className={`mt-2 text-sm ${
              isSelected ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Capture window: {snapshot.captureRange}
          </p>
        </div>

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
