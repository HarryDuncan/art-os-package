import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
export const defaultFragmentEffect = () => {
    const uniformConfig = Object.assign({}, EMPTY_UNIFORM_CONFIG);
    const defaultFrag = ``;
    return {
        requiredFunctions: [],
        uniformConfig,
        transformation: defaultFrag,
        varyingConfig: [],
        attributeConfig: [],
    };
};
