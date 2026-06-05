import { JSX, useState } from "react";
import { Button, cn } from "@saysike/ui";
import { Welcome } from "./steps/Welcome";
import { PinToolbar } from "./steps/PinToolbar";
import { HowItWorks } from "./steps/HowItWorks";
import { AllDone } from "./steps/AllDone";

const STEPS = [Welcome, PinToolbar, HowItWorks, AllDone];

export const Onboarding = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;
  const StepComponent = STEPS[currentStep];

  const goToStep = (step: number): void => {
    setVisible(false);
    setTimeout(() => {
      setCurrentStep(step);
      setVisible(true);
    }, 150);
  };

  const handleNext = (): void => {
    if (isLastStep) {
      window.close();
      return;
    }
    goToStep(currentStep + 1);
  };

  const handleBack = (): void => {
    if (!isFirstStep) goToStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col gap-10">
        {/* Step content */}
        <div
          className={cn(
            "transition-opacity duration-150",
            visible ? "opacity-100" : "opacity-0",
          )}
        >
          <StepComponent />
        </div>

        {/* Step indicator dots */}
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                i === currentStep ? "bg-primary" : "bg-surface-tertiary",
              )}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            className={cn(isFirstStep && "invisible")}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {isLastStep ? "Start saving" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
