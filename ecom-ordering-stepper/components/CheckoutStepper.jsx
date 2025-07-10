import { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    const calculateAndSetMargins = () => {
      if (
        stepsConfig.length > 0 &&
        stepRef.current[0] &&
        stepRef.current[stepsConfig.length - 1]
      ) {
        const firstStepWidth = stepRef.current[0].offsetWidth;
        const lastStepWidth =
          stepRef.current[stepsConfig.length - 1].offsetWidth;

        if (firstStepWidth > 0 && lastStepWidth > 0) {
          setMargins({
            marginLeft: firstStepWidth / 2,
            marginRight: lastStepWidth / 2,
          });
        }
      }
    };

    calculateAndSetMargins();

    const timeoutId = setTimeout(() => {
      calculateAndSetMargins();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    // Handle the case of a single step to avoid division by zero (e.g., stepsConfig.length - 1 = 0)
    if (stepsConfig.length <= 1) {
      return 0; // Or 100 if a single step means "complete"
    }
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => {
                if (el) {
                  // Ensure 'el' is not null before assigning to ref
                  stepRef.current[index] = el;
                }
              }}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      {ActiveComponent && <ActiveComponent />} {/* Conditional render check */}
      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;
