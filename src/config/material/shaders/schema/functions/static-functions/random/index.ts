import { FUNCTION_TYPES } from "../../../../generator/consts";
import { rand, randomFloat } from "./random";

export const randomFloatFunction = {
  id: "random",
  functionName: "random",
  functionDefinition: randomFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const randFunction = {
  id: "rand",
  functionName: "rand",
  functionDefinition: rand,
  functionType: FUNCTION_TYPES.STATIC,
};
