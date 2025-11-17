import { SHADER_PROPERTY_TYPES } from "../../schema";
import { shaderValueTypeInstantiation } from "./helpers/shaderValues";
import { valueToShader } from "./helpers/shaderValues";
import { ShaderParameterMap } from "../types";
import { filterParametersByType } from "../../utils";

export const generateConstants = (
  shaderParameterMap: ShaderParameterMap
): {
  constantDeclaration: string;
  constantInstantiation: string[];
} => {
  const constantParameters = filterParametersByType(
    shaderParameterMap,
    SHADER_PROPERTY_TYPES.CONSTANT
  );
  const constantDeclaration = [
    "// CONSTANT DECLARATIONS",
    ...constantParameters.map(({ key, valueType, value }) => {
      return `${shaderValueTypeInstantiation(
        valueType
      )} ${key} = ${valueToShader(valueType, value ?? "")};`;
    }),
  ].join("\n");

  return {
    constantDeclaration,
    constantInstantiation: [],
  };
};
