/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Tone = "steady" | "watch" | "risk";

export interface ScenarioSummary {
  id: string;
  title: string;
  description: string;
  tone: Tone;
  likelihood: string;
  impact: string;
  keyFactors: string[];
}

export interface ComparisonNote {
  id: string;
  title: string;
  body: string;
  tone: Tone;
  relatedScenarios: string[];
}

export interface Recommendation {
  id: string;
  label: string;
  rationale: string;
  tone: Tone;
  priority: "high" | "medium" | "low";
}

export interface ScenarioExplorerView {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  scenarios: ScenarioSummary[];
  comparisons: ComparisonNote[];
  recommendations: Recommendation[];
  metrics: { label: string; value: string; detail: string }[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const scenarios: ScenarioSummary[] = [
  {
    id: "sc-1",
    title: "Steady-state growth",
    description:
      "Organic adoption continues at the current trajectory with no external disruptions. Revenue grows predictably while operational costs scale linearly.",
    tone: "steady",
    likelihood: "High",
    impact: "Moderate",
    keyFactors: [
      "Retention rate holds above 92%",
      "No major competitor launches",
      "Infrastructure costs track linearly with usage",
    ],
  },
  {
    id: "sc-2",
    title: "Accelerated expansion",
    description:
      "A partnership announcement or viral adoption event drives a 3x spike in signups over two quarters. Engineering capacity must scale faster than planned.",
    tone: "watch",
    likelihood: "Medium",
    impact: "High",
    keyFactors: [
      "Onboarding pipeline must handle 3x throughput",
      "Support staffing gap widens",
      "Database migration timeline compresses",
    ],
  },
  {
    id: "sc-3",
    title: "Market contraction",
    description:
      "Economic headwinds reduce enterprise budgets, leading to slower deal cycles and increased churn in mid-market segments.",
    tone: "risk",
    likelihood: "Low–Medium",
    impact: "High",
    keyFactors: [
      "Enterprise deal velocity drops 40%",
      "Mid-market churn rises to 8%",
      "Hiring freeze likely in Q3",
    ],
  },
  {
    id: "sc-4",
    title: "Regulatory shift",
    description:
      "New data-residency regulations require infrastructure changes in two regions. Compliance deadlines compress the roadmap for the platform team.",
    tone: "watch",
    likelihood: "Medium",
    impact: "Moderate",
    keyFactors: [
      "Data residency enforcement by end of Q4",
      "Two additional cloud regions required",
      "Legal review backlog increases",
    ],
  },
];

const comparisons: ComparisonNote[] = [
  {
    id: "cmp-1",
    title: "Growth vs. contraction staffing",
    body: "Under accelerated expansion, the hiring plan needs to front-load engineering and support roles. In a contraction scenario, the same roles face a freeze. Planning for both means keeping offer pipelines warm without over-committing headcount.",
    tone: "watch",
    relatedScenarios: ["sc-2", "sc-3"],
  },
  {
    id: "cmp-2",
    title: "Infrastructure readiness overlap",
    body: "Both the expansion and regulatory scenarios demand additional cloud regions. Prioritizing multi-region infrastructure now addresses two scenarios simultaneously and reduces duplicated effort later.",
    tone: "steady",
    relatedScenarios: ["sc-2", "sc-4"],
  },
  {
    id: "cmp-3",
    title: "Revenue sensitivity to churn",
    body: "The contraction scenario's churn impact is partially offset if steady-state retention initiatives are already in place. Investing in retention tooling is a hedge that pays off across multiple futures.",
    tone: "risk",
    relatedScenarios: ["sc-1", "sc-3"],
  },
];

const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    label: "Invest in multi-region infrastructure early",
    rationale:
      "Covers the expansion and regulatory scenarios while keeping the steady-state path low-risk. The cost is incremental and the optionality is high.",
    tone: "steady",
    priority: "high",
  },
  {
    id: "rec-2",
    label: "Maintain a flexible hiring pipeline",
    rationale:
      "Keep interview loops active without extending hard offers until demand signals are clearer. This preserves the ability to scale up or pull back within one quarter.",
    tone: "watch",
    priority: "high",
  },
  {
    id: "rec-3",
    label: "Strengthen retention and onboarding tooling",
    rationale:
      "Reduces churn risk in a downturn and absorbs growth in an upturn. A low-cost investment with compounding returns regardless of which scenario plays out.",
    tone: "steady",
    priority: "medium",
  },
  {
    id: "rec-4",
    label: "Run a quarterly scenario review",
    rationale:
      "Keeps assumptions fresh and catches early signals that shift likelihood. Avoids the trap of planning once and forgetting to adapt.",
    tone: "watch",
    priority: "low",
  },
];

/* ------------------------------------------------------------------ */
/*  View builder                                                       */
/* ------------------------------------------------------------------ */

export function getScenarioExplorerView(): ScenarioExplorerView {
  return {
    hero: {
      eyebrow: "Scenario Explorer",
      title: "Compare futures, decide now",
      description:
        "Four plausible scenarios, side-by-side comparison notes, and actionable recommendations so the team can plan with clarity instead of guessing.",
    },
    scenarios,
    comparisons,
    recommendations,
    metrics: [
      { label: "Scenarios", value: String(scenarios.length), detail: "Distinct planning futures tracked" },
      { label: "Comparisons", value: String(comparisons.length), detail: "Cross-scenario trade-off notes" },
      { label: "Recommendations", value: String(recommendations.length), detail: "Actionable next steps proposed" },
    ],
  };
}
