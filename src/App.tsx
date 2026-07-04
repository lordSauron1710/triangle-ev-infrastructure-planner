import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { DecisionEvidence } from "./components/DecisionEvidence";
import { DeploymentTimeline } from "./components/DeploymentTimeline";
import { Header } from "./components/Header";
import { MetricsStrip } from "./components/MetricsStrip";
import { NetworkMap } from "./components/NetworkMap";
import { ScenarioControls } from "./components/ScenarioControls";
import { StoryPanel } from "./components/StoryPanel";
import { TradeoffChart } from "./components/TradeoffChart";
import { scenarios } from "./data/caseStudy";
import { runIllustrativePlan } from "./model/planner";
import type { ScenarioId } from "./types";

export default function App() {
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioId>("baseline");
  const [annualCapital, setAnnualCapital] = useState(120);
  const [maxDistance, setMaxDistance] = useState(20);
  const [appliedCapital, setAppliedCapital] = useState(120);
  const [appliedDistance, setAppliedDistance] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const scenario =
    scenarios.find((item) => item.id === selectedScenario) ?? scenarios[0];

  const result = useMemo(
    () => runIllustrativePlan(scenario, appliedCapital, appliedDistance),
    [scenario, appliedCapital, appliedDistance],
  );

  const runScenario = () => {
    setIsRunning(true);
    setShowConfirmation(false);
    window.setTimeout(() => {
      setAppliedCapital(annualCapital);
      setAppliedDistance(maxDistance);
      setIsRunning(false);
      setShowConfirmation(true);
    }, 550);
  };

  const reset = () => {
    setSelectedScenario("baseline");
    setAnnualCapital(120);
    setMaxDistance(20);
    setAppliedCapital(120);
    setAppliedDistance(20);
    setShowConfirmation(false);
  };

  return (
    <>
      <Header />
      <main id="overview">
        <div className="primary-layout">
          <StoryPanel
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            onScenarioChange={setSelectedScenario}
            onRun={runScenario}
          />
          <NetworkMap sites={result.activeSites} />
          <ScenarioControls
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            annualCapital={annualCapital}
            maxDistance={maxDistance}
            isRunning={isRunning}
            onScenarioChange={setSelectedScenario}
            onCapitalChange={setAnnualCapital}
            onDistanceChange={setMaxDistance}
            onRun={runScenario}
            onReset={reset}
          />
        </div>

        <MetricsStrip result={result} />

        <div className="analysis-layout">
          <DecisionEvidence />
          <TradeoffChart
            scenarios={scenarios}
            selectedScenario={selectedScenario}
          />
          <DeploymentTimeline />
        </div>

        <section className="method-section" id="method">
          <div>
            <h2>From classroom model to decision product</h2>
            <p>
              The rebuild separates source data, scenario assumptions, model
              logic, and presentation. The current release uses a deterministic
              illustrative engine so the interface and decision narrative can
              be tested before connecting the full mixed-integer optimization.
            </p>
          </div>
          <ol>
            <li>
              <strong>Locate</strong>
              Candidate sites and demand zones
            </li>
            <li>
              <strong>Optimize</strong>
              Capital, capacity, coverage, and grid timing
            </li>
            <li>
              <strong>Explain</strong>
              Trade-offs, phases, and managerial implications
            </li>
          </ol>
        </section>
      </main>

      {showConfirmation && (
        <div className="confirmation" role="status">
          <CheckCircle2 size={18} />
          Scenario updated
        </div>
      )}
    </>
  );
}
