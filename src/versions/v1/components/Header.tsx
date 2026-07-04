import { CircleHelp, Github, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = ["Overview", "Network", "Scenarios", "Method"];

export function Header() {
  return (
    <header className="site-header">
      <div className="brand-cluster">
        <Link className="brand" to="/v1#overview" aria-label="EV Infrastructure Planner v1">
          <span className="brand-mark" aria-hidden="true">
            <Zap size={17} strokeWidth={2.4} />
          </span>
          <span>EV Infrastructure Planner</span>
        </Link>
        <Link className="version-link" to="/v0">
          v0 story
        </Link>
      </div>

      <nav aria-label="Primary navigation">
        {navigation.map((item, index) => (
          <a
            key={item}
            className={index === 0 ? "active" : ""}
            href={`/v1#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          className="icon-link"
          href="/v1#method"
          aria-label="About this case study"
        >
          <CircleHelp size={18} />
        </a>
        <a
          className="github-link"
          href="https://github.com/lordSauron1710/triangle-ev-infrastructure-planner"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} />
          GitHub
        </a>
      </div>
    </header>
  );
}
