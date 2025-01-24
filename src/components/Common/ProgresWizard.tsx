import React from "react";
import { Check, Dot } from 'lucide-react';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgresWizard: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
  const renderSteps = () => {
    const stepElements = [];
    for (let i = 1; i <= totalSteps; i++) {
      stepElements.push(
        <div key={i} className="progress-step">
          {/* Line between steps */}
          {i !== totalSteps && (
            <div
              className={`progress-line ${
                i < currentStep ? "active" : ""
              }`}
            ></div>
          )}

          {/* Step Circle */}
          <div
            className={`progress-circle ${
              i < currentStep ? "completed" : ""
            } ${i === currentStep ? "current" : ""}`}
          >
            {i < currentStep ? (
              <Check />
            ) : i === currentStep ? (
              <Dot strokeWidth={10} color="#ffc107"/>
            ) : null}
          </div>
        </div>
      );
    }
    return stepElements;
  };

  return (
    <div className="progress-bar-container">
      {renderSteps()}
    </div>
  );
};