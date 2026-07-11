import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function V0Header() {
  return (
    <header className="v0-header">
      <Link className="v0-brand" to="/v0" aria-label="EV Infrastructure Planner v0">
        <span aria-hidden="true">
          <Zap size={15} strokeWidth={2.3} />
        </span>
        EV Infrastructure Planner
      </Link>

      <nav className="version-nav" aria-label="Project context">
        <Link className="selected" to="/v0" aria-current="page">
          Capacity planning model
        </Link>
      </nav>

      <nav className="v0-section-nav" aria-label="Walkthrough sections">
        <a href="#problem">Problem</a>
        <a href="#inputs">Inputs</a>
        <a href="#model">Model</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#lessons">Planned improvements</a>
      </nav>
    </header>
  );
}
