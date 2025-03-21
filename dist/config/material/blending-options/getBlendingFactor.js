"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlendingDstFactor = exports.getBlendingFactor = void 0;
const three_1 = require("three");
const blendingOptions_consts_1 = require("./blendingOptions.consts");
const getBlendingFactor = (blendMode) => {
    switch (blendMode) {
        case blendingOptions_consts_1.BLENDING_DIST.ZERO:
            return three_1.ZeroFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE:
            return three_1.OneFactor;
        case blendingOptions_consts_1.BLENDING_DIST.SRC_COLOR:
            return three_1.SrcColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_SRC_COLOR:
            return three_1.OneMinusSrcColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.SRC_ALPHA:
            return three_1.SrcAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_SRC_ALPHA:
            return three_1.OneMinusSrcAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.DST_ALPHA:
            return three_1.DstAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_DST_ALPHA:
            return three_1.OneMinusDstAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.DST_COLOR:
            return three_1.DstColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_DST_COLOR:
            return three_1.OneMinusDstColorFactor;
        case blendingOptions_consts_1.BLENDING_SRC.SRC_ALPHA_SATURATE:
            return three_1.SrcAlphaSaturateFactor;
        default:
            console.error("Unknown blending mode:", blendMode);
    }
};
exports.getBlendingFactor = getBlendingFactor;
const getBlendingDstFactor = (blendMode) => {
    switch (blendMode) {
        case blendingOptions_consts_1.BLENDING_DIST.ZERO:
            return three_1.ZeroFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE:
            return three_1.OneFactor;
        case blendingOptions_consts_1.BLENDING_DIST.SRC_COLOR:
            return three_1.SrcColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_SRC_COLOR:
            return three_1.OneMinusSrcColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.SRC_ALPHA:
            return three_1.SrcAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_SRC_ALPHA:
            return three_1.OneMinusSrcAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.DST_ALPHA:
            return three_1.DstAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_DST_ALPHA:
            return three_1.OneMinusDstAlphaFactor;
        case blendingOptions_consts_1.BLENDING_DIST.DST_COLOR:
            return three_1.DstColorFactor;
        case blendingOptions_consts_1.BLENDING_DIST.ONE_MINUS_DST_COLOR:
            return three_1.OneMinusDstColorFactor;
        default:
            console.error("Unknown blending mode:", blendMode);
    }
};
exports.getBlendingDstFactor = getBlendingDstFactor;
