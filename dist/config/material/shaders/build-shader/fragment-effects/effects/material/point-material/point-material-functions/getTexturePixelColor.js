"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTexturePixelColor = void 0;
const fragmentEffects_consts_1 = require("../../../../fragmentEffects.consts");
const getTexturePixelColor = (pointEffectProps) => {
    const transformation = `${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vPixelColor;`;
    return {
        transformation,
    };
};
exports.getTexturePixelColor = getTexturePixelColor;
