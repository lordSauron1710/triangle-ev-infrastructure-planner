import { demandByPeriod, modelInputs, sourceNotes } from "../data";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function SourceBackedInputs() {
  return (
    <section className="inputs-section" id="inputs" data-tour="inputs">
      <div className="inputs-copy">
        <p className="section-kicker">Source data</p>
        <h2>What the model knew before Solver ran</h2>
        <p>
          The workbook uses three candidate charging locations and three planning
          periods. Each location has a station installation cost, operating cost
          per allocated port, expansion cost per added port, and maximum port
          capacity. Demand is specified by location and period.
        </p>
      </div>

      <div className="input-tables">
        <article>
          <h3>Location cost and capacity inputs</h3>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Install</th>
                  <th>Operate / port</th>
                  <th>Expand / port</th>
                  <th>Max ports</th>
                </tr>
              </thead>
              <tbody>
                {modelInputs.map((row) => (
                  <tr key={row.location}>
                    <th>{row.location}</th>
                    <td>{currency.format(row.installationCost)}</td>
                    <td>{currency.format(row.operatingCost)}</td>
                    <td>{currency.format(row.expansionCost)}</td>
                    <td>{row.maxCapacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article>
          <h3>Demand by period</h3>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Location 1</th>
                  <th>Location 2</th>
                  <th>Location 3</th>
                </tr>
              </thead>
              <tbody>
                {demandByPeriod.map((row) => (
                  <tr key={row.period}>
                    <th>{row.period}</th>
                    <td>{row.location1}</td>
                    <td>{row.location2}</td>
                    <td>{row.location3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <details className="source-notes">
        <summary>Source traceability</summary>
        <ul>
          {sourceNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
