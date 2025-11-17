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
  const uniformConfigs = Array.from(parameterMap.entries()).flatMap(
    ([key, parameter]) => {
      if (parameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM) {
        return { ...parameter, key };
      } else {
        return [];
      }
    }
  );

  const customStrings = uniformConfigs.map(({ key, valueType, arrayLength }) =>
    generateDeclaration(
      SHADER_PROPERTY_TYPES.UNIFORM as keyof typeof SHADER_PROPERTY_TYPES,
      valueType as keyof typeof SHADER_PROPERTY_VALUE_TYPES,
      `${key}`,
      { flat: false },
      arrayLength
    )
  );

  const uniformDeclaration = [UNIFORM_DECLARATION, ...customStrings].join(
    " \n "
  );

  return uniformDeclaration;
};
