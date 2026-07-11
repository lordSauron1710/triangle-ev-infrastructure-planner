export type ScenarioKey = "A" | "B" | "C" | "D";

export interface V0Scenario {
  key: ScenarioKey;
  shortName: string;
  name: string;
  change: string;
  reportNote: string;
  total: number;
  installation: number;
  operating: number;
  expansion: number;
  portsAllocated: number;
  portsAdded: number;
  source: string;
}

export const v0Scenarios: V0Scenario[] = [
  {
    key: "A",
    shortName: "Baseline",
    name: "Baseline",
    change: "Baseline demand, cost, and capacity assumptions.",
    reportNote:
      "Balanced installation, operation, and expansion costs with gradual port additions as demand rises.",
    total: 648350,
    installation: 540000,
    operating: 72350,
    expansion: 36000,
    portsAllocated: 165,
    portsAdded: 30,
    source: "Workbook Sheet3 rows 34–35 and 48–60",
  },
  {
    key: "B",
    shortName: "Demand + cost",
    name: "Increased demand and operating cost",
    change: "Demand +20–30%; operating cost +10–15%.",
    reportNote:
      "The recorded cost is lower than baseline, but two saved station-period rows allocate ports while the station variable is inactive. Treat this result as a sensitivity output that requires feasibility validation.",
    total: 481550,
    installation: 340000,
    operating: 108050,
    expansion: 33500,
    portsAllocated: 215,
    portsAdded: 30,
    source: "Workbook Sheet3 rows 37–38 and 62–74",
  },
  {
    key: "C",
    shortName: "Capacity + expansion",
    name: "Reduced capacity and higher expansion cost",
    change: "Capacity −20–30%; expansion cost +20%.",
    reportNote:
      "Reduced capacity and higher expansion cost produce a recorded total below the baseline result.",
    total: 515250,
    installation: 410000,
    operating: 79330,
    expansion: 25920,
    portsAllocated: 159,
    portsAdded: 20,
    source: "Workbook Sheet3 rows 40–41 and 76–88",
  },
  {
    key: "D",
    shortName: "Demand + capacity",
    name: "Higher demand and reduced capacity",
    change: "Demand +15–20%; capacity −15–20%.",
    reportNote:
      "The highest recorded total cost appears when demand pressure and reduced capacity occur together.",
    total: 670260,
    installation: 540000,
    operating: 96900,
    expansion: 33360,
    portsAllocated: 189,
    portsAdded: 25,
    source: "Workbook Sheet3 rows 43–44 and 90–102",
  },
];

export const modelInputs = [
  {
    location: "Location 1",
    installationCost: 50000,
    operatingCost: 500,
    expansionCost: 1000,
    maxCapacity: 20,
  },
  {
    location: "Location 2",
    installationCost: 60000,
    operatingCost: 450,
    expansionCost: 1200,
    maxCapacity: 25,
  },
  {
    location: "Location 3",
    installationCost: 70000,
    operatingCost: 400,
    expansionCost: 1500,
    maxCapacity: 30,
  },
];

export const demandByPeriod = [
  { period: "Period 1", location1: 10, location2: 15, location3: 20 },
  { period: "Period 2", location1: 12, location2: 18, location3: 25 },
  { period: "Period 3", location1: 15, location2: 20, location3: 30 },
];

export const baselineRows = [
  { location: "Location 1", installed: [1, 1, 1], allocated: [10, 12, 15], added: [10, 2, 3] },
  { location: "Location 2", installed: [1, 1, 1], allocated: [15, 18, 20], added: [0, 3, 2] },
  { location: "Location 3", installed: [1, 1, 1], allocated: [20, 25, 30], added: [0, 5, 5] },
];

export const formulationRows = [
  {
    title: "Initial period",
    summary: "Initial allocation equals initial additions.",
    equation: "Yⱼ₁ = Zⱼ₁",
    detail:
      "The report states that ports available in the first period must be introduced as first-period additions. The saved baseline output does not preserve this condition for every location, which is noted in planned validation work.",
  },
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

export const sourceNotes = [
  "Problem framing and formulation: Project Report, Abstract through Problem Description and Mathematical Formulation.",
  "Input cost, capacity, and demand tables: Workbook Sheet3 rows 1–5 and Project Report Dataset section.",
  "Scenario cost outputs: Workbook Sheet3 rows 29, 32, 35, and 38; summary rows 41–44.",
  "Scenario parameter changes: Workbook Sheet3 rows 41–44 and Project Report Numerical Study section.",
  "Validation and persistence improvements: limitations identified by comparing the report formulation with the workbook's saved outputs.",
  "Renewable integration, government incentives, and dynamic pricing: Project Report future-work paragraph.",
];
