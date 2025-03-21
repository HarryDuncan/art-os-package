"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureBlendingOptions = void 0;
const blendingOptions_consts_1 = require("./blendingOptions.consts");
const getBlendingFactor_1 = require("./getBlendingFactor");
const configureBlendingOptions = (blendingConfig) => {
    if (!blendingConfig)
        return {};
    const formattedBlendingConfig = formatBlendingConfig(blendingConfig);
    const blendDst = (0, getBlendingFactor_1.getBlendingDstFactor)(formattedBlendingConfig.blendDstKey);
    const blendSrc = (0, getBlendingFactor_1.getBlendingFactor)(formattedBlendingConfig.blendSrcKey);
    return {
        blendSrc,
        blendDst,
        transparent: formattedBlendingConfig.transparent,
        depthTest: formattedBlendingConfig.depthTest,
    };
};
exports.configureBlendingOptions = configureBlendingOptions;
const formatBlendingConfig = (parsedBlendingConfig) => {
    return Object.assign(Object.assign({}, blendingOptions_consts_1.DEFAULT_BLENDING_OPTIONS), parsedBlendingConfig);
};
