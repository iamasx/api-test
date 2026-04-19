import type { PlannedRoute } from "@/app/route-planner/route-planner-data";

type RouteSelectorProps = { onSelectRoute: (routeId: string) => void; routes: PlannedRoute[]; selectedRouteId: string };

export function RouteSelector({ onSelectRoute, routes, selectedRouteId }: RouteSelectorProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)] backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Route Set</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-950">Select a corridor and inspect its segment chain.</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {routes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <button aria-pressed={isSelected} className={`rounded-[1.5rem] border px-4 py-4 text-left transition ${isSelected ? "border-amber-300 bg-amber-50 shadow-[0_18px_45px_-32px_rgba(217,119,6,0.8)]" : "border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white"}`} key={route.id} onClick={() => onSelectRoute(route.id)} type="button">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{route.planningMode}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{route.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{route.summary}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>{route.segments.length} segments</span>
                <span>{route.dispatchLead}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
