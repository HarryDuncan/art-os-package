"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeStructConfigs = void 0;
const removeDuplicatesByKey_1 = require("../../../../../../utils/removeDuplicatesByKey");
const mergeStructConfigs = (unmergedStructConfigs) => {
    const mergedConfigs = unmergedStructConfigs.flatMap((config) => config !== null && config !== void 0 ? config : []);
    const uniqueConfigs = (0, removeDuplicatesByKey_1.removeDuplicatesByKey)(mergedConfigs, "id");
    return uniqueConfigs;
};
exports.mergeStructConfigs = mergeStructConfigs;
