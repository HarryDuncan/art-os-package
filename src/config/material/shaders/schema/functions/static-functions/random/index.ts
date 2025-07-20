import { FUNCTION_TYPES } from "../../../../generator/consts";
import { rand, randomFloat } from "./random";

export const randomFloatFunction = {
  key: "random",
  functionName: "random",
  functionDefinition: randomFloat,
  functionType: FUNCTION_TYPES.STATIC,
};

export const randFunction = {
  key: "rand",
  functionName: "rand",
  functionDefinition: rand,
  functionType: FUNCTION_TYPES.STATIC,
};
