
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepNames 
}) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted
                      ? 'bg-goias-green border-goias-green text-white'
                      : isCurrent
                      ? 'border-goias-green text-goias-green bg-white'
                      : 'border-gray-300 text-gray-300 bg-white'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {stepNumber < totalSteps && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? 'bg-goias-green' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    isCurrent ? 'text-goias-green' : 
                    isCompleted ? 'text-goias-green' : 'text-gray-500'
                  }`}
                >
                  {stepNames[index]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
