"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAnimation = void 0;
const animation_constants_1 = require("../animation.constants");
const animateAll_1 = require("./run-functions/animateAll");
const chainAnimation_1 = require("./run-functions/chainAnimation");
const runShaderAnimations_1 = require("../animation-functions/shader-animations/runShaderAnimations");
const getSceneElementByName_1 = require("../../utils/scene/getSceneElementByName");
const runRiggedAnimation_1 = require("../animation-functions/rigged-animation/runRiggedAnimation");
const runAnimation = (scene, animationConfig, animationId) => {
    const { targetIdentifier, animationFunctionType, animationProperties } = animationConfig;
    const animatedObjects = (0, getSceneElementByName_1.getSceneElementByName)(scene, targetIdentifier);
    if (!animatedObjects.length) {
        console.warn(`${animationId} can't run. No meshes selected with ${targetIdentifier}`);
        return;
    }
    switch (animationFunctionType) {
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.CHAIN:
            (0, chainAnimation_1.chainAnimation)(animationProperties, animatedObjects);
            break;
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.UTIME:
            (0, runShaderAnimations_1.runShaderAnimations)(scene, animationProperties, animatedObjects);
            break;
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.RIGGED:
            (0, runRiggedAnimation_1.runRiggedAnimation)(animationProperties, animatedObjects);
            break;
        case animation_constants_1.ANIMATION_FUNCTION_TYPES.ALL:
        default:
            (0, animateAll_1.animateAll)(animationProperties, animatedObjects);
    }
};
exports.runAnimation = runAnimation;
