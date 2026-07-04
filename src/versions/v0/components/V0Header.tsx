import { ArrowRight, Zap } from "lucide-react";
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

      <nav className="version-nav" aria-label="Project versions">
        <Link className="selected" to="/v0" aria-current="page">
          v0 · Original model
        </Link>
        <Link to="/v1">v1 · Interactive planner</Link>
      </nav>

      <nav className="v0-section-nav" aria-label="Walkthrough sections">
        <a href="#problem">Problem</a>
        <a href="#model">Model</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#lessons">Lessons</a>
      </nav>

      <Link className="v0-v1-button" to="/v1">
        Open v1 planner
        <ArrowRight size={16} />
      </Link>
    </header>
  );
}
