"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapAnimationLoopOnPause = void 0;
const updateObjectUniformByKey_1 = require("../uniforms/updateObjectUniformByKey");
const animationLoop_consts_1 = require("./animationLoop.consts");
const snapAnimationLoopOnPause = (config, animatedObject) => {
    config.forEach(({ loopType, uniform, toMaterial }) => {
        const loopKey = screamingSnakeToCamel(loopType);
        if ((toMaterial && animatedObject.material.name === toMaterial) ||
            !toMaterial) {
            const keypoints = animationLoop_consts_1.ANIMATION_LOOP_KEYPOINTS;
            switch (loopType) {
                case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ONE_TO_ONE:
                case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
                case animationLoop_consts_1.ANIMATION_LOOP_TYPES.ZERO_TO_ZERO: {
                    const uniformValue = keypoints[loopKey].end;
                    (0, updateObjectUniformByKey_1.updateObjectUniformByKey)(animatedObject, uniform, uniformValue);
                    break;
                }
                default:
                    break;
            }
        }
    });
};
exports.snapAnimationLoopOnPause = snapAnimationLoopOnPause;
const screamingSnakeToCamel = (screamingSnake) => {
    const words = screamingSnake.toLowerCase().split("_");
    for (let i = 1; i < words.length; i += 1) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join("");
};
