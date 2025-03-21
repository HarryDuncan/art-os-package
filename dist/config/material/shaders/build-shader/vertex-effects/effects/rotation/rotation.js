import { formatVertexParameters } from "../../../helpers/formatVertexParameters";
import { DEFAULT_ROTATION_EFFECT_CONFIG, ROTATION_ATTRIBUTES, ROTATION_VARYINGS, } from "./rotation.consts";
import { rotationTransform } from "./rotationTransform";
export const rotationEffect = (effectProps = {}) => {
    const formattedProps = formatVertexParameters(effectProps, DEFAULT_ROTATION_EFFECT_CONFIG);
    const { uniformConfig, requiredFunctions, transformation } = rotationTransform(formattedProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig: ROTATION_VARYINGS,
        attributeConfig: ROTATION_ATTRIBUTES,
    };
};
