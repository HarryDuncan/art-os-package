"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpMorphObjects = void 0;
const preTransforms_1 = require("./pre-transform/preTransforms");
const setUpMorphObjects = (morphCount, preTransformConfigs) => {
    const preTransformData = (0, preTransforms_1.preTransforms)(preTransformConfigs);
    const morphObjects = new Array(morphCount).fill("").map((_value, index) => {
        const transformData = preTransformData.find((value) => value.index === index);
        if (transformData) {
            return {
                pointName: transformData.positionName,
                normalName: `morphNormal${index}`,
            };
        }
        return {
            pointName: `morphPosition${index}`,
            normalName: `morphNormal${index}`,
        };
    });
    const requiredTransformFunctions = preTransformData.flatMap(({ requiredFunctions }) => requiredFunctions);
    const transforms = preTransformData.flatMap(({ transform }) => transform);
    return {
        morphObjects,
        transforms,
        requiredFunctions: requiredTransformFunctions,
    };
};
exports.setUpMorphObjects = setUpMorphObjects;
