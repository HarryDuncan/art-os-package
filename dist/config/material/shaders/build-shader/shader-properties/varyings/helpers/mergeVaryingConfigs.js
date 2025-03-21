"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeVaryingConfigs = void 0;
const removeDuplicatesByKey_1 = require("../../../../../../../utils/removeDuplicatesByKey");
const mergeVaryingConfigs = (varyingConfigArray) => {
    const mergedConfigs = varyingConfigArray.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = (0, removeDuplicatesByKey_1.removeDuplicatesByKey)(mergedConfigs, "id");
    return uniqueConfigs;
};
exports.mergeVaryingConfigs = mergeVaryingConfigs;
