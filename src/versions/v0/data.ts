export type ScenarioKey = "A" | "B" | "C" | "D";

export interface V0Scenario {
  key: ScenarioKey;
  shortName: string;
  name: string;
  change: string;
  total: number;
  installation: number;
  operating: number;
  expansion: number;
}

export const v0Scenarios: V0Scenario[] = [
  {
    key: "A",
    shortName: "Baseline",
    name: "Baseline",
    change: "Original demand, cost, and capacity assumptions.",
    total: 648350,
    installation: 540000,
    operating: 72350,
    expansion: 36000,
  },
  {
    key: "B",
    shortName: "Demand + cost",
    name: "Increased demand and operating cost",
    change: "Demand +20–30%; operating cost +10–15%.",
    total: 481550,
    installation: 340000,
    operating: 108050,
    expansion: 33500,
  },
  {
    key: "C",
    shortName: "Capacity + expansion",
    name: "Reduced capacity and higher expansion cost",
    change: "Capacity −20–30%; expansion cost +20%.",
    total: 515250,
    installation: 410000,
    operating: 79330,
    expansion: 25920,
  },
  {
    key: "D",
    shortName: "Demand + capacity",
    name: "Higher demand and reduced capacity",
    change: "Demand +15–20%; capacity −15–20%.",
    total: 670260,
    installation: 540000,
    operating: 96900,
    expansion: 33360,
  },
];

export const baselineRows = [
  { location: "Location 1", installed: [1, 1, 1], allocated: [10, 12, 15], added: [10, 2, 3] },
  { location: "Location 2", installed: [1, 1, 1], allocated: [15, 18, 20], added: [15, 3, 2] },
  { location: "Location 3", installed: [1, 1, 1], allocated: [20, 25, 30], added: [20, 5, 5] },
];

export const formulationRows = [
  {
    title: "Demand satisfaction",
    summary: "Meet demand at every location and period.",
    equation: "Yⱼₜ ≥ Dⱼₜ",
    detail:
      "Allocated ports must be at least the projected demand for that location in each planning period.",
  },
  {
    title: "Site capacity",
    summary: "Allocated ports cannot exceed installed capacity.",
    equation: "Yⱼₜ ≤ MⱼXⱼₜ",
    detail:
      "A location can carry ports only when its station variable is active, and allocation stays below the site maximum.",
  },
  {
    title: "Port balance",
    summary: "Ports evolve through additions over time.",
    equation: "Yⱼₜ = Yⱼ,ₜ₋₁ + Zⱼₜ",
    detail:
      "The intended balance links the current port count to the previous period plus newly added ports.",
  },
  {
    title: "Decision domains",
    summary: "Station decisions are binary; port decisions are integer.",
    equation: "Xⱼₜ ∈ {0,1}; Yⱼₜ, Zⱼₜ ∈ ℤ₊",
    detail:
      "This combination makes the intended formulation a mixed-integer linear program.",
  },
];
