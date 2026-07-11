import { AlertCircle, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const demonstrated = [
  "Established a multi-period structure for installation, operating, and expansion decisions.",
  "Made the cost trade-offs visible through four numerical scenarios.",
  "Connected an EV infrastructure question to a mixed-integer formulation.",
  "Created a compact planning artifact that can be inspected on the web.",
];

const boundaries = [
  "Geographic assignment between demand zones and candidate sites.",
  "One-time installation decisions that persist across periods.",
  "Complete capacity, port-flow, and decision-domain constraints.",
  "Grid limits, public-data inputs, and reproducible code execution.",
];

export function Lessons() {
  return (
    <section className="lessons-section" id="lessons">
      <div className="lessons-columns">
        <article>
          <h2>
            <CheckCircle2 size={23} />
            What v0 demonstrated
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
            Scope boundaries
          </h2>
          <ul>
            {boundaries.map((item) => (
              <li key={item}>
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="v1-transition">
        <TrendingUp size={38} strokeWidth={1.6} />
        <div>
          <h2>Two independent planning views.</h2>
          <p>
            v0 publishes the archived workbook as a guided web walkthrough. v1
            is a separate interactive planner with its own data, assumptions,
            and model logic.
          </p>
        </div>
        <Link to="/v1">
          Continue to v1
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
