import { CircleDollarSign, MapPin, PlugZap, UtilityPole } from "lucide-react";
import type { PlanResult } from "../types";

interface MetricsStripProps {
  result: PlanResult;
}

export function MetricsStrip({ result }: MetricsStripProps) {
  const metrics = [
    {
      label: "Coverage",
      value: `${result.coverage}%`,
      detail: "of projected demand",
      icon: MapPin,
    },
    {
      label: "Annualized cost",
      value: `$${result.annualizedCost}M`,
      detail: "capex, opex + grid",
      icon: CircleDollarSign,
    },
    {
      label: "Ports added",
      value: result.portsAdded.toLocaleString(),
      detail: `across ${result.activeSites.length} priority sites`,
      icon: PlugZap,
    },
    {
      label: "Grid upgrades",
      value: result.gridUpgrades.toString(),
      detail: "substations or feeders",
      icon: UtilityPole,
    },
  ];

  return (
    <section className="metrics-strip" aria-label="Illustrative model results">
      <p className="illustrative-label">Illustrative model results</p>
      {metrics.map(({ label, value, detail, icon: Icon }) => (
        <article key={label}>
          <span className="metric-icon">
            <Icon size={22} strokeWidth={1.8} />
          </span>
          <div>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{detail}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
