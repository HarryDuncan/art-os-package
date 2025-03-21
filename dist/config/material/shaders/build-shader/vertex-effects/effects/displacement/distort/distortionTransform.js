import { vertexEffectToEffectData } from "../../../../helpers/vertexEffectToEffectData";
import { DISTORTION_TYPES } from "../../../vertexEffects.consts";
import { flexyTwister } from "./flexy-twister/flexyTwister";
import { stretch } from "./stretch/stretch";
import { twistTransformation } from "./twist/twistTransformation";
export const distortionTransform = (distortEffectProps) => {
    const { transformation, uniformConfig, varyingConfig, requiredFunctions, } = getTransformation(distortEffectProps);
    return {
        transformation,
        uniformConfig,
        requiredFunctions,
        varyingConfig,
    };
};
const getTransformation = (distortEffectProps) => {
    const { distortionType, effectProps } = distortEffectProps;
    switch (distortionType) {
        case DISTORTION_TYPES.STRETCH:
            return vertexEffectToEffectData(stretch(effectProps));
        case DISTORTION_TYPES.FLEXY_TWISTER:
            return vertexEffectToEffectData(flexyTwister(effectProps));
        case DISTORTION_TYPES.TWIST:
        default: {
            const twistTransformationData = twistTransformation(effectProps);
            return vertexEffectToEffectData(twistTransformationData);
        }
    }
};
