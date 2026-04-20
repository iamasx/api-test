import {
  auditTrailEntries,
  auditTrailReviewFlags,
  auditTrailReviewers,
  type AuditChangeEntry,
  type AuditReviewFlag,
  type AuditReviewer,
} from "./audit-trail-data";

const numberFormatter = new Intl.NumberFormat("en-US");

const auditTrailFilters = [
  {
    id: "all",
    label: "All changes",
    description: "Every recent audit event in one chronological review stream.",
  },
  {
    id: "flagged",
    label: "Active flags",
    description: "Changes that still have open or mitigating review flags.",
  },
  {
    id: "needs-review",
    label: "Needs review",
    description: "Escalated or unresolved changes that need reviewer action.",
  },
  {
    id: "approved",
    label: "Approved",
    description: "Changes that already cleared review and are ready to archive.",
  },
] as const;

export type AuditTrailFilterId = (typeof auditTrailFilters)[number]["id"];

export type AuditTrailFilter = {
  id: AuditTrailFilterId;
  label: string;
  description: string;
  href: string;
  matchCount: number;
  isActive: boolean;
};

export type AuditTrailEntryView = {
  entry: AuditChangeEntry;
  flags: AuditReviewFlag[];
  reviewers: AuditReviewer[];
};

export type AuditTrailFlagView = {
  flag: AuditReviewFlag;
  entry: AuditChangeEntry;
  reviewer: AuditReviewer;
};

export type AuditTrailSummaryMetric = {
  label: string;
  value: string;
  note: string;
};

export type AuditTrailView = {
  requestedFilterId?: string;
  selectedFilter: AuditTrailFilter;
  filterFound: boolean;
  notice?: string;
  filters: AuditTrailFilter[];
  summaryMetrics: AuditTrailSummaryMetric[];
  entries: AuditTrailEntryView[];
  reviewFlags: AuditTrailFlagView[];
  reviewers: AuditReviewer[];
};

const validFilterIds = new Set<AuditTrailFilterId>(
  auditTrailFilters.map((filter) => filter.id),
);

const reviewerById = new Map(
  auditTrailReviewers.map((reviewer) => [reviewer.id, reviewer]),
);

const flagById = new Map(auditTrailReviewFlags.map((flag) => [flag.id, flag]));

function buildFilterHref(filterId: AuditTrailFilterId) {
  return filterId === "all" ? "/audit-trail" : `/audit-trail?view=${filterId}`;
}

function resolveEntryReviewers(entry: AuditChangeEntry) {
  return entry.reviewerIds.flatMap((reviewerId) => {
    const reviewer = reviewerById.get(reviewerId);

    return reviewer ? [reviewer] : [];
  });
}

function resolveEntryFlags(entry: AuditChangeEntry) {
  return entry.flagIds.flatMap((flagId) => {
    const flag = flagById.get(flagId);

    return flag ? [flag] : [];
  });
}

function hasActiveFlag(flags: AuditReviewFlag[]) {
  return flags.some((flag) => flag.status !== "Ready to close");
}

function matchesFilter(
  entry: AuditChangeEntry,
  flags: AuditReviewFlag[],
  filterId: AuditTrailFilterId,
) {
  switch (filterId) {
    case "all":
      return true;
    case "flagged":
      return hasActiveFlag(flags);
    case "needs-review":
      return (
        entry.reviewState === "Escalated" || entry.reviewState === "Needs review"
      );
    case "approved":
      return entry.reviewState === "Approved";
  }
}

function buildEntryViews() {
  return auditTrailEntries.map((entry) => ({
    entry,
    flags: resolveEntryFlags(entry),
    reviewers: resolveEntryReviewers(entry),
  }));
}

export function readRequestedAuditFilter(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveAuditTrailView(
  requestedFilterId?: string,
): AuditTrailView {
  const filterFound =
    requestedFilterId === undefined ||
    validFilterIds.has(requestedFilterId as AuditTrailFilterId);
  const selectedFilterId = filterFound
    ? ((requestedFilterId ?? "all") as AuditTrailFilterId)
    : "all";

  const allEntryViews = buildEntryViews();
  const entries = allEntryViews.filter(({ entry, flags }) =>
    matchesFilter(entry, flags, selectedFilterId),
  );
  const reviewFlags = entries.flatMap(({ entry, flags }) =>
    flags.flatMap((flag) => {
      const reviewer = reviewerById.get(flag.reviewerId);

      return reviewer
        ? [
            {
              flag,
              entry,
              reviewer,
            },
          ]
        : [];
    }),
  );
  const reviewerIds = new Set(
    entries.flatMap(({ reviewers }) => reviewers.map((reviewer) => reviewer.id)),
  );
  const reviewers = auditTrailReviewers.filter((reviewer) =>
    reviewerIds.has(reviewer.id),
  );
  const activeFlags = reviewFlags.filter(
    ({ flag }) => flag.status !== "Ready to close",
  );
  const escalatedChanges = entries.filter(
    ({ entry }) => entry.reviewState === "Escalated",
  );
  const filters = auditTrailFilters.map((filter) => ({
    ...filter,
    href: buildFilterHref(filter.id),
    isActive: filter.id === selectedFilterId,
    matchCount: allEntryViews.filter(({ entry, flags }) =>
      matchesFilter(entry, flags, filter.id),
    ).length,
  }));
  const selectedFilter = filters.find((filter) => filter.isActive) ?? filters[0];
  const summaryMetrics: AuditTrailSummaryMetric[] = [
    {
      label: "Visible changes",
      value: numberFormatter.format(entries.length),
      note: `${selectedFilter.label} in the current route view.`,
    },
    {
      label: "Active flags",
      value: numberFormatter.format(activeFlags.length),
      note: "Open or mitigating flags still attached to visible changes.",
    },
    {
      label: "Reviewers on deck",
      value: numberFormatter.format(reviewers.length),
      note: "Distinct reviewers connected to the current audit scope.",
    },
    {
      label: "Escalated items",
      value: numberFormatter.format(escalatedChanges.length),
      note: "Changes that still require command-level attention.",
    },
  ];

  return {
    requestedFilterId,
    selectedFilter,
    filterFound,
    notice: filterFound
      ? undefined
      : `Filter "${requestedFilterId}" was not recognized. Showing all changes instead.`,
    filters,
    summaryMetrics,
    entries,
    reviewFlags,
    reviewers,
  };
}
