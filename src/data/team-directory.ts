export type AvailabilityStatus =
  | "Available now"
  | "Heads down"
  | "Client workshop"
  | "On-call later";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  location: string;
  timezone: string;
  availability: AvailabilityStatus;
  capacityNote: string;
  bio: string;
  skills: string[];
  focus: string[];
  roleHighlight: string;
};

export type TeamGroup = {
  id: string;
  name: string;
  summary: string;
  mission: string;
  coverage: string;
  rhythm: string;
  roleHighlights: string[];
  members: TeamMember[];
};

export type RoleHighlight = {
  label: string;
  value: string;
  description: string;
};

export const teamGroups: TeamGroup[] = [
  {
    id: "platform-command",
    name: "Platform Command",
    summary:
      "Keeps launch surfaces stable, observable, and easy to recover during high-traffic release windows.",
    mission: "Release reliability and delivery safety",
    coverage: "Austin, Bengaluru, and Singapore with overlap across every handoff window.",
    rhythm: "Daily release review at 14:00 UTC plus a standing resilience drill every Friday.",
    roleHighlights: [
      "Staff-level release guardrails",
      "SRE leadership on rollback design",
      "Product ownership for cross-team platform requests",
    ],
    members: [
      {
        id: "mara-chen",
        name: "Mara Chen",
        role: "Staff Platform Engineer",
        location: "Singapore",
        timezone: "UTC+8",
        availability: "Available now",
        capacityNote: "Open for two architecture reviews and one launch-readiness check this week.",
        bio: "Pairs with product squads on release strategy, build throughput, and fast rollback paths.",
        skills: [
          "Next.js architecture",
          "Edge caching",
          "Incident response",
          "Observability",
        ],
        focus: [
          "Hardening deployment previews for launch week",
          "Reducing false positives in release health alerts",
        ],
        roleHighlight:
          "Owns the platform scorecard used to clear every customer-facing release.",
      },
      {
        id: "luis-ortega",
        name: "Luis Ortega",
        role: "Site Reliability Lead",
        location: "Austin, Texas",
        timezone: "UTC-5",
        availability: "Heads down",
        capacityNote: "Deep in postmortem automation until Thursday afternoon.",
        bio: "Leads reliability reviews and turns incident learnings into practical runbook changes.",
        skills: [
          "Service health",
          "Runbooks",
          "Capacity planning",
          "Alert tuning",
        ],
        focus: [
          "Automating rollback verification steps",
          "Cleaning up noisy overnight alerts",
        ],
        roleHighlight:
          "Runs the weekly reliability review with engineering and support leads.",
      },
      {
        id: "priya-natarajan",
        name: "Priya Natarajan",
        role: "Platform Product Manager",
        location: "Bengaluru, India",
        timezone: "UTC+5:30",
        availability: "Available now",
        capacityNote: "Available for scoping sessions and dependency triage every morning.",
        bio: "Aligns infrastructure work with product launches and makes platform investments legible to delivery teams.",
        skills: [
          "Roadmapping",
          "Dependency mapping",
          "Stakeholder alignment",
          "Launch planning",
        ],
        focus: [
          "Sequencing observability asks for the next quarter",
          "Smoothing handoffs between product squads and platform",
        ],
        roleHighlight:
          "Translates infrastructure constraints into plans that product teams can actually schedule against.",
      },
    ],
  },
  {
    id: "experience-studio",
    name: "Experience Studio",
    summary:
      "Shapes the interface system, storytelling, and interaction details used across the product surface.",
    mission: "Design system quality and front-end craft",
    coverage: "London, Nairobi, and Warsaw with strong midday overlap for design critiques.",
    rhythm: "Twice-weekly design jam and a shared quality bar review before every release cut.",
    roleHighlights: [
      "Design leadership embedded in product reviews",
      "Senior front-end craft on component polish",
      "Narrative support for onboarding and launch content",
    ],
    members: [
      {
        id: "noor-al-hassan",
        name: "Noor Al-Hassan",
        role: "Design Systems Lead",
        location: "London, United Kingdom",
        timezone: "UTC+1",
        availability: "Client workshop",
        capacityNote: "Back online for async feedback after 16:00 local time.",
        bio: "Owns the shared component language and keeps interface updates consistent across squads.",
        skills: [
          "Design systems",
          "Accessibility",
          "Interaction design",
          "Design critique",
        ],
        focus: [
          "Refreshing card patterns for dense data surfaces",
          "Tightening color contrast for dashboard states",
        ],
        roleHighlight:
          "Sets the approval bar for new patterns before they reach the shared component library.",
      },
      {
        id: "ezra-kwambai",
        name: "Ezra Kwambai",
        role: "Senior Front-end Engineer",
        location: "Nairobi, Kenya",
        timezone: "UTC+3",
        availability: "Available now",
        capacityNote: "Good fit for implementation spikes and code review support this sprint.",
        bio: "Bridges design intent and production code, especially on responsive layouts and subtle motion.",
        skills: [
          "React UI",
          "Motion systems",
          "Performance tuning",
          "Responsive layout",
        ],
        focus: [
          "Refining navigation transitions for tablet users",
          "Reducing layout shift on profile-heavy views",
        ],
        roleHighlight:
          "Frequently steps in during release week to translate design revisions into stable production UI.",
      },
      {
        id: "hana-zielinska",
        name: "Hana Zielinska",
        role: "Content Strategist",
        location: "Warsaw, Poland",
        timezone: "UTC+2",
        availability: "Heads down",
        capacityNote: "Locked on onboarding copy work until tomorrow morning.",
        bio: "Builds naming, hierarchy, and page narratives that keep dense information easy to scan.",
        skills: [
          "Content systems",
          "Information architecture",
          "Editorial review",
          "Localization planning",
        ],
        focus: [
          "Shortening setup guidance for first-time admins",
          "Drafting reusable language for role-specific empty states",
        ],
        roleHighlight:
          "Keeps feature launches coherent when multiple teams contribute to the same experience.",
      },
    ],
  },
  {
    id: "field-operations",
    name: "Field Operations",
    summary:
      "Turns customer rollout feedback into practical fixes, enablement materials, and sharper launch support.",
    mission: "Enablement, feedback loops, and go-live support",
    coverage: "Toronto, Dubai, and Denver with strong customer-facing coverage across business hours.",
    rhythm: "Customer signal roundup every Tuesday and a go-live office hours block every Thursday.",
    roleHighlights: [
      "Solution architecture support for enterprise rollouts",
      "Success leadership focused on adoption risk",
      "QA partnership on issue reproduction and escalation paths",
    ],
    members: [
      {
        id: "omar-rahman",
        name: "Omar Rahman",
        role: "Solutions Architect",
        location: "Dubai, United Arab Emirates",
        timezone: "UTC+4",
        availability: "On-call later",
        capacityNote: "Reserved for after-hours enterprise rollout coverage tonight.",
        bio: "Works with implementation teams to de-risk launches and connect technical issues to practical workarounds.",
        skills: [
          "Enterprise rollout",
          "Technical discovery",
          "Escalation handling",
          "Systems mapping",
        ],
        focus: [
          "Preparing fallback plans for a phased customer migration",
          "Documenting edge-case integrations for support handoff",
        ],
        roleHighlight:
          "The first call when a customer rollout needs both technical depth and calm triage.",
      },
      {
        id: "tessa-morgan",
        name: "Tessa Morgan",
        role: "Customer Success Lead",
        location: "Toronto, Canada",
        timezone: "UTC-4",
        availability: "Available now",
        capacityNote: "Open for adoption risk reviews and success-plan tune-ups this afternoon.",
        bio: "Tracks readiness signals across accounts and spots the operational gaps product teams should address next.",
        skills: [
          "Adoption planning",
          "Risk review",
          "Facilitation",
          "Customer insight",
        ],
        focus: [
          "Reviewing adoption blockers from recent onboarding calls",
          "Summarizing top customer asks for the next planning cycle",
        ],
        roleHighlight:
          "Turns qualitative account feedback into concrete priorities that product and support can act on quickly.",
      },
      {
        id: "viktor-nguyen",
        name: "Viktor Nguyen",
        role: "Quality Analyst",
        location: "Denver, Colorado",
        timezone: "UTC-6",
        availability: "Client workshop",
        capacityNote: "In a defect triage session until late morning local time.",
        bio: "Helps squads reproduce field issues quickly and keeps release confidence grounded in real customer workflows.",
        skills: [
          "Exploratory testing",
          "Defect triage",
          "Reproduction notes",
          "Support QA",
        ],
        focus: [
          "Building a reusable regression checklist for profile pages",
          "Pairing with support on issue reproduction templates",
        ],
        roleHighlight:
          "Brings field issues back into engineering with clean reproduction paths and release-ready evidence.",
      },
    ],
  },
];

  {
    id: "data-insights",
    name: "Data Insights",
    summary:
      "Turns raw usage data, pipeline health metrics, and experiment results into actionable recommendations for product and engineering.",
    mission: "Analytics, experimentation, and data infrastructure",
    coverage: "Berlin, São Paulo, and Melbourne with async handoffs anchored to shared dashboards.",
    rhythm: "Weekly metrics review on Wednesday and a bi-weekly experiment readout with product leads.",
    roleHighlights: [
      "Analytics engineering ownership of key pipelines",
      "Experimentation design and statistical rigor",
      "Data platform reliability across ingestion and serving layers",
    ],
    members: [
      {
        id: "felix-braun",
        name: "Felix Braun",
        role: "Analytics Engineer",
        location: "Berlin, Germany",
        timezone: "UTC+2",
        availability: "Available now",
        capacityNote: "Open for pipeline reviews and dashboard pairing sessions this week.",
        bio: "Builds and maintains the core analytics pipelines that product teams use for daily decision-making.",
        skills: [
          "SQL modeling",
          "Pipeline orchestration",
          "Dashboard design",
          "Data quality",
        ],
        focus: [
          "Migrating legacy event streams to the new schema registry",
          "Reducing pipeline latency for real-time activation dashboards",
        ],
        roleHighlight:
          "Owns the data quality framework that gates every customer-facing metric report.",
      },
      {
        id: "camila-santos",
        name: "Camila Santos",
        role: "Data Scientist",
        location: "São Paulo, Brazil",
        timezone: "UTC-3",
        availability: "Heads down",
        capacityNote: "Deep in experiment analysis until Friday; available for async questions.",
        bio: "Designs experiments and builds statistical models that help product teams understand what moves the needle.",
        skills: [
          "Experimentation",
          "Statistical modeling",
          "Causal inference",
          "Python analytics",
        ],
        focus: [
          "Analyzing results from the onboarding flow A/B test",
          "Building a reusable sample-size calculator for the team",
        ],
        roleHighlight:
          "Provides the statistical sign-off that product teams need before shipping experiment winners.",
      },
      {
        id: "liam-park",
        name: "Liam Park",
        role: "Data Platform Engineer",
        location: "Melbourne, Australia",
        timezone: "UTC+10",
        availability: "On-call later",
        capacityNote: "On platform on-call rotation starting tomorrow morning AEST.",
        bio: "Keeps the data infrastructure reliable, fast, and cost-efficient so analysts and scientists can focus on insights.",
        skills: [
          "Data infrastructure",
          "Stream processing",
          "Cost optimization",
          "Observability",
        ],
        focus: [
          "Scaling the event ingestion layer for a traffic surge next month",
          "Automating cost anomaly detection across warehouse compute",
        ],
        roleHighlight:
          "The go-to person when a pipeline breaks at 3 AM — keeps the data flowing so dashboards stay green.",
      },
    ],
  },
];

