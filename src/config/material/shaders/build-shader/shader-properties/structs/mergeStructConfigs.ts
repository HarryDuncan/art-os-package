import { StructConfig } from "../../../../../../types/materials/index";
import { removeDuplicatesByKey } from "../../../../../../utils/removeDuplicatesByKey";

export const mergeStructConfigs = (
  unmergedStructConfigs: StructConfig[][]
): StructConfig[] => {
  const mergedConfigs = unmergedStructConfigs.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as StructConfig[];
};
