import { SHADER_PROPERTY_TYPES } from "../../schema";
import { shaderValueTypeInstantiation } from "./helpers/shaderValues";
import { valueToShader } from "./helpers/shaderValues";
import { ShaderParameterMap } from "../types";

export const generateConstantDeclarations = (
  shaderParameterMap: ShaderParameterMap
): string => {
  const constantDeclarations = Array.from(shaderParameterMap.values())
    .filter(
      ({ parameterType }) => parameterType === SHADER_PROPERTY_TYPES.CONSTANT
    )
    .map(({ shaderParameterId, valueType, value }) => {
      return `${shaderValueTypeInstantiation(
        valueType
      )} ${shaderParameterId} = ${valueToShader(valueType, value ?? "")};`;
    });

  return ["// CONSTANT DECLARATIONS", ...constantDeclarations].join("\n");
};
