"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandTransformation = void 0;
const shaderConversions_1 = require("../../../../../../../../utils/conversion/shaderConversions");
const vertexEffects_consts_1 = require("../../../vertexEffects.consts");
const expandTransformation = (expandParameters) => {
    const { effectStrength } = expandParameters;
    const transformation = `
        // EXPAND VERTEX POSITIONS
        vec3 ${vertexEffects_consts_1.VERTEX_POINT_NAME} = ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz;
        vec3 direction = normalize(uCenter - ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz);
        ${vertexEffects_consts_1.VERTEX_POINT_NAME}.xyz -= direction * ${(0, shaderConversions_1.shaderSafeFloat)(effectStrength)} * uExpandStrength;
      `;
    return { transformation };
};
exports.expandTransformation = expandTransformation;
