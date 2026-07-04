import { CircleHelp, Github, Zap } from "lucide-react";

const navigation = ["Overview", "Network", "Scenarios", "Method"];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#overview" aria-label="EV Infrastructure Planner home">
        <span className="brand-mark" aria-hidden="true">
          <Zap size={17} strokeWidth={2.4} />
        </span>
        <span>EV Infrastructure Planner</span>
      </a>

      <nav aria-label="Primary navigation">
        {navigation.map((item, index) => (
          <a
            key={item}
            className={index === 0 ? "active" : ""}
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          className="icon-link"
          href="#method"
          aria-label="About this case study"
        >
          <CircleHelp size={18} />
        </a>
        <a
          className="github-link"
          href="https://github.com/"
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
