import { removeDuplicatesByKey } from "utils/removeDuplicatesByKey";
import { StructConfig } from "../../types";

export const mergeStructConfigs = (
  unmergedStructConfigs: StructConfig[][]
): StructConfig[] => {
  const mergedConfigs = unmergedStructConfigs.flatMap((config) => config ?? []);
  const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
  return uniqueConfigs as StructConfig[];
};
