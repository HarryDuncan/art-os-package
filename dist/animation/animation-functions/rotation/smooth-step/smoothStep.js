export const DEFAULT_SMOOTH_STEP_HELPER = {
    stepSize: 0.5,
    isRunningSteps: false,
    stepTo: 0,
    currentStep: null,
};
export const smoothStepTo = (smoothStep) => {
    const { stepSize, stepTo, currentStep } = smoothStep;
    if (!currentStep) {
        console.warn("current step not initialized");
        return 0;
    }
    if (currentStep === stepTo)
        return stepTo;
    const newValue = currentStep + (stepTo > currentStep ? 1 : -1) * stepSize;
    return newValue;
};
