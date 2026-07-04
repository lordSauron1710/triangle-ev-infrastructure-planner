import { ArrowDown, Download } from "lucide-react";
import workbookUrl from "../../../archive/v0/original-excel-model.xlsx?url";
import { FactsRail } from "./components/FactsRail";
import { Lessons } from "./components/Lessons";
import { ModelExplainer } from "./components/ModelExplainer";
import { ScenarioExplorer } from "./components/ScenarioExplorer";
import { SpreadsheetPreview } from "./components/SpreadsheetPreview";
import { V0Header } from "./components/V0Header";
import "./styles.css";

export default function V0CaseStudy() {
  return (
    <div className="v0-page">
      <V0Header />
      <main>
        <section className="v0-hero">
          <div className="v0-hero-copy">
            <h1>The first model: plan charging capacity over time.</h1>
            <p>
              A three-location Excel Solver model built to explore installation,
              operating, and expansion decisions for a hypothetical Raleigh EV
              charging network.
            </p>
            <div className="v0-hero-actions">
              <a className="v0-primary-button" href="#model">
                Explore the model
                <ArrowDown size={16} />
              </a>
              <a className="v0-secondary-button" href={workbookUrl} download>
                <Download size={16} />
                Download original workbook
              </a>
            </div>
          </div>
          <SpreadsheetPreview />
        </section>

        <FactsRail />
        <ModelExplainer />
        <ScenarioExplorer />
        <Lessons />
      </main>
      <footer className="v0-footer">
        <span>
          Original ISE 501 team project · Fall 2024 · NC State · Sandeep
          Vangara, Raveena Rajeswari Pandiyaraj, Astha Pund, Saumitra Ranjan,
          Syed Aakif Zaid
        </span>
        <span>Workbook preserved unchanged in archive/v0</span>
      </footer>
    </div>
  );
}
