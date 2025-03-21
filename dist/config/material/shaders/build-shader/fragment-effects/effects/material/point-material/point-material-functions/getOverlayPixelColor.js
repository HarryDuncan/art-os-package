"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverlayPixelColor = void 0;
const fragmentEffects_consts_1 = require("../../../../fragmentEffects.consts");
const getOverlayPixelColor = (pointEffectProps) => {
    const transformation = `${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vOverlayPixelColor ;`;
    return {
        transformation,
    };
};
exports.getOverlayPixelColor = getOverlayPixelColor;
