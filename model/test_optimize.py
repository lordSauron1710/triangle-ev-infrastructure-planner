import json
import tempfile
import unittest
from pathlib import Path

from optimize import DEFAULT_INPUT, solve_scenario


class OptimizationModelTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.data = json.loads(DEFAULT_INPUT.read_text())

    def test_every_scenario_solves_to_optimality(self) -> None:
        for scenario in self.data["scenarios"]:
            with self.subTest(scenario=scenario["id"]):
                result = solve_scenario(self.data, scenario)
                self.assertEqual(result["status"], "Optimal")
                self.assertGreaterEqual(result["coverage"], 0)
                self.assertLessEqual(result["coverage"], 100)
                self.assertGreater(result["totalCapitalCost"], 0)

    def test_generated_site_details_reconcile(self) -> None:
        baseline = next(
            scenario
            for scenario in self.data["scenarios"]
            if scenario["id"] == "baseline"
        )
        result = solve_scenario(self.data, baseline)

        self.assertEqual(
            set(result["activeSiteIds"]),
            set(result["commissionedPhase"]),
        )
        self.assertEqual(
            set(result["activeSiteIds"]),
            set(result["portsBySite"]),
        )
        self.assertEqual(
            result["portsAdded"],
            sum(result["portsBySite"].values()),
        )
        self.assertEqual(len(result["phasePlan"]), 4)

    def test_output_is_json_serializable(self) -> None:
        scenario = self.data["scenarios"][0]
        result = solve_scenario(self.data, scenario)
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "result.json"
            path.write_text(json.dumps(result))
            self.assertGreater(path.stat().st_size, 0)


if __name__ == "__main__":
    unittest.main()
