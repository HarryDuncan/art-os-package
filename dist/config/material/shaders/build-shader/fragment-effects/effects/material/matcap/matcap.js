import { DEFAULT_MATCAP_EFFECT_PROPS, DEFAULT_MATCAP_UNIFORMS, MATCAP_REQUIRED_FUNCTIONS, MATCAP_VARYINGS, } from "./matcap.consts";
import { formatFragmentParameters } from "../../../../helpers/formatFragmentParameters";
import { matcapTransform } from "./matcapTransform";
export const matcapMaterial = (effectProps = {}) => {
    const formattedProps = formatFragmentParameters(effectProps, DEFAULT_MATCAP_EFFECT_PROPS);
    const { transform } = matcapTransform(formattedProps);
    const uniformConfig = DEFAULT_MATCAP_UNIFORMS;
    const varyingConfig = MATCAP_VARYINGS;
    const requiredFunctions = MATCAP_REQUIRED_FUNCTIONS;
    return {
        requiredFunctions,
        uniformConfig,
        transformation: transform,
        varyingConfig,
        attributeConfig: [],
    };
};
