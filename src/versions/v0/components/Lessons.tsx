import { AlertCircle, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const demonstrated = [
  "Established a multi-period structure for installation, operating, and expansion decisions.",
  "Made the cost trade-offs visible through four numerical scenarios.",
  "Connected an EV infrastructure question to a mixed-integer formulation.",
  "Created a concrete starting point for a more realistic planning product.",
];

const fixes = [
  "Geographic assignment between demand zones and candidate sites.",
  "One-time installation decisions that persist across periods.",
  "Complete capacity, port-flow, and decision-domain constraints.",
  "Reproducible code, grid limits, public data, and interactive exploration.",
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
            What v1 needed to fix
          </h2>
          <ul>
            {fixes.map((item) => (
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
          <h2>From spreadsheet exercise to decision product.</h2>
          <p>
            v0 showed the value of structured optimization. v1 turns it into a
            reproducible, geographic planning experience.
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
