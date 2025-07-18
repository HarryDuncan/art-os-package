import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../schema";
import { UNIFORM_DECLARATION } from "../consts";
import { ShaderParameterMap } from "../types";
import { generateDeclaration } from "./helpers/generateDeclaration";

const DEFAULT_UNIFORMS = ["uTime"];
export const generateUniformDeclaration = (
  parameterMap: ShaderParameterMap
) => {
  const uniformConfigs = Array.from(parameterMap.values()).filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM
  );

  const customStrings = uniformConfigs.map(
    ({ key, valueType, arrayLength, guid }) =>
      generateDeclaration(
        SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        DEFAULT_UNIFORMS.includes(key) ? key : `${key}_${guid}`,
        arrayLength
      )
  );

  const uniformDeclaration = [UNIFORM_DECLARATION, ...customStrings].join(
    " \n "
  );

  return uniformDeclaration;
};
