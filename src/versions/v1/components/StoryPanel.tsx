import { ArrowRight, BookOpen, Play } from "lucide-react";
import type { ScenarioDefinition, ScenarioId } from "../types";

interface StoryPanelProps {
  scenarios: ScenarioDefinition[];
  selectedScenario: ScenarioId;
  onScenarioChange: (scenario: ScenarioId) => void;
  onRun: () => void;
}

export function StoryPanel({
  scenarios,
  selectedScenario,
  onScenarioChange,
  onRun,
}: StoryPanelProps) {
  return (
    <section className="story-panel">
      <div>
        <h1>Where should the Triangle build next?</h1>
        <p className="story-lede">
          A phased, grid-aware charging plan for Raleigh–Durham.
        </p>
        <div className="story-actions">
          <button className="primary-button" type="button" onClick={onRun}>
            <Play size={16} fill="currentColor" />
            Run scenario
          </button>
          <a className="secondary-button" href="#method">
            <BookOpen size={16} />
            View methodology
          </a>
        </div>
      </div>

      <div className="scenario-picker" aria-label="Scenario selection">
        <h2>Scenario</h2>
        <div className="scenario-options">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={selectedScenario === scenario.id ? "selected" : ""}
              onClick={() => onScenarioChange(scenario.id)}
              aria-pressed={selectedScenario === scenario.id}
            >
              <span>{scenario.shortName}</span>
              {selectedScenario === scenario.id && (
                <ArrowRight size={15} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="model-note">
        <span>Case-study objective</span>
        <p>
          Maximize demand coverage while sequencing capital, charging ports,
          and grid upgrades over four deployment phases.
        </p>
      </div>
    </section>
  );
}
