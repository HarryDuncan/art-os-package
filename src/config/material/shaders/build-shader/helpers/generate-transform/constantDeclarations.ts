import { ShaderParameterMap } from "../../buildShader.types";
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
        !parameterConfig.isUniform &&
        !parameterConfig.isAttribute &&
        !parameterConfig.isVarying
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
