import { DEFAULT_POINT_EFFECT_CONFIG, POINTS_ATTRIBUTES, POINTS_FUNCTIONS, POINTS_UNIFORMS, POINTS_VARYINGS, } from "./points.consts";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import { pointsTransform } from "./pointsTransform";
export const pointsVertex = (effectProps = {}) => {
    const formattedEffectProps = formatVertexParameters(effectProps, DEFAULT_POINT_EFFECT_CONFIG);
    const uniformConfig = POINTS_UNIFORMS;
    const requiredFunctions = POINTS_FUNCTIONS;
    const varyingConfig = POINTS_VARYINGS;
    const attributeConfig = POINTS_ATTRIBUTES;
    const transformation = pointsTransform(formattedEffectProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
