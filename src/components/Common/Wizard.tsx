import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Step {
  id: number;
  label: string;
}

const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps: Step[] = [
    { id: 0, label: "Step 1" },
    { id: 1, label: "Step 2" },
    { id: 2, label: "Step 3" },
    { id: 3, label: "Step 4" },
    { id: 4, label: "Step 5" },
  ];

  const goToStep = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="container py-5">
      {/* Navigation Steps */}
      <div className="d-flex align-items-center justify-content-between position-relative mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div
              className="text-center position-relative"
              style={{ zIndex: 1 }}
              onClick={() => goToStep(index)}
            >
              <div
                className={`rounded-circle ${
                  index < currentStep
                    ? "bg-success text-white"
                    : index === currentStep
                    ? "bg-primary text-white"
                    : "bg-light border text-muted"
                } d-flex align-items-center justify-content-center`}
                style={{
                  width: "35px",
                  height: "35px",
                  fontSize: "16px",
                  cursor: index <= currentStep ? "pointer" : "not-allowed",
                }}
              >
                {index < currentStep ? "✔" : index === currentStep ? "●" : ""}
              </div>
              {/* Step Label */}
              <small className="d-block mt-2">{step.label}</small>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`position-absolute bg-${
                  index < currentStep ? "success" : "light"
                }`}
                style={{
                  height: "4px",
                  width: "100%",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 0,
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Wizard;
