import { baselineRows } from "../data";

const periods = ["P1", "P2", "P3"];

export function SpreadsheetPreview() {
  return (
    <div className="sheet-frame" aria-label="Baseline capacity plan">
      <div className="sheet-badge">Mixed-integer capacity plan</div>
      <div className="sheet-columns" aria-hidden="true">
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="sheet-table-wrap">
        <table className="sheet-table">
          <thead>
            <tr>
              <th rowSpan={2}>Locations</th>
              <th colSpan={3}>Station installed</th>
              <th colSpan={3}>Ports allocated</th>
              <th colSpan={3}>Ports added</th>
            </tr>
            <tr>
              {[...periods, ...periods, ...periods].map((period, index) => (
                <th key={`${period}-${index}`}>{period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {baselineRows.map((row) => (
              <tr key={row.location}>
                <th>{row.location}</th>
                {[...row.installed, ...row.allocated, ...row.added].map(
                  (value, index) => (
                    <td className="decision-cell" key={`${row.location}-${index}`}>
                      {value}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sheet-costs">
        <span>
          Installation <strong>$540,000</strong>
        </span>
        <span>
          Operating <strong>$72,350</strong>
        </span>
        <span>
          Expansion <strong>$36,000</strong>
        </span>
        <span className="total-cell">
          Total cost <strong>$648,350</strong>
        </span>
      </div>
    </div>
  );
}
