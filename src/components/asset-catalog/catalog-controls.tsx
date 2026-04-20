import type {
  AssetAvailability,
  AvailabilityOption,
  CrewProfile,
  PlanningWindow,
  ReservationIntent,
} from "@/app/asset-catalog/mock-data";

type CatalogControlsProps = {
  activeAvailability: AssetAvailability | "all";
  activeCrewProfileId: CrewProfile["id"];
  activeIntentId: ReservationIntent["id"];
  activeWindowId: PlanningWindow["id"];
  availabilityCounts: Array<AvailabilityOption & { count: number }>;
  crewProfiles: CrewProfile[];
  flexibleMatching: boolean;
  hasFilters: boolean;
  hasPlanningChanges: boolean;
  intents: ReservationIntent[];
  onAvailabilityChange: (availability: AssetAvailability | "all") => void;
  onCrewProfileChange: (crewProfileId: CrewProfile["id"]) => void;
  onFlexibleMatchingChange: (value: boolean) => void;
  onIntentChange: (intentId: ReservationIntent["id"]) => void;
  onQueryChange: (query: string) => void;
  onResetFilters: () => void;
  onResetPlanner: () => void;
  onWindowChange: (windowId: PlanningWindow["id"]) => void;
  planCount: number;
  query: string;
  resultCount: number;
  totalCount: number;
  windows: PlanningWindow[];
};

export function CatalogControls({
  activeAvailability,
  activeCrewProfileId,
  activeIntentId,
  activeWindowId,
  availabilityCounts,
  crewProfiles,
  flexibleMatching,
  hasFilters,
  hasPlanningChanges,
  intents,
  onAvailabilityChange,
  onCrewProfileChange,
  onFlexibleMatchingChange,
  onIntentChange,
  onQueryChange,
  onResetFilters,
  onResetPlanner,
  onWindowChange,
  planCount,
  query,
  resultCount,
  totalCount,
  windows,
}: CatalogControlsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <label className="flex-1 space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Search inventory
          </span>
          <input
            aria-label="Search assets"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name, tag, zone, or kit item"
            type="search"
            value={query}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[20rem]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
            of <span className="font-semibold text-slate-900">{totalCount}</span> assets
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
            Draft reservation:{" "}
            <span className="font-semibold">
              {planCount} asset{planCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Availability filter
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            aria-pressed={activeAvailability === "all"}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
              activeAvailability === "all"
                ? "border-cyan-700 bg-cyan-950 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
            }`}
            onClick={() => onAvailabilityChange("all")}
            type="button"
          >
            Any status
          </button>
          {availabilityCounts.map((availability) => (
            <button
              key={availability.id}
              aria-pressed={activeAvailability === availability.id}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                activeAvailability === availability.id
                  ? "border-cyan-700 bg-cyan-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
              }`}
              onClick={() => onAvailabilityChange(availability.id)}
              type="button"
            >
              {availability.label} - {availability.count}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Reservation intent
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {intents.map((intent) => (
              <button
                key={intent.id}
                aria-pressed={activeIntentId === intent.id}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                  activeIntentId === intent.id
                    ? "border-cyan-700 bg-cyan-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
                }`}
                onClick={() => onIntentChange(intent.id)}
                type="button"
              >
                {intent.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use the reservation intent to bias bundle recommendations and conflict
            checks toward the type of pickup you are planning.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Pickup window
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {windows.map((window) => (
              <button
                key={window.id}
                aria-pressed={activeWindowId === window.id}
                className={`rounded-2xl border px-3.5 py-3 text-left text-sm font-medium transition ${
                  activeWindowId === window.id
                    ? "border-cyan-700 bg-cyan-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
                }`}
                onClick={() => onWindowChange(window.id)}
                type="button"
              >
                <span className="block">{window.label}</span>
                <span
                  className={`mt-1 block text-xs ${
                    activeWindowId === window.id ? "text-cyan-100" : "text-slate-500"
                  }`}
                >
                  {window.pressureLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Crew footprint
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {crewProfiles.map((crewProfile) => (
              <button
                key={crewProfile.id}
                aria-pressed={activeCrewProfileId === crewProfile.id}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                  activeCrewProfileId === crewProfile.id
                    ? "border-cyan-700 bg-cyan-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50"
                }`}
                onClick={() => onCrewProfileChange(crewProfile.id)}
                type="button"
              >
                {crewProfile.label}
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              checked={flexibleMatching}
              className="h-4 w-4 rounded border-slate-300 text-cyan-950 focus:ring-cyan-700"
              onChange={(event) => onFlexibleMatchingChange(event.target.checked)}
              type="checkbox"
            />
            <span>
              Allow flexible substitutes when the planner hits holds or existing
              reservations.
            </span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          {hasFilters ? (
            <button
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              onClick={onResetFilters}
              type="button"
            >
              Reset search and filters
            </button>
          ) : null}
          {hasPlanningChanges ? (
            <button
              className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-950 transition hover:border-cyan-300 hover:bg-cyan-100"
              onClick={onResetPlanner}
              type="button"
            >
              Reset planner
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
