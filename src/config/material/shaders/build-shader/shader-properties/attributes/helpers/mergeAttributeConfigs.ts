import { AttributeConfig } from "../../../../../../../types/materials/index";
import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";

export const mergeAttributeConfigs = (
  attributeConfig: AttributeConfig[][]
): AttributeConfig[] => {
  const mergedConfigs = attributeConfig.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as AttributeConfig[];
};
