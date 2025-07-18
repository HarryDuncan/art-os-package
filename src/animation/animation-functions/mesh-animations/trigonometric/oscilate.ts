import { TRIG_FUNCTION_TYPES } from "../../../../consts/animation/animation.constants";
import { TrigFunctionType } from "../../../animation.types";

export const oscillate = (
  timestamp: number,
  trigFunction: TrigFunctionType,
  durationMs = 1000
): number => {
  const angle = ((timestamp % durationMs) / durationMs) * Math.PI * 2;
  switch (trigFunction) {
    case TRIG_FUNCTION_TYPES.COS:
      return Math.cos(angle);
    case TRIG_FUNCTION_TYPES.TAN:
      return Math.tan(angle);
    case TRIG_FUNCTION_TYPES.SIN:
    default:
      return Math.sin(angle);
  }
};
