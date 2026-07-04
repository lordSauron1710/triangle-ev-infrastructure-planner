import { candidateSites, generatedPlans } from "../data/caseStudy";
import type { PlanResult, ScenarioDefinition } from "../types";

export function runScenarioPlan(
  scenario: ScenarioDefinition,
  annualCapital: number,
  maxDriveDistance: number,
): PlanResult {
  const capitalFactor = annualCapital / 120;
  const distanceFactor = 20 / maxDriveDistance;
  const coverageAdjustment = (capitalFactor - 1) * 8 - (distanceFactor - 1) * 7;
  const costAdjustment = 0.68 + capitalFactor * 0.32 + (distanceFactor - 1) * 0.06;

  const solvedPlan = generatedPlans[scenario.id];
  const activeSites = candidateSites
    .filter((site) => solvedPlan.activeSiteIds.includes(site.id))
    .map((site) => ({
      ...site,
      phase: solvedPlan.commissionedPhase[site.id],
      addedPorts: solvedPlan.portsBySite[site.id] ?? 0,
      gridUpgrade: solvedPlan.upgradedSiteIds.includes(site.id)
        ? ("High" as const)
        : site.gridUpgrade,
    }));

  return {
    coverage: Math.max(
      55,
      Math.min(100, Math.round(scenario.baseCoverage + coverageAdjustment)),
    ),
    annualizedCost: Math.max(
      5,
      Math.round(scenario.baseCost * costAdjustment),
    ),
    portsAdded: Math.max(
      0,
      Math.round(scenario.basePorts * (0.78 + capitalFactor * 0.22)),
    ),
    gridUpgrades: Math.max(
      0,
      Math.round(scenario.baseGridUpgrades * (0.8 + capitalFactor * 0.2)),
    ),
    activeSites,
  };
}
