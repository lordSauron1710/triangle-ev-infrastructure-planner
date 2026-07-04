import {
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScenarioDefinition, ScenarioId } from "../types";

interface TradeoffChartProps {
  scenarios: ScenarioDefinition[];
  selectedScenario: ScenarioId;
}

interface ChartPoint {
  x: number;
  y: number;
  name: string;
  id: ScenarioId;
}

export function TradeoffChart({
  scenarios,
  selectedScenario,
}: TradeoffChartProps) {
  const data: ChartPoint[] = scenarios.map((scenario) => ({
    x: scenario.baseCoverage,
    y: scenario.baseCost,
    name: scenario.shortName,
    id: scenario.id,
  }));

  return (
    <section className="tradeoff-panel">
      <div className="section-heading">
        <div>
          <h2>Scenario trade-offs</h2>
          <p>Coverage gained versus annualized system cost</p>
        </div>
        <span>Higher coverage →</span>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 24, right: 52, bottom: 12, left: 0 }}>
            <CartesianGrid stroke="#dbe4ea" strokeDasharray="3 4" vertical={false} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[65, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "#5f7082", fontSize: 12 }}
              axisLine={{ stroke: "#aebbc6" }}
              tickLine={false}
              name="Coverage"
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[40, 180]}
              tickFormatter={(value) => `$${value}M`}
              tick={{ fill: "#5f7082", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              name="Annualized cost"
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => [
                name === "Coverage" ? `${value}%` : `$${value}M`,
                name,
              ]}
            />
            <Scatter
              data={data}
              fill="#0d8f98"
              shape={(props: unknown) => {
                const point = props as { cx?: number; cy?: number; payload?: ChartPoint };
                const selected = point.payload?.id === selectedScenario;
                return (
                  <circle
                    cx={point.cx}
                    cy={point.cy}
                    r={selected ? 10 : 7}
                    fill={selected ? "#b5e51d" : "#0d8f98"}
                    stroke={selected ? "#0b2b5b" : "#ffffff"}
                    strokeWidth={selected ? 3 : 2}
                  />
                );
              }}
            >
              <LabelList
                dataKey="name"
                position="right"
                fill="#20344b"
                fontSize={11}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
