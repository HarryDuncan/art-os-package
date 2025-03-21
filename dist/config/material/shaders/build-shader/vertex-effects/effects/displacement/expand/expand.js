import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { EXPAND_UNIFORMS, EXPAND_VARYINGS, EXPAND_FUNCTIONS, DEFAULT_EXPAND_PARAMETERS, } from "./expand.consts";
import { expandTransformation } from "./expandTransformation";
export const expand = (effectProps) => {
    const expandEffectProps = formatVertexParameters(effectProps !== null && effectProps !== void 0 ? effectProps : {}, DEFAULT_EXPAND_PARAMETERS);
    const uniformConfig = EXPAND_UNIFORMS;
    const varyingConfig = EXPAND_VARYINGS;
    const { transformation } = expandTransformation(expandEffectProps);
    const requiredFunctions = EXPAND_FUNCTIONS;
    const attributeConfig = [];
    return {
        attributeConfig,
        requiredFunctions,
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
