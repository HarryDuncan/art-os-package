import { removeDuplicatesByKey } from "../../../../utils/removeDuplicatesByKey";
import { ParameterConfig } from "../build-shader/buildShader.types";

export const formatShaderVaryingParameters = (
  parameterConfigs: ParameterConfig[]
) => {
  const varyingConfigs = parameterConfigs.filter(
    (parameterConfig) => parameterConfig.isVarying
  );
  console.log("varyingConfigs", varyingConfigs);
  const uniqueVaryingConfigs = removeDuplicatesByKey(varyingConfigs, "id");
  return uniqueVaryingConfigs;
};
