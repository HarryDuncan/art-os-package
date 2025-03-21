import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
export const mergeVaryingConfigs = (varyingConfigArray) => {
    const mergedConfigs = varyingConfigArray.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
    return uniqueConfigs;
};
