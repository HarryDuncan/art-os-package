import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";
export const runCameraAnimation = (camera, animationConfig) => {
    const { animationProperties, animationFunctionType } = animationConfig;
    switch (animationFunctionType) {
        case ANIMATION_FUNCTION_TYPES.CHAIN:
            chainAnimation(animationProperties, [camera]);
            break;
        case ANIMATION_FUNCTION_TYPES.ALL:
        default:
            animateAll(animationProperties, [camera]);
    }
};
