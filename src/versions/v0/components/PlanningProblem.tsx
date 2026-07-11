import { ArrowRight } from "lucide-react";

export function PlanningProblem() {
  return (
    <section
      className="planning-question"
      id="problem"
      data-tour="problem"
    >
      <p className="section-kicker">Operations problem</p>
      <h2>Match charging capacity to growing demand</h2>
      <p>
        Raleigh needs enough charging ports to serve projected demand at each
        candidate location in every planning period. The decision is where and
        when station capacity is active, how many ports to allocate, and how
        many ports to add—while minimizing the model&apos;s installation,
        operating, and expansion costs.
      </p>
      <div className="planning-flow" aria-label="Planning decision flow">
        {[
          ["Install", "Activate station capacity by location and period"],
          ["Allocate", "Provide enough ports to cover projected demand"],
          ["Expand", "Add ports as required capacity increases"],
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
    </section>
  );
}
