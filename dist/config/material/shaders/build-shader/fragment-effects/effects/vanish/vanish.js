import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
import { DEFAULT_VANISH_EFFECT_PARAMS, VANISH_ATTRIBUTES, VANISH_FUNCTIONS, VANISH_UNIFORMS, VANISH_VARYINGS, } from "./vanish.consts";
import { vanishTransform } from "./vanishTransform";
export const vanishEffect = (effectProps) => {
    const formattedEffectParams = formatFragmentParameters(effectProps, DEFAULT_VANISH_EFFECT_PARAMS);
    const uniformConfig = VANISH_UNIFORMS;
    const varyingConfig = VANISH_VARYINGS;
    const requiredFunctions = VANISH_FUNCTIONS;
    const attributeConfig = VANISH_ATTRIBUTES;
    const { transformation } = vanishTransform(formattedEffectParams);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig,
    };
};
