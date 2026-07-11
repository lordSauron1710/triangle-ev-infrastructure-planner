import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const steps = [
  {
    target: "hero",
    eyebrow: "Start",
    title: "Read the operations problem first",
    body: "This page explains a capacity-planning model for Raleigh EV charging: decide where capacity is installed, how many ports are allocated, and when extra ports are added while minimizing cost.",
  },
  {
    target: "problem",
    eyebrow: "Decision",
    title: "Start with the operations problem",
    body: "The planner must meet location-level charging demand in every period by coordinating station decisions, allocated ports, and added ports at minimum modeled cost.",
  },
  {
    target: "inputs",
    eyebrow: "Data",
    title: "Understand the planning inputs",
    body: "Compare three locations across three periods using installation cost, operating cost, expansion cost, site capacity, and projected demand.",
  },
  {
    target: "model",
    eyebrow: "Formulation",
    title: "Translate the planning question into math",
    body: "The objective minimizes installation, operating, and expansion cost. The stated formulation covers demand, capacity, port balance, initial conditions, and decision domains; recorded outputs are audited separately for feasibility.",
  },
  {
    target: "scenarios",
    eyebrow: "Outputs",
    title: "See how the plan responds",
    body: "Use the tabs to compare four planning conditions and see how changes to demand, cost, or capacity affect total cost and aggregate port decisions.",
  },
  {
    target: "lessons",
    eyebrow: "Next",
    title: "Finish with interpretation and planned improvements",
    body: "The final section separates what the model demonstrates from planned improvements such as feasibility validation, persistent installations, richer energy assumptions, and a reproducible optimization pipeline.",
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => previousFocusRef.current?.focus();
  }, [active]);

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
      <article className="tutorial-card" aria-live="polite">
        <button ref={closeButtonRef} className="tutorial-close" type="button" onClick={onClose} aria-label="Close tutorial">
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
              aria-current={index === stepIndex ? "step" : undefined}
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
