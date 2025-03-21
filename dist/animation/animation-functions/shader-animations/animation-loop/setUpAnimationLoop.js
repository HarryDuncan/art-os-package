"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAnimationLoop = void 0;
const getLoopTypes_1 = require("./loops/getLoopTypes");
const updateObjectUniformByKey_1 = require("../uniforms/updateObjectUniformByKey");
const composeFunctions_1 = require("../../../../utils/composeFunctions");
// import { transitionLoop } from "./transition-loop/transitionLoop";
const defaultConfig = [
    {
        uniform: "uTime",
        loopType: "LINEAR",
    },
];
const setUpAnimationLoop = (config, loopDuration) => {
    const animationConfig = [
        ...defaultConfig,
        ...config,
    ];
    const animationLoopFunctions = animationConfig.map(({ uniform, toMaterial, loopType, duration, loopProps, uniformArrayIndex, }) => {
        const animationLoopDuration = duration !== null && duration !== void 0 ? duration : loopDuration;
        const loopFunction = (0, getLoopTypes_1.getLoopType)(loopType, animationLoopDuration, loopProps);
        return (shaderMesh, time) => {
            if (toMaterial && (shaderMesh === null || shaderMesh === void 0 ? void 0 : shaderMesh.material.name) !== toMaterial) {
                return [shaderMesh, time];
            }
            const uniformValue = loopFunction(time);
            (0, updateObjectUniformByKey_1.updateObjectUniformByKey)(shaderMesh, uniform, uniformValue, uniformArrayIndex);
            return [shaderMesh, time];
        };
    });
    // const transitionAnimationFunction = transitionLoop(
    //   transitionAnimations ?? null
    // );
    // if (transitionAnimationFunction) {
    //   animationLoopFunctions.push(transitionAnimationFunction);
    // }
    return (0, composeFunctions_1.composeFunctions)(animationLoopFunctions);
};
exports.setUpAnimationLoop = setUpAnimationLoop;
