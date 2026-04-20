import type { HealthState } from "../_data/status-board-data";

export const healthStateLabels: Record<HealthState, string> = {
  healthy: "Healthy",
  warning: "Warning",
  degraded: "Degraded",
};

export const summaryStateStyles: Record<
  HealthState,
  { panel: string; badge: string; value: string }
> = {
  healthy: {
    panel: "border-emerald-200 bg-emerald-50/80",
    badge: "border-emerald-300 bg-emerald-100 text-emerald-800",
    value: "text-emerald-950",
  },
  warning: {
    panel: "border-amber-200 bg-amber-50/80",
    badge: "border-amber-300 bg-amber-100 text-amber-900",
    value: "text-amber-950",
  },
  degraded: {
    panel: "border-rose-200 bg-rose-50/85",
    badge: "border-rose-300 bg-rose-100 text-rose-900",
    value: "text-rose-950",
  },
};

export const serviceStateStyles: Record<
  HealthState,
  { panel: string; badge: string; accent: string }
> = {
  healthy: {
    panel: "border-emerald-200/90 bg-white/85",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    accent: "bg-emerald-500",
  },
  warning: {
    panel: "border-amber-200/90 bg-white/85",
    badge: "border-amber-200 bg-amber-50 text-amber-900",
    accent: "bg-amber-500",
  },
  degraded: {
    panel: "border-rose-200/90 bg-white/85",
    badge: "border-rose-200 bg-rose-50 text-rose-900",
    accent: "bg-rose-500",
  },
};
