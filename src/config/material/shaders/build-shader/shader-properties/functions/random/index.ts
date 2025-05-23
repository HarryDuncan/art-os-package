import { rand, randomFloat } from "./random";
import { FUNCTION_TYPES } from "../../../constants/buildShader.consts";

export const randomFloatFunction = {
  id: "random",
  functionDefinition: randomFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const randFunction = {
  id: "rand",
  functionDefinition: rand,
  functionType: FUNCTION_TYPES.STATIC,
};
