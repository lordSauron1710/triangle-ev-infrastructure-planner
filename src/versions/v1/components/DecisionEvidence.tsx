import { Building2, ClipboardCheck, Network } from "lucide-react";

export function DecisionEvidence() {
  const evidence = [
    {
      title: "Meets demand where it grows",
      body: "Prioritizes high-growth corridors and activity centers to maximize useful coverage.",
      icon: Building2,
    },
    {
      title: "Grid-aware and buildable",
      body: "Aligns charger additions with interconnection readiness and upgrade lead times.",
      icon: Network,
    },
    {
      title: "Phased to manage capital",
      body: "Sequences investments to fit annual budgets while preserving network effects.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="evidence-panel">
      <h2>Why this plan</h2>
      <div className="evidence-list">
        {evidence.map(({ title, body, icon: Icon }) => (
          <article key={title}>
            <span>
              <Icon size={20} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
