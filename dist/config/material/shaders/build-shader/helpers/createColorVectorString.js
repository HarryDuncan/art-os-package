"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColorVectorString = void 0;
const hexToRgb_1 = require("../../../../../utils/conversion/hexToRgb");
const shaderConversions_1 = require("../../../../../utils/conversion/shaderConversions");
const createColorVectorString = (hexColor, opacity) => {
    const colorVector = (0, hexToRgb_1.hexToRgb)(hexColor);
    if (!colorVector) {
        console.warn("invalid color vector");
        return `vec4(1.0, 0.0, 0.0, ${opacity ? "opacity" : "1.0"})`;
    }
    return `vec4(${(0, shaderConversions_1.shaderSafeFloat)(colorVector[0])}, ${(0, shaderConversions_1.shaderSafeFloat)(colorVector[1])}, ${(0, shaderConversions_1.shaderSafeFloat)(colorVector[2])}, ${opacity ? "opacity" : "1.0"})`;
};
exports.createColorVectorString = createColorVectorString;
