from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Any

import pulp


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = Path(__file__).parent / "data" / "case_study.json"
DEFAULT_OUTPUT = ROOT / "src" / "versions" / "v1" / "data" / "generatedPlans.json"


def miles_between(lat_1: float, lng_1: float, lat_2: float, lng_2: float) -> float:
    radius_miles = 3958.8
    phi_1, phi_2 = math.radians(lat_1), math.radians(lat_2)
    delta_phi = math.radians(lat_2 - lat_1)
    delta_lambda = math.radians(lng_2 - lng_1)
    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi_1) * math.cos(phi_2) * math.sin(delta_lambda / 2) ** 2
    )
    return 2 * radius_miles * math.asin(math.sqrt(a))


def solve_scenario(data: dict[str, Any], scenario: dict[str, Any]) -> dict[str, Any]:
    sites = data["sites"]
    zones = data["demand_zones"]
    phases = range(len(data["planning_phases"]))
    site_ids = [site["id"] for site in sites]
    zone_ids = [zone["id"] for zone in zones]
    site_by_id = {site["id"]: site for site in sites}
    zone_by_id = {zone["id"]: zone for zone in zones}

    distance = {
        (zone["id"], site["id"]): miles_between(
            zone["lat"], zone["lng"], site["lat"], site["lng"]
        )
        for zone in zones
        for site in sites
    }
    eligible = {
        (zone_id, site_id)
        for zone_id in zone_ids
        for site_id in site_ids
        if distance[(zone_id, site_id)] <= scenario["max_drive_miles"]
    }
    demand = {
        (zone["id"], phase): (
            zone["final_demand"]
            * data["demand_growth_by_phase"][phase]
            * scenario["demand_multiplier"]
        )
        for zone in zones
        for phase in phases
    }

    model = pulp.LpProblem(f"ev_infrastructure_{scenario['id']}", pulp.LpMinimize)

    open_site = pulp.LpVariable.dicts(
        "open", (site_ids, phases), lowBound=0, upBound=1, cat=pulp.LpBinary
    )
    add_ports = pulp.LpVariable.dicts(
        "ports", (site_ids, phases), lowBound=0, cat=pulp.LpInteger
    )
    upgrade = pulp.LpVariable.dicts(
        "upgrade", (site_ids, phases), lowBound=0, upBound=1, cat=pulp.LpBinary
    )
    served = {
        (zone_id, site_id, phase): pulp.LpVariable(
            f"served_{zone_id}_{site_id}_{phase}", lowBound=0
        )
        for zone_id, site_id in eligible
        for phase in phases
    }
    unserved = pulp.LpVariable.dicts(
        "unserved", (zone_ids, phases), lowBound=0
    )

    capital_cost = pulp.lpSum(
        site_by_id[site_id]["fixed_cost_m"] * open_site[site_id][phase]
        + site_by_id[site_id]["port_cost_m"] * add_ports[site_id][phase]
        + site_by_id[site_id]["grid_cost_m"] * upgrade[site_id][phase]
        for site_id in site_ids
        for phase in phases
    )
    travel_cost = pulp.lpSum(
        0.018 * distance[(zone_id, site_id)] * served[(zone_id, site_id, phase)]
        for zone_id, site_id in eligible
        for phase in phases
    )
    unmet_cost = pulp.lpSum(
        8.0 * unserved[zone_id][phase]
        for zone_id in zone_ids
        for phase in phases
    )
    model += capital_cost + travel_cost + unmet_cost

    for site_id in site_ids:
        model += pulp.lpSum(open_site[site_id][phase] for phase in phases) <= 1
        model += pulp.lpSum(upgrade[site_id][phase] for phase in phases) <= 1

        for phase in phases:
            active = pulp.lpSum(
                open_site[site_id][prior_phase]
                for prior_phase in phases
                if prior_phase <= phase
            )
            cumulative_ports = pulp.lpSum(
                add_ports[site_id][prior_phase]
                for prior_phase in phases
                if prior_phase <= phase
            )
            cumulative_upgrades = pulp.lpSum(
                upgrade[site_id][prior_phase]
                for prior_phase in phases
                if prior_phase <= phase
            )
            site = site_by_id[site_id]

            model += cumulative_ports <= site["max_ports"] * active
            model += (
                site["existing_ports"] * active + cumulative_ports
                <= site["grid_base_ports"] * active
                + (
                    site["grid_extra_ports"]
                    * scenario["grid_capacity_multiplier"]
                    * cumulative_upgrades
                )
            )

            site_service = pulp.lpSum(
                served[(zone_id, site_id, phase)]
                for zone_id in zone_ids
                if (zone_id, site_id) in eligible
            )
            model += site_service <= data["service_units_per_port"] * (
                site["existing_ports"] * active + cumulative_ports
            )

    for phase in phases:
        model += (
            pulp.lpSum(open_site[site_id][phase] for site_id in site_ids)
            <= scenario["max_new_sites_per_phase"]
        )
        phase_capex = pulp.lpSum(
            site_by_id[site_id]["fixed_cost_m"] * open_site[site_id][phase]
            + site_by_id[site_id]["port_cost_m"] * add_ports[site_id][phase]
            + site_by_id[site_id]["grid_cost_m"] * upgrade[site_id][phase]
            for site_id in site_ids
        )
        model += phase_capex <= scenario["phase_budget_m"]

        if phase < scenario["first_upgrade_phase"]:
            for site_id in site_ids:
                model += upgrade[site_id][phase] == 0

        for zone_id in zone_ids:
            assignments = pulp.lpSum(
                served[(zone_id, site_id, phase)]
                for site_id in site_ids
                if (zone_id, site_id) in eligible
            )
            model += assignments + unserved[zone_id][phase] == demand[
                (zone_id, phase)
            ]

    solver = pulp.PULP_CBC_CMD(msg=False)
    status = model.solve(solver)
    status_name = pulp.LpStatus[status]
    if status_name != "Optimal":
        raise RuntimeError(f"{scenario['id']} solve status: {status_name}")

    commissioned_phase: dict[str, int] = {}
    for site_id in site_ids:
        for phase in phases:
            if pulp.value(open_site[site_id][phase]) > 0.5:
                commissioned_phase[site_id] = phase + 1

    final_phase = max(phases)
    final_demand = sum(demand[(zone_id, final_phase)] for zone_id in zone_ids)
    final_unserved = sum(
        pulp.value(unserved[zone_id][final_phase]) for zone_id in zone_ids
    )
    total_ports = round(
        sum(
            pulp.value(add_ports[site_id][phase])
            for site_id in site_ids
            for phase in phases
        )
    )
    total_upgrades = round(
        sum(
            pulp.value(upgrade[site_id][phase])
            for site_id in site_ids
            for phase in phases
        )
    )
    ports_by_site = {
        site_id: round(
            sum(
                pulp.value(add_ports[site_id][phase])
                for phase in phases
            )
        )
        for site_id in commissioned_phase
    }
    upgraded_site_ids = sorted(
        site_id
        for site_id in site_ids
        if sum(pulp.value(upgrade[site_id][phase]) for phase in phases) > 0.5
    )
    capex_value = pulp.value(capital_cost)
    annualized_cost = round(capex_value / len(data["planning_phases"]))

    phase_plan = []
    for phase in phases:
        phase_plan.append(
            {
                "phase": phase + 1,
                "year": data["planning_phases"][phase],
                "sites": [
                    site_id
                    for site_id in site_ids
                    if pulp.value(open_site[site_id][phase]) > 0.5
                ],
                "portsAdded": round(
                    sum(
                        pulp.value(add_ports[site_id][phase])
                        for site_id in site_ids
                    )
                ),
            }
        )

    return {
        "status": status_name,
        "coverage": round(100 * (1 - final_unserved / final_demand)),
        "annualizedCost": annualized_cost,
        "totalCapitalCost": round(capex_value, 1),
        "portsAdded": total_ports,
        "gridUpgrades": total_upgrades,
        "activeSiteIds": sorted(commissioned_phase),
        "commissionedPhase": commissioned_phase,
        "portsBySite": ports_by_site,
        "upgradedSiteIds": upgraded_site_ids,
        "phasePlan": phase_plan,
        "objectiveValue": round(pulp.value(model.objective), 2),
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Solve the EV infrastructure planning scenarios."
    )
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    data = json.loads(args.input.read_text())
    results = {
        scenario["id"]: solve_scenario(data, scenario)
        for scenario in data["scenarios"]
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(results, indent=2) + "\n")

    for scenario_id, result in results.items():
        print(
            f"{scenario_id:20} coverage={result['coverage']:>3}% "
            f"capex=${result['totalCapitalCost']:>5}M "
            f"ports={result['portsAdded']:>3} sites={len(result['activeSiteIds'])}"
        )


if __name__ == "__main__":
    main()
