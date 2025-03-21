"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smoothStepTo = exports.DEFAULT_SMOOTH_STEP_HELPER = void 0;
exports.DEFAULT_SMOOTH_STEP_HELPER = {
    stepSize: 0.5,
    isRunningSteps: false,
    stepTo: 0,
    currentStep: null,
};
const smoothStepTo = (smoothStep) => {
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
exports.smoothStepTo = smoothStepTo;
