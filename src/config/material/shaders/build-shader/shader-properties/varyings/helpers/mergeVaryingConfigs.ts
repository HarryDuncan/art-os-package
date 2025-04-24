import { VaryingConfig } from "../../../../../../../types/materials/shaders/buildShader.types";
import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";

export const mergeVaryingConfigs = (
  varyingConfigArray: VaryingConfig[][]
): VaryingConfig[] => {
  const mergedConfigs = varyingConfigArray.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as VaryingConfig[];
};
