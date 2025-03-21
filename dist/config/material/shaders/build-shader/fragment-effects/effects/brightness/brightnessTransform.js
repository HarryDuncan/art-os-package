"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brightnessTransform = void 0;
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const brightnessTransform = (brightnessParameters) => {
    const transformation = `
        // BRIGHTNESS

        ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = ${fragmentEffects_consts_1.FRAG_COLOR_NAME} * uBrightness;
      `;
    return { transformation };
};
exports.brightnessTransform = brightnessTransform;
