import { formatVertexParameters } from "../../../../helpers/formatVertexParameters";
import { DEFAULT_NOISE_PARAMETERS, NOISE_VARYINGS } from "./noise.consts";
import { noiseTransform } from "./noiseTransform";
export const noise = (effectProps) => {
    const noiseEffectProps = formatVertexParameters(effectProps !== null && effectProps !== void 0 ? effectProps : {}, DEFAULT_NOISE_PARAMETERS);
    const varyingConfig = NOISE_VARYINGS;
    const { transformation, requiredFunctions, uniformConfig } = noiseTransform(noiseEffectProps);
    const attributeConfig = [];
    return {
        attributeConfig,
        requiredFunctions,
        // @ts-ignore
        uniformConfig,
        transformation,
        varyingConfig,
    };
};
