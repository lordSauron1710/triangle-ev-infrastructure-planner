import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { ScenarioDefinition, ScenarioId } from "../types";

interface ScenarioControlsProps {
  scenarios: ScenarioDefinition[];
  selectedScenario: ScenarioId;
  annualCapital: number;
  maxDistance: number;
  isRunning: boolean;
  onScenarioChange: (scenario: ScenarioId) => void;
  onCapitalChange: (value: number) => void;
  onDistanceChange: (value: number) => void;
  onRun: () => void;
  onReset: () => void;
}

export function ScenarioControls({
  scenarios,
  selectedScenario,
  annualCapital,
  maxDistance,
  isRunning,
  onScenarioChange,
  onCapitalChange,
  onDistanceChange,
  onRun,
  onReset,
}: ScenarioControlsProps) {
  return (
    <aside className="controls-panel" id="scenarios">
      <div className="controls-heading">
        <div>
          <SlidersHorizontal size={17} />
          <h2>Scenario controls</h2>
        </div>
        <button type="button" className="reset-button" onClick={onReset}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <label className="field-label" htmlFor="scenario-select">
        Selected scenario
      </label>
      <select
        id="scenario-select"
        value={selectedScenario}
        onChange={(event) => onScenarioChange(event.target.value as ScenarioId)}
      >
        {scenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.name}
          </option>
        ))}
      </select>

      <div className="control-block">
        <div className="control-label">
          <label htmlFor="capital-range">Annual capital available</label>
          <output>${annualCapital}M / year</output>
        </div>
        <input
          id="capital-range"
          type="range"
          min="40"
          max="200"
          step="10"
          value={annualCapital}
          onChange={(event) => onCapitalChange(Number(event.target.value))}
        />
        <div className="range-scale">
          <span>$40M</span>
          <span>$120M</span>
          <span>$200M</span>
        </div>
      </div>

      <div className="control-block">
        <div className="control-label">
          <label htmlFor="distance-range">Maximum drive distance</label>
          <output>{maxDistance} miles</output>
        </div>
        <input
          id="distance-range"
          type="range"
          min="10"
          max="40"
          step="5"
          value={maxDistance}
          onChange={(event) => onDistanceChange(Number(event.target.value))}
        />
        <div className="range-scale">
          <span>10 mi</span>
          <span>20 mi</span>
          <span>40 mi</span>
        </div>
      </div>

      <div className="assumption">
        <span>Current assumption</span>
        <p>
          {
            scenarios.find((scenario) => scenario.id === selectedScenario)
              ?.description
          }
        </p>
      </div>

      <button
        className="primary-button run-control"
        type="button"
        onClick={onRun}
        disabled={isRunning}
      >
        {isRunning ? "Optimizing…" : "Run scenario"}
      </button>
    </aside>
  );
}
