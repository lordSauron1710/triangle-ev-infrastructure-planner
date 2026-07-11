import { useEffect } from "react";
import { X } from "lucide-react";

const steps = [
  {
    target: "hero",
    eyebrow: "Start",
    title: "Read the operations problem first",
    body: "This page explains a capacity-planning model for Raleigh EV charging: decide where capacity is installed, how many ports are allocated, and when extra ports are added while minimizing cost.",
  },
  {
    target: "inputs",
    eyebrow: "Data",
    title: "Check the source inputs",
    body: "The tables come from the workbook and report: three locations, three periods, installation cost, operating cost, expansion cost, capacity, and demand.",
  },
  {
    target: "model",
    eyebrow: "Formulation",
    title: "Translate the planning question into math",
    body: "The objective minimizes installation, operating, and expansion cost. The constraints enforce demand satisfaction, capacity limits, port balance, and decision domains.",
  },
  {
    target: "scenarios",
    eyebrow: "Outputs",
    title: "Compare recorded scenario outputs",
    body: "Use the tabs to compare the workbook’s four scenario outputs. The cost chart and port totals are computed from the same workbook values shown in the scenario table.",
  },
  {
    target: "lessons",
    eyebrow: "Next",
    title: "Finish with interpretation and planned improvements",
    body: "The final section separates what this model demonstrates from planned improvements such as real geography, persistent installs, public data, and a reproducible solver pipeline.",
  },
];

interface TutorialOverlayProps {
  active: boolean;
  stepIndex: number;
  onStepChange: (stepIndex: number) => void;
  onClose: () => void;
}

export function TutorialOverlay({
  active,
  stepIndex,
  onStepChange,
  onClose,
}: TutorialOverlayProps) {
  const step = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    document.querySelectorAll("[data-tour-current]").forEach((element) => {
      element.removeAttribute("data-tour-current");
    });

    if (!active) {
      return;
    }

    const target = document.querySelector(`[data-tour="${step.target}"]`);
    target?.setAttribute("data-tour-current", "true");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });

    return () => {
      target?.removeAttribute("data-tour-current");
    };
  }, [active, step.target]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose]);

  if (!active) {
    return null;
  }

  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="tutorial-overlay" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      <div className="tutorial-scrim" onClick={onClose} />
      <article className="tutorial-card">
        <button className="tutorial-close" type="button" onClick={onClose} aria-label="Close tutorial">
          <X size={17} />
        </button>
        <p className="tutorial-eyebrow">
          {step.eyebrow} · Step {stepIndex + 1} of {steps.length}
        </p>
        <h2 id="tutorial-title">{step.title}</h2>
        <p>{step.body}</p>
        <div className="tutorial-progress" aria-label="Tutorial progress">
          {steps.map((item, index) => (
            <button
              key={item.target}
              type="button"
              aria-label={`Go to tutorial step ${index + 1}`}
              className={index === stepIndex ? "selected" : ""}
              onClick={() => onStepChange(index)}
            />
          ))}
        </div>
        <div className="tutorial-actions">
          <button
            type="button"
            onClick={() => onStepChange(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
          >
            Back
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => {
              if (isLastStep) {
                onClose();
                return;
              }
              onStepChange(stepIndex + 1);
            }}
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </article>
    </div>
  );
}
