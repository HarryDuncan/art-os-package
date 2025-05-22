import { AttributeConfig } from "../../../../../../../types/materials/index";
import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";

export const mergeAttributeConfigs = (
  attributeConfigs: AttributeConfig[][]
): AttributeConfig[] => {
  const mergedConfigs = attributeConfigs.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as AttributeConfig[];
};
