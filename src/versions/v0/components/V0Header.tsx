import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function V0Header() {
  return (
    <header className="v0-header">
      <div className="v0-header-inner">
        <Link className="v0-brand" to="/v0" aria-label="EV Infrastructure Planner">
          <span aria-hidden="true">
            <Zap size={15} strokeWidth={2.3} />
          </span>
          EV Infrastructure Planner
        </Link>

        <nav className="v0-section-nav" aria-label="Walkthrough sections">
          <a href="#problem">Problem</a>
          <a href="#inputs">Inputs</a>
          <a href="#model">Model</a>
          <a href="#scenarios">Scenarios</a>
          <a href="#lessons">Improvements</a>
        </nav>
      </div>
    </header>
  );
}
