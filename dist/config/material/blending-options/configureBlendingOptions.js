import { DEFAULT_BLENDING_OPTIONS } from "./blendingOptions.consts";
import { getBlendingDstFactor, getBlendingFactor } from "./getBlendingFactor";
export const configureBlendingOptions = (blendingConfig) => {
    if (!blendingConfig)
        return {};
    const formattedBlendingConfig = formatBlendingConfig(blendingConfig);
    const blendDst = getBlendingDstFactor(formattedBlendingConfig.blendDstKey);
    const blendSrc = getBlendingFactor(formattedBlendingConfig.blendSrcKey);
    return {
        blendSrc,
        blendDst,
        transparent: formattedBlendingConfig.transparent,
        depthTest: formattedBlendingConfig.depthTest,
    };
};
const formatBlendingConfig = (parsedBlendingConfig) => {
    return Object.assign(Object.assign({}, DEFAULT_BLENDING_OPTIONS), parsedBlendingConfig);
};
