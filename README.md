# EV Infrastructure Planner

An interactive operations-research case study exploring where, when, and how
much EV fast-charging capacity to build in the Raleigh–Durham region.

This repository rebuilds an NCSU ISE 501 class project as a reproducible,
code-first decision product. The current release establishes the dashboard,
scenario experience, and portfolio narrative. Its numerical outputs are
explicitly illustrative while the full mixed-integer optimization and public
data pipeline are being developed.

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
  data/           Illustrative sites, demand zones, and scenarios
  model/          Deterministic scenario engine
  App.tsx         Product workflow and state
design/           Accepted dashboard design concept
```

## Optimization roadmap

The production model will replace the illustrative engine with a reproducible
mixed-integer program:

- Binary site activation by phase
- Charger-type and port-capacity decisions
- Demand-zone-to-site allocation
- Maximum drive-distance and service constraints
- Grid-upgrade timing and site power limits
- Annual capital and construction-capacity constraints
- Charger/transformer procurement lead times
- Robust scenarios for EV adoption and interconnection delay

Planned public inputs include NREL Alternative Fuel Stations data, Census or
employment demand proxies, traffic counts, and NCDOT NEVI corridor data.

## Academic provenance

The original course report and workbook were produced as a team project for
ISE 501 at NC State. They remain in the local working archive but are excluded
from the public repository because they contain other students' work and
identifying information. This code-first rebuild is a subsequent portfolio
development effort.
