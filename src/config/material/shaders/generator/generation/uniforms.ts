import {
  SHADER_PROPERTY_TYPES,
  SHADER_PROPERTY_VALUE_TYPES,
} from "../../schema";
import { UNIFORM_DECLARATION } from "../consts";
import { ShaderParameterMap } from "../types";
import { generateDeclaration } from "./helpers/generateDeclaration";

export const generateUniformDeclaration = (
  parameterMap: ShaderParameterMap
) => {
  const uniformConfigs = Array.from(parameterMap.values()).filter(
    (parameter) => parameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM
  );

  console.log(uniformConfigs);
  const customStrings = uniformConfigs.map(
    ({ key, valueType, arrayLength, guid, isDefault }) =>
      generateDeclaration(
        SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
        valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
        isDefault ? key : `${key}_${guid || ""}`,
        arrayLength
      )
  );

  const uniformDeclaration = [UNIFORM_DECLARATION, ...customStrings].join(
    " \n "
  );

  return uniformDeclaration;
};
