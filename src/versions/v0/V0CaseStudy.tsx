import { useState } from "react";
import { ArrowDown, Compass, Download } from "lucide-react";
import workbookUrl from "../../../archive/v0/original-excel-model.xlsx?url";
import { FactsRail } from "./components/FactsRail";
import { Lessons } from "./components/Lessons";
import { ModelExplainer } from "./components/ModelExplainer";
import { ScenarioExplorer } from "./components/ScenarioExplorer";
import { SourceBackedInputs } from "./components/SourceBackedInputs";
import { SpreadsheetPreview } from "./components/SpreadsheetPreview";
import { TutorialOverlay } from "./components/TutorialOverlay";
import { V0Header } from "./components/V0Header";
import "./styles.css";

export default function V0CaseStudy() {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  return (
    <div className="v0-page">
      <V0Header />
      <main>
        <section className="v0-hero" data-tour="hero">
          <div className="v0-hero-copy">
            <p className="section-kicker">EV Charging Capacity Planning Model</p>
            <h1>Plan charging capacity over time.</h1>
            <p>
              EV demand grows in stages, but infrastructure decisions carry
              long-term cost. Explore how installation timing, port allocation,
              and capacity expansion work together to meet demand across three
              planning periods at the lowest total cost.
            </p>
            <div className="v0-hero-actions">
              <a className="v0-primary-button" href="#model">
                Explore the model
                <ArrowDown size={16} />
              </a>
              <button
                className="v0-primary-button v0-tour-button"
                type="button"
                onClick={() => {
                  setTutorialStep(0);
                  setTutorialOpen(true);
                }}
              >
                Start guided walkthrough
                <Compass size={16} />
              </button>
              <a className="v0-secondary-button" href={workbookUrl} download>
                <Download size={16} />
                Download model workbook
              </a>
            </div>
          </div>
          <SpreadsheetPreview />
        </section>

        <FactsRail />
        <SourceBackedInputs />
        <ModelExplainer />
        <ScenarioExplorer />
        <Lessons />
      </main>
      <TutorialOverlay
        active={tutorialOpen}
        stepIndex={tutorialStep}
        onStepChange={setTutorialStep}
        onClose={() => setTutorialOpen(false)}
      />
    </div>
  );
}
