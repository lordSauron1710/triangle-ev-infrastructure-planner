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
        <p className="section-kicker">Planning inputs</p>
        <h2>Costs, capacity, and demand shape the plan</h2>
        <p>
          Three candidate locations are evaluated across three periods. Each
          location has a distinct installation cost, operating cost per port,
          expansion cost, and capacity ceiling, while demand grows at a
          different rate in each market.
        </p>
        <p className="assumption-note">
          Model assumption: demand is expressed as the number of charging ports
          required at a location in a period, so allocated ports must meet or
          exceed that value.
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
                  <th>Operate / port / period</th>
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
