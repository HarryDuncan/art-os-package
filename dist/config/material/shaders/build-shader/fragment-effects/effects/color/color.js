import { colorTransformation } from "./colorTransformation";
import { DEFAULT_COLOR_EFFECT_PROPS, DEFAULT_COLOR_FUNCTIONS, DEFAULT_COLOR_UNIFORMS, DEFAULT_COLOR_VARYINGS, } from "./color.consts";
import { formatFragmentParameters } from "../../../helpers/formatFragmentParameters";
export const color = (effectProps) => {
    const formattedEffectProps = formatFragmentParameters(effectProps, DEFAULT_COLOR_EFFECT_PROPS);
    const uniformConfig = DEFAULT_COLOR_UNIFORMS;
    const varyingConfig = DEFAULT_COLOR_VARYINGS;
    const requiredFunctions = DEFAULT_COLOR_FUNCTIONS;
    const transformation = colorTransformation(formattedEffectProps);
    return {
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
        attributeConfig: [],
    };
};
