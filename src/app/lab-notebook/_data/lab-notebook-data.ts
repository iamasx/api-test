export type ExperimentStatus = "Stable" | "Watch" | "Blocked";

export type SummaryTone = "stable" | "watch" | "blocked";

export type NotebookSummaryMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: SummaryTone;
};

export type ExperimentEntry = {
  id: string;
  codename: string;
  title: string;
  objective: string;
  lead: string;
  facility: string;
  timeWindow: string;
  stage: string;
  status: ExperimentStatus;
  riskLevel: string;
  signal: string;
  summary: string;
  tags: string[];
};

export type ObservationPanel = {
  id: string;
  experimentId: string;
  title: string;
  window: string;
  recorder: string;
  focus: string;
  signalGrade: string;
  notes: string[];
  anomaly: string;
  nextCheck: string;
};

export const notebookSummaryMetrics: NotebookSummaryMetric[] = [
  {
    id: "active-runs",
    label: "Active runs",
    value: "04",
    detail: "Four notebook entries are in the current validation window.",
    tone: "stable",
  },
  {
    id: "watch-items",
    label: "Watch items",
    value: "02",
    detail: "Two observations need tighter sampling before sign-off.",
    tone: "watch",
  },
  {
    id: "blocked-dependencies",
    label: "Blocked dependencies",
    value: "01",
    detail: "One trial is waiting on a coolant manifold replacement.",
    tone: "blocked",
  },
];

export const experimentEntries: ExperimentEntry[] = [
  {
    id: "atlas-03",
    codename: "Atlas-03",
    title: "Cryogenic valve rebound study",
    objective:
      "Measure how quickly the primary valve train settles after a staged pressure release across three thermal profiles.",
    lead: "Dr. Imani Rhodes",
    facility: "East Annex / Bay 2",
    timeWindow: "06:20-09:05 IST",
    stage: "Thermal replay",
    status: "Stable",
    riskLevel: "Moderate",
    signal: "Recovery holds inside the 2.4-second rebound threshold.",
    summary:
      "The cold-start and mid-band profiles stayed within tolerance, with only a brief spike during the final warm pass.",
    tags: ["Cryogenics", "Valve train", "Replay run"],
  },
  {
    id: "morrow-12",
    codename: "Morrow-12",
    title: "Acoustic lattice interference sweep",
    objective:
      "Map resonance pockets around the lattice shell while the drone cradle cycles through transit vibration patterns.",
    lead: "Keon Alvarez",
    facility: "Hangar South / Resonance Cage",
    timeWindow: "09:40-12:15 IST",
    stage: "Frequency isolation",
    status: "Watch",
    riskLevel: "Elevated",
    signal: "Two upper-band harmonics are drifting outside the expected isolation range.",
    summary:
      "The sweep captured the expected baseline at low load, but the upper third of the band introduced inconsistent damping near the north strut.",
    tags: ["Acoustics", "Lattice shell", "Transit vibration"],
  },
  {
    id: "solace-07",
    codename: "Solace-07",
    title: "Coolant manifold endurance rehearsal",
    objective:
      "Validate manifold pressure stability through a forty-minute endurance loop before the overnight automation run.",
    lead: "Nadia Park",
    facility: "Core Loop / Service Spine",
    timeWindow: "13:10-14:45 IST",
    stage: "Preflight verification",
    status: "Blocked",
    riskLevel: "High",
    signal: "Rehearsal stopped after a replacement seal showed uneven compression on the tertiary feed.",
    summary:
      "The endurance loop cannot resume until the tertiary branch is reseated and the spare manifold arrives from central stores.",
    tags: ["Coolant", "Endurance", "Maintenance hold"],
  },
  {
    id: "verve-21",
    codename: "Verve-21",
    title: "Photonic marker persistence pass",
    objective:
      "Track marker visibility across dust-heavy chamber light shifts to confirm that the inspection rig keeps lock at range.",
    lead: "Asha Duvall",
    facility: "West Chamber / Optics Lane",
    timeWindow: "15:30-17:05 IST",
    stage: "Visibility validation",
    status: "Stable",
    riskLevel: "Low",
    signal: "Marker lock stayed above the 96% persistence target across all five chamber states.",
    summary:
      "The optics rig held strong despite particulate spikes, and the final dusk simulation exceeded the baseline from last week.",
    tags: ["Optics", "Marker tracking", "Dust simulation"],
  },
];

