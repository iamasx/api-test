"use client";

import { useState } from "react";

const postureOptions = ["monitor", "contain", "escalate"] as const;
const clock = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function QuickActions() {
  const [freezeDeploys, setFreezeDeploys] = useState(true);
  const [divertWorkers, setDivertWorkers] = useState(false);
  const [samplingRate, setSamplingRate] = useState(72);
  const [posture, setPosture] = useState<(typeof postureOptions)[number]>("contain");
  const [lastAction, setLastAction] = useState("Awaiting operator input. Controls are browser-only.");

  function stageAction(label: string) {
    setLastAction(`${label} staged at ${clock.format(new Date())}. No request sent.`);
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Quick Actions</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Drill controls</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">Dummy controls for staging operator intent. State stays local to this panel.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          aria-pressed={freezeDeploys}
          className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${freezeDeploys ? "border-amber-300/30 bg-amber-400/12 text-amber-100" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
          onClick={() => setFreezeDeploys((value) => !value)}
          type="button"
        >
          Freeze deploy lane
        </button>
        <button
          aria-pressed={divertWorkers}
          className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${divertWorkers ? "border-emerald-300/25 bg-emerald-400/12 text-emerald-100" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
          onClick={() => setDivertWorkers((value) => !value)}
          type="button"
        >
          Divert background workers
        </button>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Incident posture</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {postureOptions.map((option) => {
            const isActive = posture === option;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm capitalize ${isActive ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.04] text-slate-300"}`}
                key={option}
                onClick={() => setPosture(option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-6 block text-sm text-slate-300">
        Event sampling: <span className="text-white">{samplingRate}%</span>
        <input
          className="mt-3 w-full accent-cyan-300"
          max={100}
          min={10}
          onChange={(event) => setSamplingRate(Number(event.target.value))}
          type="range"
          value={samplingRate}
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950"
          onClick={() => stageAction("Dry failover")}
          type="button"
        >
          Run dry failover
        </button>
        <button
          className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-200"
          onClick={() => stageAction("Info alert silence")}
          type="button"
        >
          Silence info alerts
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em]">
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{freezeDeploys ? "deploys frozen" : "deploys open"}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{divertWorkers ? "workers diverted" : "workers normal"}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">posture {posture}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{lastAction}</p>
      </div>
    </section>
  );
}
