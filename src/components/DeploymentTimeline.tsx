const phases = [
  { phase: "Phase 1", title: "Foundation", detail: "3 hubs · 60 ports", start: 0, span: 26 },
  { phase: "Phase 2", title: "Scale corridors", detail: "3 sites · 48 ports", start: 18, span: 31 },
  { phase: "Phase 3", title: "Close gaps", detail: "3 sites · 40 ports", start: 40, span: 32 },
  { phase: "Phase 4", title: "Complete network", detail: "1 site · 12 ports", start: 67, span: 31 },
];

export function DeploymentTimeline() {
  return (
    <section className="timeline-panel">
      <h2>Deployment timeline</h2>
      <div className="timeline-years" aria-hidden="true">
        {["2026", "2027", "2028", "2029", "2030"].map((year) => (
          <span key={year}>{year}</span>
        ))}
      </div>
      <div className="timeline-body">
        {phases.map((item) => (
          <div className="timeline-row" key={item.phase}>
            <div className="phase-copy">
              <strong>{item.phase}</strong>
              <span>{item.title}</span>
              <small>{item.detail}</small>
            </div>
            <div className="phase-track">
              <span
                className="phase-bar"
                style={{
                  marginLeft: `${item.start}%`,
                  width: `${item.span}%`,
                }}
              >
                In service
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
