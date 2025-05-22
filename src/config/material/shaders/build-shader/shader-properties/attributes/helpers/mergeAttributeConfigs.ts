import { ParameterConfig } from "../../../../../../../types/materials/index";
import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";

export const mergeAttributeConfigs = (
  attributeConfigs: ParameterConfig[][]
): ParameterConfig[] => {
  const mergedConfigs = attributeConfigs.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "guid");
  return uniqueConfigs as ParameterConfig[];
};
