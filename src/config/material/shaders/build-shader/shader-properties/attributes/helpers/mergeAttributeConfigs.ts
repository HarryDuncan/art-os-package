import { AttributeConfig } from "../../../../../../../types/materials/shaders/buildShader.types";
import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";

export const mergeAttributeConfigs = (
  attributeConfig: AttributeConfig[][]
): AttributeConfig[] => {
  const mergedConfigs = attributeConfig.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as AttributeConfig[];
};