export const observationPanels: ObservationPanel[] = [
  {
    id: "atlas-03-obs-1",
    experimentId: "atlas-03",
    title: "Warm-pass rebound log",
    window: "08:25-08:42 IST",
    recorder: "S. Geller",
    focus: "Late-stage rebound timing",
    signalGrade: "Grade A-",
    notes: [
      "Valve four crossed the rebound threshold only once, and the spike fell back inside tolerance within two subsequent readings.",
      "Sensor condensation remained lower than the early morning run, which helped keep the pressure trace clean during the warm profile.",
      "Manual spot checks matched the automated capture within 0.03 seconds.",
    ],
    anomaly:
      "A brief overshoot appeared when the release cadence tightened below the standard interval.",
    nextCheck:
      "Repeat the warm pass with a wider cadence gap to confirm whether the overshoot is procedural rather than mechanical.",
  },
  {
    id: "morrow-12-obs-1",
    experimentId: "morrow-12",
    title: "Upper-band resonance pocket",
    window: "10:40-10:58 IST",
    recorder: "L. Moreno",
    focus: "North strut harmonic drift",
    signalGrade: "Grade B",
    notes: [
      "The north strut showed a recurring bloom near 7.2 kilohertz once the cradle switched into rough-transit simulation.",
      "The shell dampers caught the first two peaks, but the third and fourth passes rang longer than forecast.",
      "The interference map narrowed the drift zone to a single brace cluster instead of the full panel seam.",
    ],
    anomaly:
      "Harmonic decay stretched by 14% during rough-transit mode compared with the baseline sweep.",
    nextCheck:
      "Pin additional contact microphones to the brace cluster and rerun the rough-transit segment at half amplitude.",
  },
  {
    id: "morrow-12-obs-2",
    experimentId: "morrow-12",
    title: "Isolation floor comparison",
    window: "11:20-11:44 IST",
    recorder: "L. Moreno",
    focus: "Floor transfer and cage response",
    signalGrade: "Grade B+",
    notes: [
      "Floor transfer stayed flat until the final ladder step, which points back to the shell instead of the resonance cage.",
      "A temporary brace tightened the low band, but it did not fully address the upper harmonic spread.",
      "The cage response stayed within expected limits, so the current watch item remains isolated to the test article.",
    ],
    anomaly:
      "The final ladder step amplified the same band even after the temporary brace was installed.",
    nextCheck:
      "Compare the shell scan against last cycle’s pre-transport geometry model before authorizing another full-amplitude sweep.",
  },
  {
    id: "solace-07-obs-1",
    experimentId: "solace-07",
    title: "Seal compression failure note",
    window: "13:52-14:06 IST",
    recorder: "N. Park",
    focus: "Tertiary feed compression",
    signalGrade: "Grade C",
    notes: [
      "Pressure sag began on the tertiary branch eight minutes into the endurance rehearsal and widened on each loop.",
      "Thermal imaging showed a colder edge along the replacement seal, consistent with uneven seating pressure.",
      "The main loop held steady, which limits the block to the tertiary feed rather than the full manifold assembly.",
    ],
    anomaly:
      "The replacement seal compressed unevenly after repeated thermal cycling and forced an early stop.",
    nextCheck:
      "Hold the run until the spare manifold arrives, then retorque the tertiary branch and repeat the first ten minutes of the endurance loop.",
  },
  {
    id: "verve-21-obs-1",
    experimentId: "verve-21",
    title: "Dust-shift visibility notes",
    window: "16:10-16:36 IST",
    recorder: "A. Duvall",
    focus: "Marker lock through low-light dust bursts",
    signalGrade: "Grade A",
    notes: [
      "Marker lock dipped only once below 97%, and the recovery happened before the next camera handoff.",
      "The chamber’s heavier dust burst reduced contrast, but the optics rig compensated without widening the scan envelope.",
      "Operator review agreed with the automated score on all but one frame, which was later attributed to glare from a housing seam.",
    ],
    anomaly:
      "A single glare-heavy frame scored below the operator average before the lock stabilized again.",
    nextCheck:
      "Carry the same lighting profile into the overnight automation pass to verify repeatability without manual intervention.",
  },
];
