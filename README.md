# EV Infrastructure Planner

An interactive operations-research case study exploring where, when, and how
much EV fast-charging capacity to build in the Raleigh–Durham region.

This repository rebuilds an NCSU ISE 501 class project as a reproducible,
code-first decision product. Version 1 includes a mixed-integer optimization
model, generated scenario outputs, an interactive dashboard, and a documented
portfolio narrative. Input assumptions remain illustrative while the public
data pipeline is developed.

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

For a production build:

```bash
npm run build
npm run preview
```

## Current architecture

```text
src/
  components/     Interface and storytelling components
  data/           Sites, demand zones, scenarios, and generated plans
  model/          Browser-side sensitivity logic
  App.tsx         Product workflow and state
model/
  data/           Auditable optimization inputs
  optimize.py     Multi-period mixed-integer model
archive/v0/       Original team Excel model and provenance
design/           Accepted dashboard design concept
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

Run `npm run model:test` inside the activated Python environment to validate
optimality and output reconciliation.

Planned public inputs include NREL Alternative Fuel Stations data, Census or
employment demand proxies, traffic counts, and NCDOT NEVI corridor data.

## Academic provenance

The original course workbook was produced as a team project for ISE 501 at NC
State and is preserved unchanged in [`archive/v0`](archive/v0). The archive
contains explicit team attribution and is separated from the subsequent
code-first portfolio rebuild.
