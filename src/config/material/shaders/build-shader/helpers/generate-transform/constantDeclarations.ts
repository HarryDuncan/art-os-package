import { ShaderParameterMap } from "../../buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../../constants/shader.consts";
import {
  parseRawValueToShader,
  shaderValueTypeInstantiation,
} from "../safeParseValue";

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
      )} ${shaderParameterId} = ${parseRawValueToShader(
        valueType,
        value ?? ""
      )};`;
    });

  return ["// CONSTANT DECLARATIONS", ...constantDeclarations].join("\n");
};
