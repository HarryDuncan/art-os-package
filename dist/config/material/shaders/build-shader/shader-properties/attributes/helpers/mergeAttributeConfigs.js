"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAttributeConfigs = void 0;
const removeDuplicatesByKey_1 = require("../../../../../../../utils/removeDuplicatesByKey");
const mergeAttributeConfigs = (attributeConfig) => {
    const mergedConfigs = attributeConfig.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = (0, removeDuplicatesByKey_1.removeDuplicatesByKey)(mergedConfigs, "id");
    return uniqueConfigs;
};
exports.mergeAttributeConfigs = mergeAttributeConfigs;
