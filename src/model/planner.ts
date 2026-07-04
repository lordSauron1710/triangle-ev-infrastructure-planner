import { candidateSites } from "../data/caseStudy";
import type { PlanResult, ScenarioDefinition } from "../types";

export function runIllustrativePlan(
  scenario: ScenarioDefinition,
  annualCapital: number,
  maxDriveDistance: number,
): PlanResult {
  const capitalFactor = annualCapital / 120;
  const distanceFactor = 20 / maxDriveDistance;
  const coverageAdjustment = (capitalFactor - 1) * 8 - (distanceFactor - 1) * 7;
  const costAdjustment = 0.68 + capitalFactor * 0.32 + (distanceFactor - 1) * 0.06;

  const activeSites = candidateSites.filter((site) =>
    site.recommendedBy.includes(scenario.id),
  );

  return {
    coverage: Math.max(
      55,
      Math.min(99, Math.round(scenario.baseCoverage + coverageAdjustment)),
    ),
    annualizedCost: Math.max(
      40,
      Math.round(scenario.baseCost * costAdjustment),
    ),
    portsAdded: Math.max(
      120,
      Math.round(scenario.basePorts * (0.78 + capitalFactor * 0.22)),
    ),
    gridUpgrades: Math.max(
      3,
      Math.round(scenario.baseGridUpgrades * (0.8 + capitalFactor * 0.2)),
    ),
    activeSites,
  };
}
