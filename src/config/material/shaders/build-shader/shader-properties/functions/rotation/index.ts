import { rotateZ, rotateX, rotateY } from "./rotation";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const rotateZFunction = {
  id: "rotateZ",
  functionDefinition: rotateZ,
  functionType: FUNCTION_TYPES.STATIC,
};

export const rotateXFunction = {
  id: "rotateX",
  functionDefinition: rotateX,
  functionType: FUNCTION_TYPES.STATIC,
};

export const rotateYFunction = {
  id: "rotateY",
  functionDefinition: rotateY,
  functionType: FUNCTION_TYPES.STATIC,
};
