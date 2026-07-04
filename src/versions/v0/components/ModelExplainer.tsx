import { ArrowRight } from "lucide-react";
import { formulationRows } from "../data";

export function ModelExplainer() {
  return (
    <section className="v0-model-grid">
      <div className="planning-question" id="problem">
        <h2>The planning question</h2>
        <p>
          How should charging capacity be installed and expanded over time to
          meet growing demand at minimum total cost?
        </p>
        <div className="planning-flow" aria-label="Planning flow">
          {[
            ["Installation", "Where and when to install stations"],
            ["Capacity", "Allocate and expand ports over time"],
            ["Demand", "Satisfy each location and period"],
          ].map(([title, copy], index) => (
            <div className="flow-step-wrap" key={title}>
              <article>
                <strong>{title}</strong>
                <span>{copy}</span>
              </article>
              {index < 2 && <ArrowRight size={18} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>

      <div className="formulation-panel" id="model">
        <h2>The intended v0 formulation</h2>
        <p className="formula-label">
          Excel Solver prototype · objective: minimize reported total cost
        </p>
        <div className="objective-equation" aria-label="Objective function">
          min ΣⱼΣₜ (CⱼXⱼₜ + OⱼYⱼₜ + AⱼZⱼₜ)
        </div>
        <div className="constraint-list">
          {formulationRows.map((row) => (
            <details key={row.title}>
              <summary>
                <strong>{row.title}</strong>
                <span>{row.summary}</span>
                <code>{row.equation}</code>
              </summary>
              <p>{row.detail}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
