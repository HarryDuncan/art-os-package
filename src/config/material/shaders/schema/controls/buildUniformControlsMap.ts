import { ParameterControlConfig } from "./types";
import { SHADER_PROPERTY_TYPES } from "../consts";
import { ShaderParameterMap } from "../../generator/types";

/** Map uniform runtime keys → control config from the shader parameter map. */
export const buildUniformControlsMap = (
  parameterMap: ShaderParameterMap,
): Record<string, ParameterControlConfig> => {
  const map: Record<string, ParameterControlConfig> = {};
  for (const [key, parameter] of parameterMap.entries()) {
    if (
      parameter.parameterType === SHADER_PROPERTY_TYPES.UNIFORM &&
      parameter.controlsConfig
    ) {
      map[key] = parameter.controlsConfig;
    }
  }
  return map;
};
