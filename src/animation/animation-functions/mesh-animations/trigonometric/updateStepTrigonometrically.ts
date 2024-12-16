import { TrigFunctionType } from "display/animation/animation.types";
import { oscillate } from "./oscilate";

export const updateStepTrigonometrically = (
  currentStep: number,
  angle: number,
  trigFunction: TrigFunctionType
): number => {
  return currentStep + oscillate(angle, trigFunction);
};
