export type ScenarioId =
  | "baseline"
  | "accelerated"
  | "grid-delay"
  | "capital-constrained";

export interface CandidateSite {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  existingPorts: number;
  recommendedBy: ScenarioId[];
  phase: number;
  addedPorts: number;
  gridUpgrade: "Low" | "Medium" | "High";
}

export interface ScenarioDefinition {
  id: ScenarioId;
  name: string;
  shortName: string;
  description: string;
  baseCoverage: number;
  baseCost: number;
  basePorts: number;
  baseGridUpgrades: number;
  insight: string;
}

export interface PlanResult {
  coverage: number;
  annualizedCost: number;
  portsAdded: number;
  gridUpgrades: number;
  activeSites: CandidateSite[];
}
