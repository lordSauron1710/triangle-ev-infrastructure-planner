# Version 1 optimization model

The v1 model is a multi-period mixed-integer linear program implemented with
[PuLP](https://coin-or.github.io/pulp/).

## Decisions

- Candidate site commissioning phase
- Charging ports added by site and phase
- Grid upgrades by site and phase
- Demand-zone allocation to eligible sites
- Unserved demand

## Constraints

- One-time site commissioning and persistent availability
- Geographic eligibility based on maximum drive distance
- Site, port, and grid capacity
- Annual capital and construction throughput
- Grid-upgrade lead time
- Demand balance in every planning phase

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r model/requirements.txt
python model/optimize.py
```

The solver writes versioned scenario outputs to
`src/data/generatedPlans.json`, which the dashboard imports at build time.

The current input dataset is deliberately transparent and illustrative. Public
NREL, Census, traffic, utility, and NCDOT inputs will replace these assumptions
in a subsequent data release.
