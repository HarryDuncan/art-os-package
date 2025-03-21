"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCameraAnimation = void 0;
const animation_constants_1 = require("../animation.constants");
const animateAll_1 = require("./run-functions/animateAll");
const chainAnimation_1 = require("./run-functions/chainAnimation");
const runCameraAnimation = (camera, animationConfig) => {
    const { animationProperties, animationFunctionType } = animationConfig;
    switch (animationFunctionType) {
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.CHAIN:
            (0, chainAnimation_1.chainAnimation)(animationProperties, [camera]);
            break;
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.ALL:
        default:
            (0, animateAll_1.animateAll)(animationProperties, [camera]);
    }
};
exports.runCameraAnimation = runCameraAnimation;
