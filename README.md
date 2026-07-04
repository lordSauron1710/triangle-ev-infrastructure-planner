# EV Infrastructure Planner

A versioned operations-research portfolio case study about EV charging
infrastructure planning.

The repository preserves the original NC State ISE 501 Excel model as v0 and
shows how it evolved into a reproducible, code-first decision product in v1.
The two experiences are deliberately separate but share one React application.

## Version map

| Route | Experience | Purpose |
| --- | --- | --- |
| `/v0` | Original model walkthrough | Explain the Excel Solver prototype, formulation, historical scenarios, and lessons |
| `/v1` | Interactive planner | Explore the rebuilt geographic, grid-aware planning model |
| `/` | v1 alias | Preserve the original dashboard entry route |

The unchanged team workbook and full attribution remain in
[`archive/v0`](archive/v0).

## Product story

Infrastructure planners must balance four competing concerns:

- Geographic demand coverage
- Charging and grid capacity
- Annual capital availability
- Equipment and interconnection lead times

The dashboard makes those trade-offs visible through an interactive network
map, scenario controls, cost-versus-coverage comparison, and phased rollout.

## Run locally

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:5173/v0`
- `http://localhost:5173/v1`

For a production build:

```bash
npm run build
npm run preview
```

## Current architecture

```text
src/
  app/             Router and route-level loading
  versions/
    v0/            Excel-model walkthrough, interactions, and styles
    v1/            Interactive planner, data, and sensitivity logic
model/
  data/           Auditable optimization inputs
  optimize.py     Multi-period mixed-integer model
archive/v0/       Original team Excel model and provenance
design/           Accepted v0 and v1 design concepts
```

## Optimization model

The v1 mixed-integer program includes:

- Binary site activation by phase
- Charger-type and port-capacity decisions
- Demand-zone-to-site allocation
- Maximum drive-distance and service constraints
- Grid-upgrade timing and site power limits
- Annual capital and construction-capacity constraints
- Charger/transformer procurement lead times
- Robust scenarios for EV adoption and interconnection delay

Run it with:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r model/requirements.txt
python model/optimize.py
```

Run `npm run verify` inside the activated Python environment to validate model
optimality, generated-output reconciliation, TypeScript, and the production
build.

Planned public inputs include NREL Alternative Fuel Stations data, Census or
employment demand proxies, traffic counts, and NCDOT NEVI corridor data.

## Academic provenance

The original course workbook was produced by Sandeep Vangara, Raveena
Rajeswari Pandiyaraj, Astha Pund, Saumitra Ranjan, and Syed Aakif Zaid for ISE
501 at NC State. It is preserved unchanged in [`archive/v0`](archive/v0). The
v0 website presents it as a historical prototype—not as a validated facility
location study or as Sandeep's individual work.
