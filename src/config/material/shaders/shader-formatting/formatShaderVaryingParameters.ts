import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";
import { ParameterConfig } from "../build-shader/buildShader.types";
import { SHADER_PROPERTY_TYPES } from "../build-shader/constants/shader.consts";

export const formatShaderVaryingParameters = (
  parameterConfigs: ParameterConfig[]
) => {
  const varyingConfigs = parameterConfigs.filter(
    (parameterConfig) =>
      parameterConfig.parameterType === SHADER_PROPERTY_TYPES.VARYING
  );
  const uniqueVaryingConfigs = removeDuplicatesByKey(varyingConfigs, "id");
  return uniqueVaryingConfigs;
};
