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

export interface PhasePlan {
  phase: number;
  year: number;
  sites: string[];
  portsAdded: number;
}

export interface GeneratedPlan {
  status: string;
  coverage: number;
  annualizedCost: number;
  totalCapitalCost: number;
  portsAdded: number;
  gridUpgrades: number;
  activeSiteIds: string[];
  commissionedPhase: Record<string, number>;
  portsBySite: Record<string, number>;
  upgradedSiteIds: string[];
  phasePlan: PhasePlan[];
  objectiveValue: number;
}
