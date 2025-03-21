import { removeDuplicatesByKey } from "../../../../../../../utils/removeDuplicatesByKey";
export const mergeAttributeConfigs = (attributeConfig) => {
    const mergedConfigs = attributeConfig.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = removeDuplicatesByKey(mergedConfigs, "id");
    return uniqueConfigs;
};
