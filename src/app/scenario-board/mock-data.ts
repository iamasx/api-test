export type OutcomeImpact = "contained" | "elevated" | "severe"
export type ScenarioPlaybook = { id: string; title: string; intent: string; lead: string; cadence: string; checkpoint: string }
export type ScenarioAssumption = { id: string; label: string; note: string; status: "validated" | "watch" | "fragile"; initiallyActive: boolean }
export type ScenarioOutcome = { id: string; title: string; note: string; impact: OutcomeImpact; probability: "low" | "medium" | "high"; playbookIds: string[]; assumptionIds: string[] }
export type ActionPrompt = { id: string; title: string; detail: string; owner: string; window: string; playbookIds: string[]; cueIds: string[] }
export type ScenarioRecord = {
  id: string
  name: string
  summary: string
  horizon: string
  signal: string
  mode: string
  playbooks: ScenarioPlaybook[]
  assumptions: ScenarioAssumption[]
  outcomes: ScenarioOutcome[]
  prompts: ActionPrompt[]
}

export const scenarioBoardScenario: ScenarioRecord = {
  id: "atlas-freeze",
  name: "Atlas Supplier Freeze",
  summary: "A customs hold on the Atlas line is forcing the team to rebalance margin, support load, and premium promises in a 72 hour window.",
  horizon: "72 hour response window",
  signal: "Ports signal: amber",
  mode: "Containment draft",
  playbooks: [
    { id: "reroute", title: "Reroute premium loads", intent: "Preserve top-tier accounts with alternate lanes and temporary surcharge cover.", lead: "Ops desk", cadence: "Every 2 hours", checkpoint: "Needs surge carrier quotes by 14:00." },
    { id: "buffer", title: "Buffer with partial kits", intent: "Ship what is ready now, then recover fill-rate with substitution logic.", lead: "Fulfillment", cadence: "Shift change", checkpoint: "Bundle rules need finance sign-off before launch." },
    { id: "pause", title: "Pause low-margin drops", intent: "Hold the least resilient lanes to protect support and working capital.", lead: "Commercial", cadence: "Daily reset", checkpoint: "Account managers need exception scripts at open." },
  ],
  assumptions: [
    { id: "supplier-window", label: "Hold clears within 36 hours", note: "Broker team still expects a short release.", status: "validated", initiallyActive: true },
    { id: "carrier-capacity", label: "Backup carrier capacity stays above 18%", note: "Spot quotes remain available but narrow.", status: "watch", initiallyActive: true },
    { id: "support-script", label: "Support scripts absorb ETA changes", note: "New macros lower handle time on exceptions.", status: "validated", initiallyActive: true },
    { id: "surcharge-credit", label: "Finance approves temporary credits", note: "Approval has not landed for margin relief.", status: "fragile", initiallyActive: false },
  ],
  outcomes: [
    { id: "vip-green", title: "VIP orders stay green", note: "Priority accounts land inside promised windows.", impact: "contained", probability: "high", playbookIds: ["reroute"], assumptionIds: ["carrier-capacity", "support-script"] },
    { id: "margin-slip", title: "Margin slips but churn holds", note: "Credits buy retention while finance watches the week.", impact: "elevated", probability: "medium", playbookIds: ["reroute", "buffer"], assumptionIds: ["surcharge-credit"] },
    { id: "kit-backlog", title: "Kit substitutions create short backlogs", note: "Partial kits protect revenue but slow downstream assembly.", impact: "elevated", probability: "high", playbookIds: ["buffer"], assumptionIds: ["supplier-window"] },
    { id: "wholesale-stop", title: "Wholesale queues hard stop", note: "Lower-priority drops stack behind premium lanes.", impact: "severe", probability: "medium", playbookIds: ["pause"], assumptionIds: ["supplier-window"] },
    { id: "support-surge", title: "Support volume doubles overnight", note: "Inbound delay notices trigger a secondary staffing problem.", impact: "severe", probability: "high", playbookIds: ["reroute", "pause"], assumptionIds: ["support-script"] },
    { id: "friday-recovery", title: "Recovery sprint clears backlog by Friday", note: "The board can pivot back to normal cadence if enough levers hold.", impact: "contained", probability: "low", playbookIds: ["reroute", "buffer", "pause"], assumptionIds: ["supplier-window", "carrier-capacity", "surcharge-credit"] },
  ],
  prompts: [
    { id: "quote-window", title: "Lock surge carrier quotes", detail: "Close quotes before afternoon rate drift widens the reroute plan.", owner: "Ops desk", window: "Next 90 min", playbookIds: ["reroute"], cueIds: ["carrier-capacity"] },
    { id: "credit-copy", title: "Draft margin-protection copy", detail: "Align finance and account messaging before credits go live.", owner: "Revenue ops", window: "This afternoon", playbookIds: ["reroute", "buffer"], cueIds: ["surcharge-credit"] },
    { id: "kit-logic", title: "Publish substitution rules", detail: "Give floor leads the first approved bundle combinations and a red-line list.", owner: "Fulfillment", window: "Before shift handoff", playbookIds: ["buffer"], cueIds: ["supplier-window"] },
    { id: "freeze-brief", title: "Prep low-margin pause brief", detail: "Sequence the accounts that need a proactive pause note before the stop hits.", owner: "Commercial", window: "By 09:00 tomorrow", playbookIds: ["pause"], cueIds: ["support-script"] },
  ],
}
