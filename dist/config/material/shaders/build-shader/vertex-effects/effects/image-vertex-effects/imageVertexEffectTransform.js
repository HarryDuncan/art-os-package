import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { IMAGE_VERTEX_EFFECT } from "../../vertexEffects.consts";
import { imageAsMask } from "./sub-effects/image-as-mask/imageAsMask";
import { imageToPoints } from "./sub-effects/image-to-points/imageToPoints";
export const imageVertexEffectTransform = (imageVertexEffectProps) => {
    const { effectType } = imageVertexEffectProps;
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransform, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, } = getEffectData(effectType, imageVertexEffectProps);
    const transformation = `
 
  ${effectTransform}

`;
    return {
        transformation,
        effectUniforms,
        effectVaryings,
        effectFunctions,
        effectAttributes,
    };
};
const getEffectData = (effectType, effectProps) => {
    switch (effectType) {
        case IMAGE_VERTEX_EFFECT.IMAGE_AS_MASK:
            return imageAsMask(effectProps);
        case IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS:
            return imageToPoints(effectProps);
        default:
            return Object.assign({}, DEFAULT_VERTEX_EFFECT);
    }
};
