import { removeDuplicatesByKey } from "../../../../../../utils/removeDuplicatesByKey";
export const mergeStructConfigs = (unmergedStructConfigs) => {
    const mergedConfigs = unmergedStructConfigs.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
    return uniqueConfigs;
};
