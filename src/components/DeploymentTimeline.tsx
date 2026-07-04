import type { PhasePlan } from "../types";

const phaseTitles = [
  "Foundation",
  "Scale corridors",
  "Close gaps",
  "Complete network",
];

interface DeploymentTimelineProps {
  phases: PhasePlan[];
}

export function DeploymentTimeline({ phases }: DeploymentTimelineProps) {
  return (
    <section className="timeline-panel">
      <h2>Deployment timeline</h2>
      <div className="timeline-years" aria-hidden="true">
        {phases.map((item) => (
          <span key={item.year}>{item.year}</span>
        ))}
      </div>
      <div className="timeline-body">
        {phases.map((item) => (
          <div className="timeline-row" key={item.phase}>
            <div className="phase-copy">
              <strong>Phase {item.phase}</strong>
              <span>{phaseTitles[item.phase - 1]}</span>
              <small>
                {item.sites.length} {item.sites.length === 1 ? "site" : "sites"} ·{" "}
                {item.portsAdded} ports
              </small>
            </div>
            <div className="phase-track">
              <span
                className="phase-bar"
                style={{
                  marginLeft: `${(item.phase - 1) * 25}%`,
                  width: "25%",
                }}
              >
                Build
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
