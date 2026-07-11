import { AlertCircle, CheckCircle2, ClipboardList, TrendingUp } from "lucide-react";

const demonstrated = [
  "Established a multi-period structure for installation, operating, and expansion decisions.",
  "Made the cost trade-offs visible through four numerical scenarios.",
  "Connected an EV infrastructure question to a mixed-integer formulation.",
  "Made the planning logic and scenario trade-offs easy to inspect.",
];

const planned = [
  "Use real candidate-site geography and demand-zone assignment instead of generic locations.",
  "Correct the per-location initial-period port balance and validate every generated solution against all constraints.",
  "Represent station installation as a one-time decision that persists across periods.",
  "Build a reproducible optimization pipeline with explicit inputs and generated outputs.",
  "Extend the model with renewable integration, government incentives, and dynamic pricing.",
];

export function Lessons() {
  return (
    <section className="lessons-section" id="lessons" data-tour="lessons">
      <div className="lessons-columns">
        <article>
          <h2>
            <CheckCircle2 size={23} />
            What the model demonstrates
          </h2>
          <ul>
            {demonstrated.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article>
          <h2>
            <AlertCircle size={23} />
            Planned improvements
          </h2>
          <ul>
            {planned.map((item) => (
              <li key={item}>
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="planned-transition">
        <ClipboardList size={38} strokeWidth={1.6} />
        <div>
          <h2>Where the planning model can go next</h2>
          <p>
            The core decision structure is in place. The next step is to add
            geographic detail, persistent installation decisions, automated
            feasibility checks, and richer energy-system assumptions—while
            keeping cost and operational constraints visible to the planner.
          </p>
        </div>
        <TrendingUp className="planned-icon" size={34} strokeWidth={1.7} />
      </div>
    </section>
  );
}
