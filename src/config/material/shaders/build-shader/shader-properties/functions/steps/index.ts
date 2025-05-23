import { zeroToZeroParabola } from "./steps";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const zeroToZeroParabolaFunction = {
  id: "zeroToZeroParabola",
  functionDefinition: zeroToZeroParabola.functionDefinition,
  functionType: FUNCTION_TYPES.STATIC,
};
