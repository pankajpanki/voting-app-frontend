import React from 'react';

interface ProgressStepsProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgresSteps: React.FC<ProgressStepsProps> = ({ totalSteps, currentStep }) => {
	var currentStep = Number(currentStep) - 1;
  return (
    <div className="position-relative mb-4">
      <div className="progress" style={{ height: '2px' }}>
        <div 
          className="progress-bar bg-warning" 
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <div className="position-absolute top-0 start-0 w-100 d-flex justify-content-between" style={{ transform: 'translateY(-50%)' }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`rounded-circle ${index <= currentStep ? 'bg-warning' : 'bg-light border'}`}
            style={{ 
              width: '12px', 
              height: '12px',
              border: '2px solid #fff'
            }}
          />
        ))}
      </div>
    </div>
  );
};

