import { useMemo, useState } from "react";
import { v0Scenarios, type ScenarioKey } from "../data";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ScenarioExplorer() {
  const [selectedKey, setSelectedKey] = useState<ScenarioKey>("A");
  const scenario =
    v0Scenarios.find((item) => item.key === selectedKey) ?? v0Scenarios[0];

  const shares = useMemo(
    () => ({
      installation: (scenario.installation / scenario.total) * 100,
      operating: (scenario.operating / scenario.total) * 100,
      expansion: (scenario.expansion / scenario.total) * 100,
    }),
    [scenario],
  );

  return (
    <section className="scenario-section" id="scenarios">
      <div className="scenario-heading">
        <div>
          <h2>Four scenarios, one planning model</h2>
          <p>
            The workbook changed demand, costs, and capacity to observe how the
            reported cost structure moved. These are archived workbook outputs,
            not validated recommendations.
          </p>
        </div>
        <span>Archived workbook outputs</span>
      </div>

      <div className="scenario-tabs" role="tablist" aria-label="Version zero scenarios">
        {v0Scenarios.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selectedKey === item.key}
            className={selectedKey === item.key ? "selected" : ""}
            onClick={() => setSelectedKey(item.key)}
          >
            <strong>{item.key}</strong>
            <span>{item.shortName}</span>
          </button>
        ))}
      </div>

      <div className="scenario-output">
        <div>
          <p className="scenario-name">{scenario.name}</p>
          <p className="scenario-change">{scenario.change}</p>
          <div className="donut-wrap">
            <div
              className="cost-donut"
              style={{
                background: `conic-gradient(
                  #f2b516 0 ${shares.installation}%,
                  #0d8f98 ${shares.installation}% ${shares.installation + shares.operating}%,
                  #80afd3 ${shares.installation + shares.operating}% 100%
                )`,
              }}
              aria-label={`Total cost ${currency(scenario.total)}`}
            >
              <div>
                <strong>{currency(scenario.total)}</strong>
                <span>Total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cost-breakdown">
          {[
            ["Installation", scenario.installation, shares.installation, "installation"],
            ["Operating", scenario.operating, shares.operating, "operating"],
            ["Expansion", scenario.expansion, shares.expansion, "expansion"],
          ].map(([label, value, share, className]) => (
            <div key={label as string}>
              <span className={`cost-key ${className}`} />
              <strong>{label}</strong>
              <span>{currency(value as number)}</span>
              <span>{(share as number).toFixed(1)}%</span>
            </div>
          ))}
          <div className="cost-total">
            <strong>Total</strong>
            <span>{currency(scenario.total)}</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
