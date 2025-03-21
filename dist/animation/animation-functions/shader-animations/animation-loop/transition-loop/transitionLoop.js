"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitionLoop = void 0;
const getLoopTypes_1 = require("../loops/getLoopTypes");
const updateObjectUniformByKey_1 = require("../../uniforms/updateObjectUniformByKey");
const transitionLoop = (transitionConfig) => {
    if (!transitionConfig)
        return null;
    const { transitionAnimations, transitionDuration } = transitionConfig;
    const transitionLoopFunctions = transitionAnimations.map(({ uniform, toMaterial, loopType, loopProps }) => {
        const loopFunction = (0, getLoopTypes_1.getLoopType)(loopType, transitionDuration, loopProps);
        return { toMaterial, uniform, loopFunction };
    });
    return (shaderMesh, time) => {
        transitionLoopFunctions.forEach(({ loopFunction, uniform }) => {
            const uniformValue = loopFunction(time);
            (0, updateObjectUniformByKey_1.updateObjectUniformByKey)(shaderMesh, uniform, uniformValue);
        });
        return [shaderMesh, time];
    };
};
exports.transitionLoop = transitionLoop;