export const featuredProfileId = "mara-chen";

export const allTeamMembers = teamGroups.flatMap((group) => group.members);

export function getFeaturedMember(groups: TeamGroup[] = teamGroups): TeamMember {
  const member = groups
    .flatMap((group) => group.members)
    .find((profile) => profile.id === featuredProfileId);

  if (!member) {
    throw new Error(`Featured member "${featuredProfileId}" was not found.`);
  }

  return member;
}

export function getDirectoryMetrics(groups: TeamGroup[] = teamGroups) {
  const members = groups.flatMap((group) => group.members);
  const timezoneCount = new Set(members.map((member) => member.timezone)).size;
  const availableNow = members.filter(
    (member) => member.availability === "Available now",
  ).length;
  const skillCounts = new Map<string, number>();

  for (const member of members) {
    for (const skill of member.skills) {
      skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1);
    }
  }

  const topSkills = [...skillCounts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }

      return left[0].localeCompare(right[0]);
    })
    .slice(0, 4)
    .map(([skill, count]) => `${skill} x${count}`);

  return {
    totalGroups: groups.length,
    totalMembers: members.length,
    availableNow,
    timezoneCount,
    topSkills,
  };
}

export function getRoleHighlights(groups: TeamGroup[] = teamGroups): RoleHighlight[] {
  const members = groups.flatMap((group) => group.members);
  const leadershipCount = members.filter((member) =>
    /Lead|Staff|Manager/.test(member.role),
  ).length;
  const makerCount = members.filter((member) =>
    /Engineer|Architect|Analyst/.test(member.role),
  ).length;
  const partnerCount = members.length - leadershipCount - makerCount;

  return [
    {
      label: "Hands-on leads",
      value: `${leadershipCount}`,
      description:
        "Leadership roles stay directly involved in reviews, rollout planning, and approval gates.",
    },
    {
      label: "Builders on deck",
      value: `${makerCount}`,
      description:
        "Implementation-heavy roles cover UI craft, reliability work, testing, and rollout engineering.",
    },
    {
      label: "Planning partners",
      value: `${partnerCount}`,
      description:
        "Product, content, and success roles keep launches aligned with adoption and communication needs.",
    },
  ];
}
