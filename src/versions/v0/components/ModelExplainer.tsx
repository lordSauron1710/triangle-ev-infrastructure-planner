import { formulationRows } from "../data";

export function ModelExplainer() {
  return (
    <section className="v0-model-grid model-only" id="model" data-tour="model">
      <div className="formulation-panel">
        <p className="section-kicker">Mathematical formulation</p>
        <h2>Turning the decision into a model</h2>
        <p className="formula-label">
          Mixed-integer program · objective: minimize total system cost
        </p>
        <div className="objective-equation" aria-label="Objective function">
          min ΣⱼΣₜ (CⱼXⱼₜ + OⱼYⱼₜ + AⱼZⱼₜ)
        </div>
        <dl className="symbol-legend" aria-label="Model symbol definitions">
          <div><dt>j, t</dt><dd>location and planning period</dd></div>
          <div><dt>X</dt><dd>binary station-active decision</dd></div>
          <div><dt>Y</dt><dd>ports allocated</dd></div>
          <div><dt>Z</dt><dd>ports added</dd></div>
          <div><dt>D, M</dt><dd>required ports and site capacity</dd></div>
          <div><dt>C, O, A</dt><dd>installation, operating, and expansion cost</dd></div>
        </dl>
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
