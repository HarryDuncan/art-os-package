import { ShaderParameterMap } from "../../buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../../constants/shader.consts";
import {
  parseRawValueToShader,
  shaderValueTypeInstantiation,
} from "../safeParseValue";

export const generateConstantDeclarations = (
  shaderParameterMap: ShaderParameterMap
) => {
  const constantDeclarations = Array.from(shaderParameterMap.values())
    .filter(
      ({ parameterConfig }) =>
        parameterConfig &&
        parameterConfig.parameterType === SHADER_PROPERTY_TYPES.CONSTANT
    )
    .map(({ shaderParameterId, valueType, parameterConfig }) => {
      return `${shaderValueTypeInstantiation(
        valueType
      )} ${shaderParameterId} = ${parseRawValueToShader(
        valueType,
        parameterConfig?.value ?? ""
      )};`;
    });

  return constantDeclarations;
};
