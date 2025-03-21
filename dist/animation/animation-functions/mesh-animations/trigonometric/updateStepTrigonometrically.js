import { oscillate } from "./oscilate";
export const updateStepTrigonometrically = (currentStep, angle, trigFunction) => {
    return currentStep + oscillate(angle, trigFunction);
};
