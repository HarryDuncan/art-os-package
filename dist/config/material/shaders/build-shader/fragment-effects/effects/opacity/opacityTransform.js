"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opacityTransform = void 0;
const shaderConversions_1 = require("../../../../../../../utils/conversion/shaderConversions");
const fragmentEffects_consts_1 = require("../../fragmentEffects.consts");
const opacityTransform = (opacityParameters) => {
    const { opacity, asUniform } = opacityParameters;
    const transformation = `
        // OPACITY
        float opacity = ${asUniform ? "uOpacity" : (0, shaderConversions_1.shaderSafeFloat)(opacity)};
        ${fragmentEffects_consts_1.FRAG_COLOR_NAME} = vec4(${fragmentEffects_consts_1.FRAG_COLOR_NAME}.rgb, opacity);
      `;
    return { transformation };
};
exports.opacityTransform = opacityTransform;
